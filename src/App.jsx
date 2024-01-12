/**
 * Library import
 */
import { useState } from 'react';

/**
 * Components that we are going to use
 */
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';

function App() {
	/**
	 * Save products that are added to the shopping cart
	 */
	const [allProducts, setAllProducts] = useState([]);

	/**
	 * Save the total of products added to the shopping cart
	 */
	const [total, setTotal] = useState(0);

	/**
	 * Counts the total number of products that are added to the shopping cart
	 */
	const [countProducts, setCountProducts] = useState(0);

	/**
	* Two components are created 
	* Header renders the shopping cart within the menu to see the status of the purchased 
	* Product Card is the component that renders the API information of each product
	*/
	return (
		<>
			<Header
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
			/>
			<ProductCard
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
			/>
		</>
	);
}

export default App;
