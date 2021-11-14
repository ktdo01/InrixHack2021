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

const userToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6ImphbDIyM200bmYiLCJ0b2tlbiI6eyJpdiI6IjQyNzFjZjk2NTRiYzc2YmE2MjUxMjBjZTU2NTNiZWQ5IiwiY29udGVudCI6IjkwNDk5NWM4ZGM1MTIyYmI1YzU3ZDVjZDNjYzY0OTY4N2IwZGZhY2JmZmU1NDI4YTAyNmNhZjM5MWZlNmRjMDBmZWE2NTlmOTYyNDEzOTRlMmFiZDk0MjYwMGQ5YWQwMGFjZjRmZmI0NDA2ZDNjOGQ3NGRiMjU3MWMwZmJmNzZlZTkxMzA2YjkwYjgyMzAzMjBlMzA3ODhjNmY0OWQzZjFiZGFmY2EyZTI5YjQ4YWZiODE0MThkYmFhNThjMzhiNjBmMmViZTU5MWVkYjA2NjA2MzgwOGQ2OGFhNjNhYjk3ZWU4YWYyNGQ5MTQ0NjA1ZWU2NDkwODU5ZDMxNTI4ZjhkMzcyM2NlOGMzM2JmMGUyNzYyYjZhOTkzYzU0ZWY3YzdhMmZhYjhiZTM3OTc2M2FmY2ZhZDNmZjA4ZGUwMzAzOGFmOGM3YWViMWQxNGUxYjcwZjMwYzU2NTM3MTIyMDhjODQxMjBmNGM3N2MzZWU5NWRhOTgxOWNmYzVlM2Q4NmVhZTA4NWEzNTIwYTlmZjdhYzQ1MTUwODcwMWJhOTljMmQ3NGIxZjU4YjI5OGRhMDI0OGVhOTlmYmIzN2NjNTgyZGI5N2I5YTkwOWMwMTYxMzU3MzAyYzI3M2E1MTRmNjIyMmQ5ZGQ3YTBjODQ3MjFhYWIwMzMxMmQ3OGEzZGQwZTY1NDk5YzIwNDJhNTcyZjY1YzUzMTFiZjhlMWM3MzZjZmE3MTRmMWM0ZjFhODkzOWNiMGQzNzNkMDA4MzIwY2FmMDM0OTZiYmEyOGM0ODcxYzA1MWRlZmJiMzAxNjgxMWJiNzZhNjE0NjRlZGM0OTZiYTIwZGUxYWVkMGU2ZDU2MDhiNWJjMmU3ZTQ5MTBhNGM4ODI0In0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiI0MjcxY2Y5NjU0YmM3NmJhNjI1MTIwY2U1NjUzYmVkOSIsImNvbnRlbnQiOiJjMzAyOGNjN2M4NWYyZmEzNjY1MWE5YTkwMGYyNGUyYTAyM2RjOThjYzZlNTI3YzcwYjY0YTIyNTIwY2JjNzJlZmRiNjU0OTczODExMDI2MzJiYjFiYjE4In0sImp0aSI6ImQyMzM3NjU1LWVlMGUtNDJiYy1iYzQwLWY3ODk5ODI2MTE4MyIsImlhdCI6MTYzNjkwNjQyNCwiZXhwIjoxNjM2OTEwMDI0fQ.b_LWhyM41WM4Ise2i7olsc9HMamBvDK7f8vz29xqx7c"
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
  var time = avgTrip * 5
  time += ''

  res.render("5 min");
});

app.listen(3001, () =>
  console.log('Example app listening on port 3001!'),
);
