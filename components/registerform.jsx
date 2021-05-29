import React, {Component} from 'react';
import Joi from '../node_modules/joi-browser';
import Form from "./form";
import Input from "./input";


class RegisterForm extends Form{
    constructor(){
        super();
        this.state.data = {email: "", password: "", name: ""};
        const schema = {
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{4,30}$/).required(),
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        };
        this.schema = schema;
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

                    {this.submit("Register")}
                </form>
            </div>
        );
    }
}

export default RegisterForm;
