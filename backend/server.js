require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Health check
app.get('/', (req, res) => {
    res.send('TMDB Proxy Backend is running!');
});

// TMDB Proxy (Render compatible)
app.use('/api/tmdb', async (req, res) => {
    try {
        const endpoint = req.url;
        const tmdbUrl = `${TMDB_BASE_URL}${endpoint}`;

        const params = {
            ...req.query,
            api_key: TMDB_API_KEY
        };

        const response = await axios.get(tmdbUrl, { params });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching from TMDB:', error.message);
        const status = error.response ? error.response.status : 500;
        const msg = error.response ? error.response.data : 'Internal Server Error';
        res.status(status).json({ error: msg });
    }
});

app.listen(PORT, () => {
    console.log(`Backend Server listening on port ${PORT}`);
});
