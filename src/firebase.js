import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: "AIzaSyBLD6-yzO1gAptuQslyzLZSRq5oqEkdQSE",
  authDomain: "netflix-clone-61d4c.firebaseapp.com",
  projectId: "netflix-clone-61d4c",
  storageBucket: "netflix-clone-61d4c.appspot.com", 
  messagingSenderId: "259273899795",
  appId: "1:259273899795:web:30f9cf62766f1243afe4e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });

    alert('User signed up successfully!');
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
};

const login= async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error)
       toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = ()=>{
    signOut(auth)
}



export { auth, db, signup,login,logout };
