export function closeTheListOfUnclickedDetails(containerInputsForm) {
    const details = containerInputsForm.querySelectorAll(".containerForm__details")
    details.forEach(detail => {
        detail.addEventListener("click", ()=>{

            const listOfOtherOpenDetails= Object.values(details).filter(detail=>detail.hasAttribute("open"))

            if(!listOfOtherOpenDetails.length==0){
                listOfOtherOpenDetails.forEach(otherDetails=>{
                    otherDetails.removeAttribute("open")
                })
            }
        })
    });
}