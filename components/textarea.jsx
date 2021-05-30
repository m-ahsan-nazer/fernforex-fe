import React, { Components } from 'react';

const TextArea = ({name, label, value, onChange,
               type, autoFocus, error, rows})=>{
    if (autoFocus === undefined)
        autoFocus = false
    if(type === undefined){
        type = "text"
    }
    return (
    <div className="form-group">
        <label htmlFor={name} className="form-label">{label}</label>
        <textarea className="form-control"
               id={name}
               name={name}
               type={type}
               autoFocus={autoFocus}
               value={value}
               onChange={onChange}
               rows={rows}
        />
        {/*{error !== undefined ? <div className="alert alert-danger">{error}</div> : null}*/}
        {error && <div className="alert alert-danger">{error}</div> }
    </div>
    );
}

export default TextArea;