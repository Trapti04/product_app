const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('C:\\Users\\0022AD744\\Documents\\SQLLITE\\myproducts.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Function to fetch and print all products
function fetchAndPrintProducts() {
    db.all('SELECT * FROM products ORDER BY category DESC', [], (err, rows) => {
      if (err) {
        console.error('Error fetching products:', err.message);
        return;
      }
      console.log('Products:', rows);
    });
  }

  // Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    // Fetch and print products when the server starts
    fetchAndPrintProducts();
  });

// Endpoint to get all products
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products ORDER BY category DESC', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ products: rows });
  });
});

// Endpoint to add a new product
app.post('/api/products', (req, res) => {
  const { category, price, stocked , name } = req.body;
  db.run(`INSERT INTO products (category, price, stocked, name) VALUES (?, ?, ?, ?)`,
    [category, price, stocked ? 1 : 0, name],
    function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

