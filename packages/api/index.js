import express from 'express';
import fetch from 'node-fetch';
import asad from './asad.js';
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(asad);
async function getTrips() {
  const url = 'https://api.iq.inrix.com/v1/trips-count?od=origin&geoFilterType=polygon&points=37.734622%7C-122.471603%2C37.743627%7C-122.463850%2C37.743066%7C-122.475429&limit=10&startDateTime=%3E%3D2020-12-01T02%3A31&endDateTime=%3C%3D2020-12-15T02%3A31';
  const response = await fetch(url, {
    headers: {
      "Authorization": "Bearer" + userToken
    }
  })
  const json = await response.json();
  console.log(json);
  return json;
}
 
app.get('/', async (req, res) => {
  var countTotal = 0;
  var date = ['2020-12-09','2020-12-02','2020-11-25','2020-11-18']
  for(var i = 0; i < 4; i++){
    var curDate = date[i]
    const trip = await getTrips(curDate)
    trip = parseFloat(trip)
    countTotal += trip
  }
  var avgTrip = countTotal / 4
  res.send(avgTrip);
});

app.listen(3001, () =>
  console.log('Example app listening on port 3001!'),
);