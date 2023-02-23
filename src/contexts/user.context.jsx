import { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils'

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };
    //signOutUser();
    const createNewUser = async (user)=> {
        await createUserDocumentFromAuth(user);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user)=>{
            if(user){
                createNewUser(user);
            }
            setCurrentUser(user)
            
        })
        return unsubscribe;
    },[])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};