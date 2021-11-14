import './../App.css';
import React, { useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";
import history from 'history/browser';
import {createPath} from "history";
import cx from './../utils/axios';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ label, wait }) => <Link to="" style={{textDecoration: "none"}}><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><img width="35px" height="35px" src={process.env.PUBLIC_URL + "/icons/Green.svg"} /><span style={{background: "white", padding: "0.3em", borderRadius: 8, fontSize: "1.4em", color: '#000',}}>{label}</span></div></Link>;


export default (props) => {
  const [search, setSearch] = useState();
  const defaultProps = {
    center: {
      lat: 37.7749,
      lng: -122.4194,
    },
    zoom: 13
  };
  const locations = [
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
      await handleLoadSearch();
    })();
  }, history.location.params)

  const handleLoadSearch = async () => {
    await cx.get("/searchLocations", {
      params: {
        foo: 'bar'
      }
    }).then((res) => {
      console.log(res);
    }).catch(e => console.log(e))
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
      >
        {locations.map((pin, i) => <AnyReactComponent key={i} lat={pin.lat} lng={pin.lng} text={pin.label} wait={pin.wait} />)}
        <AnyReactComponent
          lat={37.7749}
          lng={-122.4194}
          text="Here!"
        />
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