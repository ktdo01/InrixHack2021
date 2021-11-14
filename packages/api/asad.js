import express, { application } from 'express';
import fetch from 'node-fetch';
let app = express()
import cors from "cors";

app.use(cors()) // Use this after the variable declaration

app.get("/api/hi", (req, res) => {
    res.json({hello: "hi"});
})


app.get("/hi", (req, res) => {
    res.json({hello: "hi"});
})

let chains = ["mcdonalds", "chick fil a", "burger king", "wendys"]
app.get("/chains", (req, res) => {
    res.send(chains)
})
export default app;