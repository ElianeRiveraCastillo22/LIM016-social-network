import { templateClose } from "../../view/templates/templatePublicationForm.js"

export function showIconClose(textBtnSave,timeline) {
    (textBtnSave == "Actualizar")? timeline += templateClose() : timeline
    return timeline
}