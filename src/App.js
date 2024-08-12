import React, {useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';



// Assuming FilterableProductTable is already defined somewhere in your project
import FilterableProductTable from './FilterableProductTable';
import InsertNewProduct from './InsertNewProduct';

/*const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];*/
//const PRODUCTS = [];

async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:3001/api/products');
    const data = await response.json();
    console.log('Response text:', data);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return[];
  }
}


function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Products() {
  const[products, setProducts] = useState([]);

   // Transformation function
  function transformProducts(productsFromServer) {
    // Implement the transformation logic here
    // For example, if the server returns an array of objects with different keys
    return productsFromServer.map(product => ({
      category: product.category,
      price: `$${product.price}`,
      stocked: product.stocked === 1,
      name: product.name
    }));
  }

  useEffect(() => {
    async function getProducts() {
      const response = await fetchProducts();
      const productsFromServer = response.products; // access the products array
      const transformedProducts =transformProducts(productsFromServer);
      setProducts(transformedProducts);
      console.log('Fetched products:', productsFromServer, transformedProducts); // Log the fetched products
    }
    getProducts();
  }, []);
    return(
      <>
        <FilterableProductTable products={products} />
        <InsertNewProduct />
      </>
    );

}

export default function App() {
  return (
    <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/about" element ={<About /> }/>
            <Route path="/products" element ={<Products /> }/>            
            <Route path="/" element ={<Home /> }/>
          </Routes>
        </div>
      </Router>
    );
}
