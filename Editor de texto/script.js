
const linkButton = document.querySelector("#createLink")
const fontSizeSelector = document.querySelector("#font-size")

const minusButton = document.querySelector("button#minus").addEventListener("click", () => { fontSizeChanger(-1) })
const plusButton = document.querySelector("button#plus").addEventListener("click", () => { fontSizeChanger(+1) })
const fontName = document.querySelector("#fontName")

const textArea = document.querySelector("section#text-input")

const formatButtons = document.querySelectorAll(".format")
const scriptButtons = document.querySelectorAll(".script")
const alignButtons = document.querySelectorAll(".align")
const spacingButtons = document.querySelectorAll(".spacing")

const optionButtons = document.querySelectorAll(".option-button")
const advancedOptionButton = document.querySelectorAll(".adv-option-button")

const fontDefaultSizes = [10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96]
const fontList = ["Arial", "Verdana", "Times New Roman", "Roboto", "Georgia", "Courier New", "cursive"]
let currentSize = fontDefaultSizes[0]
let currentSizeInPX = `${(currentSize + 6)}px`


const initializer = () => {
    // sem highlightts para link, unlink, lists, undo ou redo pois são operações de uso único
    highlighter(formatButtons, false)
    highlighter(scriptButtons, true)
    highlighter(alignButtons, true)
    highlighter(spacingButtons, true)
    // cria tamanhos de fonte
    appendFontSizeOptions()
    // cria opções de fonte
    fontList.map((value) => {
        let option = document.createElement("option")
        option.value = value
        option.innerHTML = value
        fontName.appendChild(option)
    })
}


const highlighter = (className, needsRemoval) => {
    className.forEach(button => {
        button.addEventListener("click", () => {
        // true significa um botão por vez e false significa quantos estiverem ativos
            let buttonClasses = button.classList
            if (needsRemoval) {
                let alreadyActive = false

                if (buttonClasses.contains("active")) {
                    alreadyActive = true
                }

                highlighterRemover(className)

                if (!alreadyActive) {
                    buttonClasses.add("active")
                }

            } else {
                buttonClasses.toggle("active")
            }
            // clickOnModifyButton(button, buttonClasses)
        })
    })
}


const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active")
    })
}


const modifyText = (command, defaultUi, value) => {
    // executa comandos no texto selecionado
    document.execCommand(command, defaultUi, value)
}


function appendFontSizeOptions() {
    for (optionIndex in fontDefaultSizes) {
        let option = document.createElement("option")
        if (optionIndex == 0) {
            let defaultOption = document.createElement("option")
            defaultOption.value = "currentSize"
            defaultOption.innerHTML = currentSize
            fontSizeSelector.appendChild(defaultOption)
            option.value = fontDefaultSizes[optionIndex]
            option.innerHTML = fontDefaultSizes[optionIndex]
        } else {
            option.value = fontDefaultSizes[optionIndex]
            option.innerHTML = fontDefaultSizes[optionIndex]
        }
        fontSizeSelector.appendChild(option)
    }
}


function fontSizeChanger(adjust) {
    const selectFormatBlockOption = document.querySelectorAll("#font-size option")
    // let number = currentSize
    if (currentSize > 1 || adjust > 0) {
        currentSize += adjust
        selectFormatBlockOption[0].innerHTML = currentSize
        currentSizeInPX = `${currentSize + 6}px`
        textArea.style.fontSize = currentSizeInPX
    }
}


fontSizeSelector.addEventListener("change", () => {
    if (currentSize.toString() != fontSizeSelector.options[fontSizeSelector.selectedIndex].value) {
        // alert(currentSize)
        // alert(fontSizeSelector.options[fontSizeSelector.selectedIndex].value)
        let fontSizeSelectedValue = fontSizeSelector.options[fontSizeSelector.selectedIndex].value
        currentSize = +fontSizeSelectedValue
        // alert(currentSizeInPX)
        currentSizeInPX = `${currentSize + 6}px` //`${currentSize}px`
        // alert(currentSizeInPX)
        let spanElement = document.createElement("span");
        spanElement.style.fontSize = currentSizeInPX;
        let userSelection = window.getSelection();
        let selectedTextRange = userSelection.getRangeAt(0);
        selectedTextRange.surroundContents(spanElement);
    }
})

// para os que não precisam de parametros
optionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null)
    })
})

// para os que precisam de parametros (e.g colors, fonts)
advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value)
    })
})

// link
linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL")
    // checa se o link possui http
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink)
    } else {
        userLink = "http://" + userLink
        modifyText(linkButton.id, false, userLink)
    }
})

window.onload = initializer()


