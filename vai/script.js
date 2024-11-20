import { API_KEY } from './config.js';

const chatArea = document.getElementById('chat-area');
const sendBtn = document.getElementById('send-btn');
const queryInput = document.getElementById('query');
const themeToggle = document.getElementById('theme-toggle');

let themeIndex = 0;
const themes = ['default', 'theme-light', 'theme-colorful'];

function loadChatHistory() {
    const history = JSON.parse(localStorage.getItem('chatHistory')) || [];
    history.forEach(({ message, sender }) => displayMessage(message, sender === 'user'));
}

function saveChatHistory(message, sender) {
    const history = JSON.parse(localStorage.getItem('chatHistory')) || [];
    history.push({ message, sender });
    localStorage.setItem('chatHistory', JSON.stringify(history));
}

function displayMessage(message, isUser = true) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${isUser ? 'user-message' : 'ai-response'}`;
    bubble.innerHTML = message;
    chatArea.appendChild(bubble);
    chatArea.scrollTop = chatArea.scrollHeight;
    saveChatHistory(message, isUser ? 'user' : 'ai');
}

async function handleUserInput(query) {
    displayMessage(query, true);
    queryInput.value = '';

    if (query.toLowerCase() === 'time') {
        displayMessage(`The current time is: ${new Date().toLocaleTimeString()}`, false);
        return;
    }

    displayMessage('Thinking...', false);

    try {
        const response = await fetch('https://google.serper.dev/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY
            },
            body: JSON.stringify({ q: query })
        });
        const data = await response.json();
        const firstResult = data.organic[0];
        const responseHtml = `
            <p>${firstResult.snippet}</p>
            <a href="${firstResult.link}" target="_blank">More info: ${firstResult.title}</a>
        `;
        displayMessage(responseHtml, false);
    } catch (error) {
        displayMessage('Sorry, I could not fetch the data. Please try again later.', false);
    }
}

sendBtn.addEventListener('click', () => {
    const query = queryInput.value.trim();
    if (query) handleUserInput(query);
});

queryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});

themeToggle.addEventListener('click', () => {
    document.body.className = themes[themeIndex];
    themeIndex = (themeIndex + 1) % themes.length;
});

window.onload = loadChatHistory;
