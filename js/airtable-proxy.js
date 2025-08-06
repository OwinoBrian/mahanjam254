import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;


const airtableApiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;
const tableName = 'Escorts';

app.use(cors());

app.get('/api/escorts', async (req, res) => {
  try {
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (data.error) {
      console.error('Airtable error:', data.error);
      return res.status(500).json({ error: data.error });
    }

    res.json(data);
  } catch (err) {
    console.error("Fetch failed:", err);
    res.status(500).json({ error: 'Failed to fetch from Airtable' });
  }
});

// Get single escort by ID
app.get('/api/escorts/:id', async (req, res) => {
  const recordId = req.params.id;
  try {
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}/${recordId}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (data.error) {
      console.error('Airtable error:', data.error);
      return res.status(404).json({ error: 'Escort not found' });
    }

    res.json(data);
  } catch (err) {
    console.error("Fetch failed:", err);
    res.status(500).json({ error: 'Failed to fetch from Airtable' });
  }
});

app.listen(PORT, () => console.log(`Proxy running on http://localhost:${PORT}`));
