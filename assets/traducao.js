const inputText = document.getElementById('inputText');
const apiKey = '114c18bf687546238e48ed6bfebb5eef';

document.getElementById('lenguageBase').addEventListener('change', function() {
    var selectedBaseLanguageCode = this.value;
});

document.getElementById('targetLanguageSelect').addEventListener('change', function() {
    var selectedLanguageCode = this.value;

    function translateText() {
        const textToTranslate = inputText.value;
        const targetLanguage = selectedLanguageCode;
        const baseLanguage = document.getElementById('lenguageBase').value;


        const endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${baseLanguage}&to=${targetLanguage}`;

        fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': apiKey,
                    'Ocp-Apim-Subscription-Region': 'brazilsouth'
                },
                body: JSON.stringify([{ 'Text': textToTranslate }])
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao acessar a API da Microsoft Translator Text');
                }
                return response.json();
            })
            .then(data => {
                const translatedText = data[0].translations[0].text;
                document.getElementById('outputText').placeholder = translatedText;
            })
            .catch(error => console.error('Erro ao traduzir:', error));

        if ('caches' in window) {
            caches.keys().then(function(cacheNames) {
                cacheNames.forEach(function(cacheName) {
                    caches.delete(cacheName);
                });
            });
        }
    }

    document.getElementById('inputText').addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            translateText();
        }
    });
});

function fillTargetLanguageSelect(languages) {
    const targetLanguageSelect = document.getElementById('targetLanguageSelect');
    const baseLanguageSelect = document.getElementById('lenguageBase');

    targetLanguageSelect.innerHTML = '';
    baseLanguageSelect.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Selecione o idioma';
    targetLanguageSelect.appendChild(defaultOption);

    for (const languageCode in languages.translation) {
        const languageName = languages.translation[languageCode].name;

        const optionTarget = document.createElement('option');
        optionTarget.value = languageCode;
        optionTarget.textContent = languageName;
        targetLanguageSelect.appendChild(optionTarget);

        const optionBase = document.createElement('option');
        optionBase.value = languageCode;
        optionBase.textContent = languageName;
        baseLanguageSelect.appendChild(optionBase);
    }
}

function getSupportedLanguages() {
    const endpoint = 'https://api.cognitive.microsofttranslator.com/languages?api-version=3.0';

    fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': apiKey,
                'Ocp-Apim-Subscription-Region': 'brazilsouth'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao acessar a API da Microsoft Translator Text');
            }
            return response.json();
        })
        .then(data => {
            const filteredData = {
                translation: data.translation ? data.translation : {}
            };
            fillTargetLanguageSelect(filteredData);
        })
        .catch(error => console.error('Erro ao obter os idiomas suportados:', error));
}

getSupportedLanguages();