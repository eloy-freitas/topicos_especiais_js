function iniciarLista(){
    document.livros = [];
    
}

class Livro{
    constructor(
        nu_ordem,
        no_titulo,
        no_editora,
        vl_locacao,
        no_tipo,
        vl_quantidade
    ){
        this._nu_ordem = nu_ordem;
        this._no_titulo = no_titulo;
        this._no_editora = no_editora;
        this._vl_locacao = vl_locacao;
        this._no_tipo = no_tipo;
        this._vl_quantidade = vl_quantidade;
    }

    calculaValorTotal() {
        return parseFloat(vl_locacao) * parseInt(vl_quantidade);
    }

    exibir(){
        window.alert(
            `
            título: ${this._no_titulo}\n
            numero de ordem: ${this._nu_ordem}\n
            editora: ${this._no_editora}\n
            valor da locação: ${this.vl_locacao}\n
            tipo: ${this._no_tipo}\n
            quantidade: ${this._vl_quantidade}\n
            `
        )
    }

    darBaixa(valor){
        if(valor <= this._vl_quantidade){
            this._vl_quantidade -= valor;
            return true;
        }else 
            return false;
    }
}


function limparFormulario(){
    document.getElementById("txtTitulo").value = "";
    document.getElementById("txtOrdem").value = "";
    document.getElementById("txtEditora").value = "";
    document.getElementById("txtLocacao").value = "";
    document.getElementById("txtTipo").value = "";
    document.getElementById("txtQuantidade").value = "";

}

function lerCampos(){
    const no_titulo = document.getElementById("txtTitulo").value;
    const nu_ordem = document.getElementById("txtOrdem").value;
    const no_editora = document.getElementById("txtEditora").value;
    const vl_locacao = document.getElementById("txtLocacao").value;
    const no_tipo = document.getElementById("txtTipo").value;
    const vl_quantidade = document.getElementById("txtQuantidade").value;
    let fl_cadastra = true;
    
    if(no_titulo == null || no_titulo == ''){
        window.alert("titulo não pode ser nulo")
        fl_cadastra = false;
    }
    if(nu_ordem == null || nu_ordem == ''){
        window.alert("ordem não pode ser nulo")
        fl_cadastra = false;
    }
    if(no_editora == null || no_editora == ''){
        window.alert("editora não pode ser nulo")
        fl_cadastra = false;
    }
    if(vl_locacao == null || vl_locacao == ''){
        window.alert("valor dalocação não pode ser nulo")
        fl_cadastra = false;
    }
    if(no_tipo == null || no_tipo == ''){
        window.alert("no_tipo não pode ser nulo")
        fl_cadastra = false;
    }
    if(vl_quantidade == null || vl_quantidade == ''){
        window.alert("no_tipo não pode ser nulo")
        fl_cadastra = false;
    }
        
    if(fl_cadastra){
        return new Livro(
            nu_ordem, 
            no_titulo, 
            no_editora, 
            vl_locacao, 
            no_tipo, 
            vl_quantidade
        )
    }
}

function cadastrarLivro(){
    if(document.livros.length < 3){
        let livro = lerCampos();
        try{
            limparTabela()
            document.livros.push(livro);
            desenharTabela();
            limparFormulario();
        }catch(e){}
    }else{
        window.alert("Só se pode cadastrar 3 livros")
    }
    
}

function exibirLivro(){
    id = document.getElementById(this.id).id;
    livro = document.livros[id];

    livro.exibir();
}

function desenharTabela(){
    
    const tabela = document.getElementById("tabela");
    
    var botao;
    //define o corpo
    Array.from(document.livros).forEach((livro, id) => {
        linha = tabela.insertRow()
        linha.insertCell(0).innerHTML = livro._no_titulo
        linha.insertCell(1).innerHTML = livro._nu_ordem
        linha.insertCell(2).innerHTML = livro._no_editora
        linha.insertCell(3).innerHTML = livro._vl_locacao
        linha.insertCell(4).innerHTML = livro._no_tipo
        linha.insertCell(5).innerHTML = livro._vl_quantidade
        linha.insertCell(6).innerHTML = parseFloat(livro._vl_quantidade) * parseFloat(livro._vl_locacao)

        botao = document.createElement('button')
        botao.id = id
        botao.textContent = "Visualizar"
        botao.onclick = exibirLivro
        
        linha.insertCell(7).appendChild(botao)
    })

}

function limparTabela(){
    let tabela = document.getElementById("tabela");
    let linhas = tabela.getElementsByTagName("tr");

    Array.from(linhas).forEach((linha, id) => {
        if(id >= 1)
            linha.remove()
    })
}

function darBaixa(){
    let nu_ordem = parseInt(document.getElementById("txtBuscaOrdem").value);
    let vl_quantidade = parseInt(document.getElementById("txtQuantidadeBaixa").value);
    
    Array.from(document.livros).forEach(livro => {
        if(
            parseInt(livro._nu_ordem) == nu_ordem 
            && vl_quantidade <= parseInt(livro._vl_quantidade)
        ){
            limparTabela()
            livro.darBaixa(vl_quantidade)
            desenharTabela()
        }
    })

    
}