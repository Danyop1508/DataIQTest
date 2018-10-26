import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class List extends Component {

	constructor(props) {
		super(props);

	    this.state = {
	    	personas: [],
	    	search: ''
	    };

	    this.handleChange = this.handleChange.bind(this);
	    this.deleteItem = this.deleteItem.bind(this);
	}

	componentDidMount() {
		axios.get('http://localhost:8000/personas')
			.then(personas => this.setState({personas: personas.data.data})
		);
	}

	handleChange(event) {
    	this.setState({search: event.target.value});
	}

	deleteItem(id) {
		axios.delete('http://localhost:8000/personas/' + id)
			.then(personas => this.setState({personas: personas.data.data})
		);
	}

	compararAtributos(a, b){
		return a.indexOf(b) > -1;
	}

	render() {
	    return (
	    	<div className="container">
		        <div className="row">
		         	<div className="col s12">
		            	<h4>Lista de Contactos</h4>
		            	<form action="#">
		              		<div className="row">

		                		<div className="input-field col s6">
		                  			<i className="material-icons prefix">account_circle</i>
		                  			<input type="text" placeholder="Buscar contacto" value={this.state.search} onChange={this.handleChange} />
		                		</div>

			                	<table>
			                  		<thead>
			                    		<tr>
			                        		<th>Nombre</th>
			                        		<th>Apellido</th>
			                        		<th>Email</th>
			                        		<th>Acciones</th>
			                    		</tr>
			                  		</thead>
			                  		<tbody>
				                	{ 
				                		this.state.personas.map(persona => {
						      				if(this.state.search !== ''){
						      					if(this.compararAtributos(persona.email, this.state.search) || 
						      						this.compararAtributos(persona.nombre, this.state.search)){
						      						return (
						      							<tr key={persona.id}>
						      								<td>{persona.nombre}</td>
						      								<td>{persona.apellido}</td>
						      								<td>{persona.email}</td>
						      								<td>
						      									<Link to={"/update/" + persona.id} >Editar &nbsp;</Link>
						      									<a onClick={() => { this.deleteItem(persona.id) }}>Eliminar</a>
						      								</td>
														</tr>
													);
						      					}
						      				}else{
						      					return (
					      							<tr key={persona.id}>
					      								<td>{persona.nombre}</td>
					      								<td>{persona.apellido}</td>
					      								<td>{persona.email}</td>
					      								<td>
					      									<Link to={"/update/" + persona.id} >Editar &nbsp;</Link>
					      									<a onClick={() => { this.deleteItem(persona.id) }}>Eliminar</a>
					      								</td>
													</tr>
												);
						      				}
						      			}
						      		)}
			                  		</tbody>
			                	</table>
		              		</div>
		            	</form>
		          	</div>
		        </div>
		    </div>
	    );
	}
}

export default List;