import { getPublished, getUserPublications } from "../firebase/firestore/get_document.js";
import { createPost } from "../firebase/firestore/add_document.js";
import { updateLikesValues, updatePublicationDocument, updatePublicationID, updateTheIdentifiersOfUserPublications, updateWhoDeletedLike, updatesUsersWhoLike } from "../firebase/firestore/update_document.js";
import { skeletonPublicationForm, skeletonPublications, templateLoader } from "./squeleton/index.js";
import { mainTimelineStructure } from "./templates/timeline.js";
import { templatePublicationForm } from "./templates/templatePublicationForm.js";
import { popupRemovePublication, publicationLabelTemplate, templatePublications } from "./templates/publications.js";
import { deletePublicationDocument } from "../firebase/firestore/delete_document.js";
import { getElementsOfThePublicationForm, closeThelistTags, paintTheStarsToEdit, PublicationFormValues} from "../helpers/publicationsForm/publicationForm_fuctions.js";
import { publicationFormFunctions } from "../helpers/publicationsForm/publicationsForm_event.js";
import { Account } from "../helpers/constructores/index.js";
import { updatePhotoURL } from "../helpers/updatePhotoURL.js";
import { locationSignIn } from "../helpers/locations.js";

export const Timeline = () => {
	const sectionAllPost = document.createElement('section');
	sectionAllPost.setAttribute('class', 'section--posts');

	const heightHead=document.querySelector("#navegador");

	function resizeSpaceBetweenHeaderAndMain() {
		sectionAllPost.style.top=`${heightHead.clientHeight }px`;
	} resizeSpaceBetweenHeaderAndMain()

	sectionAllPost.innerHTML = mainTimelineStructure();

	const boxCreatePost = sectionAllPost.querySelector(".box__createPost")
	const publicationPosts = sectionAllPost.querySelector(".publicationPosts");
	const loaderPublications = document.querySelector(".box__posts--boxloader")

	function showSkeletonHome() {
		boxCreatePost.innerHTML = skeletonPublicationForm()
		publicationPosts.innerHTML = skeletonPublications();
	} showSkeletonHome()

	const userAccount = new Account({
		displayName: localStorage.getItem("displayName"),
		typeRegister: localStorage.getItem("typeRegister"),
		photoURLUser: localStorage.getItem("photoURLUser"),
		uid: localStorage.getItem("uidUser"),
		activeSession: localStorage.getItem("activeSession")
	})

	if(userAccount.typeRegister == "user-account"){

		boxCreatePost.classList.add("createPost--space")

		function showPublicationForm() {

			if(userAccount.activeSession){

				function showPublicationForm() {
					boxCreatePost.innerHTML = templatePublicationForm(userAccount.displayName, updatePhotoURL(userAccount.photoURLUser),"Publicar","incomplete","btn--disebled")
				} showPublicationForm()

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
				} = getElementsOfThePublicationForm(sectionAllPost)

				let textOfTheChosenLabels=[]

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
					sectionAllPost
				)

				publicationPosts.addEventListener("click",()=>{
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

								}

								clearTheFieldsOfThePublicationForm()
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

			}else{
				alert("Por favor inicia sesión")
				locationSignIn()
			}

		} showPublicationForm()
		

		async function showPublications() {

			try{

				await getUserPublications( (response)=>{

					let prueba = response.docs.map((doc) => {
						return { ...doc.data() };
					})

					const templateAllPublications = prueba.reduce((acctemplate, publication)=>{
						return acctemplate + templatePublications(publication, userAccount.uid)
					},"")

					publicationPosts.innerHTML = templateAllPublications

					const iconsLike = sectionAllPost.querySelectorAll(".publicationReview--iconLike")
					const iconsMore = sectionAllPost.querySelectorAll(".boxProfile--iconMore")
					const publicationConfigurationoptions  = sectionAllPost.querySelectorAll(".boxProfile__popupEditorDelate")
					const btnsEdit = sectionAllPost.querySelectorAll(".popupEditorDelate__box--Edit")
					const btnsDelete = sectionAllPost.querySelectorAll(".popupEditorDelate__box--delete")

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
											updateLikesValues("user-publication", ID_POST,1)
											updatesUsersWhoLike("user-publication", ID_POST,userAccount.uid)
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
							const popupEdit = sectionAllPost.querySelector(".popup__dialog")
							const boxPopupEdit = document.createElement("div")
							boxPopupEdit.classList.add("createPost--update")

							boxPopupEdit.innerHTML = templatePublicationForm(userAccount.displayName, updatePhotoURL(userAccount.photoURLUser), "Actualizar", "completed", "btn--active","",ID_POST)
							popupEdit.appendChild(boxPopupEdit)

							popupEdit.show()
							popupEdit.classList.add("popup__dialog--center")

							const elementPublications = sectionAllPost.querySelectorAll(".publicationPosts__publication")
							const publicationToEdit = Object.values(elementPublications).find(elementPublication=>elementPublication.dataset.idpublication == ID_POST)

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
										} else{
											objNewValues[publicationFields] = keys_currentPublication[publicationFieldIndex][1]
										}

									} else{

										if(!(publicationField[1] === keys_previousPublication[publicationFieldIndex][1])) objNewValues[publicationFields] = publicationField[1]

									}

									return objNewValues

								}

								const updatedValuesForPublication = keys_currentPublication.reduce(compareValuesForUpdate,{})

								if(!(Object.keys(updatedValuesForPublication).length == 0)){
									const ID_POST = btnEdit.dataset.idpublication

									templateLoader(publicationPosts,"Actulizando...")
									const popupLoader = sectionAllPost.querySelector(".popupLoader")
									const msjLoader = sectionAllPost.querySelector(".popupLoader__msj")

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

								}
								closePopup(popupEdit)
							})
						})
					})

					btnsDelete.forEach((btnDelete)=>{
						btnDelete.addEventListener("click",(e)=>{

							e.preventDefault()
							const ID_POST = btnDelete.dataset.idpublication
							const popupRemove = sectionAllPost.querySelector(".popup__dialog")

							popupRemove.innerHTML = popupRemovePublication()
							popupRemove.show()
							popupRemove.classList.add("popup__dialog--center")

							const btnRemove = popupRemove.querySelector(".removePublication__btn--delete")
							const btnCancel = popupRemove.querySelector(".removePublication__btn--cancel")

							btnRemove.addEventListener("click", ()=>{

								templateLoader(publicationPosts,"Eliminando..")
								const popupLoader = sectionAllPost.querySelector(".popupLoader")
								const msjLoader = sectionAllPost.querySelector(".popupLoader__msj")

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
				})
			}catch(error){
				console.log(error)
			}finally{
				console.log("respuesta finalizada")
			}

		} showPublications()

	}

	boxCreatePost.addEventListener("touchstart", (eventStart)=>{
		function moveAt(pageY) {
			if(pageY - eventStart.targetTouches[0].pageY <= 90){
				loaderPublications.style.top = pageY - eventStart.targetTouches[0].pageY + 'px'
				loaderPublications.firstElementChild.style.transform =`rotate(${(pageY - eventStart.targetTouches[0].pageY)*4}deg)`
			}else{
				loaderPublications.style.top="-32px";
				document.location.reload()
			}
		}
		function onTouchMove(eventMove) {
			moveAt(eventMove.targetTouches[0].pageY);
		}
		boxCreatePost.addEventListener('touchmove', onTouchMove);
		boxCreatePost.addEventListener("touchend",()=>{
			loaderPublications.style.top="-32px";
		})
	})

  return sectionAllPost;
};
