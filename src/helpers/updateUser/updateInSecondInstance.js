export function closeTheListOfUnclickedDetails(containerInputsForm) {
    const detailNames = containerInputsForm.querySelectorAll(".containerForm__fieldToEdit")
    const details = containerInputsForm.querySelectorAll(".containerForm__details")
    detailNames.forEach(detailName => {
        detailName.addEventListener("click", ()=>{

            const listOfOtherOpenDetails= Object.values(details).filter(detail=>detail.hasAttribute("open"))

            if(!listOfOtherOpenDetails.length==0){
                listOfOtherOpenDetails.forEach(otherDetails=>{
                    otherDetails.removeAttribute("open")
                })
            }
        })
    });
}