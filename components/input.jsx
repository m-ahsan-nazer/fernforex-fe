import React  from 'react';

const Input = ({name, label, value, onChange,
               type, autoFocus, error})=>{
    if (autoFocus === undefined)
        autoFocus = false
    if(type === undefined){
        type = "text"
    }
    return (
    <div className="form-group">
        <label htmlFor={name} className="form-label">{label}</label>
        <input className="form-control"
               id={name}
               name={name}
               type={type}
               autoFocus={autoFocus}
               value={value}
               onChange={onChange}
        />
        {/*{error !== undefined ? <div className="alert alert-danger">{error}</div> : null}*/}
        {error && <div className="alert alert-danger">{error}</div> }
    </div>
    );
}

export default Input;