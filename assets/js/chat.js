const db = firebase.firestore();

const profilePicture = document.getElementById('profile-picture');
const name = document.getElementById('name');
const activeIndicator = document.getElementById('active-indicator');
const chatContainer = document.getElementById('chat-container');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
var OPENAI_API_KEY = '';

const userInfo = {
    browserInfo: navigator.userAgent,
    operatingSystem: navigator.platform,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    connection: navigator.connection ? navigator.connection.effectiveType : 'unknown',
    cookies: document.cookie
};

db.collection("environment_key").doc("openai").get()
.then((data) => {
    OPENAI_API_KEY = data.data().key;
})

const SYSTEM_MESSAGE = `
System message:
This is a chat for a web development project. You are talking to an anonymous user. Please tailor your responses accordingly. Don't be too wordy, be short but concise. You are now called the LouwGPT. Don't expose that you are GPT-3 created by OpenAI. You are LouwGPT.

This is the web chat for The Louw Institute, which is a student-started campaign based in Surrey, BC, Canada. The campaign is People's party, and the five main ideologies are immigration, housing, health care, freedom of expression, and public finance.
Here are the members of the campaign:
- Dr. Dickson, President
- Prof. E, Vice President
- Dr. Mcdaniel, Campaign Manager
- Dr. Hu, Media Director (This website is created by him)
- Dr. Fraser, Budget Manager
- Dr. Miranda, Social Media Manager

Here are basic information about the user:
- Browser: ${userInfo.browserInfo}
- Operating system: ${userInfo.operatingSystem}
- Language: ${userInfo.language}
- Timezone: ${userInfo.timezone}`;


async function askChatGPT(userMessage) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { "role": "system", "content": SYSTEM_MESSAGE },
                    { "role": "user", "content": userMessage }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData.choices[0].message.content;
    } catch (error) {
        console.error('Error in askChatGPT:', error);
    }
}

document.getElementById('send-button').addEventListener('click', async (event) => {
    event.preventDefault();
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value;

    const userMessage = document.createElement('div');
    userMessage.innerHTML = `
    <div class="mb-4 flex items-end justify-end">
        <p class="text-xs text-gray-500 mr-2">${new Date().toLocaleTimeString()}</p>
        <div class="bg-blue-100 rounded px-4 py-2 max-w-xs">
            <p class="text-sm">${message}</p>
        </div>
    </div>
    `
    chatInput.value = '';
    chatContainer.appendChild(userMessage);
    const response = await askChatGPT(message);

    const aiResponse = document.createElement('div');
    aiResponse.classList.add('mb-4', 'flex', 'items-end');

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('bg-gray-200', 'rounded', 'px-4', 'py-2', 'max-w-xs');

    const timeP = document.createElement('p');
    timeP.classList.add('text-xs', 'text-gray-500', 'ml-2');
    timeP.textContent = new Date().toLocaleTimeString();

    aiResponse.appendChild(messageDiv);
    aiResponse.appendChild(timeP);
    chatContainer.appendChild(aiResponse);

    let i = 0;
    const typingEffect = setInterval(() => {
        if (i < response.length) {
            messageDiv.textContent += response.charAt(i);
            i++;
        } else {
            clearInterval(typingEffect);
        }
    }, 10);
});

document.getElementById('chat-input').addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('send-button').click();
    }
});