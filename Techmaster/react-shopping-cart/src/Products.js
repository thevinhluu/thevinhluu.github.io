import React from 'react';
import axios from 'axios';

class ProductList extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			products : []
		};
	}

	componentDidMount () {
		axios
			.get(`https://luuthevinh-fake-rest-api.herokuapp.com/products`)
			.then((res) => {
				const products = res.data;
				this.setState({ products });
			})
			.catch((error) => console.log(error));
	}

	// render () {
	// 	return <ul>{this.state.products.map((person) => <li>{products.name}</li>)}</ul>;
	// }
}

export default ProductList;
