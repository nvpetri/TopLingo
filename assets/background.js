const lua = document.getElementById('imagem-botao')
const baixo = document.getElementById('baixo')
var body = document.querySelector('body')
body.style.backgroundColor = 'white'

function toggleBackground() {

    if (body.style.backgroundColor === 'white') {
        body.style.backgroundColor = 'black'
        lua.classList.remove('imagem-botao')
        lua.classList.add('imagem-botao-dark')
        baixo.style.color = 'white'
        input.style.backgroundColor = '#5B0B9B'
        input.style.color = 'white'
        input.style.borderColor = 'white'
    } else {
        body.style.backgroundColor = 'white'
        lua.classList.remove('imagem-botao-dark')
        lua.classList.add('imagem-botao')
        baixo.style.color = 'black'
        input.style.backgroundColor = 'white'
        input.style.color = 'black'
    }
}

const input = document.getElementById('inputText')

input.addEventListener('input', function() {

    let nome = input.value.toLowerCase()

    if (nome == 'leonardo') {
        toggleBackground()
    } else if (nome == 'nicolas') {
        toggleBackground()
    } else if (nome == 'vitor') {
        alert('500 conto pra tocar o background')
    }
})