import { getUserPublications } from "../firebase/firestore/get_document.js";
import { Account } from "../helpers/constructores/index.js";
import { functionsOfThePublication } from "../helpers/publications/functionsOfThePublication.JS";
import { functionsOfThePublicationForm } from "../helpers/publicationsForm/functionsOfThePublicationForm.js";
import { resizeSpaceBetweenHeaderAndMain } from "../helpers/resizeSpaceBetweenHeaderAndMain.js";
import { updatePhotoURL } from "../helpers/updatePhotoURL.js";
import { showProfile, templateInfoUser } from "./templates/profile.js";
import { templatePublications } from "./templates/publications.js";
import { templatePublicationForm } from "./templates/templatePublicationForm.js";

export const Profile = () => {

    const sectionSingin = document.createElement('section');
    sectionSingin.setAttribute('class', 'section--profile');

    const heightHead=document.querySelector("#navegador");
	resizeSpaceBetweenHeaderAndMain(sectionSingin, heightHead)
    sectionSingin.innerHTML = showProfile;

    const boxPorfile = sectionSingin.querySelector(".profile__boxRegister")
    const boxPublications = sectionSingin.querySelector(".profile__createPublications--box")
    const PublicationsBox = sectionSingin.querySelector(".profile__publications--box")

	const userAccount = new Account({
		displayName: localStorage.getItem("displayName"),
		typeRegister: localStorage.getItem("typeRegister"),
		photoURLUser: localStorage.getItem("photoURLUser"),
		uid: localStorage.getItem("uidUser"),
		activeSession: localStorage.getItem("activeSession")
	})

    if(userAccount.typeRegister == "user-account"){

        if(userAccount.activeSession){

            function showProfile() {

                boxPorfile.innerHTML = templateInfoUser(userAccount.displayName, userAccount.photoURLUser)

            } showProfile()

            boxPublications.classList.add("createPost--space")

            function showPublicationForm() {

                boxPublications.innerHTML = templatePublicationForm(userAccount.displayName, updatePhotoURL(userAccount.photoURLUser),"Publicar","incomplete","btn--disebled")

            } showPublicationForm()

            functionsOfThePublicationForm(
                sectionSingin,
                PublicationsBox,
                boxPublications,
                userAccount
            )

            async function showPublications() {
                try{

                    await getUserPublications(userAccount.uid ,(response)=>{

                        let publicationsDocument = response.docs.map((doc) => {
                            return { ...doc.data() };
                        })

                        const templateAllPublications = publicationsDocument.reduce((acctemplate, publication)=>{
                            return acctemplate + templatePublications(publication, userAccount.uid)
                        },"")

                        PublicationsBox.innerHTML = templateAllPublications

                        const iconsLike = sectionSingin.querySelectorAll(".publicationReview--iconLike")
                        const iconsMore = sectionSingin.querySelectorAll(".boxProfile--iconMore")
                        const publicationConfigurationoptions  = sectionSingin.querySelectorAll(".boxProfile__popupEditorDelate")
                        const btnsEdit = sectionSingin.querySelectorAll(".popupEditorDelate__box--Edit")
                        const btnsDelete = sectionSingin.querySelectorAll(".popupEditorDelate__box--delete")

                        functionsOfThePublication(
                            userAccount,
                            sectionSingin,
                            boxPublications,
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

                }
            } showPublications()
        }else{

            alert("Por favor inicia sesión")
            locationSignIn()

        }
    }

    if(userAccount.typeRegister == "point-account"){

    }




    return sectionSingin
}