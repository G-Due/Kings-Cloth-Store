import { useState} from 'react'
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    //console.log(formFields)


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        console.log(user.uid);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            //console.log(user);

            resetFormFields();
        } catch (error) {

            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password');
                    break;

                case 'auth/user-not-found':
                    alert('No user found')
                    break;
                default:
                    console.log(error);

            }
            console.log('Error with the email and password', error)
        }
    }

    const handleEvent = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })

    }

    return (
        <div className='sign-up-container'>
            <div>Sign In Works</div>
            <h2>Already have an account?</h2>
            <span>Sign in with you email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' required onChange={handleEvent} name='email' value={email} />
                <FormInput label='Password' type='password' required onChange={handleEvent} name='password' value={password} />
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;