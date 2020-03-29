import React from 'react';
import './App.css';
import CartHeader from './CartHeader';
import CartBody from './CartBody';
import CartFooter from './CartFooter';
import axios from 'axios';

class NoProduct extends React.Component {
	shoppingNow = () => {
		this.props.shoppingNow();
	};
	render () {
		return (
			<section className="container">
				<button className="btn btn-success" onClick={this.shoppingNow}>
					Shopping Now
				</button>
			</section>
		);
	}
}

class App extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			products       : [],
			promoCode      : ['Tet2020', 'NewYear'],
			discount       : 0,
			statusDiscount : false
		};
		this.handleUpdateQty = this.handleUpdateQty.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount () {
		axios
			.get(`https://luuthevinh-fake-rest-api.herokuapp.com/cart`)
			.then((res) => {
				const products = res.data;
				this.setState({ products });
			})
			.catch((error) => console.log(error));
	}

	onRemoveProduct = (id) => {
		const newProducts = this.state.products;
		// Tìm vị trí của sản phẩm cần xóa
		let index = newProducts.findIndex((product) => product.id === id);
		// Kiểm tra nếu tìm thấy thì mới xóa
		if (index !== -1) {
			axios
				.delete(`https://luuthevinh-fake-rest-api.herokuapp.com/cart/${id}`)
				.then((res) => {
					newProducts.splice(index, 1);
					this.setState({ products: newProducts });
				})
				.catch((error) => console.log(error));
		}
	};

	// TODO: Thay đổi số lượng sản phẩm
	handleUpdateQty (id, e) {
		let newProducts = this.state.products;
		let newQty = e.target.value;

		newProducts.forEach((product) => {
			if (product.id === id && newQty >= 0) {
				product.quantity = newQty;
			}
		});

		this.setState({ products: newProducts });
	}
	onClick (event) {
		let statusDiscount = false;
		let discount = 0;
		const promoCode = this.state.promoCode;
		for (let i = 0; i < promoCode.length; i++) {
			if (event.trim().toLowerCase() === promoCode[i].toLowerCase()) {
				statusDiscount = true;
				if (promoCode[i].toLowerCase() === 'tet2020') {
					discount = 0.05;
				}
				else if (promoCode[i].toLowerCase() === 'newyear') {
					discount = 0.1;
				}
			}
		}
		this.setState({
			discount,
			statusDiscount
		});
	}

	shoppingNow = () => {
		axios
			.get(`https://luuthevinh-fake-rest-api.herokuapp.com/products`)
			.then((res) => {
				const products = res.data;
				const cart = [];
				for (let i = 0; i < 3; i++) {
					const index = Math.floor(Math.random() * products.length);
					const product = products[index];
					products.splice(index, 1);

					axios.post(`https://luuthevinh-fake-rest-api.herokuapp.com/cart`, product).then((res) => {
						cart.push(product);
						this.setState({ products: cart });
					});
				}
			})
			.catch((error) => console.log(error));
	};

	render () {
		const products = this.state.products;
		let numberItems = 0;
		let subTotal = 0;

		for (let product of products) {
			if (product.quantity && product.price && product.quantity >= 0) {
				numberItems += parseInt(product.quantity);
				subTotal += product.price * product.quantity;
			}
		}

		let content = <NoProduct shoppingNow={this.shoppingNow} />;
		if (products.length > 0) {
			content = (
				<CartFooter
					subTotal={subTotal}
					discount={this.state.discount}
					promoCode={this.state.promoCode}
					onClick={this.onClick}
					statusDiscount={this.state.statusDiscount}
				/>
			);
		}

		return (
			<main>
				<CartHeader numberItems={numberItems} />

				<CartBody products={products} onRemoveProduct={this.onRemoveProduct} handleUpdateQty={this.handleUpdateQty} />

				{content}
			</main>
		);
	}
}

export default App;
