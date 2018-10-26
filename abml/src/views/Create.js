import React, { Component } from 'react';
import axios from 'axios';

class Create extends Component {

	constructor(props) {
		super(props);

	    this.state = {
	    	name: '',
	    	lastName: '',
	    	email: ''
	    };

	    this.handleName = this.handleName.bind(this);
	    this.handleLastName = this.handleLastName.bind(this);
	    this.handleEmail = this.handleEmail.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleName(event) {
    	this.setState({name: event.target.value});
  	}

  	handleLastName(event) {
    	this.setState({lastName: event.target.value});
  	}

  	handleEmail(event) {
    	this.setState({email: event.target.value});
  	}

	handleSubmit(event) {
		const data = {
			nombre: this.state.name,
			apellido: this.state.lastName,
			email: this.state.email,
			confirmado: true
		};

		axios.post('http://localhost:8000/personas', data)
			.then(personas => alert('Creación exitosa!'))
			.catch(err => alert('Error al intentar crear el contacto!'));
			
		event.preventDefault();
	}

	render() {
	    return (
	    	<div className="container">
	        	<div className="row">
	          		<div className="col s12">
	            		<h4>Crear Contacto</h4>
	            		<form onSubmit={this.handleSubmit}>
	              			<div className="row">
	                			<div className="input-field col s6">
	                  				<input value={this.state.name} onChange={this.handleName} placeholder="Nombre" id="name" type="text" className="validate" required/>
	                			</div>
				                <div className="input-field col s6">
				                  	<input value={this.state.lastName} onChange={this.handleLastName} placeholder="Apellido" id="last_name" type="text" className="validate" required/>
				                </div>
				                <div className="input-field col s6">
				                  <input value={this.state.email} onChange={this.handleEmail} placeholder="Email" id="email" type="email" className="validate" required/>
				                </div>
				               	<div className="input-field col s12">
				                  <input type="submit" value="Crear contacto" className="waves-effect waves-light btn"/>
				                </div>
			              	</div>
			            </form>
			        </div>
			    </div>
			</div>
	    );
	}
}

export default Create;