import { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../../components/form-input/form-input.component'
import Button from '../button/button.component'
import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword } = formFields;


    //console.log(formFields)

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(password !== confirmPassword){
            alert('Passwords dont match'); 
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user, {displayName});

            resetFormFields();
        } catch (error) {
            console.log('Error creating the user with email and password',error)
        }
    }

    const handleEvent = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})

    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with you email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label ='DisplayName' type='text' required onChange={handleEvent} name='displayName' value={displayName}/>
                <FormInput label ='Email' type ='email' required onChange={handleEvent} name='email' value={email}/>
                <FormInput label ='Password' type='password' required onChange={handleEvent} name='password' value={password}/>       
                <FormInput label ='Confirm Password' type='password' required onChange={handleEvent} name='confirmPassword' value={confirmPassword}/>
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;