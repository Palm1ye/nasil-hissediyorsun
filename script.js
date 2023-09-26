const form = document.querySelector('form');
const emotionsList = document.querySelector('#emotions');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.elements['name'];
    const emotionInput = form.elements['emotion'];
    const detailsInput = form.elements['details'];

    const name = nameInput.value.trim();
    const emotion = emotionInput.value.trim();
    const details = detailsInput.value.trim();

    if (!emotion || !details) {
        return;
    }

    const data = {
        name: name,
        emotion: emotion,
        details: details,
        timestamp: new Date().getTime()
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/emotions', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const emotionItem = document.createElement('li');
            const emotionDetails = document.createElement('p');
            const emotionMeta = document.createElement('div');
            const emotionTime = document.createElement('span');

            emotionDetails.textContent = data.name + ': ' + data.details;

            if (data.name) {
                const emotionName = document.createElement('span');
                emotionName.textContent = 'Duygu ' + ': ' + data.emotion;
                emotionMeta.appendChild(emotionName);
            }

            emotionTime.textContent = new Date(data.timestamp).toLocaleString();
            emotionMeta.appendChild(emotionTime);
            emotionItem.appendChild(emotionDetails);
            emotionItem.appendChild(emotionMeta);
            emotionsList.insertBefore(emotionItem, emotionsList.firstChild);
            nameInput.value = '';
            emotionInput.value = '';
            detailsInput.value = '';
        }
    };
    xhr.send(JSON.stringify(data));
});

window.onload = async () => {
    const data = await fetch("/emotions").then(res => res.json());
    for (const item of data) {
        const emotionItem = document.createElement('li');
        const emotionDetails = document.createElement('p');
        const emotionMeta = document.createElement('div');
        const emotionTime = document.createElement('span');

        emotionDetails.textContent = item.name + ': ' + item.details;

        if (item.name) {
            const emotionName = document.createElement('span');
            emotionName.textContent = 'Duygu ' + ': ' + item.emotion;
            emotionMeta.appendChild(emotionName);
        }

        emotionTime.textContent = new Date(item.timestamp).toLocaleString();
        emotionMeta.appendChild(emotionTime);
        emotionItem.appendChild(emotionDetails);
        emotionItem.appendChild(emotionMeta);
        emotionsList.insertBefore(emotionItem, emotionsList.firstChild);
    }
}    
