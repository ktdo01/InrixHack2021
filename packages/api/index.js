import express from 'express';
import fetch from 'node-fetch';
import asad from './asad.js';
const app = express();
app.use(asad);
async function getTrips() {
  const url = 'https://api.iq.inrix.com/v1/trips-count?od=origin&geoFilterType=polygon&points=37.734622%7C-122.471603%2C37.743627%7C-122.463850%2C37.743066%7C-122.475429&limit=10&startDateTime=%3E%3D2020-12-01T02%3A31&endDateTime=%3C%3D2020-12-15T02%3A31';
  const response = await fetch(url, {
    headers: {
      "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6IndvNTNod2l6MWYiLCJ0b2tlbiI6eyJpdiI6Ijk4N2RiMTJmZTg1ZDQ2NzQ3NjcxYzI1NGFhMTkzYzg2IiwiY29udGVudCI6IjMyNmI2OTI2NDAwZWIyNzQ0ZDdjMzFlNzBkNjU2NjA3NjY2MTdmMDgxMDY5MTU3NmQ0NGMxNTllOGEwNWFiNjQzZTFkMDlkMmM2MDdlNTFmMTY2MjRlNTQ0NzI0YWI4MmU3Zjk1YjM3NDhiOGIyMjY2OGY4NDY1MDI3NjVmMWViOWYyNjY1ODRhODczOWU0NTJiN2M4YjA2M2FlZWY3ZTViMGJkMWUwN2Y3MzFmZWNhYzU3MWY5NDhkY2I1NzFmMDAwMDljNDAxYWE0MmQ1MGUwODA2MWYzNjAzZWY5MTMxYWYxNGNlYWJiZjBhZTlmODEzZjE1YTI1NjNiMWQxNWM2M2JjZDYzNDUxZWY5YzU1NWRjMjkyYTE0Y2ZlOWY0NDA1MzFhODUyZjhiOWQwZTg2ZDc2MDFhYTQ4OThjZjg3N2M0NmQ1NjA2YTA3OGQ5NWMzMzYzN2ZjNDllOGMxY2RiNWFlMWNkOWQxMjI5NWU3OWU1MDhmZmQ1ZDEwMzA1YjI5OWEyMGQwNWY4ZDMzNjg0ODE0MWNlMGQ2NGY1OWRhMTU5MzgzMWJlMjRmZTA1NTcxZmE0NmViMGJmOGY5YTdjNDZkNWVmYmY0NzdhMDQxY2RmMDJkNDY0YjIzN2EzM2E2MDE3ODNhNjVlNTBlYWIxMmIyZGQzMjhkMGZjMzUzZTA3Y2VhNjE1YzA5MTRiMzE2ZWRjMTY2OTNiZDY2NzEyNjExYmYxZTgxNjY5YWFlMzQ5M2ZmYWQ4NTc0ZGY0ODRhYzVjNjAxMTMzMDlmMWE3NmUwNTYwNjgxNmI3YmEyYjM0NGFmZjNhOWRkMGVmMTRkNWFhZWI1YTY3MjQ2NDlmNTA5ODY3ZDIzYWFlOTdhZjQifSwic2VjdXJpdHlUb2tlbiI6eyJpdiI6Ijk4N2RiMTJmZTg1ZDQ2NzQ3NjcxYzI1NGFhMTkzYzg2IiwiY29udGVudCI6IjM4NjM3MTNjMTEzMWJkMjU1YjI1MWZkODcyNzU2NDZjNjQ0YzVkMjI2ZDRhMmEyMmNmM2IxZGQxZmI1YWVmNzAzOTE4NzBiOTkwMDdmZjIyMmQ0YjY5NmEifSwianRpIjoiM2EyZDZmNjQtY2VmNS00Y2NkLWFiNzAtNzBjMzAzZTU2MGQ1IiwiaWF0IjoxNjM2ODQ2NDQ5LCJleHAiOjE2MzY4NTAwNDl9.skdvODDe_L1hyIr2WSQGUgktj2RKpODFSC0bblsjZVg"
    }
  })
  return await response.json();
}
 
app.get('/', async (req, res) => {
  const trip = await getTrips()
  res.send(trip);
});

app.get('/test', (req, res) => {
  const poo = {
    "1": req.query.id,
    "2": req.query.name
  }
  res.send(poo);
})

app.listen(3001, () =>
  console.log('Example app listening on port 3001!'),
);