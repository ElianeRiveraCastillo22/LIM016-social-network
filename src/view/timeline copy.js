import { tagsPost } from "../data/tags-post.js";
import { firstLetterCapitalized } from "../helpers/firstLetterCapitalized.js";
import { activateBtn } from "../helpers/activeBtn.js";
import { getDocUser, getPublished, getUserPublications } from "../firebase/firestore/get_document.js";
import { publicationPostsUser } from "./templates/createPost.js";
import { createPost } from "../firebase/firestore/add_document.js";
import { updatePhotoURL } from "../helpers/timeline-fuctions/timeline-funsctions.js";
import { updateLikesValues, updatePublicationID, updateTheIdentifiersOfUserPublications, updateWhoDeletedLike, updatesUsersWhoLike } from "../firebase/firestore/update_document.js";
import { skeletonOfTheUser, skeletonPublicationForm, skeletonPublications } from "./squeleton/index.js";
import { mainTimelineStructure } from "./templates/timeline.js";
import { templatePublicationForm } from "./templates/templatePublicationForm.js";
import { publicationLabelTemplate, templatePublications } from "./templates/publications.js";

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
            const tagsList = sectionAllPost.querySelector(".createTags__list");
            const containerForAllLabels = sectionAllPost.querySelector(".createpost__alltags");
            const createPostPoint = sectionAllPost.querySelector(".createPost__point");
            const createPostInfo = sectionAllPost.querySelector(".createPost__Info");
            const createPostStars=  sectionAllPost.querySelectorAll(".createPost__stars path");
            const containerPostStars=  sectionAllPost.querySelector(".createPost__stars");
            const btnSave = sectionAllPost.querySelector(".btnSave")
            const btnPostMessage = sectionAllPost.querySelector(".btnPost__message")
            const createPostFile = sectionAllPost.querySelector(".createPost__file input")

            let sortTags=tagsPost.sort();
            let allTagsItem = null;
            let passingScoreToPublish=0;
            let cardCreated = false
            let clickCounter =0
            let textOfTheChosenLabels=[]
            let pointScoring;

            function changeClasses(elem1,elem2,elem1remove,elem1add,elem2remove,elem2add) {

              elem1.classList.remove(elem1remove)
              elem1.classList.add(elem1add)

              elem2.classList.remove(elem2remove)
              elem2.classList.add(elem2add)

            }

            function createsTheListOfItems(valueVar,array,containeList) {

              for( valueVar of array){
                containeList.classList.add("createTags__list--open")
                let listItem=document.createElement("li")
                listItem.classList.add("allTags__item")
                listItem.innerText=valueVar
                containeList.appendChild(listItem)
              }

            }

            function createTag(textvalue) {

              let tagsChosen= sectionAllPost.querySelectorAll(".createpost__alltags li")
              console.log(tagsChosen)
              if(tagsChosen.length !== 0){
                let labelComparisons=[]
                tagsChosen.forEach((tagSelect)=>{
                  if(tagSelect.innerText==textvalue){
                    labelComparisons.push(true)
                  }else{
                    labelComparisons.push(false)
                  }
                })

                let evaluateIfTheLabelsAreSimilar = labelComparisons.every((value) => value == false)
                // si es true imprimir
                if(evaluateIfTheLabelsAreSimilar){

                  containerForAllLabels.innerHTML += publicationLabelTemplate( textvalue )
                  inputTags.value=""
                  textOfTheChosenLabels.push(textvalue)

                }else{

                  inputTags.value=""

                }

              }else{
                alltags.innerHTML += publicationLabelTemplate( textvalue )
                textOfTheChosenLabels.push(textvalue)
                inputTags.value=""
              }

            }

            function closeThelistTags() {
              tagsList.innerHTML=""
              changeClasses(inputTags,iconCreateTags,"createTags__input--focus","createTags__input--onFocus","createTags__aprove--focus","createTags__aprove--onFocus")
              tagsList.classList.remove("createTags__list--open")
            }

            inputTags.addEventListener("focus",()=>{

              function dimensionsTheWidthOfTheList() {

                const widthContentTags=contentTags.clientWidth
                tagsList.style.width=`${widthContentTags}px`

              }
              dimensionsTheWidthOfTheList()

              function createsTheListInTheFirstApproachInInput() {

                if(inputTags.value == ""){
                  let tag;
                  changeClasses(inputTags,iconCreateTags,"createTags__input--onFocus","createTags__input--focus","createTags__aprove--onFocus","createTags__aprove--focus")
                  createsTheListOfItems(tag,sortTags,tagsList)
                  allTagsItem=sectionAllPost.querySelectorAll(".allTags__item")

                }

              }
              createsTheListInTheFirstApproachInInput()

              inputTags.addEventListener("keyup", ()=>{

                let matchingWords = []
                let matchingValue=[]

                function filtersOutMatchingWords() {

                  tagsPost.forEach((tag)=>{
                    const cutTag = tag.slice(0,inputTags.value.length)
                    const evaluatesMatchingTags = cutTag.toLocaleLowerCase().includes(inputTags.value.toLocaleLowerCase());
                    matchingValue.push(evaluatesMatchingTags)

                    if(evaluatesMatchingTags){
                        tagsList.classList.add("createTags__list--open")
                        tagsList.innerHTML=""
                        matchingWords.push(tag)
                    }
                  })
                }
                filtersOutMatchingWords()

                function deletesTheListBecauseItDoesNotMatch () {

                  if(matchingValue.every((value)=> value==false)){
                    closeThelistTags()
                  }

                }
                deletesTheListBecauseItDoesNotMatch ()

                function addsStylesWhenDeletingTheIputValue() {
                  if(inputTags.value == ""){

                    changeClasses(inputTags,iconCreateTags,"createTags__input--onFocus","createTags__input--focus","createTags__aprove--onFocus","createTags__aprove--focus")

                  }
                }
                addsStylesWhenDeletingTheIputValue()

                function createsAListOfMatchingWords() {

                  let tag;
                  createsTheListOfItems(tag,matchingWords,tagsList)

                }
                createsAListOfMatchingWords()

                allTagsItem=sectionAllPost.querySelectorAll(".allTags__item")

              })

            })

/*             tagsList.addEventListener("pointerover",()=>{

              allTagsItem.forEach((tag)=>{

                tag.addEventListener("click",()=>{
                  closeThelistTags()
                  createTag(tag.innerText)
                  cardCreated = true
                  if(cardCreated){
                    passingScoreToPublish++
                    activateBtn(btnSave,3,passingScoreToPublish)
                  }

                })

              })

            }) */
/*             console.log(iconCreateTags)
            iconCreateTags.addEventListener("click",(e)=>{
              console.log(e)
              if(inputTags.value!==""){
                createTag(inputTags.value)
                cardCreated = true
                if(cardCreated){
                  passingScoreToPublish++
                  activateBtn(btnSave,3,passingScoreToPublish)
                }
              }

            }) */
            function createLabelsThroughInput() {
              if(inputTags.value!=="") createTag(inputTags.value)
            }
            iconCreateTags.addEventListener("click",createLabelsThroughInput)
/*             containerForAllLabels.addEventListener("pointerover",(e)=>{
                console.log(e)
                let tagCreated= containerForAllLabels.childNodes
                tagCreated.forEach((tag)=>{

                  if(tag.lastElementChild !== undefined){
                    tag.lastElementChild.addEventListener('click',(e)=>{
                      console.log(textOfTheChosenLabels);
                      tag.remove()
                    });
                  }

                })

            }) */
            containerForAllLabels.addEventListener("pointerover",(e)=>{
                console.log(e)
                let tagCreated= containerForAllLabels.childNodes
                tagCreated.forEach((tag)=>{

                  if(tag.lastElementChild !== undefined){
                    tag.lastElementChild.addEventListener('click',(e)=>{
                      console.log(textOfTheChosenLabels);
                      tag.remove()
                    });
                  }

                })

            })

            function addTheValueToTheStars() {

              containerPostStars.addEventListener("click",()=>{
                clickCounter++
                if(clickCounter==1){
                  passingScoreToPublish++
                  activateBtn(btnSave,3,passingScoreToPublish)
                }
              })

              createPostStars.forEach((star,indexStart)=>{
                star.addEventListener("click",()=>{
                  for(let i = 0; i <= indexStart; i++){
                    createPostStars[i].classList.add("puntuacion_escogida")
                  }

                  for(let i = indexStart+1; i<createPostStars.length; i++){
                    createPostStars[i].classList.remove("puntuacion_escogida")
                  }

                  pointScoring = indexStart + 1
                })
              })

            }
            addTheValueToTheStars()

            createPostPoint.addEventListener("keyup",()=>{
              closeThelistTags()
              firstLetterCapitalized(createPostPoint)

              if(createPostPoint.value.length==1){
                passingScoreToPublish++
                activateBtn(btnSave,3,passingScoreToPublish)
              }
            })

            inputTags.addEventListener("keyup",()=>{
              firstLetterCapitalized(inputTags)
            })

            createPostInfo.addEventListener("click",()=>{
              closeThelistTags()
              firstLetterCapitalized(createPostPoint)
            })

            publicationPosts.addEventListener("click",()=>{
              closeThelistTags()
            })

            btnSave.addEventListener("click",(e)=>{
              e.preventDefault()
              closeThelistTags()

              if(passingScoreToPublish<3){

                btnPostMessage.show()
                setTimeout(() => {
                  btnPostMessage.close()
                }, 1500);

              }else{
                let ms = Date.parse(new Date())
                console.log(ms)
                async function getPublicationIdentifier(){
                  try{
                    const ID_PUBLICATION = await createPost(
                      userIdActive,
                      createPostPoint.value,
                      createPostInfo.value,
                      textOfTheChosenLabels,
                      pointScoring,
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
                  }
                }
                getPublicationIdentifier()


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
                const boxProfile = sectionAllPost.querySelectorAll(".publicationPosts--profile")
                const publicationConfigurationoptions  = sectionAllPost.querySelectorAll(".boxProfile__popupEditorDelate")
                const btnsEdit = sectionAllPost.querySelectorAll(".popupEditorDelate__box--Edit")
                const btnsDelete = sectionAllPost.querySelectorAll(".popupEditorDelate__box--delete")
                iconsLike.forEach((iconLike)=>{
                  iconLike.addEventListener("click",()=>{
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
                btnsEdit.forEach((btnEdit)=>{
                  btnEdit.addEventListener("click", ()=>{
                    console.log(btnEdit)
                  })
                })
                btnsDelete.forEach((btnDelete)=>{
                  btnDelete.addEventListener("click",()=>{
                    console.log(btnDelete)
                  })
                })


              } catch (error) {
                console.log(error)
              }
            }
            
            getUsersFromPublications()
          })

          boxPosts.removeChild(postLoader)
          
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
