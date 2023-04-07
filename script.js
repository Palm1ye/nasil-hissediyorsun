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

    const emotionItem = document.createElement('li');
    const emotionDetails = document.createElement('p');
    const emotionMeta = document.createElement('div');
    const emotionTime = document.createElement('span');

    emotionDetails.textContent = name + ": " + details;

    if (name) {
        const emotionName = document.createElement('span');
        emotionName.textContent = 'Duygu ' + ': ' + emotion;
        emotionMeta.appendChild(emotionName);
    }



    emotionTime.textContent = new Date().toLocaleString();

    emotionMeta.appendChild(emotionTime);

    emotionItem.appendChild(emotionDetails);
    emotionItem.appendChild(emotionMeta);

    emotionsList.insertBefore(emotionItem, emotionsList.firstChild);

    nameInput.value = '';
    emotionInput.value = '';
    detailsInput.value = '';
});