import React from 'react';
         
const editTask = (props) => {
    return(        
        <form className='modal' onSubmit={e => props.submitChange(e)}>
            <input name="title" value={props.task.title} onChange={e => props.changeInput(e)}></input>
            <input name="description" value={props.task.description} onChange={ e => props.changeInput(e)}></input>
            <button type="submit">Edit</button>
        </form>
    );
}
export default editTask;