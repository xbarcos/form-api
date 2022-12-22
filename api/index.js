var express = require("express");
var cors = require('cors');
var app = express();
const bp = require('body-parser');

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.get("/", (req, res, next) => {
    res.send("Olá essa é a rota inicial");
});

app.get("/tipos", (req, res, next) => {
    res.json(["Steel", "Electric", "Water", "Fire", "Grass", "Ice", "Ground", "Rock", "Fairy", "Poison",
            "Bug", "Dragon", "Psychic", "Flying", "Fighting", "Normal"]);
});

app.get("/meuspokemons", (req, res, next) => {
    res.json([
        {
            nome: "Pikachu",
            tipo: "Electric",
            imagem: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
        },
        {
            nome: "Squirtle",
            tipo: "Water",
            imagem: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
        },
        {
            nome: "Charmander",
            tipo: "Fire",
            imagem: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
        },
        {
            nome: "Bulbasaur",
            tipo: "Grass",
            imagem: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
        }
    ]);
});
app.post("/meuspokemons", (req, res, next) => {
    console.log(req.body);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


