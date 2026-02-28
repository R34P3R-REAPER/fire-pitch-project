const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Forces use of Google DNS
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose'); // New: Added Mongoose
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- 1. DATABASE CONNECTION ---
// Replace 'vfm_taskforce' with your preferred DB name
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vfm_taskforce';

// Temporarily put the string directly in the code to skip the .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✔ DATABASE: SECURED & CONNECTED'))
  .catch(err => console.error('✖ DATABASE: CONNECTION ERROR', err));

// --- 2. DATA SCHEMA (The Blueprint) ---
const inquirySchema = new mongoose.Schema({
  trackingId: String,
  name: String,
  office: String,
  email: String,
  details: String,
  status: { type: String, default: 'Pending Review' },
  createdAt: { type: Date, default: Date.now }
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

// --- 3. MIDDLEWARE ---
app.use(helmet());
app.use(cors());
app.use(express.json());

// --- 4. API ENDPOINTS ---

// Health Check
app.get('/', (req, res) => {
  res.send('VFM Taskforce API: Systems Operational');
});

// Fetch Live Inquiries (For Admin Use)
app.get('/api/inquiries', async (req, res) => {
  try {
    const allInquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(allInquiries);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Receive & Save Strategic Briefing Requests
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, office, email, details } = req.body;
    
    // Generate official tracking ID
    const trackingId = `VFM-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newInquiry = new Inquiry({
      trackingId,
      name,
      office,
      email,
      details
    });

    // Save to MongoDB
    await newInquiry.save();
    
    console.log(`[SAVED] Inquiry: ${trackingId} from ${office}`);

    res.status(201).json({
      success: true,
      trackingId: trackingId,
      message: "Inquiry successfully logged in the National Registry."
    });
  } catch (error) {
    console.error("Critical Save Error:", error);
    res.status(500).json({ success: false, message: "Server failed to save inquiry." });
  }
});

// --- 5. SERVER START ---
app.listen(PORT, () => {
  console.log(`
  -----------------------------------------
  VFM TASKFORCE BACKEND: LIVE
  PORT: ${PORT}
  DATABASE: MONGO_DB
  STATUS: READY FOR COMMAND
  -----------------------------------------
  `);
});
// Add this to backend/server.js
app.get('/api/admin/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch registry" });
  }
});