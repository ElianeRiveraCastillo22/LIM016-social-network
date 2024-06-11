import { createPost } from "../../firebase/firestore/add_document.js"
import { firstLetterCapitalized } from "../firstLetterCapitalized.js"
import { defaultLabelData } from "../../data/tags-post.js";
import {
    updatePublicationID,
    updateTheIdentifiersOfUserPublications
} from "../../firebase/firestore/update_document.js"
import {
    PublicationFormValues,
    activateTheSubmitBtn,
    addClassIfComplete,
    addTheValueToTheStars,
    addsStylesWhenDeletingTheIputValue,
    closeThelistTags,
    createLabelsThroughInput,
    createsTheListInTheFirstApproachInInput,
    deletesTheListBecauseItDoesNotMatch,
    dimensionsTheWidthOfTheList,
    filtersOutMatchingWords,
    getElementsOfThePublicationForm,
    identifyTheDefaultLabelList,
    identifyTheLabelArea,
    showDefaultTags,
} from "./publicationForm_fuctions.js"

export function functionsOfThePublicationForm(
    generalContainer,
    boxPublications,
    formContainer,
    userAccount
) {
    let {
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
    } = getElementsOfThePublicationForm(generalContainer)

    let textOfTheChosenLabels=[]

    inputTags.addEventListener("focus",()=>{

        dimensionsTheWidthOfTheList(contentTags,defaultLabelListContainer)
        createsTheListInTheFirstApproachInInput(inputTags,iconCreateTags,defaultLabelData,defaultLabelListContainer)

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

    boxPublications.addEventListener("click",()=>{

        closeThelistTags(defaultLabelListContainer,inputTags,iconCreateTags)

    })

    btnToSaveThePublication.addEventListener("click",(e)=>{

        e.preventDefault()
        closeThelistTags(defaultLabelListContainer,inputTags,iconCreateTags)

        if( btnToSaveThePublication.classList.contains("btn--active") ){

            const publicationForm = new PublicationFormValues({
                id_user: userAccount.uid,
                name_point: createPostPoint.value,
                description: formInformationInput.value,
                rating: containerPostStars.dataset.pointscoring,
                publicationOwner: userAccount.displayName,
                photoOfPublicationOwner: userAccount.photoURLUser
            })

            publicationForm.getWhencreated()
            publicationForm.getPublicationTags(containerForAllLabels)

            const objpublicationValues = {
                id_user: publicationForm.id_user,
                name_point: publicationForm.name_point,
                description: publicationForm.description,
                attributes: publicationForm.attributes,
                rating: publicationForm.rating,
                url_reference: publicationForm.url_reference,
                id_post: publicationForm.id_post,
                timestamp: publicationForm.timestamp,
                likes: publicationForm.likes,
                usersWhoLiked: publicationForm.usersWhoLiked,
                publicationOwner: publicationForm.publicationOwner,
                photoOfPublicationOwner: publicationForm.photoOfPublicationOwner
            }

            async function createPublicationDocument(){

                try{

                    const ID_PUBLICATION = await createPost(objpublicationValues)
                    updatePublicationID("user-publication",ID_PUBLICATION.id,{"id_post":ID_PUBLICATION.id})
                    updateTheIdentifiersOfUserPublications("user-account", userAccount.uid, ID_PUBLICATION.id)

                }catch(error){

                    console.log(error)

                }finally{

                    function changeClassesToDisableSaveBtn(sectionToDeactivate) {
                        sectionToDeactivate.classList.add("incomplete")
                        sectionToDeactivate.classList.remove("completed")
                    }

                    function clearTheFieldsOfThePublicationForm() {

                        createPostPoint.value = ""
                        changeClassesToDisableSaveBtn(createPostPoint)

                        formInformationInput.value = ""
                        changeClassesToDisableSaveBtn(formInformationInput)

                        containerForAllLabels.innerHTML = ""
                        changeClassesToDisableSaveBtn(containerForAllLabels)

                        textOfTheChosenLabels.length = 0

                        ratingContainer.forEach((star)=>{
                            star.classList.remove("puntuacion_escogida")
                        })
                        changeClassesToDisableSaveBtn(containerPostStars)

                    } clearTheFieldsOfThePublicationForm()
                }
            } createPublicationDocument()

            btnToSaveThePublication.classList.remove("btn--active")
            btnToSaveThePublication.classList.add("btn--disebled")

        }else{

            btnPostMessage.show()
            setTimeout(() => {
                btnPostMessage.close()
            }, 1500);

        }
    })
}