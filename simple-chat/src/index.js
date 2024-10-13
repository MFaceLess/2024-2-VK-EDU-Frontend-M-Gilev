// import './index.css';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');
    const userInfo = document.querySelector('.user-info h3');

    const userInd = new Map();

    if (user) {
        userInfo.textContent = user;
    }

    const form = document.querySelector('form');
    const input = document.querySelector('.form-input');
    const chatContainer = document.querySelector('.chat-container');
    const sendMessage = document.querySelector('.send-button')

    if (!form || !input || !chatContainer || !sendMessage) return;

    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        chatContainer.innerHTML = '';
        messages.forEach(message => {
            if (message.sender === user || (message.sender === 'You' && message.whom === user)) {
                displayMessage(message);
            }
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
            time: new Date().toLocaleTimeString(),
            lastMessage: messageText,
            whom: user,
        };

        saveMessage(message);
        displayMessage(message);
        input.value = '';

        const chatInfo = {
            lastMessage: messageText,
            time: new Date().toLocaleTimeString(),
            whom: user,
            isReaded: false,
        };

        localStorage.setItem(user, JSON.stringify(chatInfo));

        setTimeout(() => {
            const message = {
                sender: user,
                text: 'I do not understand you(',
                time: new Date().toLocaleTimeString(),
                lastMessage: 'I do not understand you(',
                whom: user,
            };
            saveMessage(message);
            displayMessage(message);

            const chatInfo = {
                lastMessage: 'I do not understand you(',
                time: new Date().toLocaleTimeString(),
                whom: user,
                isReaded: false,
            };
            localStorage.setItem(user, JSON.stringify(chatInfo));
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

    window.addEventListener('storage', function(event) {
        loadMessages();
    });
});

