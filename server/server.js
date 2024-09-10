const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Sample data to be returned
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

// Routes returning JSON data
app.get('/options/brand', (req, res) => {
    res.json(brandOptions);
});

app.get('/options/usecase', (req, res) => {
    res.json(useCaseOptions);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
