import { publicationLabelTemplate } from "../../view/templates/publications.js";
import { templateClose } from "../../view/templates/templatePublicationForm.js";

function getElementsOfThePublicationForm(formContainer) {
    const contentTags = formContainer.querySelector(".createTags");
    const inputTags = formContainer.querySelector(".createTags__input");
    const iconCreateTags = formContainer.querySelector(".createTags__aprove");
    const defaultLabelListContainer = formContainer.querySelector(".createTags__list");
    const containerForAllLabels = formContainer.querySelector(".createpost__alltags");
    const createPostPoint = formContainer.querySelector(".createPost__point");
    const formInformationInput = formContainer.querySelector(".createPost__Info");
    const ratingContainer =  formContainer.querySelectorAll(".createPost__stars path");
    const containerPostStars=  formContainer.querySelector(".createPost__stars");
    const btnToSaveThePublication = formContainer.querySelector(".btnSave")
    const btnPostMessage = formContainer.querySelector(".btnPost__message")

    return ({
        contentTags,
        inputTags,
        iconCreateTags,
        defaultLabelListContainer,
        containerForAllLabels,
        createPostPoint,
        formInformationInput,
        ratingContainer,
        containerPostStars,
        btnToSaveThePublication,
        btnPostMessage
    })
}

function changeClasses(elem1,elem2,elem1remove,elem1add,elem2remove,elem2add) {

    elem1.classList.remove(elem1remove)
    elem1.classList.add(elem1add)

    elem2.classList.remove(elem2remove)
    elem2.classList.add(elem2add)

}

function addClassIfComplete(fieldToFillIn) {

    if(fieldToFillIn.value){

        fieldToFillIn.classList.add("completed")
        fieldToFillIn.classList.remove("incomplete")

    }else{

        fieldToFillIn.classList.add("incomplete")
        fieldToFillIn.classList.remove("completed")

    }

}

function activateTheSubmitBtn(btn,createPostPoint,containerForAllLabels,containerPostStars,formInformationInput) {

    function areTheEntriesCompleted(fieldsToFillIn) {
        return fieldsToFillIn.classList.contains("completed")
    }

    if(
        areTheEntriesCompleted(createPostPoint) &&
        areTheEntriesCompleted(formInformationInput) &&
        areTheEntriesCompleted(containerForAllLabels) &&
        areTheEntriesCompleted(containerPostStars)
    ){

        btn.classList.remove("btn--disebled")
        btn.classList.add("btn--active")

    }else{

        btn.classList.add("btn--disebled")
        btn.classList.remove("btn--active")

    }

}

function showDefaultTags(defaultTagListData,defaultLabelListContainer) {

    defaultLabelListContainer.classList.add("createTags__list--open")
    defaultTagListData.forEach((defaultTag)=>{

        let listItem=document.createElement("li")
        listItem.classList.add("allTags__item")
        listItem.innerText=defaultTag
        defaultLabelListContainer.appendChild(listItem)

    })

}

function createTag(formContainer, textvalue, containerForAllLabels, inputTags, textOfTheChosenLabels,createPostPoint,containerPostStars, btnToSave, formInformationInput) {

    let tagsChosen= formContainer.querySelectorAll(".createpost__alltags li")
    let labelComparisons=[]

    tagsChosen.forEach((tagSelect)=>{

        tagSelect.innerText == textvalue ? labelComparisons.push(true) : labelComparisons.push(false)

    })

    let noLabelCreatedResembles = labelComparisons.every((value) => value == false)

    function showPublicationTags() {
        if(noLabelCreatedResembles){

            containerForAllLabels.innerHTML += publicationLabelTemplate( textvalue )
            inputTags.value = ""
            textOfTheChosenLabels.push(textvalue)

        }
    }
    showPublicationTags()

    if(textOfTheChosenLabels == []){

        containerForAllLabels.classList.add("incomplete")
        containerForAllLabels.classList.remove("completed")

    }else{

        containerForAllLabels.classList.add("completed")
        containerForAllLabels.classList.remove("incomplete")

    }
    activateTheSubmitBtn(btnToSave,createPostPoint,containerForAllLabels,containerPostStars,formInformationInput)
}

function closeThelistTags(defaultLabelListContainer,inputTags,iconCreateTags) {

    defaultLabelListContainer.innerHTML=""
    changeClasses(inputTags,iconCreateTags,"createTags__input--focus","createTags__input--onFocus","createTags__aprove--focus","createTags__aprove--onFocus")
    defaultLabelListContainer.classList.remove("createTags__list--open")

}

function dimensionsTheWidthOfTheList(contentTags,defaultLabelListContainer) {

    const widthContentTags=contentTags.clientWidth
    defaultLabelListContainer.style.width=`${widthContentTags}px`

}

function createsTheListInTheFirstApproachInInput(inputTags,iconCreateTags,defaultLabelData,defaultLabelListContainer) {

    if(!inputTags.value){

        changeClasses(inputTags,iconCreateTags,"createTags__input--onFocus","createTags__input--focus","createTags__aprove--onFocus","createTags__aprove--focus")
        const sortTags = defaultLabelData.sort((a, b) => a.localeCompare(b));
        defaultLabelListContainer.classList.add("createTags__list--open")
        showDefaultTags(sortTags,defaultLabelListContainer)

    }
}

function filtersOutMatchingWords(inputTags,matchingValues,defaultLabelListContainer,matchingWords, defaultLabelData) {

    defaultLabelData.forEach((defaultTag)=>{

        const cutDefaultLabel = defaultTag.slice(0,inputTags.value.length)
        const evaluatesMatchingTags = cutDefaultLabel.toLocaleLowerCase().includes(inputTags.value.toLocaleLowerCase());
        matchingValues.push(evaluatesMatchingTags)

        if(evaluatesMatchingTags){

            defaultLabelListContainer.classList.add("createTags__list--open")
            defaultLabelListContainer.innerHTML=""
            matchingWords.push(defaultTag)

        }
    })
}

function deletesTheListBecauseItDoesNotMatch(matchingValues,defaultLabelListContainer,inputTags,iconCreateTags) {

    const allDefaultLabelsDoNotMatch = matchingValues.every((value)=> value==false)
    if(allDefaultLabelsDoNotMatch) closeThelistTags(defaultLabelListContainer,inputTags,iconCreateTags)

}

function addsStylesWhenDeletingTheIputValue(inputTags,iconCreateTags) {

    if(!inputTags.value) changeClasses(inputTags,iconCreateTags,"createTags__input--onFocus","createTags__input--focus","createTags__aprove--onFocus","createTags__aprove--focus")

}
function identifyTheDefaultLabelList(formContainer,defaultLabelListContainer,inputTags,iconCreateTags,containerForAllLabels, textOfTheChosenLabels,createPostPoint,containerPostStars,btnToSaveThePublication,formInformationInput) {

    const allTagsByDefauld = formContainer.querySelectorAll(".allTags__item");

    allTagsByDefauld.forEach((defaultTag)=>{
        defaultTag.addEventListener("click",()=>{

            closeThelistTags(defaultLabelListContainer,inputTags,iconCreateTags)
            createTag(formContainer,defaultTag.innerText, containerForAllLabels,inputTags, textOfTheChosenLabels,createPostPoint,containerPostStars,btnToSaveThePublication,formInformationInput)

        })
    })
}
function createLabelsThroughInput(inputTags, formContainer, containerForAllLabels, textOfTheChosenLabels,createPostPoint,containerPostStars, btnToSave,formInformationInput) {

    if(inputTags.value) createTag(formContainer, inputTags.value,containerForAllLabels,inputTags,textOfTheChosenLabels,createPostPoint,containerPostStars,btnToSave,formInformationInput)
}

function identifyTheLabelArea(containerForAllLabels,btnToSaveThePublication,createPostPoint,containerPostStars,formInformationInput) {

    let defaultLabelListContainer = Object.values(containerForAllLabels.childNodes).filter((node)=>{return node.nodeType == 1})

    defaultLabelListContainer.forEach((tag,tagIndex)=>{

        function removeTags() {

            if(defaultLabelListContainer.length == 1){

                containerForAllLabels.classList.add("incomplete")
                containerForAllLabels.classList.remove("completed")

            }else{

                containerForAllLabels.classList.add("completed")
                containerForAllLabels.classList.remove("incomplete")

            }

            tag.remove()
            defaultLabelListContainer.splice(tagIndex,1)

            activateTheSubmitBtn(btnToSaveThePublication,createPostPoint,containerForAllLabels,containerPostStars,formInformationInput)

        }

        const removeIcon = tag.lastElementChild
        if(removeIcon) removeIcon.addEventListener('click',removeTags)

    })
}

function addTheValueToTheStars(ratingContainer,containerPostStars,btnToSaveThePublication,createPostPoint,containerForAllLabels,formInformationInput) {

    ratingContainer.forEach((star,indexStart)=>{

        function paintTheStars() {

            let pointScoring;

            for(let i = 0; i <= indexStart; i++) ratingContainer[i].classList.add("puntuacion_escogida")
            for(let i = indexStart+1; i<ratingContainer.length; i++) ratingContainer[i].classList.remove("puntuacion_escogida")

            pointScoring = indexStart + 1

            if(pointScoring){

                containerPostStars.classList.add("completed")
                containerPostStars.classList.remove("incomplete")

            }else{

                containerPostStars.classList.add("incomplete")
                containerPostStars.classList.remove("completed")

            }

            activateTheSubmitBtn(btnToSaveThePublication,createPostPoint,containerForAllLabels,containerPostStars,formInformationInput)
            containerPostStars.dataset.pointscoring = pointScoring

        }

        star.addEventListener("click", paintTheStars)
    })
}

function paintTheStarsToEdit(rating,ratingContainer) {

    for(let i = 0; i < rating; i++) ratingContainer[i].classList.add("puntuacion_escogida")

}
function showIconClose(textBtnSave,timeline) {

    (textBtnSave == "Actualizar")? timeline += templateClose() : timeline
    return timeline

}
class PublicationFormValues {
    constructor({
        id_user = "",
        name_point,
        description,
        rating,
        url_reference = "",
        id_post = "",
        likes = 0,
        usersWhoLiked = [],
        publicationOwner = "",
        photoOfPublicationOwner  = ""
    } = {}){

        this.id_user = id_user,
        this.name_point = name_point,
        this.description = description,
        this.rating = rating,
        this.url_reference = url_reference,
        this.id_post = id_post,
        this.likes = likes,
        this.usersWhoLiked = usersWhoLiked,
        this.publicationOwner = publicationOwner,
        this.photoOfPublicationOwner = photoOfPublicationOwner

    }
    getWhencreated(){

        let ms = Date.parse(new Date())
        this.timestamp = ms

    }
    getPublicationTags(containerForAllLabels){

        const allLabelElements = containerForAllLabels.querySelectorAll(".createpost__tag")
        const defaultLabelListContainer = Object.values(allLabelElements)
        const tagValues = defaultLabelListContainer.map((tag)=>tag.firstElementChild.innerText)
        this.attributes = tagValues

    }
}

export {
  getElementsOfThePublicationForm,
  changeClasses,
  addClassIfComplete,
  activateTheSubmitBtn,
  showDefaultTags,
  createTag,
  closeThelistTags,
  dimensionsTheWidthOfTheList,
  createsTheListInTheFirstApproachInInput,
  deletesTheListBecauseItDoesNotMatch,
  filtersOutMatchingWords,
  addsStylesWhenDeletingTheIputValue,
  identifyTheDefaultLabelList,
  createLabelsThroughInput,
  identifyTheLabelArea,
  addTheValueToTheStars,
  paintTheStarsToEdit,
  showIconClose,
  PublicationFormValues
}