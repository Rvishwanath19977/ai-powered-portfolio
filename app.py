"""
Vishwanath's Portfolio - Flask Application
Includes AI Assistant API endpoint
"""

from flask import Flask, render_template, request, jsonify
import os
import uuid
import requests
import smtplib
from email.message import EmailMessage
from chatbot import ask_bot

app = Flask(__name__)

# Email Configuration (Gmail SMTP)
def send_email_via_gmail(name, email, subject, message):
    """Fallback Gmail SMTP sender"""
    msg = EmailMessage()
    msg["Subject"] = f"Portfolio Contact: {subject}"
    msg["From"] = os.getenv("MAIL_USERNAME")
    msg["To"] = "vishrajasek@gmail.com"
    msg["Reply-To"] = email

    msg.set_content(f"""
New message from your portfolio website:

Name: {name}
Email: {email}
Subject: {subject}

Message:
{message}

---
Sent from Vishwanath's Portfolio
""")

    with smtplib.SMTP("smtp.gmail.com", 587, timeout=10) as server:
        server.starttls()
        server.login(
            os.getenv("MAIL_USERNAME"),
            os.getenv("MAIL_PASSWORD")
        )
        server.send_message(msg)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/projects")
def projects():
    return render_template("projects.html")


@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/api/chat", methods=["POST"])
def chat_api():
    """AI Assistant chat endpoint"""
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({'success': False, 'error': 'Message is required'}), 400
        
        message = data.get('message', '').strip()
        session_id = data.get('session_id', str(uuid.uuid4()))
        
        if not message:
            return jsonify({'success': False, 'error': 'Message cannot be empty'}), 400
        
        if len(message) > 500:
            message = message[:500]
        
        result = ask_bot(message, session_id)
        
        return jsonify({
            'success': True,
            'response': result['response'],
            'intent': result.get('intent', 'general'),
            'suggestions': result.get('suggestions', [])
        })
    
    except Exception as e:
        print(f"[Chat API Error]: {e}")
        return jsonify({
            'success': False,
            'response': "I'm having a moment! Please try again, or reach out to Vish directly at vishrajasek@gmail.com",
            'suggestions': []
        }), 500


@app.route("/send-message", methods=["POST"])
def send_message():
    """Contact form email endpoint with Resend + Gmail fallback"""
    try:
        data = request.get_json()

        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject', 'Portfolio Contact')
        message = data.get('message')

        if not all([name, email, message]):
            return jsonify({
                'success': False,
                'message': 'Please fill in all required fields'
            }), 400

        # -----------------------------
        # 1️⃣ TRY RESEND FIRST
        # -----------------------------
        try:
            response = requests.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {os.getenv('RESEND_API_KEY')}",
                    "Content-Type": "application/json"
                },
                json={
                    "from": "Vish Portfolio <onboarding@resend.dev>",
                    "to": ["vishrajasek@gmail.com"],
                    "reply_to": email,
                    "subject": f"Portfolio Contact: {subject}",
                    "html": f"""
                        <h3>New message from your portfolio</h3>
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Message:</strong></p>
                        <p>{message}</p>
                    """
                },
                timeout=10
            )

            if response.status_code == 200:
                return jsonify({
                    'success': True,
                    'message': 'Message sent successfully!'
                })

            raise Exception(response.text)

        except Exception as resend_error:
            print("[Resend Failed] Falling back to Gmail:", resend_error)

        # -----------------------------
        # 2️⃣ FALLBACK TO GMAIL SMTP
        # -----------------------------
        send_email_via_gmail(name, email, subject, message)

        return jsonify({
            'success': True,
            'message': 'Message sent successfully!'
        })

    except Exception as e:
        print("[Email Error]:", e)
        return jsonify({
            'success': False,
            'message': 'Failed to send message. Please try again later.'
        }), 500

@app.errorhandler(404)
def not_found(e):
    return render_template('index.html'), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
