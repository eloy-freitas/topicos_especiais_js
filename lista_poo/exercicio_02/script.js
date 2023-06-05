function iniciarLista(){
    document.livros = [];
    
}

class Funcionario{
    constructor(
        vl_salario_base, 
        cargo, 
        nu_filhos,
        nu_cpf = '000.000.000-11', 
        no_funcionario = "INDEFINIDO"
    ){
        this._vl_salario_base = parseFloat(vl_salario_base)
        this._cargo = cargo
        this._nu_filhos = parseInt(nu_filhos)
        this._nu_cpf = nu_cpf
        this._no_funcionario = no_funcionario
    }

    calcularImposto() {
        if(this._vl_salario_base < 1500)
            return 0;
        else if(this._vl_salario_base >= 1500 && this._vl_salario_base < 2750)
            return this._vl_salario_base * 0.12;
        else
            return this._vl_salario_base * 0.235;
    }

    exibirFuncionario(){
        console.log(
            ""
            .concat(`\ncpf: ${this._nu_cpf}`)
            .concat(`\nnome: ${this._no_funcionario}`)
            .concat(`\nsalario base: ${this._vl_salario_base}`)
            .concat(`\ncargo: ${this._cargo}`)
            .concat(`\nnúmero de filhos: ${this._nu_filhos}`)            
        )
    }

    exibirIdentificacao(){
        console.log(
            ""
            .concat(`\ntítulo: ${this.nu_cpf}`)
            .concat(`\nnumero de ordem: ${this._no_funcionario}`)
        )
    }

    calculaSalarioBruto(){
        return this._vl_salario_base 
            + (parseFloat(this._nu_filhos) * 120) 
            - this._vl_salario_base * 0.11 
    }
}

function maiorImposto(funcionarios){
    let maiorValor = 0;
    let imposto = 0;
    let result;
    Array.from(funcionarios).forEach(funcionario =>{
        imposto = funcionario.calcularImposto();
        if(imposto >= maiorValor){
            maiorValor = imposto
            result = funcionario
        }
    })

    console.log("Funcionário com maior imposto")
    result.exibirFuncionario()
    console.log(`valor imposto: ${imposto}`)
}


function calculaSalarioBruto(funcionarios){
    let salario = 0;
    Array.from(funcionarios).forEach(funcionario =>{
        salario = funcionario.calcularImposto();
        funcionario.exibirFuncionario();
        console.log(`valor salario bruto: ${salario}`);
    })
    
}

const funcionarios = [
    new Funcionario(),
    new Funcionario(10000,'dev senior', 2, '100.100.100.10', 'fulano')
]



maiorImposto(funcionarios)
console.log("\n---------\n")
calculaSalarioBruto(funcionarios)