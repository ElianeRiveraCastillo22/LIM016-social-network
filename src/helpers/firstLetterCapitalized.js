export function firstLetterCapitalized(inputValue) {

    let firstLetterOfInput=inputValue.value.substring(0,1).toUpperCase()
    let restOfTheInputWord

    if(!inputValue.value) return

    restOfTheInputWord=inputValue.value.substring(1);
    inputValue.value = firstLetterOfInput.concat(restOfTheInputWord)

}