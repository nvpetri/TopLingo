// const inputText = document.getElementById('inputText')
const startRecordingButton = document.getElementById('startRecording')
const stopRecordingButton = document.getElementById('stopRecording')
const outputText = document.getElementById('outputText')
const convertToSpeechButton = document.getElementById('convertToSpeech')
const audioPlayer = document.getElementById('audioPlayer')

let mediaRecorder
let chunks = []

// Função para iniciar a gravação
startRecordingButton.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream)

            // Evento chamado quando há dados disponíveis
            mediaRecorder.ondataavailable = event => {
                chunks.push(event.data)
            }

            // Evento chamado quando a gravação é encerrada
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(chunks, { type: 'audio/webm' })
                audioPlayer.src = URL.createObjectURL(audioBlob)
                audioPlayer.controls = true

                // Converter áudio em texto
                const audioContext = new AudioContext()
                const audioSource = audioContext.createMediaElementSource(audioPlayer)
                const speechRecognizer = new webkitSpeechRecognition()
                speechRecognizer.lang = 'pt-BR'
                speechRecognizer.onresult = event => {
                    const transcript = event.results[0][0].transcript
                    inputText.value = transcript
                }
                speechRecognizer.onerror = error => {
                    console.error('Erro ao converter áudio em texto:', error)
                }
                speechRecognizer.start()
            }

            // Inicia a gravação
            mediaRecorder.start()
            startRecordingButton.disabled = true
            stopRecordingButton.disabled = false
        })
        .catch(error => {
            console.error('Erro ao acessar o microfone:', error)
        })
})

// Função para parar a gravação
stopRecordingButton.addEventListener('click', () => {
    mediaRecorder.stop()
    startRecordingButton.disabled = false
    stopRecordingButton.disabled = true
})

// Função para converter texto em áudio
convertToSpeechButton.addEventListener('click', () => {
    const textToSpeech = outputText.value;
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textToSpeech);
    speechSynthesis.speak(utterance);
});