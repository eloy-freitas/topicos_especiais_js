function escreveData(){
    entrada = window.prompt("insira uma data no formato: dd/mm/aaaa")
    const campos = entrada.split("/")
    const pattern = /[1-9]+[\/][1-12]+[\/][1-9999]+/
    

    if(pattern.test(entrada)){
        
        const dia = parseInt(campos[0])
        const mes = parseInt(campos[1])
        const ano = parseInt(campos[2])
        let erros = []

        if((dia < 1 || dia > 31))
            erros.push("Dia inválido")
        if((mes < 1 || mes > 12))
            erros.push("Mês inválido")
        if(ano < 1)
            erros.push("Ano inválido")
        
        const meses = {
            1: "janeiro"
            , 2: "fevereiro"
            , 3: "março"
            , 4: "abril"
            , 5: "maio"
            , 6: "junho"
            , 7: "julho"
            , 8: "agosto"
            , 9: "setembro"
            , 10: "outubro"
            , 11: "novembro"
            , 12: "dezembro"
        }
        
        window.alert(`${dia} de ${meses[mes]} de ${ano}`)
        if(erros.length > 0)
            window.alert(erros)
    }else{
        window.alert("data inválida")
    }
    
}
