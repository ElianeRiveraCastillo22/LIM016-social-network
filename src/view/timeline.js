import { tagsPost } from "../data/tags-post.js";
import { firstLetterCapitalized } from "../helpers/firstLetterCapitalized.js";
import { activateBtn } from "../helpers/activeBtn.js";
import { getDocPoint, getDocUser } from "../firebase/firestore/get_document.js";
import { publicationPostsPoint, publicationPostsUser } from "./templates/createPost.js";

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
  let userNameRegiste= localStorage.getItem('nameRegister')

  sectionAllPost.innerHTML =`
    <div class="box--posts">
      <span class="loader"></span>
    </div>
  `

  if(userNameRegiste=="user-account"){
    getDocUser(userIdActive).then((response)=>{

      if(response !== undefined && response.active_session == true){
        console.log(response)
        let pathImgPorfile = response.url_profile;
        if (response.url_profile == ""){
          pathImgPorfile = "../img/avatar.png"
        }

        sectionAllPost.innerHTML = publicationPostsUser(response.name, pathImgPorfile)

        const contentTags = sectionAllPost.querySelector(".createTags");
        const inputTags = sectionAllPost.querySelector(".createTags__input");
        const iconCreateTags = sectionAllPost.querySelector(".createTags__aprove");
        const tagsList = sectionAllPost.querySelector(".createTags__list");
        const alltags = sectionAllPost.querySelector(".createpost__alltags");
        const createPostPoint = sectionAllPost.querySelector(".createPost__point");
        const createPostInfo = sectionAllPost.querySelector(".createPost__Info");
        const publicationPosts = sectionAllPost.querySelector(".publicationPosts");
        const createPostStars=  sectionAllPost.querySelectorAll(".createPost__stars img");
        const containerPostStars=  sectionAllPost.querySelector(".createPost__stars");
        const btnSave = sectionAllPost.querySelector(".btnSave")
        const btnPostMessage = sectionAllPost.querySelector(".btnPost__message")
        const createPostFile = sectionAllPost.querySelector(".createPost__file input")

        let sortTags=tagsPost.sort();
        let allTagsItem = null;
        let passingScoreToPublish=0;
        let cardCreated = false
        let clickCounter =0

        console.log(inputTags);
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

          let tagChosen= sectionAllPost.querySelectorAll(".createpost__alltags li")

          function createElementTag(text) {
            const contentTag= `
            <li class="createpost__tag">
                <p class="createpost__txt" >${text}</p>
                <figure class="createpost__figure">
                  <img class="createpost__img" src="../../img/iconos/close-post.svg" />
                </figure>
            </li>
            `
            return contentTag
          }

          if(tagChosen.length !== 0){
            let labelComparisons=[]
            tagChosen.forEach((tagSelect)=>{
              if(tagSelect.innerText==textvalue){
                labelComparisons.push(true)
              }else{
                labelComparisons.push(false)
              }
            })

            let evaluateIfTheLabelsAreSimilar = labelComparisons.every((value) => value == false)
            // si es true imprimir
            if(evaluateIfTheLabelsAreSimilar){

              alltags.innerHTML += createElementTag(textvalue)
              inputTags.value=""

            }else{

              inputTags.value=""

            }

          }else{
            alltags.innerHTML += createElementTag(textvalue)
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

        tagsList.addEventListener("pointerover",()=>{

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

        })

        iconCreateTags.addEventListener("click",()=>{

          if(inputTags.value!==""){
            createTag(inputTags.value)
            cardCreated = true
            if(cardCreated){
              passingScoreToPublish++
              activateBtn(btnSave,3,passingScoreToPublish)
            }
          }

        })

        alltags.addEventListener("pointerover",()=>{

            let tagCreated= alltags.childNodes
            tagCreated.forEach((tag)=>{

              if(tag.lastElementChild !== undefined){
                tag.lastElementChild.addEventListener('click',(e)=>{
                  tag.remove()
                });
              }

            })

        })

        // Create add the value of stars
        let pointScoring;

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

            passingScoreToPublish=0

            const createpostTag=document.querySelectorAll(".createpost__tag")
            let textOfTheChosenLabels = []
            createpostTag.forEach((tag)=>{
              textOfTheChosenLabels.push(tag.innerText)
            })

            console.log(textOfTheChosenLabels)
            console.log(createPostPoint.value);
            console.log(createPostInfo.value);
            console.log(pointScoring);
            console.log(createPostFile.value);
          }
        })

      }

    })
    .catch((error)=>{
      console.log(error)
    })
  }else if(userNameRegiste == "point-account"){
    getDocPoint(userIdActive).then((response)=>{

      if(response !== undefined && response.active_session == true){
        let pathImgPorfile = response.url_profile;
        if (response.url_profile == ""){
          pathImgPorfile = "../img/avatar.png"
        }
        sectionAllPost.innerHTML = publicationPostsPoint(response.name, pathImgPorfile)
        const descriptionOffer= sectionAllPost.querySelector(".createPost__Info")
        const dateStart= sectionAllPost.querySelector(".validUntil--start")
        const dateEnd= sectionAllPost.querySelector(".validUntil--end")
        const btnSave = sectionAllPost.querySelector(".btnSave")
        console.log(btnSave);
        descriptionOffer.addEventListener("keyup",()=>{
          firstLetterCapitalized(descriptionOffer)
        })
        btnSave.addEventListener("click",(e)=>{
          e.preventDefault()
          console.log(dateStart.value);
          console.log(dateEnd.value);

        })
      }

    })
    .catch((error)=>{
      console.log(error)
    })
  }


  return sectionAllPost;
};
