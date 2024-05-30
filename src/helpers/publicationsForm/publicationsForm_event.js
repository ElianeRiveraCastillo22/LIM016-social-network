import { firstLetterCapitalized } from "../firstLetterCapitalized.js";
import { 
    updatePhotoURL,
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
    addTheValueToTheStars
} from "./publicationForm_fuctions.js";
import { defaultLabelData } from "../../data/tags-post.js";

export function publicationFormFunctions(
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
    btnPostMessage,
    formContainer
) {
    let textOfTheChosenLabels=[]
    let pointScoring;

    inputTags.addEventListener("focus",()=>{

        dimensionsTheWidthOfTheList(contentTags,defaultLabelListContainer)
        createsTheListInTheFirstApproachInInput({inputTags,iconCreateTags,defaultLabelData,defaultLabelListContainer})

    })

    inputTags.addEventListener("keyup", ()=>{

        let matchingWords = []
        let matchingValues=[]

        filtersOutMatchingWords(inputTags,matchingValues,defaultLabelListContainer,matchingWords,defaultLabelData)
        deletesTheListBecauseItDoesNotMatch(matchingValues,defaultLabelListContainer,inputTags,iconCreateTags)
        addsStylesWhenDeletingTheIputValue(inputTags,iconCreateTags)
        showDefaultTags(matchingWords,defaultLabelListContainer)

    })

    defaultLabelListContainer.addEventListener("pointerover",()=>{

        identifyTheDefaultLabelList(formContainer,defaultLabelListContainer,inputTags,iconCreateTags,containerForAllLabels, textOfTheChosenLabels,createPostPoint,containerPostStars,btnToSaveThePublication,formInformationInput)

    })

    iconCreateTags.addEventListener("click",()=>{

        createLabelsThroughInput(inputTags,formContainer, containerForAllLabels, textOfTheChosenLabels,createPostPoint,containerPostStars,btnToSaveThePublication, formInformationInput)

    })

    containerForAllLabels.addEventListener("pointerover",()=>{

        identifyTheLabelArea(containerForAllLabels,btnToSaveThePublication,createPostPoint,containerPostStars,formInformationInput)

    })

    addTheValueToTheStars(ratingContainer,containerPostStars,btnToSaveThePublication,createPostPoint,containerForAllLabels,formInformationInput)

    createPostPoint.addEventListener("keyup",()=>{

        closeThelistTags(defaultLabelListContainer,inputTags,iconCreateTags)
        firstLetterCapitalized(createPostPoint)
        addClassIfComplete(createPostPoint)
        activateTheSubmitBtn(btnToSaveThePublication,createPostPoint,containerForAllLabels,containerPostStars,formInformationInput)

    })

    inputTags.addEventListener("keyup",()=>{

        firstLetterCapitalized(inputTags)

    })

    formInformationInput.addEventListener("keyup",()=>{

        addClassIfComplete(formInformationInput)
        activateTheSubmitBtn(btnToSaveThePublication,createPostPoint,containerForAllLabels,containerPostStars,formInformationInput)

    })

    formInformationInput.addEventListener("click",()=>{

        closeThelistTags(defaultLabelListContainer,inputTags,iconCreateTags)
        firstLetterCapitalized(createPostPoint)

    })


}
