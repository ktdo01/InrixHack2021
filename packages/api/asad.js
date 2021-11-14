import express, { application } from 'express';
import fetch from 'node-fetch';
let app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.get("/hi", (req, res) => {
    res.json({hello: "hi"});
})

let chains = ["mcdonalds", "chick fil a", "burger king", "wendys"]
app.get("/chains", (req, res) => {
    res.send(chains)
})
export default app;