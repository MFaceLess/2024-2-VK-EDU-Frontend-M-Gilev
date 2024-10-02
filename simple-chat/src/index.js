import './index.css';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const input = document.querySelector('.form-input');
    const chatContainer = document.querySelector('.chat-container');
    const sendMessage = document.querySelector('.send-button')

    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        chatContainer.innerHTML = '';
        messages.forEach(message => {
            displayMessage(message);
        });
    }

    function displayMessage(message) {
        const messageElement = document.createElement('div');
        const sender = message.sender === 'You'? 'you' : 'opponent';
        messageElement.classList.add('message', sender);
        messageElement.innerHTML = `
            <strong class="message-text">${message.sender}</strong> <small class="message-text">${message.time}</small>
            <p class="message-text">${message.text}</p>
        `;
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function saveMessage(message) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    function sendMessageHandler() {
        const messageText = input.value.trim();
        if (!messageText) return;
        const message = {
            sender: 'You',
            text: messageText,
            time: new Date().toLocaleString(),
        };
        saveMessage(message);
        displayMessage(message);
        input.value = '';

        setTimeout(() => {
            const message = {
                sender: 'User',
                text: 'I do not understand you(',
                time: new Date().toLocaleString(),
            };
            saveMessage(message);
            displayMessage(message);
        }, 1000);
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        sendMessageHandler();
    });

    sendMessage.addEventListener('click', (event) => {
        sendMessageHandler();
    });

    loadMessages();
});

