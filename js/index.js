let msg = "";
let functionKind = TXTvazio;
let willBeDecrypted;
const toLog = document.getElementById("logArea");
const msgArea = document.getElementById("msgWPP");

const emojis = {
    "a": "😄",
    "b": "😃",
    "c": "😁",
    "d": "😆",
    "e": "😅",
    "f": "😂",
    "g": "🤣",
    "h": "😊",
    "i": "😇",
    "j": "🙂",
    "k": "🙃",
    "l": "😉",
    "m": "😌",
    "n": "😍",
    "o": "😘",
    "p": "😗",
    "q": "😙",
    "r": "😚",
    "s": "😋",
    "t": "😛",
    "u": "😝",
    "v": "😜",
    "w": "🤪",
    "x": "😛",
    "y": "😝",
    "z": "😜"
};

const embaralhado = {
    "a": "c",
    "b": "a",
    "c": "d",
    "d": "i",
    "e": "o",
    "f": "p",
    "g": "w",
    "h": "x",
    "i": "f",
    "j": "h",
    "k": "y",
    "l": "e",
    "m": "z",
    "n": "r",
    "o": "b",
    "p": "s",
    "q": "m",
    "r": "l",
    "s": "v",
    "t": "n",
    "u": "t",
    "v": "g",
    "w": "u",
    "x": "j",
    "y": "q",
    "z": "k"
};


function enviar() {
    msg = msgArea.value
    toLog.innerHTML += `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()} : ${msgArea.value}<br>`
    window.open("https://wa.me/?text=" + msg)
};

function trocarTema() {
    document.body.classList.toggle("whiteTheme")
};

function transformarTexto(event) {
    toLog.innerHTML += `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()} : ${msgArea.value}<br>`
    let C_D = event.target.id
    document.getElementById("crypto").classList.remove("activeOption")
    document.getElementById("decrypt").classList.remove("activeOption")
    document.getElementById(C_D).classList.add("activeOption")
    setTimeout(function () {
        document.getElementById("crypto").classList.remove("activeOption")
        document.getElementById("decrypt").classList.remove("activeOption")
    }, 1000)

    if ((msgArea.value) === "") {
        (msgArea.value) = "escreva aqui"
        setTimeout(function () {
            (msgArea.value) = ""
        }, 200)
        return;
    }

    switch (C_D) {
        case "crypto":
            willBeDecrypted = false
            functionKind()
            break;
        case "decrypt":
            willBeDecrypted = true
            functionKind()
            break;
    }
};

function A_B_C(event) {
    let pickedOption = event.target.id
    document.getElementById("optA").classList.remove("activeOption")
    document.getElementById("optB").classList.remove("activeOption")
    document.getElementById("optC").classList.remove("activeOption")
    document.getElementById("AIfunction").classList.remove("activeOption")
    document.getElementById(pickedOption).classList.add("activeOption")

    switch (pickedOption) {
        case "optA":
            functionKind = optA_function
            break;
        case "optB":
            functionKind = optB_function
            break;
        case "optC":
            functionKind = optC_function
            break;
        case ("AIfunction"):
            msg = "corrija somente a pontuação; " + msgArea.value

            msgArea.value = "carregando..."

            puter.ai.chat(msg).then((IAtext) => {
                msgArea.value = IAtext
            }).catch(function (error) {
                msgArea.value = "ERROR tente novamente: " + error.message
                setTimeout(function () {
                    msgArea.value = msg
                }, 5000)
            })
            break;
    }
};

function TXTvazio() {
    let tempTXT = msgArea.value
    msgArea.value = "selecione o tipo"

    setTimeout(function () {
        (msgArea.value) = tempTXT
    }, 200)
};

function optA_function() {
    textoRevertido(msgArea.value)
    function textoRevertido(texto) {
        let textoRev = ""
        for (let i = texto.length - 1; i >= 0; i--) {
            textoRev += texto[i]
            msgArea.value = textoRev
        }
    }
};

function optB_function() {
    let textoEM

    if (willBeDecrypted === false) {
        textoEM = msgArea.value.toLowerCase()
        let textoConvertido = ""

        for (let i = 0; i < textoEM.length; i++) {
            let caractere = textoEM.charAt(i)
            if (emojis[caractere]) {
                textoConvertido += emojis[caractere]
            } else {
                textoConvertido += caractere
            }
        }

        msgArea.value = textoConvertido
    } else {
        textoEM = msgArea.value
        let textoRevertido = ""

        let i = 0
        while (i < textoEM.length) {
            let emoji = textoEM.substring(i, i + 2)
            let letra = Object.keys(emojis).find(key => emojis[key] === emoji)
            if (letra) {
                textoRevertido += letra
                i += 2
            } else {
                textoRevertido += textoEM[i]
                i++
            }
        }
        msgArea.value = textoRevertido
    }
};

function optC_function() {
    let textoEM

    if (willBeDecrypted === false) {
        textoEM = msgArea.value.toLowerCase()
        let textoConvertido = ""

        for (let i = 0; i < textoEM.length; i++) {
            let caractere = textoEM.charAt(i)
            if (embaralhado[caractere]) {
                textoConvertido += embaralhado[caractere]
            } else {
                textoConvertido += caractere
            }
        }

        msgArea.value = textoConvertido
    } else {
        textoEM = msgArea.value.toLowerCase()
        let textoRevertido = ""

        for (let i = 0; i < textoEM.length; i++) {
            let caractere = textoEM.charAt(i)
            let letra = Object.keys(embaralhado).find(key => embaralhado[key] === caractere)
            if (letra) {
                textoRevertido += letra
            } else {
                textoRevertido += caractere
            }
        }

        msgArea.value = textoRevertido
    }
};

function showLog() {
    let btnLog = document.getElementById("showLog_btn")

    logContainer = document.getElementById("logArea")

    msgArea.classList.toggle("hidden")
    logContainer.classList.toggle("hidden")

    if (logContainer.classList.contains("hidden")) {
        btnLog.textContent = ">"
    } else {
        btnLog.textContent = "<"
    }
};