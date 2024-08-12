import React, { useState } from 'react';

const InsertNewProduct = () => {
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stocked, setStocked] = useState(false);
    const [name, setName] = useState('');

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleStockedChange = (e) => {
        setStocked(e.target.checked);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newProduct = {
            category,
            price,
            stocked: stocked ? 1 : 0,
            name
        };

        console.log('Request body:', newProduct); // Print the request body for testing;

        try {
            const response = await fetch('http://localhost:3001/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });

            if (response.ok) {
                console.log('Product added successfully');
            } else {
                console.error('Failed to add product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <br />
            <br />
            <p>Enter a new product below:</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Category:
                    <input type="text" value={category} onChange={handleCategoryChange} />
                </label>
                <br />
                <label>
                    Price ($):
                    <input type="number" value={price} onChange={handlePriceChange} />
                </label>
                <br />
                <label>
                    Stocked:
                    <input type="checkbox" checked={stocked} onChange={handleStockedChange} />
                </label>
                <br />
                <label>
                    Name:
                    <input type="text" value={name} onChange={handleNameChange} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default InsertNewProduct;