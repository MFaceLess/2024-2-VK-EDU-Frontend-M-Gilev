// import './messanger.css';

document.addEventListener('DOMContentLoaded', function() {
    const chooseUserContainer = document.querySelector('.users-container');
    const startChatButton = document.querySelector('.start-chat-button');
    const closeButton = document.querySelector('.close-user-selection-button');
    const chatContainer = document.querySelector('.messages');
    
    if (!chooseUserContainer || !startChatButton || !closeButton || !chatContainer) return;

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
        const randomNumber = Math.floor(Math.random() * 100);
        const badge = randomNumber === 0 ? '✔️✔️' : randomNumber;

        const chatElement = document.createElement('div');

        chatElement.innerHTML = `
        <a href="index.html?user=${friend.whom}" class="message-link">
            <div class="user-info">
                <svg class="avatar" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M360-390q-21 0-35.5-14.5T310-440q0-21 14.5-35.5T360-490q21 0 35.5 14.5T410-440q0 21-14.5 35.5T360-390Zm240 0q-21 0-35.5-14.5T550-440q0-21 14.5-35.5T600-490q21 0 35.5 14.5T650-440q0 21-14.5 35.5T600-390ZM480-160q134 0 227-93t93-227q0-24-3-46.5T786-570q-21 5-42 7.5t-44 2.5q-91 0-172-39T390-708q-32 78-91.5 135.5T160-486v6q0 134 93 227t227 93Zm0 80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-54-715q42 70 114 112.5T700-640q14 0 27-1.5t27-3.5q-42-70-114-112.5T480-800q-14 0-27 1.5t-27 3.5ZM177-581q51-29 89-75t57-103q-51 29-89 75t-57 103Zm249-214Zm-103 36Z"/></svg>
                <div class="user-details">
                    <div class="top-container">
                        <strong class="user">${friend.whom}</strong> 
                        <small class="time-text">${friend.time}</small>
                    </div>
                    <small class="message-text">${friend.lastMessage}</small>
                </div>
            </div>
            <div class="badge">${badge}</div>
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
            existingMessage.remove();
            // existingMessage.innerHTML = `
            //     <strong class="message-text">${friend.whom}</strong> <small class="message-text">${friend.time}</small>
            //     <p class="message-text">${friend.lastMessage}</p>
            // `;
        } /*else {*/
        displayMessages(friend);
        // }
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
