const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// /oru/audi/eu/ota/rn-2023-03-14-ftkm/de-de/tech-1-2/mode-day/index.html

const brandOptions = [
    "Audi",
    "VW",
    "SKODA",
];

const useCaseOptions = [
    "ORU",
    "ICA",
    "AEC",
];

const appOptions = [
    "ota",
];

const regionOptions = [
    "eu",
    "nar",
    "svw",
];

const langOptions = [
    "de-de",
    "en-gb",
];

// Routes returning JSON data
app.get('/options/brand', (req, res) => {
    res.json(brandOptions);
});

app.get('/options/usecase', (req, res) => {
    res.json(useCaseOptions);
});

app.get('/options/app', (req, res) => {
    res.json(appOptions);
});

app.get('/options/lang', (req, res) => {
    res.json(langOptions);
});

app.get('/options/region', (req, res) => {
    res.json(regionOptions);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
