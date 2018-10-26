import React, { Component } from 'react';
import axios from 'axios';

class Update extends Component {

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

	componentDidMount() {
		axios.get('http://localhost:8000/personas/' + this.props.match.params.id)
			.then(response => this.setState({
				name: response.data.data.nombre,
				lastName: response.data.data.apellido,
				email: response.data.data.email
			})
		);
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

		axios.put('http://localhost:8000/personas/' + this.props.match.params.id, data)
			.then(personas => alert('Actualización exitosa!'))
			.catch(err => alert('Error al intentar actualizar el contacto!'));

		event.preventDefault();
	}

	render() {
	    return (
	    	<div className="container">
	        	<div className="row">
	          		<div className="col s12">
	            		<h4>Actualizar Contacto</h4>
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
				                  <input type="submit" value="Actualizar contacto" className="waves-effect waves-light btn"/>
				                </div>
			              	</div>
			            </form>
			        </div>
			    </div>
			</div>
	    );
	}
}

export default Update;