import React, { Component } from 'react';
import Joi from '../node_modules/joi-browser';
import Form from "./form";
import Input from "./input";
import User from "/beapi/users";


class ForgotPasswordForm extends Form{
    constructor(){
        super();
        this.state.data = {email: ""};
        const schema = {
            email: Joi.string().email({ minDomainAtoms: 2 }),
        };
        this.schema = schema;
    }

    handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const email =  e.currentTarget.email.value;
            const res = await User.getResetPasswordEmail(email);
            console.log("forgotPassword res: ", res);
            if (res.status === 204){
                const resJson = await res.json();
                this.setState({errors: {}});
            }else if(res.status === 404 || res.status === 400){
                //404 non-existent email
                //400 invalid email
                const error = await res.json();
                console.log("err: ", error);
                this.setState({errors: error});
            }
        }catch(err){
            console.log("any other errors: ", err);
        }

    }

    render() {
        return(
            <div>
                <h5>Reset Password Form</h5>
                <p className="text-info">Please enter your email address. You will receive a link to create a new password 
                    in you email.
                </p>
                <form onSubmit={this.handleSubmit}>
                    <Input value={this.state.data.email} onChange={this.handleChange} name="email" label={"Email"} autoFocus={true}
                           error={this.state.errors.email}/>
                    {this.submit("Get Email To Reset Password")}
                    {this.state.errors.message && <div className="alert alert-danger m-2">{this.state.errors.message}</div> }
                </form>
            </div>
        );
    }
}

export default ForgotPasswordForm;

