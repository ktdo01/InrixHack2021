import './../App.css';
import React, { useEffect, useState} from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";
import history from 'history/browser';
import cx from './../utils/axios';
import GoogleMapReact from 'google-map-react';


const Pin = ({ label, wait, setSelectedPin }) => {
const colorFiles = ["Green.svg", "Yellow.svg", "Red.svg", "Gray.svg"];
return (
  <Link to="" onClick={() => setSelectedPin(wait)} style={{textDecoration: "none"}}>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <img width="35px" height="35px" src={process.env.PUBLIC_URL + "/icons/" + colorFiles[(wait-1 < 4 && wait-1 > -1) ? wait-1 : 3]} />
      <span style={{background: "white", padding: "0.3em", borderRadius: 8, fontSize: "1.4em", color: '#000',}}>
        {label}
      </span>
    </div>
  </Link>
);
}


export default (props) => {
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();

  const [center, setCenter] = useState([37.75571, -122.39812]);
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedPin, setSelectedPin] = useState();

  useEffect(() => {
    console.log(query.get("q"))
    if (query.get("q")) {
      setSearch(query.get("q"));
    }
    setCenter({ lat: query.get("lat"), lng: query.get("lng") })
   
    console.log("lat" + query.get("lat") + " lng: " + query.get("lng"))
  }, []);

  const defaultProps = {
      center: {
        lat: 37.75571,
        lng: -122.39812,
      },
      zoom: 13
    };
  const locations2 = [
    {
      lat: 37.777,
      lng: -122.40,
      label: "In-N-Out",
      wait: 2
    },
    {
      lat: 37.95,
      lng: -122.4199,
      label: "hie",
      wait: 1
    }
  ];


  useEffect(() => {
    (async () => {
      await cx
      .get("/business", { params: { search } })
      .then((res) => {
        console.log(res);
        if (res.data) {
          console.log(res.data)
          
          setLocations(res.data.map((d, i) => ({...d, wait: Math.floor(Math.random() * (4) + 1)})))
        }
      })
      .catch(console.log);
    })()
  }, [search])


  const showPin = () => {
    if (selectedPin) {
      if (selectedPin === 1) {
        return (
          <>
          <h1>Current wait time: 5 minutes</h1>
          </>
        );
      }
      else {
        return (
          <>
          <h1>Current wait time: 20 minutes</h1>
          </>
        );
      }      
    }
  }
//process.env.GOOGLE_MAPS_API_KEY
  return (
    // Important! Always set the container height explicitly
    <div>
      <div style={{position: 'absolute', top: '2em', left: '2em', width: '80%', zIndex: 100}}>
        <input type="text" value={search} className="search-bar" onChange={e => { e.preventDefault(); setSearch(e.target.value)}} />
        <Link style={{position: "relative", top: 15, left: 10}} to={"/search?q=" + search}>
            <img src={process.env.PUBLIC_URL + "/icons/Search2.svg"} />
          </Link>

      </div>
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyD6Fp2ae4kiqwff7Igw5o5htmSx_W_ZpFY' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        // center={center}
      >
        {locations.length > 0 ? locations.map((pin, i) => pin.coordinates ? <Pin key={i} setSelectedPin={setSelectedPin} lat={pin.coordinates.latitude} lng={pin.coordinates.longitude} label={pin.name} wait={pin.wait} /> : null) : <></>}

      </GoogleMapReact>
    </div>
    {selectedPin ? <div style={{position:'fixed', bottom: 0, left: 0, zIndex: 100, width: '100%', height: '23%', background: 'hsla(0,0%,100%,0.85'}}>{showPin()}</div> : null}
    </div>
  );
}

// export default (props) => {
  
//     // A custom hook that builds on useLocation to parse
//   // the query string for you.
//   // function useQuery() {
//   //   // const { search } = useLocation();

//   //   return React.useMemo(() => new URLSearchParams(search), [search]);
//   // }
//   // let query = useQuery();

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     // let path = createPath({ pathname: '/search', search: '?q=' + search });
//     // history.push(path);
//     await cx.get("/hi").then((res) => {
//       console.log(res);
//     });
//     // setShortcut(true);
//   }


//   return (
//     <div>
//       <SimpleMap />
//     </div>
//   );
// }