const express = require('express');
const routes = require('./routes');
const db = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use(express.static('public'));

db.on("open", () => {
    app.listen(PORT, () => {
        console.log(`Connected on localhost:${PORT}`);
    });
});