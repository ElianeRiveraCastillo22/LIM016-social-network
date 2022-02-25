import {
  savePost,
  onGetPosts,
  deletePost,
  getPost,
} from '../firebase/firestore/firestore-add.js';
import {updatePost, addLike} from '../firebase/firestore/fb-test.js';

let postDescription;
let postLike;
let postUser;
let cleanPost;
let userName;
let userPhoto;

export const currentUser = (user, name, photo) => {
  postUser = user;
  userName = name;
  userPhoto = photo;

  console.log(userPhoto);
};
currentUser();

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


export const timeline = () => {
  if (userPhoto == null) {
    userPhoto = './img/avatar.png';
  } else {
    userPhoto;
  }
  const showTimeline = `
  <form id="form" class="postForm">

    <div class="postUser">
      <div class="boxPerfil">
        <img class="perfil" src="${userPhoto}" alt="">
      </div>
      <p class="user">${userName}</p>
    </div>
    <textarea id="postDescription" class="postDescription"
    placeholder="¿Tienes alguna recomendación?" ></textarea>
    <div class="btnPost">

      <button id="btnSave" class="btnSave">Publicar</button>
    </div>


  </form>
  <div id="postsContainer"></div>
`;
  const divElemt = document.createElement('div');
  divElemt.setAttribute('class', 'containerPost');
  divElemt.innerHTML = showTimeline;
  divElemt.querySelector('#btnSave').addEventListener('click', addPost);

  cleanPost = divElemt.querySelector('#form');

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
  timelineFuntion();
  return divElemt;
};
