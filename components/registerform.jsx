import React, {Component} from 'react';
import Joi from '../node_modules/joi-browser';
import {withRouter} from 'next/router';
import Form from "./form";
import Input from "./input";
import {be} from "/config/config.js";

class RegisterForm extends Form{
    constructor(){
        super();
        this.state.data = {email: "", password: "", username: "", passwordConfirmation: "" };
        this.state.errors = {};
        this.state.emailSent = false;
        this.state.registrationInitiated = false;
        const schema = {
            username: Joi.string().alphanum().min(3).max(30).required(),
            // password: Joi.string().regex(/^[a-zA-Z0-9]{4,30}$/).required().messages({
            //     'string.empty': `"password" cannot be an blank`,
            //     'string.min': `"password" should have a minimum length of 4`,
            //     'any.required': `"password" is required`
            // }),
            password: Joi.string().min(8).max(30).required(),
            passwordConfirmation: Joi.string().required(),
            // passwordConfirmation: Joi.any().valid(Joi.ref('password'))
            // .required().options(
                // { language: { any: { allowOnly: 'must match password' } } }),
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        };
        this.schema = schema;
    }


    handleSubmit = async (e)=>{
        e.preventDefault();
        this.setState({registrationInitiated: true });
        const body = { 
            email: e.currentTarget.email.value,
            name: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
        };

        const res = await fetch(
            be.auth.register,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }
        );
        if (res.status === 201){
            const userObj = await res.json();
            this.setState({errors: {}});
            sessionStorage.setItem('user', JSON.stringify(userObj.user));
            sessionStorage.setItem('tokens', JSON.stringify(userObj.tokens));

            // const tokens = JSON.parse(sessionStorage.getItem('tokens'));

            const emailRes = await fetch(
                be.auth.sendVerificationEmail,
                {
                    method: 'POST',
                    headers: { 
                        'Authorization': 'Bearer '+userObj.tokens.access.token,
                        'Content-Type': 'application/json' },
                });
                if(emailRes.status === 204){
                    this.setState({emailSent: true});
                    console.log("Verification email dispatched!");
                }else{
                    const error = await emailRes.json();
                    console.log("email error: ", error);
                }
        //   setTimeout(()=>this.props.router.push("/account"), 3000);

          setTimeout( ()=>{
              this.props.router.push({
                  pathname: "/account",
                  query: {
                      user: JSON.stringify(userObj.user),
                      tokens: JSON.stringify(userObj.tokens)
                    }
                });
            },
            3000);
        }else{
            const error = await res.json();
            this.setState({errors: error});
        }

    }

    render() {
        return(
            <div>
                <h5>Registration Form</h5>
                <form onSubmit={this.handleSubmit}>
                    <Input value={this.state.data.username} onChange={this.handleChange} name="username" label={"Username"} autoFocus={true}
                           error={this.state.errors.username}/>
                    <Input value={this.state.data.email} onChange={this.handleChange} name="email" label={"Email"} autoFocus={true}
                           error={this.state.errors.email}/>
                    <Input value={this.state.data.password} onChange={this.handleChange} name="password"
                           label={"Password"} type="password"
                           error={this.state.errors.password}/>
                    <Input value={this.state.data.passwordConfirmation} onChange={this.handleChange} 
                    name="passwordConfirmation"
                           label={"Confirm Password"} type="password"
                           error={this.state.data.password === this.state.data.passwordConfirmation?
                           "": "Passwords don't match"}/>

                    {this.submit("Register")}
                    {this.state.errors.message && 
                    <div className="alert alert-danger m-2">{this.state.errors.message}</div> 
                    }
                </form>
                    {
                    this.state.registrationInitiated && 
                    <div className="alert alert-info m-2">
                    <span>Working on it...</span>
                    <div className="spinner-border m-2" role="status">
                        <span className="sr-only">Working on it...</span>
                    </div>
                    </div>
                    }
                    {
                        this.state.emailSent && 
                <div className="alert alert-success m-2">
                        Verification email has been dispatched! Redirecting to account page.
                </div>
                    }
            </div>
        );
    }
}

export default withRouter(RegisterForm);
