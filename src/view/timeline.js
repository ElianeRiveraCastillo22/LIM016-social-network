/* import {
  savePost,
  onGetPosts,
  deletePost,
  getPost,
} from '../firebase/firestore/firestore-add.js'; */
/* import {updatePost, addLike} from '../firebase/firestore/fb-test.js'; */

import { tagsPost } from "../data/tags-post.js";
import { userActive } from "../firebase/auth/auth_state_listener.js";
import { createUser } from "../helpers/functions.js";
/* import { publicationPosts } from "./templates/createPost.js"; */

/* export const currentUser = (user, name, photo) => {
  postUser = user;
  userName = name;
  userPhoto = photo;

  console.log(userPhoto);
};
currentUser(); */
/*  let postDescription;
let postLike;
let postUser;
let cleanPost;
let userName;
let userPhoto;



const addPost = (e) => {
  e.preventDefault();

  postDescription = e.target.closest('form')
      .querySelector('#postDescription').value;
  postLike = [];
  const postDescriptionVerified = postDescription.replace(/\s+/g, '');
  const date = new Date();

  const postDate = date.getTime();

  console.log(postDate);

  if (postDescriptionVerified !== '') {
    savePost(
        postDate, postDescription, postLike, userName, userPhoto, postUser);
    cleanPost.reset();
  };
};
 */
/* CreatePost */

export const Timeline = () => {
/*   if (userPhoto == null) {
    userPhoto = './img/avatar.png';
  } else {
    userPhoto;
  } */

  const sectionAllPost = document.createElement('section');
  sectionAllPost.setAttribute('class', 'section--posts');

  const heightHead=document.querySelector("#navegador")
  function resizeSpaceBetweenHeaderAndMain() {

    let missingValue = 65 - heightHead.clientHeight
    sectionAllPost.style.top=`${heightHead.clientHeight+ missingValue +16}px`

  }
  resizeSpaceBetweenHeaderAndMain()
  createUser(userActive,sectionAllPost)

  const contentTags = sectionAllPost.querySelector(".createTags")
  const inputTags= sectionAllPost.querySelector(".createTags__input")
  const iconCreateTags= sectionAllPost.querySelector(".createTags__aprove")
  const tagsList = sectionAllPost.querySelector(".createTags__list")
  const alltags= sectionAllPost.querySelector(".createpost__alltags")
  const createPostPoint = sectionAllPost.querySelector(".createPost__point")
  const createPostInfo = sectionAllPost.querySelector(".createPost__Info")
  const publicationPosts= sectionAllPost.querySelector(".publicationPosts")

  let sortTags=tagsPost.sort()
  let allTagsItem = null;
  let labelThatIsClicked= undefined;

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

    const tagChosen= sectionAllPost.querySelectorAll(".createpost__alltags li")
    const elemtTag = document.createElement("li")
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

        elemtTag.innerText = textvalue
        alltags.appendChild(elemtTag)
        inputTags.value=""

      }else{

        inputTags.value=""

      }

    }else{

      elemtTag.innerText = textvalue
      alltags.appendChild(elemtTag)
      inputTags.value=""

    }

  }

  inputTags.addEventListener("focus",()=>{

    function dimensionsTheWidthOfTheList() {

      const widthContentTags=contentTags.clientWidth
      tagsList.style.width=`${widthContentTags}px`

    }
    dimensionsTheWidthOfTheList()

    function createsTheListInTheFirstApproachInInput() {

      if(inputTags.value == ""){

        changeClasses(inputTags,iconCreateTags,"createTags__input--onFocus","createTags__input--focus","createTags__aprove--onFocus","createTags__aprove--focus")
        let tag;
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

          tagsList.classList.remove("createTags__list--open")
          changeClasses(inputTags,iconCreateTags,"createTags__input--focus","createTags__input--onFocus","createTags__aprove--focus","createTags__aprove--onFocus")
          tagsList.innerHTML=""

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

      tag.addEventListener("click",(e)=>{
        labelThatIsClicked = tag.innerText
        tagsList.innerHTML=""
        tagsList.classList.remove("createTags__list--open")
        changeClasses(inputTags,iconCreateTags,"createTags__input--focus","createTags__input--onFocus","createTags__aprove--focus","createTags__aprove--onFocus")
        createTag(labelThatIsClicked)

      })

    })

  })

  iconCreateTags.addEventListener("click",()=>{
    if(inputTags.value!==""){
      createTag(inputTags.value)
    }

  })
  createPostPoint.addEventListener("click",()=>{
    tagsList.innerHTML=""
    changeClasses(inputTags,iconCreateTags,"createTags__input--focus","createTags__input--onFocus","createTags__aprove--focus","createTags__aprove--onFocus")
    tagsList.classList.remove("createTags__list--open")
  })
  createPostInfo.addEventListener("click",()=>{
    console.log("click en create text area")
    tagsList.innerHTML=""
    changeClasses(inputTags,iconCreateTags,"createTags__input--focus","createTags__input--onFocus","createTags__aprove--focus","createTags__aprove--onFocus")
    tagsList.classList.remove("createTags__list--open")

  })
  publicationPosts.addEventListener("click",()=>{
    console.log("fuera de")
    tagsList.innerHTML=""
    changeClasses(inputTags,iconCreateTags,"createTags__input--focus","createTags__input--onFocus","createTags__aprove--focus","createTags__aprove--onFocus")
    tagsList.classList.remove("createTags__list--open")

  })

/*   const dataUserGoogle=async(dataUser)=>{
    const prueba = await dataUser
    divElemt.innerHTML = CreatePost(prueba.displayName);
  } */
  /* dataUserGoogle(userActive) */
  //necesito guaradr los datos de user active
  

  /* console.log(firebase.auth.Auth.Persistence.LOCAL) */
/*   divElemt.querySelector('#btnSave').addEventListener('click', addPost);

  cleanPost = divElemt.querySelector('#form'); */
/* 
  let allPosts;
  let showAllPosts;
  let allLikes;

  const timelineFuntion = async () => {
    if (postUser == null) {
      alert('Inicia sesión para disfrutar de nuestro contenido');
    } else {
      await onGetPosts((callback) => {
        allPosts = '';
        callback.forEach((doc) => {
          const likes = doc.data().like.length;
          if (likes == 0) {
            allLikes = '';
          } else {
            allLikes = doc.data().like.length;
          }

          allPosts += `
      <form class="postForm">
        <div class="divRow">
          <div class="postSection">
            <div class="postUser">
              <div class="boxPerfil">
                <img class="perfil" src="${doc.data().photo}" alt="">
              </div>
              <p class="user">${doc.data().name}</p>
            </div>
            <textarea id="postDescription" class="postDescription"
              data-id="${doc.id}" disabled>
                ${doc.data().description}</textarea>
            <div class="divBtbUpdate">
              <button class='btnUpdate' data-id="${doc.id}"> Guardar</button>
            </div>
          </div>
          <div class="iconPosts">

            <i class="fas fa-trash-alt btnDelete iconPost"
            data-id="${doc.id}"></i>
            <i class="fas fa-pencil-alt btnEdit iconPost"
            data-id="${doc.id}"></i>
            <div class="divbtnLike">
              <i class="fas fa-heart btnLike iconPost" data-id="${doc.id}"></i>
              <span class='postsLike'
                data-like="${doc.id}">${allLikes}</span>
            </div>

          </div>
        </div>
      </form>
      `;
        });
        showAllPosts = document.querySelector('#postsContainer');
        showAllPosts.innerHTML = allPosts;

        // like
        const btnLike = divElemt.querySelectorAll('.btnLike');

        btnLike.forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            e.preventDefault();

            const likeID = e.target.dataset.id;
            const doc = await getPost(likeID);
            const dataLikes = doc.data().like;
            const totalLikes = dataLikes;

            if (totalLikes.includes(postUser) == false) {
              totalLikes.push(postUser);
              await addLike(likeID, totalLikes);
            } else {
              const dislike = totalLikes.filter((user) => user !== postUser);
              await addLike(likeID, dislike);
            }
          });
        });

        // para eliminar
        const btnDelete = divElemt.querySelectorAll('.btnDelete');

        btnDelete.forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const btnDeleteID = e.target.dataset.id;

            const doc = await getPost(btnDeleteID);
            const dataUser = doc.data().user;
            console.log(postUser, dataUser, btnDeleteID);

            if (postUser == dataUser) {
              if (confirm('¿Desea eliminar esta publicación?')) {
                await deletePost(btnDeleteID);
              }
            }
          });
        });

        const btnEdit = divElemt.querySelectorAll('.btnEdit');

        let btnEditID;
        let textAreaEdit;

        btnEdit.forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            e.preventDefault();

            btnEditID = e.target.dataset.id;
            textAreaEdit = divElemt.querySelector(`[data-id="${btnEditID}"]`);

            const doc = await getPost(btnEditID);
            const dataUser = doc.data().user;

            if (postUser == dataUser) {
              textAreaEdit.disabled = false;
            } else {
              console.warn('El post NO es tuyo');
            }
          });
        });

        const btnUpdate = divElemt.querySelectorAll('.btnUpdate');

        btnUpdate.forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            e.preventDefault();

            const btnUpdateID = e.target.dataset.id;
            const textAreaEdit = divElemt.querySelector(
                `[data-id="${btnUpdateID}"]`,
            );
            const doc = await getPost();
            const dataUser = doc.data().user;
            const textEditVerified = textAreaEdit.value.replace(/\s+/g, '');

            if (postUser == dataUser) {
              if (textEditVerified !== '') {
                await updatePost(textAreaEdit.dataset.id, textAreaEdit.value);
              } else {
                alert('ups, el campo esta vacio');
              }
            }
          });
        });
      });
    }
  };
  timelineFuntion(); */
  return sectionAllPost;
};
