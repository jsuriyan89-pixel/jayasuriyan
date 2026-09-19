import os

# Port provided by Render environment, default to 5000 for local testing
port = os.environ.get("PORT", "5000")
bind = f"0.0.0.0:{port}"

# Worker processes
workers = 2
threads = 4
timeout = 120
keepalive = 5
