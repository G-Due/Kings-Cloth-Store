// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
}
    from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    getDocs,
    query
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChuX1tes7PGGQJdWktzZWNsZj2v0enlDc",
    authDomain: "king-db-6b184.firebaseapp.com",
    projectId: "king-db-6b184",
    storageBucket: "king-db-6b184.appspot.com",
    messagingSenderId: "473434563871",
    appId: "1:473434563871:web:33e090fbaf46ee4ac47c2a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = async () => {
    return await signInWithPopup(auth, provider)
};

export const signInWithGoogleRedirect = () => {
    signInWithRedirect(auth, provider)
};

export const db = getFirestore();

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const batch = writeBatch(db);
    const collectionRef = collection(db, collectionKey);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnaphot => docSnaphot.data());
    /*const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
    return categoryMap;*/
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,
                {
                    displayName,
                    email,
                    createdAt,
                    ...additionalInformation
                });
        } catch (error) {
            console.log('Error creating the user', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
    await signOut(auth);
}

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback)
}