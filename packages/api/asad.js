import express, { application } from 'express';
import fetch from 'node-fetch';
import yelp from 'yelp-fusion';
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

/**
 * Returns: An array of locations
 * 
 * A location is an object:
 *  {
 *      lat: A latitude decimal,
 *      lng: A longitude decimal,
 *      label: The name of the location
 *      wait: One of the following: 
 *          0 for green (low wait time), 
 *          1 for yellow (medium wait time), 
 *          2 for red (high wait time)
 *  }
 */
app.get("/searchLocations", (req, res) => {
    if (req.query) {

    }
    res.json([
        {
            lat: 37.77,
            lng: -122.4199,
            label: "City1",
            wait: 6

        },
        {
            lat: 37.777,
            lng: -122.40,
            label: "City2",
            wait: 2

        }

    ]);
})

app.get("/business", (req, res) => {
    if (req.query && req.query.search) {
        const YELP_API_KEY="nPiTvSFqYi04YozQEyr96yJ3ntGRiRpwSqlGG_fymuBON_lsRIaY1GPgULzC7Nh2zjTUA-5k2Ekj2H-07RoIn56aNc8icx_0_MyFOIoaZMmA5CmvJt_kVM7gcaOQYXYx";
        const yelpCli = yelp.client(YELP_API_KEY);
        yelpCli.search({
        term: req.query.search,
        location: 'san francisco, ca',
        categories: "food",
        radius: 15000,
        }).then(response => {
        res.json(response.jsonBody.businesses);
        }).catch(e => {
        console.log(e);
        });
    }
})

app.get("/suggestion", (req, res) => {
    if (req.query && req.query.search) {
        const YELP_API_KEY="nPiTvSFqYi04YozQEyr96yJ3ntGRiRpwSqlGG_fymuBON_lsRIaY1GPgULzC7Nh2zjTUA-5k2Ekj2H-07RoIn56aNc8icx_0_MyFOIoaZMmA5CmvJt_kVM7gcaOQYXYx";
        const yelpCli = yelp.client(YELP_API_KEY);
        
        yelpCli.autocomplete({
            text: req.query.search,
            location: 'san francisco, ca',
            categories: "food",
          }).then(response => {
            res.json(response.jsonBody.terms);
            console.log(response.jsonBody.terms[0].text);
          }).catch(e => {
            console.log(e);
          });
        
    }
})


let chains = ["mcdonalds", "chick fil a", "burger king", "wendys"]
app.get("/chains", (req, res) => {
    res.send(chains)
})
export default app;