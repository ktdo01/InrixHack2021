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

const userToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6ImphbDIyM200bmYiLCJ0b2tlbiI6eyJpdiI6ImQ4MmQwMjhmMzM0OGE3NjQ2ZjdmZjNmNWU0MzVhYjI3IiwiY29udGVudCI6IjgwMjYxODJiMmJmMmQ3NGNjODdkMzUxMzkwYjE1OGRlMDg5NjEzMTc5ODkyZmMxNDkxY2M2MmI5NDljNmI0NDVmOWY2ZGZmZWFjNTAwZWQ0MTEwMzFkOWIzMDNmZWI3YTdkMWQyMjFkN2VlNmM5N2M1NGY1OWZhMzkzYThhNzkzZTYxZDY4MjU3NGM2MGE1MTE2NGQ1YWVkYzc1ZmRmYzQ1OWRjMGNiMzRkZmYwZWY2ODhiMzc1YTM0ZTAzMDY5ZTI1MzhhMThhMDQwMDJjZjlkZDkwMTk1MThiNGI5YWRjMDE0YWZiNjVmMGExZDQ3NDI0ZTIyZmY4ZTkxODdkNzZhYWFiNDU1M2M4ODQxYWVjMTQ5OTljMDY5NmJlYjEyYjZhNTQwZGMwMThlNjdiYTllODAwMzE3ZDVmNzRiZDlhYWFlNzU0YWVhMTM1ZTI3NDI2ODA4YWY0N2ViZjUxZWIzN2IxOTkwMmY0Y2FhZTg4NGU1NWMxODEyM2UzNGQ3MDM4NjU4ZDI3Njk0MjU4MGQ5OGUxY2YzMWU2Y2VjZTRhOWRmZWVkMjY4NzI4NWE0MDRhZTFkYjAzN2JjODFkZTkyN2IzYWY0NDhhMzhiY2M2OGI4MWIyYjI0NTgzYTVhOTk0MjI2MjE0YmFmMGVjY2M5MDY1NmUxNGM4NDczNzdhMjU5ZGE1M2ZkOWFlMmYxM2M0NmMzMzJiYjhhNTRhYmViYmZlNmZkYjdlMGM1MmI1YTE2NjcxMDc1YTkzOGQxZTgwNjE0MTQ4YmY1NjU3ZTgzMDgzMjA2ZmI3YWExMWMwOWY2ZDQwYTg5MGQyZTMyNWE2NWE0ZGRjNTAzOWNmZWMzMmY0MWIyNDllNGUzMzRjMjAifSwic2VjdXJpdHlUb2tlbiI6eyJpdiI6ImQ4MmQwMjhmMzM0OGE3NjQ2ZjdmZjNmNWU0MzVhYjI3IiwiY29udGVudCI6IjgyMzQwNzMxMWFkZGYwNzJjODdiMzMyZWZjYWM2N2JiMDBiODM2MWNhMmNmYzg0MDgyYmU3M2UzNjQ5NDkwNmI5N2NmYzdiZGU3NzAzM2Q4MzAyZTFjYTUifSwianRpIjoiZWZiNzI1MzUtY2RiZS00OTVmLWFlMjMtZjg5NTU0Y2U5NzgxIiwiaWF0IjoxNjM2ODcwMzk5LCJleHAiOjE2MzY4NzM5OTh9.mgjN0lzH9quoiCa_nyw_Swe--y7i3d7WZsFQJ96EqUY"
async function getTrips(date) {
  const url = 'https://api.iq.inrix.com/v1/trips-count?od=origin&geoFilterType=polygon&points=37.734622%7C-122.471603%2C37.743627%7C-122.463850%2C37.743066%7C-122.475429&limit=10&startDateTime=%3E%3D'+ date +'T01%3A30&endDateTime=%3C%3D'+ date +'T01%3A45';
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
    var trip = await getTrips(curDate)
    trip = parseFloat(trip)
    countTotal += trip
  }
  var avgTrip = countTotal / 4
  var avgTime = avgTrip * 5

  res.send(avgTime);
});

app.listen(3001, () =>
  console.log('Example app listening on port 3001!'),
);
