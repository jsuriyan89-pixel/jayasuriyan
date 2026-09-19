import unittest
from unittest.mock import patch, MagicMock
from app import app, validate_contact_payload


class TestContactAPI(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.client = self.app.test_client()

    def test_validation_empty_payload(self):
        valid, err, _ = validate_contact_payload({})
        self.assertFalse(valid)
        self.assertIn("Name is required", err)

    def test_validation_invalid_email(self):
        valid, err, _ = validate_contact_payload({
            "name": "John Doe",
            "email": "not-an-email",
            "subject": "Hello",
            "message": "This is a test message."
        })
        self.assertFalse(valid)
        self.assertIn("valid email", err)

    def test_validation_missing_fields(self):
        # Missing subject
        valid, err, _ = validate_contact_payload({
            "name": "John Doe",
            "email": "john@example.com",
            "subject": "  ",
            "message": "This is a test message."
        })
        self.assertFalse(valid)
        self.assertIn("Subject is required", err)

        # Missing message
        valid, err, _ = validate_contact_payload({
            "name": "John Doe",
            "email": "john@example.com",
            "subject": "Subject",
            "message": "  "
        })
        self.assertFalse(valid)
        self.assertIn("Message is required", err)

    def test_endpoint_validation_error_returns_400(self):
        res = self.client.post("/api/contact", json={
            "name": "",
            "email": "test@example.com",
            "subject": "Test",
            "message": "Message"
        })
        self.assertEqual(res.status_code, 400)
        data = res.get_json()
        self.assertFalse(data["success"])
        self.assertIn("Name is required", data["message"])

    @patch("app.smtplib.SMTP")
    @patch.dict("os.environ", {
        "MAIL_SERVER": "smtp.gmail.com",
        "MAIL_PORT": "587",
        "MAIL_USERNAME": "test@gmail.com",
        "MAIL_PASSWORD": "app-password-test",
        "MAIL_RECEIVER": "receiver@gmail.com"
    })
    def test_endpoint_successful_send(self, mock_smtp):
        mock_instance = MagicMock()
        mock_smtp.return_value.__enter__.return_value = mock_instance

        res = self.client.post("/api/contact", json={
            "name": "Alice Developer",
            "email": "alice@example.com",
            "subject": "Freelance Opportunity",
            "message": "Let's build something together!"
        })

        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data["success"])
        self.assertEqual(data["message"], "Message sent successfully!")

        mock_instance.starttls.assert_called_once()
        mock_instance.login.assert_called_once_with("test@gmail.com", "app-password-test")
        mock_instance.send_message.assert_called_once()

        sent_msg = mock_instance.send_message.call_args[0][0]
        self.assertEqual(sent_msg["Subject"], "[Portfolio Contact] Freelance Opportunity")
        self.assertEqual(sent_msg["From"], "test@gmail.com")
        self.assertEqual(sent_msg["To"], "receiver@gmail.com")
        self.assertEqual(sent_msg["Reply-To"], "alice@example.com")
        self.assertIn("New message received from JayaSuriyan's portfolio.", sent_msg.get_content())
        self.assertIn("Name: Alice Developer", sent_msg.get_content())
        self.assertIn("Email: alice@example.com", sent_msg.get_content())
        self.assertIn("Subject:\nFreelance Opportunity", sent_msg.get_content())
        self.assertIn("Message:\nLet's build something together!", sent_msg.get_content())

    @patch("app.smtplib.SMTP")
    @patch.dict("os.environ", {
        "MAIL_SERVER": "smtp.gmail.com",
        "MAIL_PORT": "587",
        "MAIL_USERNAME": "test@gmail.com",
        "MAIL_PASSWORD": "app-password-test",
        "MAIL_RECEIVER": "receiver@gmail.com"
    })
    def test_endpoint_smtp_failure_returns_500(self, mock_smtp):
        mock_instance = MagicMock()
        mock_instance.login.side_effect = Exception("SMTP auth error")
        mock_smtp.return_value.__enter__.return_value = mock_instance

        res = self.client.post("/api/contact", json={
            "name": "Alice Developer",
            "email": "alice@example.com",
            "subject": "Project Inquiry",
            "message": "Test inquiry message"
        })

        self.assertEqual(res.status_code, 500)
        data = res.get_json()
        self.assertFalse(data["success"])
        self.assertEqual(data["message"], "Unable to send your message. Please try again.")

    def test_health_check(self):
        res = self.client.get("/api/health")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["status"], "healthy")


if __name__ == "__main__":
    unittest.main()
