import './messanger.css';

document.addEventListener('DOMContentLoaded', function() {
    const chooseUserContainer = document.querySelector('.users-container');
    const startChatButton = document.querySelector('.start-chat-button');
    const closeButton = document.querySelector('.close-user-selection-button');
    const chatContainer = document.querySelector('.messages');
    
    startChatButton.addEventListener('click', function() {
        chooseUserContainer.style.display = 'flex';
    });

    closeButton.addEventListener('click', function() {
        chooseUserContainer.style.display = 'none';
    });

    const friends = new Array();
    friends.push('User1', 'User2', 'User3', 'User4', 'User5');

    friends.forEach(friend => {
        const obj = JSON.parse(localStorage.getItem(friend));
        if (obj) {
            displayMessages(obj)
        }
    });

    function displayMessages(friend) {
        const chatElement = document.createElement('div');
        chatElement.innerHTML = `
        <a href="index.html?user=${friend.whom}" class="message-link">
            <strong class="user">${friend.whom}</strong> <small class="message-text">${friend.time}</small>
            <p class="message-text">${friend.lastMessage}</p>
        </a>
        `;
        chatContainer.appendChild(chatElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function saveMessage(message) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    function updateChat(friend) {
        const users = document.querySelectorAll('.user');

        let existingMessage = null;
        users.forEach(user => {
            if (user.textContent === friend.whom) {
                existingMessage = user.closest('a');
            }
        });
    
        if (existingMessage) {
            existingMessage.innerHTML = `
                <strong class="message-text">${friend.whom}</strong> <small class="message-text">${friend.time}</small>
                <p class="message-text">${friend.lastMessage}</p>
            `;
        } else {
            displayMessages(friend);
        }
    }

    //Проверка обновления чата
    setTimeout(() => {
        const chatInfo = {
            lastMessage: 'Does it work?',
            time: new Date().toLocaleTimeString(),
            whom: 'User4',
            isReaded: false,
        };
        const message = {
            sender: 'User4',
            text: 'Does it work?',
            time: new Date().toLocaleTimeString(),
            lastMessage: 'Does it work?',
            whom: 'You',
        };
        saveMessage(message);
        localStorage.setItem('User4', JSON.stringify(chatInfo));
        updateChat(chatInfo);
    }, 3000);

    window.addEventListener('storage', function(event) {
        if (friends.includes(event.key)) {
            const updatedFriend = JSON.parse(localStorage.getItem(event.key));
            if (updatedFriend) {
                updateChat(updatedFriend);
            }
        }
    });
});
