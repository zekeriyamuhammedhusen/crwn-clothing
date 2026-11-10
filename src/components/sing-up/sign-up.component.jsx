import React from "react";
import FormInput from "../form-input/form-input.component";

import CustemButton from "../custem-button/custem-button.component";
import { auth,createUserProfileDocument } from "../../firebase/firebase.utils";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './sign-up.styles.scss'

class SignUp extends React.Component{
    constructor(){
        super();
        this.state = {
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    }

    handlesubmit = async Event =>{
        Event.preventDefault();
        const  {displayName,email,password,confirmPassword} = this.state
        if(password !== confirmPassword){
            alert("passwords don't match");
            return;
        }
        try{
            const {user} = await createUserWithEmailAndPassword(auth,email,password);
            await createUserProfileDocument(user,{displayName})
            this.setState({
                displayName:'',
                email:'',
                password:'',
                confirmPassword:''

            })


        }catch(error){
        console.error(error)

        }

    }
    handleChange = Event => {
        const {name,value} = Event.target;

        this.setState({[name]: value})
    }
    render(){
        const  {displayName,email,password,confirmPassword} = this.state
        return(
            <div className="sign-up">
               < h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>
               <form className="sign-up-form" onSubmit={this.handlesubmit}>
                <FormInput 
                type='text'
                name='displayName'
                value={displayName} 
                onChange={this.handleChange}
                label='Display Name'
                required/>
                <FormInput 
                type='email'
                name='email'
                value={email} 
                onChange={this.handleChange}
                label='Email'
                required/>
                <FormInput 
                type='password'
                name='password'
                value={password} 
                onChange={this.handleChange}
                label='Password'
                required/>
                <FormInput 
                type='password'
                name='confirmPassword'
                value={confirmPassword} 
                onChange={this.handleChange}
                label='Confirm Password'
                required/> 
                <CustemButton type='submit'>SIGN UP</CustemButton>   
               

               </form>

            </div>
        )
    }
}

export default SignUp
