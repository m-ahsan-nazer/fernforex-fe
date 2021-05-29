import React, { Component } from 'react';
import Joi from '../node_modules/joi-browser';
import Form from "./form";
import Input from "./input";


class ResetPasswordForm extends Form{
    constructor(){
        super();
        this.state.data = {username: "", password: ""};
        const schema = {
            email: Joi.string().email({ minDomainAtoms: 2 }),
            password: Joi.string().min(2).max(30).required(),
        };
        this.schema = schema;
    }

    render() {
        return(
            <div>
                <h5>Reset Password Form</h5>
                <form onSubmit={this.handleSubmit}>
                    <Input value={this.state.data.email} onChange={this.handleChange} name="email" label={"Email"} autoFocus={true}
                           error={this.state.errors.email}/>
                    <Input value={this.state.data.password} onChange={this.handleChange} name="password" label={"Password"} type="password"
                           error={this.state.errors.password}/>
                    {this.submit("Sign in")}
                </form>
            </div>
        );
    }
}

export default ResetPasswordForm;

