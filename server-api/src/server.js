const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

app.use(cors({
  origin: 'https://shadow-waiting-sombrero.glitch',
  optionsSuccessStatus: 200
}));

app.use(express.static('public'));

app.get('/api/search', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=channel&maxResults=5&key=${YOUTUBE_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }
});

app.get('/api/subscribers/:channelId', async (req, res) => {
  const { channelId } = req.params;
  try {
    const response = await axios.get(
      `https://backend.mixerno.space/api/youtube/estv3/${channelId}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});