const inputText = document.getElementById('inputText')
const apiKey = '114c18bf687546238e48ed6bfebb5eef'
const voiceInputButton = document.getElementById('voiceInputButton')

document.getElementById('lenguageBase').addEventListener('change', function() {
    var selectedBaseLanguageCode = this.value
})

document.getElementById('targetLanguageSelect').addEventListener('change', function() {
    var selectedLanguageCode = this.value

    function translateText() {
        const textToTranslate = inputText.value
        const targetLanguage = selectedLanguageCode
        const baseLanguage = document.getElementById('lenguageBase').value

        const endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${baseLanguage}&to=${targetLanguage}`

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
                document.getElementById('outputText').placeholder = translatedText

                const speechSynthesis = window.speechSynthesis
                const utterance = new SpeechSynthesisUtterance(translatedText)
                utterance.lang = targetLanguage
                speechSynthesis.speak(utterance)
            })
            .catch(error => console.error('Erro ao traduzir:', error))

        if ('caches' in window) {
            caches.keys().then(function(cacheNames) {
                cacheNames.forEach(function(cacheName) {
                    caches.delete(cacheName)
                })
            })
        }
    }

    document.getElementById('inputText').addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            translateText()
        }
    })
})

function fillTargetLanguageSelect(languages) {
    const targetLanguageSelect = document.getElementById('targetLanguageSelect')
    const baseLanguageSelect = document.getElementById('lenguageBase')

    targetLanguageSelect.innerHTML = ''
    baseLanguageSelect.innerHTML = ''

    const defaultOption = document.createElement('option')
    defaultOption.value = ''
    defaultOption.textContent = 'Selecione o idioma'
    targetLanguageSelect.appendChild(defaultOption)

    for (const languageCode in languages.translation) {
        const languageName = languages.translation[languageCode].name

        const optionTarget = document.createElement('option')
        optionTarget.value = languageCode
        optionTarget.textContent = languageName
        targetLanguageSelect.appendChild(optionTarget)

        const optionBase = document.createElement('option')
        optionBase.value = languageCode
        optionBase.textContent = languageName
        baseLanguageSelect.appendChild(optionBase)
    }
}

function getSupportedLanguages() {
    const endpoint = 'https://api.cognitive.microsofttranslator.com/languages?api-version=3.0'

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
                throw new Error('Erro ao acessar a API da Microsoft Translator Text')
            }
            return response.json()
        })
        .then(data => {
            const filteredData = {
                translation: data.translation ? data.translation : {}
            }
            fillTargetLanguageSelect(filteredData)
        })
        .catch(error => console.error('Erro ao obter os idiomas suportados:', error))
}

function startSpeechRecognition() {
    const recognition = new webkitSpeechRecognition() || SpeechRecognition()
    recognition.lang = document.getElementById('lenguageBase').value || 'en-US'
    recognition.start()

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript
        inputText.value = transcript
    }

    recognition.onerror = function(event) {
        console.error('Erro ao reconhecer a voz:', event.error)
    }
}

document.getElementById('playButton').addEventListener('click', function() {
    const translatedText = document.getElementById('outputText').placeholder
    const targetLanguage = document.getElementById('targetLanguageSelect').value

    const speechSynthesis = window.speechSynthesis
    const utterance = new SpeechSynthesisUtterance(translatedText)
    utterance.lang = targetLanguage
    speechSynthesis.speak(utterance)
})

document.addEventListener('DOMContentLoaded', function() {

    const recognition = new webkitSpeechRecognition() || SpeechRecognition()

    recognition.continuous = true

    recognition.onstart = function() {

    }

    recognition.onresult = function(event) {
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript.trim()
            console.log('Texto reconhecido:', transcript)

            if (transcript.toLowerCase() === 'natália') {
                inputText.value = transcript
                recognition.stop()
                startTranslation()
                break
            }
        }
    };

    recognition.onerror = function(event) {
        console.error('Erro ao reconhecer a voz:', event.error)
    }

    console.log('Solicitando permissão para acessar o microfone...')
    recognition.start()
})

voiceInputButton.addEventListener('click', startSpeechRecognition)

getSupportedLanguages()