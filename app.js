'use strict'

function translateText() {
    const textToTranslate = document.getElementById('inputText').value
    const targetLanguage = 'de'
    const apiKey = '114c18bf687546238e48ed6bfebb5eef'

    const endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${targetLanguage}`

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
                throw new Error('Erro ao acessar a API da Microsoft Translator Text')
            }
            return response.json()
        })
        .then(data => {
            const translatedText = data[0].translations[0].text
            document.getElementById('translatedText').innerText = translatedText
        })
        .catch(error => console.error('Erro ao traduzir:', error))
}