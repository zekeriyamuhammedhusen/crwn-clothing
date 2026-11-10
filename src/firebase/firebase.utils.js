
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { getFirestore,
      doc,
      getDoc,
      setDoc
    } from 'firebase/firestore';

const config = {
  apiKey: "AIzaSyDZG-u0ZkHa01TV0gF1lLMSX6ADImc23WI",
  authDomain: "crwn-db-2e5ea.firebaseapp.com",
  projectId: "crwn-db-2e5ea",
  storageBucket: "crwn-db-2e5ea.firebasestorage.app",
  messagingSenderId: "296852823974",
  appId: "1:296852823974:web:c43f179703d4fd97bb7967",
  measurementId: "G-LEGYWGK0S1"
};

export const createUserProfileDocument = async (userAuth,
    additionalData = {}

) => {
  if (!userAuth) return;

  const userRef = doc(firestore, 'users',  userAuth.uid);

  const snapShot = await getDoc(userRef);

 if(!snapShot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
    
  }
  return userRef;
}

const app = initializeApp(config);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const signInWithGoogle = () =>
  signInWithPopup(auth, provider);

export default app;
