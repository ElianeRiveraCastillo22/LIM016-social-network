import {
  collection,
  addDoc,
  db,
  deleteDoc,
  getDoc,
  getDocs,
  doc,
  onSnapshot,
  orderBy,
} from '../configuraciones.js';

export const savePost = (date, description, like, name, photo, user) => {
  return addDoc(collection(db, 'post'), {
    date,
    description,
    like,
    name,
    photo,
    user,
  });
};

export const getPosts = () => {
  const posts = collection(db, 'post');
  return getDocs(posts, orderBy('date', 'desc'));
};

export const getPost = (id) => {
  return getDoc(doc(db, 'post', id));
};

export const onGetPosts = (callback) => {
  return onSnapshot(collection(db, 'post'), callback);
};

export const deletePost = (id) => {
  return deleteDoc(doc(db, 'post', id));
};
