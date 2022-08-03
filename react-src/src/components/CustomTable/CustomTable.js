import React, { PureComponent } from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import ModalUser from "../ModalUser/ModalUser";
import ModalConfirmDelete from '../ModalConfirmDelete/ModalConfirmDelete';
import Styles from "./style.module.css";

class CustomTable extends PureComponent {
	state = {
		page: 0,
		pageSelection: "",
		searchQuery: "",
		header: "",
	};

	componentDidMount = () => {
		const { pageRows = 10 } = this.props;
		this.setState({
			pageSelection: [0, pageRows],
		});
	};

	componentDidUpdate = () => {
		const { searchQuery, pageRows = 10 } = this.props;
		if (searchQuery) {
			if (this.state.searchQuery !== this.props.searchQuery)
				this.setState({ searchQuery, pageSelection: [0, pageRows], page: 0 });
		}
	};

	dynamicsort = (property, order) => {
		var sort_order = 1;
		if (order === "desc") {
			sort_order = -1;
		}
		return function (a, b) {
			if (a[property] < b[property]) {
				return -1 * sort_order;
			} else if (a[property] > b[property]) {
				return 1 * sort_order;
			} else {
				return 0 * sort_order;
			}
		};
	};

	handleSort = (header) => {
		const { pageRows = 10, headers } = this.props;
		let obj = {};

		headers.forEach((item) => {
			obj = {
				...obj,
				[item]: item !== header ? "" : this.state[item] === "asc" ? "desc" : "asc",
			};
		});

		this.setState({ header, pageSelection: [0, pageRows], page: 0, ...obj });
	};

	getSort = (header, data) => {
		const { labels, headers } = this.props;

		const headerIndex = headers.indexOf(header);
		const label = labels[headerIndex];

		return data.sort(this.dynamicsort(label, this.state[header] === "asc" ? "desc" : "asc"));
	};

	searchOnData = (query, data) => {
		return query
			? data.filter((item) => {
					let obj = {};
					for (let key of Object.keys(item)) {
						obj[key] = item[key];
					}
					for (let key of Object.keys(obj)) {
						try {
							let value = obj[key];
							let re = new RegExp("W*(" + query + ")W*");
							if (re.test(value.toString().toLowerCase())) {
								return true;
							} else if (re.test(value)) {
								return true;
							}
						} catch (e) {
							return false;
						}
					}
					return false;
			  })
			: data;
	};

	renderHeaders = () => {
		const { headers } = this.props;
		return (
			<Table.Header>
				<Table.Row>
					{(headers || []).map((item, index) => (
						<Table.HeaderCell key={index} onClick={() => this.handleSort(item)}>
							<div className={Styles.header}>
								<div>{item}</div>
								<div className={Styles.icon}>
									<Icon name={this.state[item] === "asc" ? "caret up" : "caret down"}></Icon>
								</div>
							</div>
						</Table.HeaderCell>
					))}
				</Table.Row>
			</Table.Header>
		);
	};

	handleFooter = (i) => {
		const { pageRows = 10, data, searchQuery } = this.props;
		const pagesQ = Math.ceil(this.searchOnData(searchQuery, data).length / pageRows);

		if (i >= 0 && i < pagesQ)
			this.setState({
				pageSelection: i === 0 ? [0, pageRows] : [i * pageRows, i * pageRows + pageRows],
				page: i,
			});
	};

	getData = () => {
		const { data, searchQuery } = this.props;
		const { pageSelection, header } = this.state;
	
		let _data = data || [];

		if (searchQuery) _data = this.searchOnData(searchQuery, _data);

		if (header) _data = this.getSort(header, _data);

		if (pageSelection) _data = _data.slice(...pageSelection);

		return _data;
	};

	renderData = () => {
		const { labels } = this.props;
		const data = this.getData();
		
		return (
			<Table.Body>
				{(data || []).map((item, index) => (
					<Table.Row key={item._id}>
				          <Table.Cell textAlign='center'>
	    			        <Icon color={item.estado ? 'green' : 'red'  } name={item.estado ? 'checkmark box' : 'cancel'  }  size='large' />
    	      			</Table.Cell>
	
						{(labels || []).map((label, index) => (
							<Table.Cell key={item._id}>
								<div className={Styles.cell}>{ label==="fecha" ? item[label].split("T")[0]: item[label] || ""}</div>
							</Table.Cell>
						))}

							<ModalUser
            					headerTitle='Editar'
            					buttonTriggerTitle=''
            					buttonSubmitTitle='Guardar'
            					buttonColor='white'
            					userID={item._id}
            					onUserUpdated={this.props.onUserUpdated}
								server={this.props.server}
          					/>
          					<ModalConfirmDelete
            					headerTitle='Eliminar'
            					buttonTriggerTitle=''
            					buttonColor='white'
            					user={item}
            					onUserDeleted={this.props.onUserDeleted}
								server={this.props.server}
          					/>
					</Table.Row>
				))}
			</Table.Body>
		);
	};

	getLastLimitDown = (pagesQ, footerPages) => {
		let LastLimitDown = 0;

		while (pagesQ > 0) {
			pagesQ -= footerPages;
			LastLimitDown += footerPages;
		}

		return LastLimitDown - footerPages - 1;
	};

	renderFooter = () => {
		const { pageRows = 10, labels, data, searchQuery, footerPages = 10 } = this.props;
		const { page } = this.state;

		let pages = [];
		const pagesQ = Math.ceil(this.searchOnData(searchQuery, data).length / pageRows);

		const limitDown = page < footerPages ? 1 : Math.floor(page / footerPages) * footerPages + 1;
		const limitUp =
			page > this.getLastLimitDown(pagesQ, footerPages) ? pagesQ : limitDown + footerPages - 1;

		for (let i = limitDown; i <= limitUp; i++) {
			pages = [...pages, i];
		}

		return (
			<Table.Footer>
				<Table.Row>
					<Table.HeaderCell colSpan={labels.length}>
						<Menu floated="right" pagination>
							<Menu.Item as="a" icon onClick={() => this.handleFooter(page - 1)}>
								<Icon name="chevron left" />
							</Menu.Item>
							{pages.map((item, index) => {
								return (
									<Menu.Item
										key={index}
										style={item - 1 === page ? { backgroundColor: "#E5E5E5" } : {}}
										as="a"
										onClick={() => this.handleFooter(item - 1)}
									>
										{item}
									</Menu.Item>
								);
							})}
							<Menu.Item as="a" icon onClick={() => this.handleFooter(page + 1)}>
								<Icon name="chevron right" />
							</Menu.Item>
						</Menu>
					</Table.HeaderCell>
				</Table.Row>
			</Table.Footer>
		);
	};

	render() {
		return (
			<Table celled>
				{this.renderHeaders()}
				{this.renderData()}
				{this.renderFooter()}
			</Table>
		);
	}
}

export default CustomTable;
