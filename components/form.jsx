import React, { Component } from 'react';
import Joi from '../node_modules/joi-browser';

const defaultSchema = {
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{4,30}$/),
    email: Joi.string().email({ minDomainAtoms: 2 })
};


class Form extends Component{
    constructor(props) {
        super()

        this.state = {
            // data: {username: "", password: "", email: "", phone: "", address: "", message: ""},
            data: {username: "", password: "", email: ""},
            errors: {}
        }

        this.schema = defaultSchema;
    }


    handleSubmit = (e)=>{
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;
    }

   validate = ()=>{
        const result = Joi.validate(this.state.data, this.schema, {abortEarly:false});
        if (!result.error) return null;
        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;
    }

   validateProperty = (input)=>{
        const obj = {[input.name]: input.value};
        const schema = {[input.name]: this.schema[input.name]};
        const result = Joi.validate(obj, schema);
        if (!result.error) return null;
        return result.error.details[0].message;
   }

   handleChange = (e)=>{
        let data = {...this.state.data};
       // data[e.currentTarget.id] = e.currentTarget.value;
        data[e.currentTarget.name] = e.currentTarget.value;

        let errors = {...this.state.errors};
        const errorMessage = this.validateProperty(e.currentTarget);
        //Only update errors if there is an error message
        if (errorMessage){
            errors[e.currentTarget.name] = errorMessage;
        }
        else{
            //if there are no errors then remove any error message previously stored
            delete errors[e.currentTarget.name];
        }
        this.setState({data: data, errors: errors || {}});
    }

    submit = (label)=>{
        console.log(this.validate());
        return(
        <button disabled={this.validate()} className="btn btn-primary" >
            {label}
        </button>
        );
    }
}

export default Form;