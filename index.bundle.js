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

/***/ "./index.css":
/*!*******************!*\
  !*** ./index.css ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./index.css?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  var urlParams = new URLSearchParams(window.location.search);\n  var user = urlParams.get('user');\n  var userInfo = document.querySelector('.user-info h3');\n  var userInd = new Map();\n  if (user) {\n    userInfo.textContent = user;\n  }\n  var form = document.querySelector('form');\n  var input = document.querySelector('.form-input');\n  var chatContainer = document.querySelector('.chat-container');\n  var sendMessage = document.querySelector('.send-button');\n  if (!form || !input || !chatContainer || !sendMessage) return;\n  function loadMessages() {\n    var messages = JSON.parse(localStorage.getItem('messages')) || [];\n    chatContainer.innerHTML = '';\n    messages.forEach(function (message) {\n      if (message.sender === user || message.sender === 'You' && message.whom === user) {\n        displayMessage(message);\n      }\n    });\n  }\n  function displayMessage(message) {\n    var messageElement = document.createElement('div');\n    var sender = message.sender === 'You' ? 'you' : 'opponent';\n    messageElement.classList.add('message', sender);\n    messageElement.innerHTML = \"\\n            <strong class=\\\"message-text\\\">\".concat(message.sender, \"</strong> <small class=\\\"message-text\\\">\").concat(message.time, \"</small>\\n            <p class=\\\"message-text\\\">\").concat(message.text, \"</p>\\n        \");\n    chatContainer.appendChild(messageElement);\n    chatContainer.scrollTop = chatContainer.scrollHeight;\n  }\n  function saveMessage(message) {\n    var messages = JSON.parse(localStorage.getItem('messages')) || [];\n    messages.push(message);\n    localStorage.setItem('messages', JSON.stringify(messages));\n  }\n  function sendMessageHandler() {\n    var messageText = input.value.trim();\n    if (!messageText) return;\n    var message = {\n      sender: 'You',\n      text: messageText,\n      time: new Date().toLocaleTimeString(),\n      lastMessage: messageText,\n      whom: user\n    };\n    saveMessage(message);\n    displayMessage(message);\n    input.value = '';\n    var chatInfo = {\n      lastMessage: messageText,\n      time: new Date().toLocaleTimeString(),\n      whom: user,\n      isReaded: false\n    };\n    localStorage.setItem(user, JSON.stringify(chatInfo));\n    setTimeout(function () {\n      var message = {\n        sender: user,\n        text: 'I do not understand you(',\n        time: new Date().toLocaleTimeString(),\n        lastMessage: 'I do not understand you(',\n        whom: user\n      };\n      saveMessage(message);\n      displayMessage(message);\n      var chatInfo = {\n        lastMessage: 'I do not understand you(',\n        time: new Date().toLocaleTimeString(),\n        whom: user,\n        isReaded: false\n      };\n      localStorage.setItem(user, JSON.stringify(chatInfo));\n    }, 1000);\n  }\n  form.addEventListener('submit', function (event) {\n    event.preventDefault();\n    sendMessageHandler();\n  });\n  sendMessage.addEventListener('click', function (event) {\n    sendMessageHandler();\n  });\n  loadMessages();\n  window.addEventListener('storage', function (event) {\n    loadMessages();\n  });\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./messanger.css":
/*!***********************!*\
  !*** ./messanger.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./messanger.css?");

/***/ }),

/***/ "./messanger.js":
/*!**********************!*\
  !*** ./messanger.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _messanger_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messanger.css */ \"./messanger.css\");\n/* harmony import */ var _messanger_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_messanger_css__WEBPACK_IMPORTED_MODULE_0__);\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  var chooseUserContainer = document.querySelector('.users-container');\n  var startChatButton = document.querySelector('.start-chat-button');\n  var closeButton = document.querySelector('.close-user-selection-button');\n  var chatContainer = document.querySelector('.messages');\n  if (!chooseUserContainer || !startChatButton || !closeButton || !chatContainer) return;\n  startChatButton.addEventListener('click', function () {\n    chooseUserContainer.style.display = 'flex';\n  });\n  closeButton.addEventListener('click', function () {\n    chooseUserContainer.style.display = 'none';\n  });\n  var friends = new Array();\n  friends.push('User1', 'User2', 'User3', 'User4', 'User5');\n  friends.forEach(function (friend) {\n    var obj = JSON.parse(localStorage.getItem(friend));\n    if (obj) {\n      displayMessages(obj);\n    }\n  });\n  function displayMessages(friend) {\n    var chatElement = document.createElement('div');\n    chatElement.innerHTML = \"\\n        <a href=\\\"index.html?user=\".concat(friend.whom, \"\\\" class=\\\"message-link\\\">\\n            <strong class=\\\"user\\\">\").concat(friend.whom, \"</strong> <small class=\\\"message-text\\\">\").concat(friend.time, \"</small>\\n            <p class=\\\"message-text\\\">\").concat(friend.lastMessage, \"</p>\\n        </a>\\n        \");\n    chatContainer.appendChild(chatElement);\n    chatContainer.scrollTop = chatContainer.scrollHeight;\n  }\n  function saveMessage(message) {\n    var messages = JSON.parse(localStorage.getItem('messages')) || [];\n    messages.push(message);\n    localStorage.setItem('messages', JSON.stringify(messages));\n  }\n  function updateChat(friend) {\n    var users = document.querySelectorAll('.user');\n    var existingMessage = null;\n    users.forEach(function (user) {\n      if (user.textContent === friend.whom) {\n        existingMessage = user.closest('a');\n      }\n    });\n    if (existingMessage) {\n      existingMessage.innerHTML = \"\\n                <strong class=\\\"message-text\\\">\".concat(friend.whom, \"</strong> <small class=\\\"message-text\\\">\").concat(friend.time, \"</small>\\n                <p class=\\\"message-text\\\">\").concat(friend.lastMessage, \"</p>\\n            \");\n    } else {\n      displayMessages(friend);\n    }\n  }\n\n  //Проверка обновления чата\n  setTimeout(function () {\n    var chatInfo = {\n      lastMessage: 'Does it work?',\n      time: new Date().toLocaleTimeString(),\n      whom: 'User4',\n      isReaded: false\n    };\n    var message = {\n      sender: 'User4',\n      text: 'Does it work?',\n      time: new Date().toLocaleTimeString(),\n      lastMessage: 'Does it work?',\n      whom: 'You'\n    };\n    saveMessage(message);\n    localStorage.setItem('User4', JSON.stringify(chatInfo));\n    updateChat(chatInfo);\n  }, 3000);\n  window.addEventListener('storage', function (event) {\n    if (friends.includes(event.key)) {\n      var updatedFriend = JSON.parse(localStorage.getItem(event.key));\n      if (updatedFriend) {\n        updateChat(updatedFriend);\n      }\n    }\n  });\n});\n\n//# sourceURL=webpack:///./messanger.js?");

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