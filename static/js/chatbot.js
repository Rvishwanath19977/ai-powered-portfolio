// ============================================
// VISH'S AI ASSISTANT - CHATBOT JAVASCRIPT
// Premium interactions and animations
// ============================================

class VishAssistant {
    constructor() {
        this.container = null;
        this.toggleBtn = null;
        this.messagesContainer = null;
        this.inputField = null;
        this.sendBtn = null;
        this.isOpen = false;
        this.isTyping = false;
        this.sessionId = this.generateSessionId();
        this.hasInteracted = false;
        
        this.init();
    }
    
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    init() {
        this.createChatbotHTML();
        this.bindElements();
        this.bindEvents();
        this.showNotificationBadge();
        
        // Auto-open after delay on first visit (optional)
        // setTimeout(() => this.autoGreet(), 3000);
    }
    
    createChatbotHTML() {
        // Create toggle button
        const toggle = document.createElement('button');
        toggle.className = 'chatbot-toggle';
        toggle.id = 'chatbotToggle';
        toggle.setAttribute('aria-label', 'Open AI Assistant');
        toggle.innerHTML = `
            <svg class="icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            <svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            <span class="chatbot-badge" style="display: none;">1</span>
        `;
        
        // Create chatbot container
        const container = document.createElement('div');
        container.className = 'chatbot-container';
        container.id = 'chatbotContainer';
        container.innerHTML = `
            <div class="chatbot-header">
                <div class="chatbot-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                    </svg>
                </div>
                <div class="chatbot-header-info">
                    <h3>Vish's AI Assistant</h3>
                    <p>Online • Ready to help</p>
                </div>
                <button class="chatbot-close" id="chatbotClose" aria-label="Close chat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            
            <div class="chatbot-messages" id="chatbotMessages">
                <div class="chatbot-welcome" id="chatbotWelcome">
                    <div class="welcome-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"/>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                            <line x1="9" y1="9" x2="9.01" y2="9"/>
                            <line x1="15" y1="9" x2="15.01" y2="9"/>
                        </svg>
                    </div>
                    <h4>Hey there! 👋</h4>
                    <p>I'm Vish's AI assistant. I can tell you about his work, projects, research, and more. What would you like to know?</p>
                    <div class="welcome-suggestions">
                        <button class="welcome-suggestion" data-message="Tell me about Vish's work and experience">
                            <span class="welcome-suggestion-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                                </svg>
                            </span>
                            <span>Work & Experience</span>
                        </button>
                        <button class="welcome-suggestion" data-message="What projects has Vish built?">
                            <span class="welcome-suggestion-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                                    <polyline points="2 17 12 22 22 17"/>
                                    <polyline points="2 12 12 17 22 12"/>
                                </svg>
                            </span>
                            <span>Key Projects</span>
                        </button>
                        <button class="welcome-suggestion" data-message="What is Vish's research focus in Human-AI Interaction?">
                            <span class="welcome-suggestion-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="12" y1="16" x2="12" y2="12"/>
                                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                                </svg>
                            </span>
                            <span>Research & HAI</span>
                        </button>
                        <button class="welcome-suggestion" data-message="How can I contact Vish?">
                            <span class="welcome-suggestion-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                    <polyline points="22,6 12,13 2,6"/>
                                </svg>
                            </span>
                            <span>Contact Info</span>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="chatbot-input">
                <div class="chatbot-input-wrapper">
                    <textarea 
                        id="chatbotInput" 
                        placeholder="Ask me anything about Vish..."
                        rows="1"
                        maxlength="500"
                    ></textarea>
                </div>
                <button class="chatbot-send" id="chatbotSend" aria-label="Send message">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                </button>
            </div>
            
            <div class="chatbot-footer">
                Powered by AI • Built by <a href="/">Vishwanath</a>
            </div>
        `;
        
        document.body.appendChild(toggle);
        document.body.appendChild(container);
    }
    
    bindElements() {
        this.container = document.getElementById('chatbotContainer');
        this.toggleBtn = document.getElementById('chatbotToggle');
        this.messagesContainer = document.getElementById('chatbotMessages');
        this.inputField = document.getElementById('chatbotInput');
        this.sendBtn = document.getElementById('chatbotSend');
        this.closeBtn = document.getElementById('chatbotClose');
        this.welcomeScreen = document.getElementById('chatbotWelcome');
        this.badge = this.toggleBtn.querySelector('.chatbot-badge');
    }
    
    bindEvents() {
        // Toggle button
        this.toggleBtn.addEventListener('click', () => this.toggle());
        
        // Close button
        this.closeBtn.addEventListener('click', () => this.close());
        
        // Send button
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        
        // Input field
        this.inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Auto-resize textarea
        this.inputField.addEventListener('input', () => this.autoResizeInput());
        
        // Welcome suggestions
        document.querySelectorAll('.welcome-suggestion').forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.dataset.message;
                this.inputField.value = message;
                this.sendMessage();
            });
        });
        
        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
        
        // Close on outside click (optional)
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.container.contains(e.target) && 
                !this.toggleBtn.contains(e.target)) {
                // Optionally close: this.close();
            }
        });
    }
    
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open() {
        this.isOpen = true;
        this.container.classList.add('active');
        this.toggleBtn.classList.add('active');
        this.hideBadge();
        this.inputField.focus();
        
        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    }
    
    close() {
        this.isOpen = false;
        this.container.classList.remove('active');
        this.toggleBtn.classList.remove('active');
    }
    
    showNotificationBadge() {
        // Show badge after a few seconds if user hasn't interacted
        setTimeout(() => {
            if (!this.hasInteracted && !this.isOpen) {
                this.badge.style.display = 'flex';
            }
        }, 5000);
    }
    
    hideBadge() {
        this.badge.style.display = 'none';
        this.hasInteracted = true;
    }
    
    autoResizeInput() {
        this.inputField.style.height = 'auto';
        this.inputField.style.height = Math.min(this.inputField.scrollHeight, 120) + 'px';
    }
    
    async sendMessage() {
        const message = this.inputField.value.trim();
        
        if (!message || this.isTyping) return;
        
        // Hide welcome screen
        if (this.welcomeScreen) {
            this.welcomeScreen.style.display = 'none';
        }
        
        // Add user message
        this.addMessage(message, 'user');
        
        // Clear input
        this.inputField.value = '';
        this.inputField.style.height = 'auto';
        
        // Show typing indicator
        this.showTyping();
        
        try {
            // Send to API
            const response = await this.fetchBotResponse(message);
            
            // Hide typing
            this.hideTyping();
            
            // Add bot response
            this.addMessage(response.response, 'bot', response.suggestions);
            
        } catch (error) {
            console.error('Chat error:', error);
            this.hideTyping();
            this.addMessage(
                "I'm having a moment! Please try again, or reach out to Vish directly at vishrajasek@gmail.com 😊",
                'bot',
                [],
                true
            );
        }
    }
    
    async fetchBotResponse(message) {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                session_id: this.sessionId
            })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return await response.json();
    }
    
    addMessage(text, type, suggestions = [], isError = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}${isError ? ' error' : ''}`;
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        let avatarContent = '';
        if (type === 'bot') {
            avatarContent = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4"/>
                </svg>
            `;
        } else {
            avatarContent = 'You';
        }
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatarContent}</div>
            <div class="message-content">
                ${this.formatMessage(text)}
                <span class="message-time">${time}</span>
                ${suggestions && suggestions.length > 0 ? this.createSuggestions(suggestions) : ''}
            </div>
        `;
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Bind suggestion clicks
        messageDiv.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                this.inputField.value = chip.textContent;
                this.sendMessage();
            });
        });
    }
    
    formatMessage(text) {
        // Convert markdown-like syntax
        let formatted = text
            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Code
            .replace(/`(.*?)`/g, '<code>$1</code>')
            // Links
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
            // Line breaks
            .replace(/\n/g, '<br>');
        
        return formatted;
    }
    
    createSuggestions(suggestions) {
        if (!suggestions || suggestions.length === 0) return '';
        
        const chips = suggestions
            .slice(0, 3)
            .map(s => `<button class="suggestion-chip">${s}</button>`)
            .join('');
        
        return `<div class="message-suggestions">${chips}</div>`;
    }
    
    showTyping() {
        this.isTyping = true;
        this.sendBtn.disabled = true;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v4M12 19v4"/>
                </svg>
            </div>
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTyping() {
        this.isTyping = false;
        this.sendBtn.disabled = false;
        
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    scrollToBottom() {
        setTimeout(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }, 100);
    }
    
    autoGreet() {
        if (!this.hasInteracted && !this.isOpen) {
            this.open();
        }
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.vishAssistant = new VishAssistant();
});
