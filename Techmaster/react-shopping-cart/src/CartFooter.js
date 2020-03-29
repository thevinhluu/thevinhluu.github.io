import React, { useState } from 'react';

function CartFooter (props) {
	// constructor (props) {
	// 	super(props);
	// 	state = {
	// 		input : ''
	// 	};
	// }

	const [input, setInput] = useState('');

	const handleChange = (event) => {
		// setState({ input: event.target.value });
		setInput(event.target.value);
	};

	const handleClick = (event) => {
		// props.onClick(state.input);
		props.onClick(input);
	};
	// const handleShopping = () => {
	// 	props.handleRender();
	// };

	const currencyFormat = (num) => {
		return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	};

	const subTotal = props.subTotal;
	const discount = props.discount;

	return (
		<section className="container">
			<div className="promotion">
				<label htmlFor="promo-code">Have A Promo Code?</label>
				<input type="text" name="txtPromoCode" id="promo-code" onChange={handleChange} />
				<button type="button" onClick={handleClick} />
			</div>
			<div className="summary">
				<ul>
					<li>
						Subtotal <span>{currencyFormat(subTotal)}</span>
					</li>
					<li>
						VAT <span>{currencyFormat(subTotal * 0.1)}</span>
					</li>
					{props.statusDiscount && (
						<li>
							Discount <span>{currencyFormat(discount * subTotal)}</span>
						</li>
					)}
					<li className="total">
						Total{' '}
						<span>
							{props.statusDiscount ? (
								currencyFormat(subTotal + subTotal * 0.1 - subTotal * discount)
							) : (
								currencyFormat(subTotal + subTotal * 0.1)
							)}
						</span>
					</li>
				</ul>
			</div>
			<div className="checkout">
				<button type="button">Check Out</button>
			</div>
		</section>
	);
}

export default CartFooter;
