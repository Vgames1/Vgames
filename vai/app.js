import { getCurrentTime, fetchImages, secureApiKey } from './hidden/config.js';

document.addEventListener('DOMContentLoaded', () => {
    // Random Theme
    const themes = ['theme1', 'theme2', 'theme3'];
    const selectedTheme = themes[Math.floor(Math.random() * themes.length)];
    document.documentElement.classList.add(selectedTheme);

    // Load Device-Specific Template
    const device = getDeviceType();
    fetch(`./templates/${device}.html`)
        .then((response) => response.text())
        .then((html) => document.body.innerHTML = html)
        .then(() => initializeChat());
});

function getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width >= 768 && width < 1200) return 'pc';
    return 'tv';
}

function initializeChat() {
    const chatArea = document.getElementById('chat-area');
    const queryInput = document.getElementById('query');
    const sendButton = document.getElementById('send-btn');

    sendButton.addEventListener('click', () => handleUserInput(queryInput.value.trim(), chatArea));
    queryInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendButton.click();
    });
}

async function handleUserInput(query, chatArea) {
    if (!query) return alert('Please enter a question.');

    displayMessage(query, chatArea, 'user');

    if (query.toLowerCase().includes('time')) {
        displayMessage(`The current time is ${getCurrentTime()}.`, chatArea, 'ai');
        return;
    }

    displayMessage('Fetching image...', chatArea, 'ai');
    try {
        const imageUrl = await fetchImages(query);
        displayMessage(`<img src="${imageUrl}" alt="Result Image" />`, chatArea, 'ai');
    } catch {
        displayMessage('Sorry, no image found.', chatArea, 'ai');
    }
}

function displayMessage(message, chatArea, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender === 'user' ? 'user-message' : 'ai-response'}`;
    bubble.innerHTML = message;
    chatArea.appendChild(bubble);
    chatArea.scrollTop = chatArea.scrollHeight;
}
