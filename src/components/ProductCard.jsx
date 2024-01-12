/**
 * Library import
 */
import { useState } from 'react';

/**
 * A JSON is added to test product rendering
 */
import { dataTest } from '../data';

/**
 * API URL
 */
const BASE_URL = "https://chupaprecios.com.mx/rest/V1";

/**
 * Product Card contains the methods to be used
 */
export const ProductCard = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal,
}) => {
	/**
	 * The asin to be used is declared
	 */
	const [asin, setAsin] = useState('B07ZQS94VJ');

	/**
	 * The store to be used is declared
	 */
	const [selectedStore, setSelectedStore] = useState('amazon');

	/**
	 * The product data that comes from the API is saved
	 */
	const [apiProducts, setApiProducts] = useState([]);

	/**
	 * The token that will be used in the product API is obtained
	 */
	const getToken = async () => {
		const response = await fetch(`${BASE_URL}/integration/admin/token`, {
		  method: 'POST', 
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify({username: 'candidatoFront', password: 'Ch8t45t!f' })
		});
		const data = await response.json();
		getProducts(data);
	};
	getToken();

	/**
	 * The products API is rendered
	 **/
	const getProducts = async (token) => {
		const response = await fetch(`${BASE_URL}/chupaprecios/productdetail/?asin=${asin}&selectedStore=${selectedStore}`, {
		  method: "GET",
		  headers: {
			'Content-Type': 'application/json',
			"Authorization" : 'Bearer ' + token
		  }
		});
		const data = await response.json();
		setApiProducts(data);
	};

	/**
	 * Products are added to the shopping cart
	 * @param {*} product 
	 * @returns 
	 */
	const onAddProduct = (product) => {
		product.quantity = 1;

		if (allProducts.find(item => item.data.productId === product.data.productId)) {
			const products = allProducts.map(item => 
				item.data.productId === product.data.productId
					? { ...item, quantity: item.quantity + 1 }
					: item	
			);
			
			setTotal(total + product.data.price * product.quantity);
			setCountProducts(countProducts + product.quantity);
			return setAllProducts([...products]);
		}
		
		setTotal(total + product.data.price * product.quantity);
		setCountProducts(countProducts + product.quantity);
		setAllProducts([...allProducts, product]);
	};

	/**
	 * Data is rendered in the ProductCard component
	 */
	return (
		<div className='container-items'>
			{apiProducts.map(product => (
				<div className='item' key={product.data.productId}>
					<figure>
						<img src={product.data.image} alt={product.data.title} />
					</figure>
					<div className='info-product'>
						<h2>{product.data.title}</h2>
						<p>{product.data.description}</p>
						<p className='price'>${product.data.price}</p>
						<button onClick={() => onAddProduct(product)}>
							Añadir al carrito
						</button>
					</div>
				</div>
			))}
		</div>
	);
};
