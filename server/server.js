const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// /oru/audi/eu/ota/rn-2023-03-14-ftkm/de-de/tech-1-2/mode-day/index.html

const brandOptions = ["Audi", "VW", "SKODA",];
const useCaseOptions = ["ORU", "ICA", "AEC",];
const appOptions = ["ota",];
const regionOptions = ["eu", "nar", "svw",];
const langOptions = ["de-de", "en-gb",];

const handleGetRequest = (path, options) => {
    app.get(path, (req, res) => {
        // add random delay to simulate network transfer
        setTimeout(() => {
            res.json(options);
        }, (Math.random() * 500) + 150);
    });
};

handleGetRequest('/options/brand', brandOptions);
handleGetRequest('/options/usecase', useCaseOptions);
handleGetRequest('/options/app', appOptions);
handleGetRequest('/options/lang', langOptions);
handleGetRequest('/options/region', regionOptions);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
