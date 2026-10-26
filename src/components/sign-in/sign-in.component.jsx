import React from 'react';
import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustemButton from '../custem-button/custem-button.component';
import {signInWithGoogle} from '../../firebase/firebase.utils';

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email:'',
            password:''
        }
    }
    handleSubmit = event =>{
        event.preventDefault();
        this.setState({email:'',password:''})
    }
    handleChange = event =>{
        const {value,name} = event.target;
        this.setState({[name]:value})
    }

    render(){
        return(
            <div className='sign-in'>
                <h2 className='title'>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit} className='sign-in-form'>
                    <FormInput 
                    name='email' 
                    label='Email'
                    value={this.state.email}
                    handleChange={this.handleChange}
                    required/>
                    <FormInput 
                    label='Password'
                    name='password'
                    type='password'
                    value={this.state.password}
                    handleChange={this.handleChange}
                    onChange={this.handleChange}
                    required/>
                    <div className="buttons">
                    <CustemButton type="submit">
                        Sign In
                    </CustemButton>

                    <CustemButton
                        type="button"
                        onClick={signInWithGoogle}
                        isGoogleSignIn
                    >
                        Sign In with Google
                    </CustemButton>
</div>
                </form>

            </div>
        )
    }
}

export default SignIn;