const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Error: Missing Supabase environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Health Check Route
app.get('/', (req, res) => {
  res.json({ status: "success", message: "Food Delivery Backend API running smoothly" });
});

// Database Connectivity Test Route
app.get('/api/test-db', async (req, res) => {
  try {
    const { data, error } = await supabase.from('menu_items').select('count', { count: 'exact', head: true });
    if (error) throw error;
    res.json({ status: "connected", message: "Supabase connection verified successfully!" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server executing seamlessly on port ${PORT}`);
});
