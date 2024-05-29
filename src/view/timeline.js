import { defaultLabelData } from "../data/tags-post.js";
import { firstLetterCapitalized } from "../helpers/firstLetterCapitalized.js";
import { activateBtn } from "../helpers/activeBtn.js";
import { getDocUser, getPublished, getUserPublications } from "../firebase/firestore/get_document.js";
import { publicationPostsUser } from "./templates/createPost.js";
import { createPost } from "../firebase/firestore/add_document.js";
import { updatePhotoURL } from "../helpers/timeline-fuctions/timeline-funsctions.js";
import { updateLikesValues, updatePublicationID, updateTheIdentifiersOfUserPublications, updateWhoDeletedLike, updatesUsersWhoLike } from "../firebase/firestore/update_document.js";
import { skeletonOfTheUser, skeletonPublicationForm, skeletonPublications, templateLoader } from "./squeleton/index.js";
import { mainTimelineStructure } from "./templates/timeline.js";
import { templatePublicationForm } from "./templates/templatePublicationForm.js";
import { popupRemovePublication, publicationLabelTemplate, templatePublications } from "./templates/publications.js";
import { deletePublicationDocument } from "../firebase/firestore/delete_document.js";

export const Timeline = () => {
  const mainContainer = document.getElementById("container")
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
  const formToCreatePublication = sectionAllPost.querySelector(".createPost--user")
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
              boxCreatePost.innerHTML = templatePublicationForm( USER_DATA.name, updatePhotoURL(USER_DATA))
            }
            showPublicationForm()

            const contentTags = sectionAllPost.querySelector(".createTags");
            const inputTags = sectionAllPost.querySelector(".createTags__input");
            const iconCreateTags = sectionAllPost.querySelector(".createTags__aprove");
            const defaultLabelListContainer = sectionAllPost.querySelector(".createTags__list");
            const containerForAllLabels = sectionAllPost.querySelector(".createpost__alltags");
            const createPostPoint = sectionAllPost.querySelector(".createPost__point");
            const formInformationInput = sectionAllPost.querySelector(".createPost__Info");
            const ratingContainer =  sectionAllPost.querySelectorAll(".createPost__stars path");
            const containerPostStars=  sectionAllPost.querySelector(".createPost__stars");
            const btnToSaveThePublication = sectionAllPost.querySelector(".btnSave")
            const btnPostMessage = sectionAllPost.querySelector(".btnPost__message")

            let textOfTheChosenLabels=[]
            let pointScoring;

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

            function activateTheSubmitBtn() {

              function areTheEntriesCompleted(fieldsToFillIn) {
                return fieldsToFillIn.classList.contains("completed")
              }

              if( areTheEntriesCompleted(createPostPoint) &&
                  areTheEntriesCompleted(formInformationInput) &&
                  areTheEntriesCompleted(containerForAllLabels) &&
                  areTheEntriesCompleted(containerPostStars)
              ){
                btnToSaveThePublication.classList.remove("btn--disebled")
                btnToSaveThePublication.classList.add("btn--active")
              }else{
                btnToSaveThePublication.classList.add("btn--disebled")
                btnToSaveThePublication.classList.remove("btn--active")
              }

            }

            function showDefaultTags(defaultTagListData,defaultLabelListContainer) {

              defaultTagListData.forEach((defaultTag)=>{

                defaultLabelListContainer.classList.add("createTags__list--open")
                let listItem=document.createElement("li")
                listItem.classList.add("allTags__item")
                listItem.innerText=defaultTag
                defaultLabelListContainer.appendChild(listItem)

              })

            }

            function createTag(textvalue) {

              let tagsChosen= sectionAllPost.querySelectorAll(".createpost__alltags li")
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
              activateTheSubmitBtn()
            }

            function closeThelistTags() {

              defaultLabelListContainer.innerHTML=""
              changeClasses(inputTags,iconCreateTags,"createTags__input--focus","createTags__input--onFocus","createTags__aprove--focus","createTags__aprove--onFocus")
              defaultLabelListContainer.classList.remove("createTags__list--open")

            }

            inputTags.addEventListener("focus",()=>{

              function dimensionsTheWidthOfTheList() {

                const widthContentTags=contentTags.clientWidth
                defaultLabelListContainer.style.width=`${widthContentTags}px`

              }
              dimensionsTheWidthOfTheList()

              function createsTheListInTheFirstApproachInInput() {

                if(!inputTags.value){
                  changeClasses(inputTags,iconCreateTags,"createTags__input--onFocus","createTags__input--focus","createTags__aprove--onFocus","createTags__aprove--focus")
                  const sortTags = defaultLabelData.sort((a, b) => a.localeCompare(b));
                  showDefaultTags(sortTags,defaultLabelListContainer)
                }

              }
              createsTheListInTheFirstApproachInInput()

            })

            inputTags.addEventListener("keyup", ()=>{

              let matchingWords = []
              let matchingValues=[]

              function filtersOutMatchingWords() {

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
              filtersOutMatchingWords()

              function deletesTheListBecauseItDoesNotMatch () {

                const allDefaultLabelsDoNotMatch = matchingValues.every((value)=> value==false)
                if(allDefaultLabelsDoNotMatch) closeThelistTags()

              }
              deletesTheListBecauseItDoesNotMatch()

              function addsStylesWhenDeletingTheIputValue() {

                if(!inputTags.value) changeClasses(inputTags,iconCreateTags,"createTags__input--onFocus","createTags__input--focus","createTags__aprove--onFocus","createTags__aprove--focus")

              }
              addsStylesWhenDeletingTheIputValue()

              showDefaultTags(matchingWords,defaultLabelListContainer)

            })

            function identifyTheDefaultLabelList() {

              const allTagsByDefauld = sectionAllPost.querySelectorAll(".allTags__item");

              allTagsByDefauld.forEach((defaultTag)=>{
                defaultTag.addEventListener("click",()=>{

                  closeThelistTags()
                  createTag(defaultTag.innerText)

                })
              })
            }

            defaultLabelListContainer.addEventListener("pointerover", identifyTheDefaultLabelList)

            function createLabelsThroughInput() {

              if(inputTags.value) createTag(inputTags.value)

            }

            iconCreateTags.addEventListener("click",createLabelsThroughInput)

            function identifyTheLabelArea() {

              const defaultLabelListContainer = Object.values(containerForAllLabels.childNodes).filter((nodes,indexNodes)=>{return indexNodes % 2 !== 0})

              defaultLabelListContainer.forEach((tag)=>{

                function removeTags() {

                  const tagIndex = textOfTheChosenLabels.findIndex(textTag=>textTag== tag.firstElementChild.innerText)
                  textOfTheChosenLabels.splice(tagIndex,1)
                  tag.remove()
                  if(textOfTheChosenLabels.length==0){
                    containerForAllLabels.classList.add("incomplete")
                    containerForAllLabels.classList.remove("completed") 

                  }else{
                    containerForAllLabels.classList.add("completed")
                    containerForAllLabels.classList.remove("incomplete")
                  }

                  activateTheSubmitBtn()

                }

                const removeIcon = tag.lastElementChild
                if(removeIcon) removeIcon.addEventListener('click',removeTags)

              })

            }
            containerForAllLabels.addEventListener("pointerover", identifyTheLabelArea)

            function addTheValueToTheStars() {

              ratingContainer.forEach((star,indexStart)=>{

                function paintTheStars() {

                  for(let i = 0; i <= indexStart; i++){
                    ratingContainer[i].classList.add("puntuacion_escogida")
                  }

                  for(let i = indexStart+1; i<ratingContainer.length; i++){
                    ratingContainer[i].classList.remove("puntuacion_escogida")
                  }

                  pointScoring = indexStart + 1

                  if(pointScoring){
                    containerPostStars.classList.add("completed")
                    containerPostStars.classList.remove("incomplete")
                  }else{
                    containerPostStars.classList.add("incomplete")
                    containerPostStars.classList.remove("completed")
                  }

                  activateTheSubmitBtn()

                }

                star.addEventListener("click", paintTheStars)

              })

            }
            addTheValueToTheStars()

            createPostPoint.addEventListener("keyup",()=>{

              closeThelistTags()
              firstLetterCapitalized(createPostPoint)
              addClassIfComplete(createPostPoint)
              activateTheSubmitBtn()

            })

            inputTags.addEventListener("keyup",()=>{
              firstLetterCapitalized(inputTags)
            })

            formInformationInput.addEventListener("keyup",()=>{
              addClassIfComplete(formInformationInput)
              activateTheSubmitBtn()
            })

            formInformationInput.addEventListener("click",()=>{
              closeThelistTags()
              firstLetterCapitalized(createPostPoint)
            })

            publicationPosts.addEventListener("click",()=>{
              closeThelistTags()
            })

            btnToSaveThePublication.addEventListener("click",(e)=>{
              e.preventDefault()
              closeThelistTags()

              if( btnToSaveThePublication.classList.contains("btn--active") ){

                let ms = Date.parse(new Date())

                async function getPublicationIdentifier(){

                  try{

                      const ID_PUBLICATION = await createPost(
                      userIdActive,
                      createPostPoint.value,
                      formInformationInput.value,
                      textOfTheChosenLabels,
                      pointScoring,
                      "",
                      "",
                      ms,
                      0,
                      []
                    )

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
                      pointScoring = 0

                    }

                    clearTheFieldsOfThePublicationForm()
                    updatePublicationID("user-publication",ID_PUBLICATION.id,{"id_post":ID_PUBLICATION.id})
                    updateTheIdentifiersOfUserPublications("user-account", userIdActive, ID_PUBLICATION.id)

                  }catch(error){
                    console.log(error)
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

          await getUserPublications((posts)=>{

            let allPostHome = ''

            posts.forEach((post)=>{

              async function getUsersFromPublications() {

                try {

                  const otherUsers = await getUser(post.data().id_user)
                  allPostHome = templatePublications(post.data(), otherUsers, userIdActive, allPostHome )
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

                      const ID_POST =btnEdit.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.idpublication

                      /* const popupEdit = sectionAllPost.querySelector(".popup__dialog")
                      const boxPopupEdit = document.createElement("div")

                      boxPopupEdit.classList.add("createPost")
                      boxPopupEdit.classList.add("box__createPost")
                      boxPopupEdit.classList.add("createPost--space")

                      boxPopupEdit.innerHTML = templatePublicationForm("Eliane Juana","")
                      popupEdit.appendChild(boxPopupEdit)

                      popupEdit.show()
                      popupEdit.classList.add("popup__dialog--center") */

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
