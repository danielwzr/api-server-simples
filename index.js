const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.listen(8080);

app.get("/", (req, res) => {
    res.send("Rota raiz")
});

app.get("/api", (req, res) => {
    res.send("api")
});

app.post("/", (req, res) => {
    console.log(req)
    res.send("post realizado")
});

app.post("/api", (req, res) => {
    console.log(req)
    res.send("post realizado")
});