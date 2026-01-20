"""
Vishwanath's Portfolio - Flask Application
Includes AI Assistant API endpoint
"""

from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message
import os
import uuid
from chatbot import ask_bot

app = Flask(__name__)

# Email Configuration (Gmail SMTP)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME', 'vishrajasek@gmail.com')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD', 'jhhl uyzq qtxe pohd')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME', 'vishrajasek@gmail.com')

mail = Mail(app)


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
    """Contact form email endpoint"""
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject', 'Portfolio Contact')
        message = data.get('message')
        
        if not all([name, email, message]):
            return jsonify({'success': False, 'message': 'Please fill in all required fields'}), 400
        
        msg = Message(
            subject=f"Portfolio Contact: {subject}",
            recipients=['vishrajasek@gmail.com'],
            body=f"""
New message from your portfolio website:

Name: {name}
Email: {email}
Subject: {subject}

Message:
{message}

---
Sent from Vishwanath's Portfolio
            """,
            reply_to=email
        )
        
        mail.send(msg)
        return jsonify({'success': True, 'message': 'Message sent successfully!'})
    
    except Exception as e:
        print(f"[Email Error]: {e}")
        return jsonify({'success': False, 'message': 'Failed to send message. Please try emailing directly.'}), 500


@app.errorhandler(404)
def not_found(e):
    return render_template('index.html'), 404


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
