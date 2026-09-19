import os
import re
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

# Explicit path to .env in project root
PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
DOTENV_PATH = os.path.join(PROJECT_ROOT, ".env")


def ensure_dotenv_exists():
    """Ensure .env exists in the Flask project root."""
    if not os.path.exists(DOTENV_PATH):
        default_content = (
            "MAIL_SERVER=smtp.gmail.com\n"
            "MAIL_PORT=587\n"
            "MAIL_USERNAME=jayasuriyan343@gmail.com\n"
            "MAIL_PASSWORD=\n"
            "MAIL_RECEIVER=jayasuriyan343@gmail.com\n"
        )
        with open(DOTENV_PATH, "w", encoding="utf-8") as f:
            f.write(default_content)


ensure_dotenv_exists()
load_dotenv(DOTENV_PATH)

app = Flask(__name__)
# Enable CORS for /api/ routes
CORS(app, resources={r"/api/*": {"origins": "*"}})

EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")


def validate_contact_payload(data):
    """
    Validate contact form data.
    Returns (is_valid, error_message, cleaned_data)
    """
    if not isinstance(data, dict):
        return False, "Invalid request payload. Expected JSON object.", None

    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    subject = str(data.get("subject", "")).strip()
    message = str(data.get("message", "")).strip()

    # Validate Name
    if not name:
        return False, "Name is required.", None
    if len(name) > 100:
        return False, "Name must not exceed 100 characters.", None

    # Validate Email
    if not email:
        return False, "Email is required.", None
    if len(email) > 254:
        return False, "Email must not exceed 254 characters.", None
    if not EMAIL_REGEX.match(email):
        return False, "Please provide a valid email address.", None

    # Validate Subject
    if not subject:
        return False, "Subject is required.", None
    if len(subject) > 200:
        return False, "Subject must not exceed 200 characters.", None

    # Validate Message
    if not message:
        return False, "Message is required.", None
    if len(message) > 5000:
        return False, "Message must not exceed 5000 characters.", None

    return True, None, {
        "name": name,
        "email": email,
        "subject": subject,
        "message": message,
    }


def send_contact_email(name, email, subject, message):
    """
    Send contact email via SMTP using environment configuration.
    Returns (success: bool, error_message: str or None)
    """
    # Ensure .env exists and reload from DOTENV_PATH
    ensure_dotenv_exists()
    load_dotenv(DOTENV_PATH)

    mail_server = os.getenv("MAIL_SERVER", "smtp.gmail.com").strip()
    mail_port_str = os.getenv("MAIL_PORT", "587").strip()
    try:
        mail_port = int(mail_port_str)
    except ValueError:
        mail_port = 587

    mail_username = os.getenv("MAIL_USERNAME", "").strip()
    mail_password = os.getenv("MAIL_PASSWORD", "").replace(" ", "").strip()
    mail_receiver = (os.getenv("MAIL_RECEIVER") or mail_username).strip()

    # Identify missing or placeholder environment variables
    missing_vars = []
    if not mail_username or mail_username in ("MY_GMAIL_ADDRESS", "yourgmail@gmail.com", "your-email@gmail.com"):
        missing_vars.append("MAIL_USERNAME")
    if not mail_password or mail_password in ("MY_GMAIL_APP_PASSWORD", "your_16_digit_app_password", "your_16_char_gmail_app_password_here", "your-gmail-app-password"):
        missing_vars.append("MAIL_PASSWORD")
    if not mail_receiver or mail_receiver in ("MY_GMAIL_ADDRESS", "yourgmail@gmail.com", "your-email@gmail.com"):
        missing_vars.append("MAIL_RECEIVER")

    if missing_vars:
        missing_desc = (
            f"Missing environment variables in .env: {', '.join(missing_vars)}. "
            f"Please open .env and set your 16-character Gmail App Password."
        )
        app.logger.error(missing_desc)
        return False, missing_desc

    msg = EmailMessage()
    msg["Subject"] = f"[Portfolio Contact] {subject}"
    msg["From"] = mail_username
    msg["To"] = mail_receiver
    msg["Reply-To"] = email

    body = (
        f"New message received from JayaSuriyan's portfolio.\n\n"
        f"Name: {name}\n"
        f"Email: {email}\n\n"
        f"Subject:\n{subject}\n\n"
        f"Message:\n{message}\n"
    )
    msg.set_content(body)

    try:
        app.logger.info(f"Connecting to SMTP server {mail_server}:{mail_port} for user {mail_username}...")
        if mail_port == 465:
            with smtplib.SMTP_SSL(mail_server, mail_port, timeout=15) as server:
                server.login(mail_username, mail_password)
                server.send_message(msg)
        else:
            with smtplib.SMTP(mail_server, mail_port, timeout=15) as server:
                server.starttls()
                server.login(mail_username, mail_password)
                server.send_message(msg)
        app.logger.info(f"Email successfully delivered to {mail_receiver}")
        return True, None
    except smtplib.SMTPAuthenticationError as auth_err:
        err_msg = (
            "Gmail SMTP Authentication Failed. Your MAIL_USERNAME or MAIL_PASSWORD was rejected. "
            "Ensure 2-Step Verification is enabled on your Google account and you are using a 16-character "
            "Gmail App Password (not your normal Gmail password)."
        )
        app.logger.error(f"{err_msg} Details: {auth_err}")
        return False, err_msg
    except smtplib.SMTPConnectError as conn_err:
        err_msg = f"Unable to connect to SMTP server {mail_server}:{mail_port}. Details: {conn_err}"
        app.logger.error(err_msg)
        return False, err_msg
    except Exception as exc:
        err_type = type(exc).__name__
        err_msg = f"SMTP error ({err_type}): {exc}"
        app.logger.error(f"Failed to send email: {err_msg}")
        return False, err_msg


@app.route("/api/contact", methods=["POST"])
def contact():
    # Parse incoming JSON
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({
            "success": False,
            "message": "Invalid JSON payload."
        }), 400

    is_valid, error_msg, cleaned = validate_contact_payload(data)
    if not is_valid:
        return jsonify({
            "success": False,
            "message": error_msg
        }), 400

    # Send email
    success, send_error = send_contact_email(
        cleaned["name"],
        cleaned["email"],
        cleaned["subject"],
        cleaned["message"]
    )

    if success:
        return jsonify({
            "success": True,
            "message": "Message sent successfully!"
        }), 200
    else:
        # Development mode returns detailed diagnostic information without secrets
        is_dev = app.debug or os.getenv("FLASK_ENV") != "production"
        response_payload = {
            "success": False,
            "message": "Unable to send your message. Please try again."
        }
        if is_dev and send_error:
            response_payload["error"] = send_error

        return jsonify(response_payload), 500


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "service": "portfolio-contact-api"
    }), 200


DIST_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist")


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    # Never intercept /api routes
    if path.startswith("api/") or path == "api":
        return jsonify({"error": "Not Found"}), 404

    # Normalize if requested under /jayasuriyan/ base prefix
    clean_path = path
    if clean_path.startswith("jayasuriyan/"):
        clean_path = clean_path[len("jayasuriyan/"):]
    elif clean_path == "jayasuriyan":
        clean_path = ""

    # Serve static assets from dist/ if the file exists
    target_file = os.path.join(DIST_DIR, clean_path)
    if clean_path and os.path.isfile(target_file):
        return send_from_directory(DIST_DIR, clean_path)

    # Handle favicon.ico fallback to favicon.svg
    if clean_path == "favicon.ico" and not os.path.isfile(target_file):
        svg_favicon = os.path.join(DIST_DIR, "favicon.svg")
        if os.path.isfile(svg_favicon):
            return send_from_directory(DIST_DIR, "favicon.svg", mimetype="image/svg+xml")

    # Fallback to SPA index.html
    index_file = os.path.join(DIST_DIR, "index.html")
    if os.path.isfile(index_file):
        return send_from_directory(DIST_DIR, "index.html")

    return jsonify({
        "service": "portfolio-backend",
        "message": "Frontend build not found. Run 'npm run build' to generate dist folder."
    }), 404


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
