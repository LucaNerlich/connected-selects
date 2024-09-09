const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Sample data to be returned
const select1Options = [
    "Option 1",
    "Option 2",
    "Option 3",
];

const select2Options = [
    "Option 4",
    "Option 5",
    "Option 6",
];

// Routes returning JSON data
app.get('/options/select1', (req, res) => {
    res.json(select1Options);
});

app.get('/options/select2', (req, res) => {
    res.json(select2Options);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
