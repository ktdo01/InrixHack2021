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

const userToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6ImphbDIyM200bmYiLCJ0b2tlbiI6eyJpdiI6ImQ4MmQwMjhmMzM0OGE3NjQ2ZjdmZjNmNWU0MzVhYjI3IiwiY29udGVudCI6IjgwMjYxODJiMmJmMmQ3NGNjODdkMzUxMzkwYjE1OGRlMDg5NjEzMTc5ODkyZmMxNDkxY2M2MmI5NDljNmI0NDVmOWY2ZGZmZWFjNTAwZWQ0MTEwMzFkOWIzMDNmZWI3YTdkMWQyMjFkN2VlNmM5N2M1NGY1OWZhMzkzYThhNzkzZTYxZDY4MjU3NGM2MGE1MTE2NGQ1YWVkYzc1ZmRmYzQ1OWRjMGNiMzRkZmYwZWY2ODhiMzc1YTM0ZTAzMDY5ZTI1MzhhMThhMDQwMDJjZjlkZDkwMTk1MThiNGI5YWRjMDE0YWZiNjVmMGExZDQ3NDI0ZTIyZmY4ZTkxODdkNzZhYWFiNDU1M2M4ODQxYWVjMTQ5OTljMDY5NmJlYjEyYjZhNTQwZGZhMThlNjU1YjFlODAzMjE3ZDVmNzZiZDgyZTBlNzQ0OWNhMTM1ZTI3NDI2ODA4YWY0N2ViZjUxZWIzN2IxOTkwMmY0Y2FhZTg4NGQ1NmZmODEyNmUzNGQ3MDM4NjU4ZDI3Njk0MjU4MGQ5OGUxY2YzMWU2Y2VjZTRhOWRmZWVkMjY4NzI4NWE0MDRhZTFkYjAzN2JjODFkZTkyN2IzYWY0NDhhMzhiY2M2OGI4MWIyYjI0NTgzYTVhOTk0MjI2MjE0YmFmMGVjY2M5MDY1NmUxNGM4NDczNzdhMjU5ZGE1M2ZkOWFlMmYxM2M0NmMzMzJiYjhhNTRhYmViYmZlNmZkYjdlMGM1MmI1YTE2NjcxMDc1YTkzYTYzY2RhNjQxYTA3OTk3NDU3ZGUzNTgwMzgwZDg4OGUxOGY5ODQzNTYwYThhMmU3ZTkyNDkxMTg3YWM4NWQxYjhjOTY1ZDgxMTUyODljN2YxMDY5MDYifSwic2VjdXJpdHlUb2tlbiI6eyJpdiI6ImQ4MmQwMjhmMzM0OGE3NjQ2ZjdmZjNmNWU0MzVhYjI3IiwiY29udGVudCI6Ijg0MDgzNjFhN2ZmMmNlN2ZlMjdjNGUxYzkwOWE2MDlmNzNjYTY4MWQ5M2JhZjk0MzhhZmE0ZWZjNGJkYWY0NTlkYjg3Yjg4MWVhNDUxM2FlMmYyYzM2YTUifSwianRpIjoiMzhlNTg3YjUtZmEzMy00OTk4LWE0NTgtNjI5ZGU5NzhmNTQ1IiwiaWF0IjoxNjM2ODc1MzQ4LCJleHAiOjE2MzY4Nzg5NDh9.zVP0DMJWYxBSJazdccUMDw6MHlmHJ4drc0WnNC3jMj4"
async function getTrips(latlong, date) {
  const url = 'https://api.iq.inrix.com/v1/trips-count?od=origin&geoFilterType=polygon&points='+ latlong +'&limit=10&startDateTime=%3E%3D'+ date +'T01%3A30&endDateTime=%3C%3D'+ date +'T01%3A45';
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
  var location = ['37.789243929271564%7C-122.4079639367494%2C%2037.78909879856783%7C-122.40794133406685%2C%20%2037.78910996247824%7C-122.40765032452896%2C%2037.789275188155074%7C-122.40764749919363%2C%2037.789243929271564%7C-122.4079639367494',
                  '37.78898518336824%7C-122.40155483176157%2C%2037.788885537839974%7C-122.40139838682059%2C%2037.78894415294337%7C-122.40134258911762%2C%2037.78903529904264%7C-122.40148742840444%2C37.78898518336824%7C-122.40155483176157',
                  '37.79404173321628%7C-122.39949908781728%2C%2037.79380310900872%7C-122.39947059990565%2C%2037.793849933442544%7C-122.3990068167043%2C%2037.79399670984013%7C-122.3990261884842%2C%2037.79404173321628%7C-122.39949908781728']
  for(var j = 0; j < 3; j++){
    var latlong = location[j]
    for(var i = 0; i < 4; i++){
      var curDate = date[i]
      var trip = await getTrips(latlong,curDate)
      trip = parseFloat(trip)
      countTotal += trip
    }
  }
  var avgTrip = (countTotal / 4) * 0.57
  var avgTime = avgTrip * 5
  avgTime += ''

  res.send(avgTime);
});

app.listen(3001, () =>
  console.log('Example app listening on port 3001!'),
);
