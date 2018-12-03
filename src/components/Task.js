import React, {Component} from 'react';
import AuthService from '../authenticate.js';
import EditTask from './editTask.jsx';

class Task extends Component {
    constructor(props){
        super(props);
        this.state = {
            showEditForm: false,
            task: props.task
        }
        this.service = new AuthService();
    }

    showEdit = () =>{
        this.setState({showEditForm:true});
    }

    submitChange = e =>{
        e.preventDefault();
        this.service.editTask(this.state.task).then(res =>{
            this.setState({showEditForm:false})
        });
  
    }
    deleteTask = () =>{
        this.service.deleteTask(this.state.task).then(res =>{
            this.props.updateParent();
        });
    }

    changeInput = e => {
        const {name, value} = e.target;
        this.setState(prevState => ({
            task: {
                ...prevState.task,
                [name]: value
            }
        }));
    }

    render(){  
        const task = this.state.task;
        return(
            <div>
                {this.state.showEditForm ? 
   
                    <EditTask 
                        task={this.state.task} 
                        submitChange={this.submitChange}
                        changeInput={this.changeInput}
                    />

                    :
            
                    <div>
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                        <p>{task.createdAt}</p>
                        <button className="lined thick" onClick={e =>this.showEdit(e)}>Edit</button>
                        <button className="lined thick" onClick={e => this.deleteTask(e)}>Delete</button>
                    </div>
                }
            </div>
        );
    }
}


export default Task;