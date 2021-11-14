import './../App.css';
import React, { useEffect, useState} from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";
import history from 'history/browser';
import cx from './../utils/axios';
import GoogleMapReact from 'google-map-react';


const Pin = ({ label, wait }) => {
const colorFiles = ["Green.svg", "Yellow.svg", "Red.svg", "Gray.svg"];
return (
  <Link to="" style={{textDecoration: "none"}}>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <img width="35px" height="35px" src={process.env.PUBLIC_URL + "/icons/" + colorFiles[(wait < 4 && wait > -1) ? wait : 3]} />
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
  const [search, setSearch] = useState();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    setCenter({ lat: query.get("lat"), lng: query.get("lng") })
   
    console.log("lat" + query.get("lat") + " lng: " + query.get("lng"))
  }, [history.location.search]);

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
      setSearch(query.get("q"))
      await handleLoadSearch();
    })();
  }, [history.location.params])

  const handleLoadSearch = async () => {
    const { data } = await cx.get("/searchLocations", {
      params: {
        foo: 'bar'
      }
    }).catch(e => console.log(e));
    console.log(data)
    setLocations(data);
  }
//process.env.GOOGLE_MAPS_API_KEY
  return (
    // Important! Always set the container height explicitly
    <div>
      <div style={{position: 'absolute', top: '2em', left: '2em', width: '80%', zIndex: 100}}>
        <input type="text" className="search-bar" onChange={e => { e.preventDefault(); setSearch(e.target.value)}} />
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
        {locations.length > 0 ? locations.map((pin, i) => <Pin key={i} lat={pin.lat} lng={pin.lng} label={pin.label} wait={pin.wait} />) : <></>}

      </GoogleMapReact>
    </div>
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