import { getUsersPublications } from "../firebase/firestore/get_document.js";
import { skeletonPublicationForm, skeletonPublications } from "./squeleton/index.js";
import { mainTimelineStructure } from "./templates/timeline.js";
import { templatePublicationForm } from "./templates/templatePublicationForm.js";
import { templatePublications } from "./templates/publications.js";
import { Account } from "../helpers/constructores/index.js";
import { updatePhotoURL } from "../helpers/updatePhotoURL.js";
import { locationSignIn } from "../helpers/locations.js";
import { resizeSpaceBetweenHeaderAndMain } from "../helpers/resizeSpaceBetweenHeaderAndMain.js";
import { functionsOfThePublicationForm } from "../helpers/publicationsForm/functionsOfThePublicationForm.js";
import { functionsOfThePublication } from "../helpers/publications/functionsOfThePublication.js";

export const Timeline = () => {
	const sectionAllPost = document.createElement('section');
	sectionAllPost.setAttribute('class', 'section--posts');

	const heightHead=document.querySelector("#navegador");

	resizeSpaceBetweenHeaderAndMain(sectionAllPost, heightHead)

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

				functionsOfThePublicationForm(
					sectionAllPost,
					publicationPosts,
					boxCreatePost,
					userAccount
				)

			}else{

				alert("Por favor inicia sesión")
				locationSignIn()

			}

		} showPublicationForm()

		async function showPublications() {

			try{

				await getUsersPublications( (response)=>{

					let publicationsDocument = response.docs.map((doc) => {
						return { ...doc.data() };
					})

					const templateAllPublications = publicationsDocument.reduce((acctemplate, publication)=>{
						return acctemplate + templatePublications(publication, userAccount.uid)
					},"")

					publicationPosts.innerHTML = templateAllPublications

					const iconsLike = sectionAllPost.querySelectorAll(".publicationReview--iconLike")
					const iconsMore = sectionAllPost.querySelectorAll(".boxProfile--iconMore")
					const publicationConfigurationoptions  = sectionAllPost.querySelectorAll(".boxProfile__popupEditorDelate")
					const btnsEdit = sectionAllPost.querySelectorAll(".popupEditorDelate__box--Edit")
					const btnsDelete = sectionAllPost.querySelectorAll(".popupEditorDelate__box--delete")

					functionsOfThePublication(
						userAccount,
						sectionAllPost,
						boxCreatePost,
						iconsLike,
						iconsMore,
						publicationConfigurationoptions,
						btnsEdit,
						btnsDelete,
					)
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
