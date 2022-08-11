import React, { Component } from "react";
import CustomTable from "./CustomTable"
import { Input, Grid } from "semantic-ui-react";
import Styles from "./style.module.css";
//import { data } from "./Datos";
import ModalUser from '../ModalUser/ModalUser';
export default class Tablita extends Component {
	state = {
		search: "",
	};
		
	handleInputs = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	render() {
		const { search } = this.state;
		return (
			<div className={Styles.container}>
				          <Grid>
            <Grid.Column width={6}>
          <ModalUser
            headerTitle='Anadir Usuario'
            buttonTriggerTitle='Anadir nuevo'
            buttonSubmitTitle='Anadir'
            buttonColor='black'
            onUserAdded={this.props.onUserAdded}
			server={this.props.server}
			/> 
            </Grid.Column>
            <Grid.Column width={6}>
			<Input
					placeholder={"Buscar"}
					onChange={this.handleInputs}
					value={search}
					name={"search"}
					icon={"search"}
					style={{ width: "250px" }}
				></Input>
            </Grid.Column>
            </Grid>
				<CustomTable
					data={this.props.data}
					headers={["Estado","Nombre", "Apellido", "Fecha", "Cedula", "Responsable", "Telefono", "Acciones"]}
					labels={["nombre", "apellido", "fecha", "cedula", "responsable", "telefono"]}
					pageRows={10} //Optional
					searchQuery={search} //Optional
					footerPages={10} //Optional
					onUserUpdated={this.props.onUserUpdated}
					onUserDeleted={this.props.onUserDeleted}
					server={this.props.server}
				/>
			</div>
		);
	}
}
