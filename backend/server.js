require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Health check endpoint
app.get('/', (req, res) => {
    res.send('TMDB Proxy Backend is running!');
});

// Wildcard route to proxy all TMDB requests
app.get('/api/tmdb/:endpoint(*)', async (req, res) => {
    const endpoint = req.params.endpoint;
        
        // Construct the full TMDB URL
        const tmdbUrl = `${TMDB_BASE_URL}/${endpoint}`;
        
        // Pass along all query parameters, but inject our API key
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
