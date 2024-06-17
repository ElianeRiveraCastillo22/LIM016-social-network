export function activateBtn(btn,pointsNeeded,pointsIhave) {

    if(pointsIhave>=pointsNeeded){

        btn.classList.add("btn--active")
        btn.classList.remove("btn--disebled")

    }

}