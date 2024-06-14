

export function closePopup(popupToClose) {

    popupToClose.classList.remove("popup__dialog--center")
    popupToClose.close()
    popupToClose.innerHTML = ''

}