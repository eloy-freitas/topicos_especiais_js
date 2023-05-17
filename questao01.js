function calcularTabela(){
    const valor1 = window.prompt("insira o valor 1")
    const valor2 = window.prompt("insira o valor 2")
    var operacao

    const tabela = document.createElement("table")
    const cabecalho = document.createElement("thead")
    const corpoTabela = document.createElement("tbody")
    const operacoes = ["+", "*", "/", "%"]

    cabecalho.insertRow()
    //define o cabeçalho
    const linhaCabecalho = cabecalho.getElementsByTagName("tr")

    Array.from(linhaCabecalho).forEach(linha => {
        linha.insertCell(0).innerHTML = "Operações"
        linha.insertCell(1).innerHTML = "Valor"
    })

    //define o corpo
    Array.from(operacoes).forEach(sinal => {
        linha = corpoTabela.insertRow()
        operacao = `${valor1} ${sinal} ${valor2}`
        linha.insertCell(0).innerHTML = operacao
        linha.insertCell(1).innerHTML = eval(operacao)
        corpoTabela.appendChild(linha)
    })

    //adiciona os elementos na tabela
    tabela.appendChild(cabecalho)
    tabela.appendChild(corpoTabela)
    document.body.appendChild(tabela)

}

function decorarTabela(){
    //busca todos elementos da tabela e adiciona borda
    var elementosTabela = document.querySelectorAll('table, tr, th, td')
    console.log(elementosTabela)
    elementosTabela.forEach(elemento =>{
        elemento.style.border = "1px solid black"
    })
}

function gerarTabela(){
    calcularTabela()
    decorarTabela()
}