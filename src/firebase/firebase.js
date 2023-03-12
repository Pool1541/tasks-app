// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, setDoc, doc, getDoc, query, where, getDocs, updateDoc, onSnapshot, orderBy, deleteDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);

export async function registerNewUser(user) {
  try {
    const collectionRef = collection(db, 'users');
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  await auth.signOut();
}

export async function userExist(uid) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}

export async function getUserData(uid) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function existsUsername(username) {
  const users = [];
  const collectionRef = collection(db, 'users');
  const q = query(collectionRef, where('username', '==', username));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(doc => {
    users.push(doc.data());
  });

  return users.length > 0 ? true : false;
}

export async function updateUser(uid, changes) {
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, changes);
}

export async function getInfo(uid){
  const data = [];
  const collectionRef = collection(db, 'tasks');
  const q = query(collectionRef, orderBy('timestamp','asc'), where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    const temp = doc.data();
    temp.id = doc.id;
    data.unshift(temp);
  });
  return data;
}

export async function getList(id) {
  const docRef = doc(db, 'tasks', id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function updateTask(id, changes) {
  const docRef = doc(db, 'tasks', id);
  await updateDoc(docRef, changes);
}

export async function updateListName(id, changes) {
  const docRef = doc(db,'tasks',id);
  await updateDoc(docRef, changes);
} 

export function onChanges(callback){
  onSnapshot(collection(db, 'tasks'), callback);
}

export async function setNewList(newList) {
  const collectionRef = collection(db, 'tasks');
  const docRef = doc(collectionRef);
  await setDoc(docRef, newList);
}

export async function deleteTask(id, tasks) {
  const docRef = doc(db,'tasks',id);
  await updateDoc(docRef, tasks);
}

export async function deleteList(id) {
  const docRef = doc(db, 'tasks', id);
  await deleteDoc(docRef);
}