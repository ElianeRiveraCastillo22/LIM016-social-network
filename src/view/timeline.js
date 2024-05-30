import { getDocUser, getPublished, getUserPublications } from "../firebase/firestore/get_document.js";
import { createPost } from "../firebase/firestore/add_document.js";
import { updateLikesValues, updatePublicationID, updateTheIdentifiersOfUserPublications, updateWhoDeletedLike, updatesUsersWhoLike } from "../firebase/firestore/update_document.js";
import { skeletonPublicationForm, skeletonPublications, templateLoader } from "./squeleton/index.js";
import { mainTimelineStructure } from "./templates/timeline.js";
import { templatePublicationForm } from "./templates/templatePublicationForm.js";
import { popupRemovePublication, publicationLabelTemplate, templatePublications } from "./templates/publications.js";
import { deletePublicationDocument } from "../firebase/firestore/delete_document.js";
import { updatePhotoURL, getElementsOfThePublicationForm, closeThelistTags, paintTheStarsToEdit} from "../helpers/publicationsForm/publicationForm_fuctions.js";
import { publicationFormFunctions } from "../helpers/publicationsForm/publicationsForm_event.js";

export const Timeline = () => {
  const sectionAllPost = document.createElement('section');
  sectionAllPost.setAttribute('class', 'section--posts');

  const heightHead=document.querySelector("#navegador");

  function resizeSpaceBetweenHeaderAndMain() {
    let missingValue = 65 - heightHead.clientHeight;
    sectionAllPost.style.top=`${heightHead.clientHeight+ missingValue +16}px`;
  }
  resizeSpaceBetweenHeaderAndMain()

  let userIdActive=localStorage.getItem('IdUsuario')
  let userNameRegister= localStorage.getItem('nameRegister')

  sectionAllPost.innerHTML = mainTimelineStructure();

  const boxCreatePost = sectionAllPost.querySelector(".box__createPost")
  const boxPosts = sectionAllPost.querySelector(".box--posts")
  const postLoader = sectionAllPost.querySelector(".loader")
  const publicationPosts = sectionAllPost.querySelector(".publicationPosts");

  function showSkeletonHome() {
    boxCreatePost.innerHTML = skeletonPublicationForm()
    publicationPosts.innerHTML = skeletonPublications();
  }
  showSkeletonHome()

  async function getUser(userID) {
    const USER_DATA = await getDocUser(userID)
    return USER_DATA
  }

  if(userNameRegister=="user-account"){

      boxCreatePost.classList.add("createPost--space")

      async function showPublicationForm() {
        try {

          const USER_DATA = await getUser(userIdActive)

          if( USER_DATA !== undefined &&  USER_DATA.active_session == true){

            function showPublicationForm() {
              boxCreatePost.innerHTML = templatePublicationForm( USER_DATA.name, updatePhotoURL(USER_DATA),"Publicar","incomplete","btn--disebled")
              localStorage.setItem("nameUser", USER_DATA.name)
              localStorage.setItem("profilePicture", updatePhotoURL(USER_DATA))
            }
            showPublicationForm()


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

                let ms = Date.parse(new Date())
                const allLabelElements = containerForAllLabels.querySelectorAll(".createpost__tag")
                const defaultLabelListContainer = Object.values(allLabelElements)
                const tagValues = defaultLabelListContainer.map((tag)=>tag.firstElementChild.innerText)
                async function getPublicationIdentifier(){

                  try{

                      const ID_PUBLICATION = await createPost(
                      userIdActive,
                      createPostPoint.value,
                      formInformationInput.value,
                      tagValues,
                      containerPostStars.dataset.pointscoring,
                      "",
                      "",
                      ms,
                      0,
                      []
                    )

                    updatePublicationID("user-publication",ID_PUBLICATION.id,{"id_post":ID_PUBLICATION.id})
                    updateTheIdentifiersOfUserPublications("user-account", userIdActive, ID_PUBLICATION.id)

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
                }

                getPublicationIdentifier()
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

          }
        } catch (error) {
          console.log(error)
        }
      }
      showPublicationForm()

      async function showPublications() {

        try {
          const prueba = await getUserPublications()

          await getUserPublications((posts)=>{

            let allPostHome = ''

            posts.forEach((post)=>{

              async function getUsersFromPublications() {

                try {

                  const otherUsers = await getUser(post.data().id_user)
                  allPostHome = templatePublications(post.data(), otherUsers, userIdActive, allPostHome)
                  publicationPosts.innerHTML = allPostHome

                  const iconsLike = sectionAllPost.querySelectorAll(".publicationReview--iconLike")
                  const iconsMore = sectionAllPost.querySelectorAll(".boxProfile--iconMore")
                  const publicationConfigurationoptions  = sectionAllPost.querySelectorAll(".boxProfile__popupEditorDelate")
                  const btnsEdit = sectionAllPost.querySelectorAll(".popupEditorDelate__box--Edit")
                  const btnsDelete = sectionAllPost.querySelectorAll(".popupEditorDelate__box--delete")

                  iconsLike.forEach((iconLike)=>{
                    iconLike.addEventListener("click",(e)=>{

                      const ID_POST = iconLike.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.idpublication;

                      async function getUsersWhoLikedIt() {

                        try{

                          const usersWhoLikeThePublication =await getPublished(ID_POST)
                          const userLiked = usersWhoLikeThePublication.usersWhoLiked.some((userLike)=>userLike==userIdActive)

                          if(userLiked){
                            if(iconLike.classList.contains("liked") && (usersWhoLikeThePublication.likes!==0)){
                              updateLikesValues("user-publication", ID_POST,-1)
                              updateWhoDeletedLike("user-publication", ID_POST,userIdActive)
                              iconLike.classList.remove("liked")
                              iconLike.classList.add("noLike")
                            }
                          }

                          if(!userLiked){
                            if(iconLike.classList.contains("noLike")){
                              updateLikesValues("user-publication", ID_POST,1)
                              updatesUsersWhoLike("user-publication", ID_POST,userIdActive)
                              iconLike.classList.remove("noLike")
                              iconLike.classList.add("liked")
                            }
                          }

                        }catch(error){
                          console.log(error)
                        }
                      }
                      e.preventDefault()
                      getUsersWhoLikedIt()

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

                      const ID_POST = btnEdit.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.idpublication

                      const popupEdit = sectionAllPost.querySelector(".popup__dialog")
                      const boxPopupEdit = document.createElement("div")
                      boxPopupEdit.classList.add("createPost--update")

                      boxPopupEdit.innerHTML = templatePublicationForm(localStorage.getItem("nameUser"),localStorage.getItem("profilePicture"), "Actualizar", "completed", "btn--active")
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
                        const txtLabelsChosen = Object.values(elemntAttributes).map((tag)=>{return tag.innerText})

                        return {
                          name_point,
                          rating,
                          description,
                          txtLabelsChosen
                        }
                      }
                      getPublicationValues()

                      let { name_point,rating,description,txtLabelsChosen } = getPublicationValues()
                      createPostPoint.value = name_point;
                      formInformationInput.value = description;

                      paintTheStarsToEdit(rating,ratingContainer)

                      function showPublicationTags(containerForAllLabels,textvalue) {
                          containerForAllLabels.innerHTML += publicationLabelTemplate( textvalue )
                      }

                      txtLabelsChosen.forEach((tag)=>{
                        showPublicationTags(containerForAllLabels,tag)
                      })

                      const btnClose = boxPopupEdit.querySelector(".createPost__iconClose")
                      btnClose.addEventListener("click", ()=>{
                        closePopup(popupEdit)
                      })

                    })
                  })

                  btnsDelete.forEach((btnDelete)=>{
                    btnDelete.addEventListener("click",(e)=>{

                      e.preventDefault()
                      const ID_POST =btnDelete.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.idpublication
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

                            closePopup(popupRemove)
                            msjLoader.innerText ="Eliminado ✔"
                            popupLoader.remove()
                            console.log("eliminado")

                          }
                        }
                        removePublication()

                      })

                      btnCancel.addEventListener("click", ()=>{
                        closePopup(popupRemove)
                      })

                    })

                  })



                } catch (error) {
                  console.log(error)
                }

              }

              getUsersFromPublications()

            })
            if (postLoader) boxPosts.removeChild(postLoader)

          })

        } catch (error) {

          console.log(error)

        }

      }

    showPublications()

  }/* else if(userNameRegister == "point-account"){
    getDocPoint(userIdActive).then((response)=>{
      createPost.classList.add("createPost--space")
      if(response !== undefined && response.active_session == true){

        let pathImgPorfile = response.url_profile;

        if (response.url_profile == ""){
          pathImgPorfile = "../img/avatar.png"
        }

        createPost.innerHTML = publicationPostsPoint(response.name, pathImgPorfile)
        const descriptionOffer= sectionAllPost.querySelector(".createPost__Info")
        const dateStart= sectionAllPost.querySelector(".validUntil--start")
        const dateEnd= sectionAllPost.querySelector(".validUntil--end")
        const btnSave = sectionAllPost.querySelector(".btnSave")

        descriptionOffer.addEventListener("keyup",()=>{
          firstLetterCapitalized(descriptionOffer)
        })
        btnSave.addEventListener("click",(e)=>{
          e.preventDefault()
          createOffer(userIdActive, descriptionOffer.value, dateStart.value, dateEnd.value, "", "")
        })
      }

    })
    .catch((error)=>{
      console.log(error)
    })
  } */

  return sectionAllPost;
};
