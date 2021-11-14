import express, { application } from 'express';
import fetch from 'node-fetch';
let app = express()
app.get("/hi", (req, res) => {
    res.json({hello: "hi"});
})

let chains = ["mcdonalds", "chick fil a", "burger king", "wendys"]
app.get("/chains", (req, res) => {
    res.send(chains)
})
export default app;