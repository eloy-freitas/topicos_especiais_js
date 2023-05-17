function questao02(){
    timestamp = new Date()
    const hora = timestamp.getHours()

    if(hora >= 6 && hora < 12)
        console.log("manhã")
    else if(hora >= 12 && hora < 18)
        console.log("tarde")
    else if (hora >= 18 && hora < 24)
        console.log("noite")
    else if(hora >= 0 && hora < 6)
        console.log("madrugada")
    console.log(hora)
}