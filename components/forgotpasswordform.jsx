import React, { Component } from 'react';
import Joi from '../node_modules/joi-browser';
import Form from "./form";
import Input from "./input";


class ForgotPasswordForm extends Form{
    constructor(){
        super();
        this.state.data = {password: ""};
        const schema = {
            email: Joi.string().email({ minDomainAtoms: 2 }),
        };
        this.schema = schema;
    }

    render() {
        return(
            <div>
                <h5>Reset Password Form</h5>
                <p class="text-info">Please enter your email address. You will receive a link to create a new password 
                    in you email.
                </p>
                <form onSubmit={this.handleSubmit}>
                    <Input value={this.state.data.email} onChange={this.handleChange} name="email" label={"Email"} autoFocus={true}
                           error={this.state.errors.email}/>
                    {this.submit("Get Email To Reset Password")}
                </form>
            </div>
        );
    }
}

export default ForgotPasswordForm;

