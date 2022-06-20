const inputTarefa = document.querySelector('.inputCriarTarefa')
const btnTarefa = document.querySelector('.btnCriarTarefa')
const tarefas = document.querySelector('.listagemTarefas')

salvarTarefas = () => {
    const liTarefas = tarefas.querySelectorAll('li')
    listaDeTarefas = []

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listaDeTarefas.push(tarefaTexto)
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefasJSON )
}



criarLi = (textoInput) => {
    const li = document.createElement('li')
    const botao = criarTarefaBtnSelecionar()
    const span = criarSpan()
    const apagar = criarBotaoApagar()


    span.innerText = textoInput;

    tarefas.appendChild(li)
    li.appendChild(botao)
    li.appendChild(span)
    li.appendChild(apagar)

    botao.addEventListener('click', function () {

        if (span.classList.contains('descricaoTarefa-clicado')) {
            botao.classList.remove('btn-select')
            span.classList.remove('descricaoTarefa-clicado')
        } else {
            botao.classList.add('btn-select')
            span.classList.add('descricaoTarefa-clicado')
        }

    })


    limpaInput()
    salvarTarefas()

    return li
}

criarSpan = () => {
    const span = document.createElement('span')
    span.classList.add('descricaoTarefa')
    return span
}

criarBotaoApagar = () => {

    const botaoApagar = document.createElement('button')
    botaoApagar.classList.add('tarefaApagar')
    botaoApagar.innerText = 'Apagar';
    return botaoApagar
}

criarTarefaBtnSelecionar = () => {

    const botaoSelecionar = document.createElement('button')
    botaoSelecionar.classList.add('tarefacheckbox')

    return botaoSelecionar
}


limpaInput = () => {
    inputTarefa.value = '';
    inputTarefa.focus()
}


btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return;
    criarLi(inputTarefa.value)
})


document.addEventListener('click', function (e) {
    const el = e.target

    if (el.classList.contains('tarefaApagar')) {
        el.parentElement.remove()
        salvarTarefas()
    }
})

inputTarefa.addEventListener('keypress', function (e) {


    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criarLi(inputTarefa.value)
    }
})

adicionaTarefasSalvas = () => {
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)

    for (let tarefa of listaDeTarefas) {
        criarLi(tarefa)
    }
}

adicionaTarefasSalvas()