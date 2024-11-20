export const secureApiKey = '9223ce87db2f21d05313414367963972f2b835fa';

export function getCurrentTime() {
    return new Date().toLocaleTimeString();
}

export async function fetchImages(query) {
    const response = await fetch('https://api.example.com/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${secureApiKey}`
        },
        body: JSON.stringify({ query })
    });

    const data = await response.json();
    return data.images[0].url;
}
