/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// import './index.css';\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  var urlParams = new URLSearchParams(window.location.search);\n  var user = urlParams.get('user');\n  var userInfo = document.querySelector('.user-info h3');\n  var userInd = new Map();\n  if (user) {\n    userInfo.textContent = user;\n  }\n  var form = document.querySelector('form');\n  var input = document.querySelector('.form-input');\n  var chatContainer = document.querySelector('.chat-container');\n  var sendMessage = document.querySelector('.send-button');\n  if (!form || !input || !chatContainer || !sendMessage) return;\n  function loadMessages() {\n    var messages = JSON.parse(localStorage.getItem('messages')) || [];\n    chatContainer.innerHTML = '';\n    messages.forEach(function (message) {\n      if (message.sender === user || message.sender === 'You' && message.whom === user) {\n        displayMessage(message);\n      }\n    });\n  }\n  function displayMessage(message) {\n    var messageElement = document.createElement('div');\n    var sender = message.sender === 'You' ? 'you' : 'opponent';\n    messageElement.classList.add('message', sender);\n    messageElement.innerHTML = \"\\n            <strong class=\\\"message-text\\\">\".concat(message.sender, \"</strong> <small class=\\\"message-text\\\">\").concat(message.time, \"</small>\\n            <p class=\\\"message-text\\\">\").concat(message.text, \"</p>\\n        \");\n    chatContainer.appendChild(messageElement);\n    chatContainer.scrollTop = chatContainer.scrollHeight;\n  }\n  function saveMessage(message) {\n    var messages = JSON.parse(localStorage.getItem('messages')) || [];\n    messages.push(message);\n    localStorage.setItem('messages', JSON.stringify(messages));\n  }\n  function sendMessageHandler() {\n    var messageText = input.value.trim();\n    if (!messageText) return;\n    var message = {\n      sender: 'You',\n      text: messageText,\n      time: new Date().toLocaleTimeString(),\n      lastMessage: messageText,\n      whom: user\n    };\n    saveMessage(message);\n    displayMessage(message);\n    input.value = '';\n    var chatInfo = {\n      lastMessage: messageText,\n      time: new Date().toLocaleTimeString(),\n      whom: user,\n      isReaded: false\n    };\n    localStorage.setItem(user, JSON.stringify(chatInfo));\n    setTimeout(function () {\n      var message = {\n        sender: user,\n        text: 'I do not understand you(',\n        time: new Date().toLocaleTimeString(),\n        lastMessage: 'I do not understand you(',\n        whom: user\n      };\n      saveMessage(message);\n      displayMessage(message);\n      var chatInfo = {\n        lastMessage: 'I do not understand you(',\n        time: new Date().toLocaleTimeString(),\n        whom: user,\n        isReaded: false\n      };\n      localStorage.setItem(user, JSON.stringify(chatInfo));\n    }, 1000);\n  }\n  form.addEventListener('submit', function (event) {\n    event.preventDefault();\n    sendMessageHandler();\n  });\n  sendMessage.addEventListener('click', function (event) {\n    sendMessageHandler();\n  });\n  loadMessages();\n  window.addEventListener('storage', function (event) {\n    loadMessages();\n  });\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./messanger.js":
/*!**********************!*\
  !*** ./messanger.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// import './messanger.css';\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  var chooseUserContainer = document.querySelector('.users-container');\n  var startChatButton = document.querySelector('.start-chat-button');\n  var closeButton = document.querySelector('.close-user-selection-button');\n  var chatContainer = document.querySelector('.messages');\n  if (!chooseUserContainer || !startChatButton || !closeButton || !chatContainer) return;\n  startChatButton.addEventListener('click', function () {\n    chooseUserContainer.style.display = 'flex';\n  });\n  closeButton.addEventListener('click', function () {\n    chooseUserContainer.style.display = 'none';\n  });\n  var friends = new Array();\n  friends.push('User1', 'User2', 'User3', 'User4', 'User5');\n  friends.forEach(function (friend) {\n    var obj = JSON.parse(localStorage.getItem(friend));\n    if (obj) {\n      displayMessages(obj);\n    }\n  });\n  function displayMessages(friend) {\n    var randomNumber = Math.floor(Math.random() * 100);\n    var badge = randomNumber === 0 ? '✔️✔️' : randomNumber;\n    var chatElement = document.createElement('div');\n    chatElement.innerHTML = \"\\n        <a href=\\\"index.html?user=\".concat(friend.whom, \"\\\" class=\\\"message-link\\\">\\n            <div class=\\\"user-info\\\">\\n                <svg class=\\\"avatar\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" height=\\\"24px\\\" viewBox=\\\"0 -960 960 960\\\" width=\\\"24px\\\" fill=\\\"#000000\\\"><path d=\\\"M360-390q-21 0-35.5-14.5T310-440q0-21 14.5-35.5T360-490q21 0 35.5 14.5T410-440q0 21-14.5 35.5T360-390Zm240 0q-21 0-35.5-14.5T550-440q0-21 14.5-35.5T600-490q21 0 35.5 14.5T650-440q0 21-14.5 35.5T600-390ZM480-160q134 0 227-93t93-227q0-24-3-46.5T786-570q-21 5-42 7.5t-44 2.5q-91 0-172-39T390-708q-32 78-91.5 135.5T160-486v6q0 134 93 227t227 93Zm0 80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-54-715q42 70 114 112.5T700-640q14 0 27-1.5t27-3.5q-42-70-114-112.5T480-800q-14 0-27 1.5t-27 3.5ZM177-581q51-29 89-75t57-103q-51 29-89 75t-57 103Zm249-214Zm-103 36Z\\\"/></svg>\\n                <div class=\\\"user-details\\\">\\n                    <div class=\\\"top-container\\\">\\n                        <strong class=\\\"user\\\">\").concat(friend.whom, \"</strong> \\n                        <small class=\\\"time-text\\\">\").concat(friend.time, \"</small>\\n                    </div>\\n                    <small class=\\\"message-text\\\">\").concat(friend.lastMessage, \"</small>\\n                </div>\\n            </div>\\n            <div class=\\\"badge\\\">\").concat(badge, \"</div>\\n        </a>\\n        \");\n    chatContainer.appendChild(chatElement);\n    chatContainer.scrollTop = chatContainer.scrollHeight;\n  }\n  function saveMessage(message) {\n    var messages = JSON.parse(localStorage.getItem('messages')) || [];\n    messages.push(message);\n    localStorage.setItem('messages', JSON.stringify(messages));\n  }\n  function updateChat(friend) {\n    var users = document.querySelectorAll('.user');\n    var existingMessage = null;\n    users.forEach(function (user) {\n      if (user.textContent === friend.whom) {\n        existingMessage = user.closest('a');\n      }\n    });\n    if (existingMessage) {\n      existingMessage.remove();\n      // existingMessage.innerHTML = `\n      //     <strong class=\"message-text\">${friend.whom}</strong> <small class=\"message-text\">${friend.time}</small>\n      //     <p class=\"message-text\">${friend.lastMessage}</p>\n      // `;\n    } /*else {*/\n    displayMessages(friend);\n    // }\n  }\n\n  //Проверка обновления чата\n  setTimeout(function () {\n    var chatInfo = {\n      lastMessage: 'Does it work?',\n      time: new Date().toLocaleTimeString(),\n      whom: 'User4',\n      isReaded: false\n    };\n    var message = {\n      sender: 'User4',\n      text: 'Does it work?',\n      time: new Date().toLocaleTimeString(),\n      lastMessage: 'Does it work?',\n      whom: 'You'\n    };\n    saveMessage(message);\n    localStorage.setItem('User4', JSON.stringify(chatInfo));\n    updateChat(chatInfo);\n  }, 3000);\n  window.addEventListener('storage', function (event) {\n    if (friends.includes(event.key)) {\n      var updatedFriend = JSON.parse(localStorage.getItem(event.key));\n      if (updatedFriend) {\n        updateChat(updatedFriend);\n      }\n    }\n  });\n});\n\n//# sourceURL=webpack:///./messanger.js?");

/***/ }),

/***/ 0:
/*!***************************************!*\
  !*** multi ./messanger.js ./index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./messanger.js */\"./messanger.js\");\nmodule.exports = __webpack_require__(/*! ./index.js */\"./index.js\");\n\n\n//# sourceURL=webpack:///multi_./messanger.js_./index.js?");

/***/ })

/******/ });