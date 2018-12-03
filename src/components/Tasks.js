import React, {Component} from 'react';
import history from '../History';
import AuthService from '../authenticate.js';
import Task from './Task.js'

class Tasks extends Component {
	constructor(props){
		super(props)
		this.state = {
			user: {},
			errorMessage: "",
			tasks:[],
			showEdit:false
		}
		this.service = new AuthService();
		this.service.loggedin().then(res =>{
			if(res){
				this.setState({user:res});
				this.service.getTasks().then( tasks =>{
					this.setState({tasks:tasks})
				});
			}
	
		}).catch(err => {
			console.log(err);
		})
	}


	handleFormSubmit = (e) => {

		e.preventDefault();
		const {title, description } = this.state;
		if(title && description){
			this.service.createTask(title, description)
			.then(()=>{
				this.service.getTasks().then( tasks =>{
					this.setState({
						tasks:tasks, 
						title:"",
						description:""
					});
				});
			});
		}

		else{
			let errorMessage;
			this.setState({errorMessage:errorMessage});
		}
	}

  handleChange = (event) => {
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  onEdit = () =>{
    this.setState({showEdit:true});
  }

  articleDeleted = ()=>{
	this.service.getTasks().then(allTasks=>{
		this.setState({tasks: allTasks});
	});
  }

	render() {
		const user = this.state.user;
		if(user.username){
			return (
				<div>
					<h1>Hi, {user.username}</h1>
					<section>
						<section className="tasks">
							{this.state.tasks.map((task) =>{
								if(task.owner === user._id){
									return (
										<Task 
											key={task._id} 
											task={task} 
											onEdit={this.onEdit}
											updateParent={this.articleDeleted}
										/>);
									}
							})}
						</section>
						<section>
							<form onSubmit={this.handleFormSubmit}>
								<input type="text" name="title" placeholder="Title" value={this.state.title} onChange={e => this.handleChange(e)}/>
								<textarea type="text" name="description" placeholder="Decription" value={this.state.description} onChange={e => this.handleChange(e)}/>
								<button className="lined thick" type="submit" value="Submit">Submit</button>
							</form>
						</section>
					</section>
				</div>
			);
		}
		else {
			return(
				<div>
					<h1>You have to be logged in to see this page.</h1>
					<section>
						<button className='lined thick' onClick={ () => history.push("/")}>Take me there</button>
					</section>
				</div>
			)
		}
	}
}

export default Tasks;