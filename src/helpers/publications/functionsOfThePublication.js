import { deletePublicationDocument } from "../../firebase/firestore/delete_document.js";
import { getPublished } from "../../firebase/firestore/get_document.js";
import { updateLikesValues, updatePublicationDocument, updateWhoDeletedLike, updatesUsersWhoLike } from "../../firebase/firestore/update_document.js";
import { templateLoader } from "../../view/squeleton/index.js";
import { popupPublication, publicationLabelTemplate } from "../../view/templates/publications.js";
import { templatePublicationForm } from "../../view/templates/templatePublicationForm.js";
import { PublicationFormValues, getElementsOfThePublicationForm, paintTheStarsToEdit } from "../publicationsForm/publicationForm_fuctions.js";
import { publicationFormFunctions } from "../publicationsForm/publicationsForm_event.js";
import { updatePhotoURL } from "../updatePhotoURL.js";

export function functionsOfThePublication(
    userAccount,
    generalContainer,
    boxPublications,
    iconsLike,
    iconsMore,
    publicationConfigurationoptions,
    btnsEdit,
    btnsDelete,
) {

    iconsLike.forEach((iconLike)=>{
        iconLike.addEventListener("click",(e)=>{

            e.preventDefault()
            const ID_POST = iconLike.dataset.idpublication;

            async function getUsersWhoLikedIt() {

                try{

                    const usersWhoLikeThePublication = await getPublished(ID_POST, "user-publication")
                    const userLiked = usersWhoLikeThePublication.usersWhoLiked.some((userLike) => userLike == userAccount.uid)

                    if(userLiked){
                        if(iconLike.classList.contains("liked") && (usersWhoLikeThePublication.likes !== 0)){
                            updateLikesValues("user-publication", ID_POST,-1)
                            updateWhoDeletedLike("user-publication", ID_POST,userAccount.uid)
                            iconLike.classList.remove("liked")
                            iconLike.classList.add("noLike")
                        }
                    }

                    if(!userLiked){
                        if(iconLike.classList.contains("noLike")){
                            updateLikesValues("user-publication", ID_POST, 1)
                            updatesUsersWhoLike("user-publication", ID_POST, userAccount.uid)
                            iconLike.classList.remove("noLike")
                            iconLike.classList.add("liked")
                        }
                    }

                }catch(error){

                    console.log(error)

                }
            } getUsersWhoLikedIt()
        })
    })

    function showConfigurationOptions(configurationOptions) {

        if(configurationOptions.classList.contains("open")){

            configurationOptions.close()
            configurationOptions.classList.remove("open")

        }else{

            configurationOptions.show()
            configurationOptions.classList.add("open")

        }
    }

    iconsMore.forEach((iconMore, iconMoreIndex)=>{
        iconMore.addEventListener("click",()=>{

            showConfigurationOptions(publicationConfigurationoptions[iconMoreIndex])

            Object.values(publicationConfigurationoptions).filter((configurationOption)=>{

                if(Object.values(publicationConfigurationoptions)[iconMoreIndex]!==configurationOption){
                    if(configurationOption.classList.contains("open")){

                        configurationOption.close()
                        configurationOption.classList.remove("open")

                    }
                }
            })
        })
    })

    publicationConfigurationoptions.forEach((configurationOption)=>{
        configurationOption.addEventListener("click",()=>{

            showConfigurationOptions(configurationOption)

        })
    })

    function closePopup(popupToClose) {

        popupToClose.classList.remove("popup__dialog--center")
        popupToClose.close()
        popupToClose.innerHTML = ''

    }

    btnsEdit.forEach((btnEdit)=>{

        btnEdit.addEventListener("click", (e)=>{

            const ID_POST = btnEdit.dataset.idpublication
            const popupEdit = generalContainer.querySelector(".popup__dialog")
            const boxPopupEdit = document.createElement("div")
            boxPopupEdit.classList.add("createPost--update")

            boxPopupEdit.innerHTML = templatePublicationForm(userAccount.displayName, updatePhotoURL(userAccount.photoURLUser), "Actualizar", "completed", "btn--active","",ID_POST)
            popupEdit.appendChild(boxPopupEdit)
            popupEdit.show()
            popupEdit.classList.add("popup__dialog--center")

            const elementPublications = generalContainer.querySelectorAll(".publicationPosts__publication")
            const publicationToEdit = Object.values(elementPublications).find(elementPublication => elementPublication.dataset.idpublication == ID_POST)

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
            } = getElementsOfThePublicationForm(boxPopupEdit)

            publicationFormFunctions(
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
                boxPopupEdit
            )

            function getPublicationValues() {

                const name_point = publicationToEdit.querySelector(".publicationReview--namePoint").innerText
                const rating = publicationToEdit.querySelector(".createPost__stars").dataset.rating
                const description = publicationToEdit.querySelector(".publicationReview--post p").innerText
                const elemntAttributes = publicationToEdit.querySelectorAll(".publicationReview--tag")
                const attributes = Object.values(elemntAttributes).map((tag)=>{return tag.innerText})

                return {
                    attributes,
                    description,
                    name_point,
                    rating,
                }

            } getPublicationValues()

            let { name_point, rating, description, attributes } = getPublicationValues()

            function showsTheValuesOfThePublicationInTheForm() {

                createPostPoint.value = name_point;
                formInformationInput.value = description;
                containerPostStars.dataset.pointscoring = rating
                paintTheStarsToEdit(rating,ratingContainer)

            } showsTheValuesOfThePublicationInTheForm()

            function showPublicationTags(containerForAllLabels,textvalue) {

                containerForAllLabels.innerHTML += publicationLabelTemplate( textvalue )

            }

            attributes.forEach((tag)=>{

                showPublicationTags(containerForAllLabels,tag)

            })

            const btnClose = boxPopupEdit.querySelector(".createPost__iconClose")
            btnClose.addEventListener("click", ()=>{

                closePopup(popupEdit)

            })

            btnToSaveThePublication.addEventListener("click", (e)=>{

                e.preventDefault()

                const publicationForm = new PublicationFormValues({
                    name_point: createPostPoint.value,
                    description: formInformationInput.value,
                    rating: containerPostStars.dataset.pointscoring,
                })

                publicationForm.getPublicationTags(containerForAllLabels)
                const objpublicationValues = {
                    attributes: publicationForm.attributes,
                    description: publicationForm.description,
                    name_point: publicationForm.name_point,
                    rating: publicationForm.rating,
                }

                const keys_currentPublication = Object.entries(objpublicationValues)
                const keys_previousPublication = Object.entries(getPublicationValues())

                function compareValuesForUpdate(objNewValues, publicationField, publicationFieldIndex) {

                    const publicationFields = publicationField[0]

                    if((typeof publicationField[1]) == "object"){

                        const previoustagsArray = keys_previousPublication[publicationFieldIndex][1]
                        const currentTagsArray = keys_currentPublication[publicationFieldIndex][1]

                        if(previoustagsArray.length == currentTagsArray.length){

                            const newTags = previoustagsArray.every((tag, tagIndex) => tag == currentTagsArray[tagIndex])
                            if(!newTags) objNewValues[publicationFields] = keys_currentPublication[publicationFieldIndex][1]

                        } else objNewValues[publicationFields] = keys_currentPublication[publicationFieldIndex][1]

                    } else if(!(publicationField[1] === keys_previousPublication[publicationFieldIndex][1])) objNewValues[publicationFields] = publicationField[1]

                    return objNewValues
                }

                const updatedValuesForPublication = keys_currentPublication.reduce(compareValuesForUpdate,{})

                popupEdit.innerHTML += popupPublication("¿Seguro que quiere editar la publicación? 🤔", "Editar","popupBox__content--edit")
                popupEdit.show()
                popupEdit.classList.add("popup__dialog--center")

                if(!(Object.keys(updatedValuesForPublication).length == 0)){

                    const ID_POST = btnEdit.dataset.idpublication

                    const msjbtnEdit = popupEdit.querySelector(".popupBox__btn--Editar")
                    const btnCancel = popupEdit.querySelector(".popupBox__btn--cancel")
                    const popupform = popupEdit.querySelector(".createPost--update")
                    popupform.remove()

                    msjbtnEdit.addEventListener("click",()=>{

                        templateLoader(boxPublications,"Actulizando...")
                        const popupLoader = generalContainer.querySelector(".popupLoader")
                        const msjLoader = generalContainer.querySelector(".popupLoader__msj")

                        async function updatePublication() {
                            try{

                                await updatePublicationDocument(ID_POST, "user-publication",updatedValuesForPublication)

                            }catch(error){

                                console.log(error)

                            }finally{

                                msjLoader.innerText ="Actualizado ✔"
                                popupLoader.remove()

                            }
                        } updatePublication()
                        closePopup(popupEdit)
                    })

                    btnCancel.addEventListener("click", ()=>{

                        closePopup(popupEdit)

                    })

                }else closePopup(popupEdit)

            })
        })
    })

    btnsDelete.forEach((btnDelete)=>{
        btnDelete.addEventListener("click",(e)=>{

            e.preventDefault()
            const ID_POST = btnDelete.dataset.idpublication
            const popupRemove = generalContainer.querySelector(".popup__dialog")

            popupRemove.innerHTML = popupPublication("¿Seguro que quiere eliminar la publicación? 🤔", "Eliminar")
            popupRemove.show()
            popupRemove.classList.add("popup__dialog--center")

            const btnRemove = popupRemove.querySelector(".popupBox__btn--Eliminar")
            const btnCancel = popupRemove.querySelector(".popupBox__btn--cancel")

            btnRemove.addEventListener("click", ()=>{

                templateLoader(boxPublications,"Eliminando..")
                const popupLoader = generalContainer.querySelector(".popupLoader")
                const msjLoader = generalContainer.querySelector(".popupLoader__msj")

                async function removePublication() {

                    try{

                        await deletePublicationDocument(ID_POST)

                    }catch(error){

                        console.log(error)

                    }finally{

                        msjLoader.innerText ="Eliminado ✔"
                        popupLoader.remove()

                    }
                }
                removePublication()
                closePopup(popupRemove)
            })

            btnCancel.addEventListener("click", ()=>{

                closePopup(popupRemove)

            })
        })
    })
}