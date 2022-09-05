const express = require("express");
// eslint-disable-next-line no-unused-vars
// const bodyParser = require('body-parser');
const path = require("path");
const app = express();

const server = http.createServer(app);

app.use(express.static(__dirname + '/'));

// This route serves the React app
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, "build", "index.html")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});