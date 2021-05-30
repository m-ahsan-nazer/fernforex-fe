import React, {Component} from 'react';
import Joi from '../node_modules/joi-browser';
import Form from "./form";
import Input from "./input";
import TextArea from "./textarea";


class ContactForm extends Form{
    constructor(){
        super();
        this.state.data = {email: "", password: "", name: ""};
        const schema = {
            name: Joi.string().regex(/^[a-zA-Z]/).min(3).max(50).required(),
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            message: Joi.string().min(30).max(500).required(),
        };
        this.schema = schema;
    }

    render() {
        return(
            <div>
                <h5>Contact Form</h5>
                <form onSubmit={this.handleSubmit}>
                    <Input value={this.state.data.name} onChange={this.handleChange} name="name" label={"Name"} autoFocus={true}
                           error={this.state.errors.name}/>
                    <Input value={this.state.data.email} onChange={this.handleChange} name="email" label={"Email"} autoFocus={true}
                           error={this.state.errors.email}/>
                    <TextArea value={this.state.data.message} onChange={this.handleChange} name="message" label={"Your Message"} autoFocus={true}
                           error={this.state.errors.message} rows={5}/>
                    {this.submit("Submit")}
                </form>
            </div>
        );
    }
}

export default ContactForm;
