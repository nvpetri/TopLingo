const lua = document.getElementById('imagem-botao')
const baixo = document.getElementById('baixo')
const input = document.getElementById('inputText')

function toggleBackground() {
    var body = document.querySelector('body')
    if (body.style.backgroundColor === 'white') {
        body.style.backgroundColor = 'black'
        lua.classList.remove('imagem-botao')
        lua.classList.add('imagem-botao-dark')
        baixo.style.color = 'white'
        input.style.backgroundColor = 'black'
        input.style.color = 'white'
    } else {
        body.style.backgroundColor = 'white'
        lua.classList.remove('imagem-botao-dark')
        lua.classList.add('imagem-botao')
        baixo.style.color = 'black'
        input.style.backgroundColor = 'white'
    }
}