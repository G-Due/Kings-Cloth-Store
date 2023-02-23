//import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils'
//import { useEffect } from 'react'
//import { getRedirectResult } from 'firebase/auth'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import SignInForm from '../../components/sign-in-form/sign-in-form.component'

import './authentication.styles.scss'

const Authentication = () => {

    /*Use to get the redirect response from GoogleRedirect
    useEffect(() => {
        async function getResponse() {
            const response = await getRedirectResult(auth);
            console.log(response)
        }
        getResponse();
    }, [])*/

    return (
        <div className = 'authentication-container'>
            <div>Authentication Working</div>
            <SignInForm/>
            {/*<button onClick={logGoogleUser}> Sign with Google</button>
            <button onClick={signInWithGoogleRedirect}> Sign with Google Redirect</button>*/}
            <SignUpForm/>
        </div>
    )
}

export default Authentication;