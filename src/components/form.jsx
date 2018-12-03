import React from 'react';

const Form = (props) => (
    <div>
        <form data-type={props.type} onSubmit={ e => props.handleFormSubmit(e)}>
            <input type="text" name="username" placeholder="Your name" value={props.username} onChange={e => props.handleChange(e)}/>
            <input type="password" name="password" placeholder="Password" value={props.password} onChange={e => props.handleChange(e)}/>
            <button className="lined thick" type="submit" value="Submit">{props.type}</button>
        </form>
        <p>{props.errorMessage}</p>
   </div>
    )

export default Form;
    