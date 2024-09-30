import './index.css';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const input = document.querySelector('.form-input');
    const chatContainer = document.querySelector('.chat-container');

    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        chatContainer.innerHTML = '';
        messages.forEach(message => {
            displayMessage(message);
        });
    }

    function displayMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `
            <strong>${message.sender}</strong> <small>${message.time}</small>
            <p>${message.text}</p>
        `;
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function saveMessage(message) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
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
    });

    loadMessages();
});

