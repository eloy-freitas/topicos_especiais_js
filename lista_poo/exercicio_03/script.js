
document.funcionarios = [];

document.cargos = {
    'Tecnico': 500,
    'Analista': 800,
    'Projetista': 1100
};

class Funcionario{
    constructor(
        cd_funcionario,
        no_funcionario,
        no_cargo,
        no_departamento,
        nu_dependentes,
        nu_ano_admissao,
        nu_idade,
        vl_salario_bruto
    ){
        if(document.cargos[no_cargo] == undefined){
            throw "Cargo inválido"
        }else{
            this._cd_funcionario = cd_funcionario
            this._no_funcionario = no_funcionario
            this._no_cargo = no_cargo
            this._no_departamento = no_departamento
            this._nu_dependentes = parseInt(nu_dependentes)
            this._nu_ano_admissao = nu_ano_admissao
            this._nu_idade = nu_idade
            this._vl_salario_bruto = parseFloat(vl_salario_bruto)
            this._vl_salario_liquido = 0
            this._vl_gratificacao = 0
        }
    }

    exibir(){
        window.alert(
            `
            código: ${this._cd_funcionario}
            nome: ${this._no_funcionario}
            cargo: ${this._no_cargo}
            departamento: ${this._no_departamento}
            dependentes: ${this._nu_dependentes}
            ano_admissao: ${this._nu_ano_admissao}
            idade: ${this._nu_idade}
            salário bruto: ${this._vl_salario_bruto}
            salário liquido: ${this._vl_salario_liquido}
            `
        )
    }

    calcularGratificacaoPorCargo(){
        this._vl_gratificacao = this._vl_salario_bruto 
            + document.cargos[this._no_cargo]

        return this._vl_gratificacao 
    }

    calcularSalarioLiquido(vl_gratificacao_dependente = 0.10){
        let vl_salario_bruto = this.calcularGratificacaoPorCargo()
        
        this._vl_salario_liquido = (
            vl_salario_bruto 
            - (vl_salario_bruto * 0.12)
            + (this._nu_dependentes * vl_gratificacao_dependente)
        )
    }
}


function buscarFuncionarioPorId(){
    const id = parseInt(document.getElementById('txtBuscaIdFuncionario').value);

    let funcionario = null;
    Array.from(document.funcionarios).forEach(f => {
        if(f._cd_funcionario == parseInt(id)){
            funcionario = f
        }
    })
    if(funcionario == null){
        throw "Funcionario não existe"
    }

    return funcionario
}

function carregarFuncionario(){
    const btnCadastrar = document.getElementById('btnCadastrar')
    const funcionario = buscarFuncionarioPorId();
    if(funcionario != undefined){   
        desabilitarCampos(); 
        carregarCampos(funcionario);
        btnCadastrar.onclick = alterarSalario
    }else{
        window.alert("Funcionario não encontrado")
    }

}

function alterarSalario(){
    const campos = lerCamposSalario()
    Array.from(document.funcionarios).forEach(funcionario => {
        if(funcionario._cd_funcionario == parseInt(campos['cd_funcionario'])){
            funcionario._vl_salario_bruto = parseFloat(campos['vl_salario_base'])
        }
    })
    limparTabela()
    desenharTabela()
    limparFormulario()
    habilitarCampos()
    const btnCadastrar = document.getElementById('btnCadastrar')
    btnCadastrar.onclick = cadastrarFuncionario
}

function carregarFuncionarioCalculaSalario(){
    const funcionario = buscarFuncionarioPorNome()
    carregarCampos(funcionario)
    document.getElementById('btnCalcularSalario').disabled = false
}

function calcularSalario(){
    const campos = lerCamposSalario()
    
    Array.from(document.funcionarios).forEach(f => {
        
        if(f._cd_funcionario == parseInt(campos['cd_funcionario'])){
            f.calcularSalarioLiquido()
            f.exibir()
        }
    })
    limparTabela()
    desenharTabela()
    limparFormulario()
    habilitarCampos()
}

function buscarFuncionarioPorNome(){
    const nome = document.getElementById('txtBuscaNomeFuncionario').value;
    
    let funcionario = null;
    Array.from(document.funcionarios).forEach(f => {
        if(f._no_funcionario == nome){
            funcionario = f
        }
    })
    if(funcionario == null){
        throw "Funcionario não existe"
    }
    
    return funcionario
}

function cadastrarFuncionario(){
    let funcionario = lerCampos();
    limparTabela();
    document.funcionarios.push(funcionario);
    desenharTabela();
    limparFormulario();
    habilitarCampos();
}

function calcularTodasGratificacaoes(){
    Array.from(document.funcionarios).forEach(f => {
        f.calcularGratificacaoPorCargo()
    })
    limparTabela()
    desenharTabela()
    document.getElementById('btnCalcularSalario').disabled = true
}

function lerCamposSalario(){
    const cd_funcionario = document.getElementById("txtCodigo").value;
    const vl_salario_base = document.getElementById("txtSalarioBase").value;
    
    let fl_cadastra = true;
    
    if(vl_salario_base == null || vl_salario_base == ''){
        window.alert("salário base não pode ser nulo")
        fl_cadastra = false;
    }
    
    if(fl_cadastra)
        return {
            cd_funcionario,
            vl_salario_base
        }
        
}

function lerCampos(){
    const cd_funcionario = document.funcionarios.length + 1;
    const no_funcionario = document.getElementById("txtNome").value;
    const no_cargo = document.getElementById("txtCargo").value;
    const no_departamento = document.getElementById("txtDepartamento").value;
    const nu_dependentes = document.getElementById("txtNumeroDependentes").value;
    const nu_ano_admissao = document.getElementById("txtAnoAdmissao").value;
    const nu_idade = document.getElementById("txtIdade").value;
    const vl_salario_base = document.getElementById("txtSalarioBase").value;
    
    let fl_cadastra = true;
    
    if(no_funcionario == null || no_funcionario == ''){
        window.alert("funcionario não pode ser nulo")
        fl_cadastra = false;
    }
    if(no_cargo == null || no_cargo == ''){
        window.alert("cargo não pode ser nulo")
        fl_cadastra = false;
    }
    if(no_departamento == null || no_departamento == ''){
        window.alert("departamento não pode ser nulo")
        fl_cadastra = false;
    }
    if(nu_dependentes == null || nu_dependentes == ''){
        window.alert("dependentes não pode ser nulo")
        fl_cadastra = false;
    }
    if(nu_ano_admissao == null || nu_ano_admissao == ''){
        window.alert("ano de adimissão não pode ser nulo")
        fl_cadastra = false;
    }
    if(nu_idade == null || nu_idade == ''){
        window.alert("idade não pode ser nulo")
        fl_cadastra = false;
    }
    
    if(vl_salario_base == null || vl_salario_base == ''){
        window.alert("salário base não pode ser nulo")
        fl_cadastra = false;
    }
        
    if(fl_cadastra){
        return new Funcionario(
            cd_funcionario,
            no_funcionario,
            no_cargo,
            no_departamento,
            nu_dependentes,
            nu_ano_admissao,
            nu_idade,
            vl_salario_base
        )
    }
}


function exibirfuncionario(){
    id = document.getElementById(this.id).id;
    funcionario = document.funcionarios[id];
    
    funcionario.exibir();
}

function desenharTabela(){
    
    const tabela = document.getElementById("tabela");
    
    var botao;
    //define o corpo
    Array.from(document.funcionarios).forEach((funcionario, id) => {
        linha = tabela.insertRow()
        linha.insertCell(0).innerHTML = funcionario._cd_funcionario
        linha.insertCell(1).innerHTML = funcionario._no_funcionario
        linha.insertCell(2).innerHTML = funcionario._no_cargo
        linha.insertCell(3).innerHTML = funcionario._no_departamento
        linha.insertCell(4).innerHTML = funcionario._nu_dependentes
        linha.insertCell(5).innerHTML = funcionario._nu_ano_admissao
        linha.insertCell(6).innerHTML = funcionario._nu_idade
        linha.insertCell(7).innerHTML = funcionario._vl_salario_bruto
        linha.insertCell(8).innerHTML = funcionario._vl_salario_liquido
        linha.insertCell(9).innerHTML = funcionario._vl_gratificacao
        botao = document.createElement('button')
        botao.id = id
        botao.textContent = "Visualizar"
        botao.onclick = exibirfuncionario
        
        linha.insertCell(10).appendChild(botao)
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

function desabilitarCampos(){
    document.getElementById("txtCodigo").disabled = true;
    document.getElementById("txtNome").disabled = true;
    document.getElementById("txtCargo").disabled = true;
    document.getElementById("txtDepartamento").disabled = true;
    document.getElementById("txtNumeroDependentes").disabled = true;
    document.getElementById("txtAnoAdmissao").disabled = true;
    document.getElementById("txtIdade").disabled = true;
    document.getElementById("txtSalarioBase").disabled = false;
}

function habilitarCampos(){
    document.getElementById("txtCodigo").disabled = true;
    document.getElementById("txtNome").disabled = false;
    document.getElementById("txtCargo").disabled = false;
    document.getElementById("txtDepartamento").disabled = false;
    document.getElementById("txtNumeroDependentes").disabled = false;
    document.getElementById("txtAnoAdmissao").disabled = false;
    document.getElementById("txtIdade").disabled = false;
    document.getElementById("txtSalarioBase").disabled = false;
}

function carregarCampos(funcionario){
    document.getElementById("txtCodigo").value = funcionario._cd_funcionario
    document.getElementById("txtNome").value = funcionario._no_funcionario
    document.getElementById("txtCargo").value = funcionario._no_cargo
    document.getElementById("txtDepartamento").value = funcionario._no_departamento
    document.getElementById("txtNumeroDependentes").value = funcionario._nu_dependentes
    document.getElementById("txtAnoAdmissao").value = funcionario._nu_ano_admissao
    document.getElementById("txtIdade").value = funcionario._nu_idade
    document.getElementById("txtSalarioBase").value = funcionario._vl_salario_bruto
}

function limparFormulario(){
    document.getElementById("txtCodigo").value = ""
    document.getElementById("txtNome").value = "";
    document.getElementById("txtCargo").value = "";
    document.getElementById("txtDepartamento").value = "";
    document.getElementById("txtNumeroDependentes").value = "";
    document.getElementById("txtAnoAdmissao").value = "";
    document.getElementById("txtIdade").value = "";
    document.getElementById("txtSalarioBase").value = "";
}
