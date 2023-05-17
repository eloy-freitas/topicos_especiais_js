function questao02(){
    timestamp = new Date()
    const hora = timestamp.getHours()

    document.body.removeAttribute("style")

    if(hora >= 6 && hora < 12)
        document.body.classList.add("manha")
    else if(hora >= 12 && hora < 18)
        document.body.classList.add("tarde")
    else if (hora >= 18 && hora < 24)
        document.body.classList.add("noite")
    else if(hora >= 0 && hora < 6)
        document.body.classList.add("madrugada")
    
}