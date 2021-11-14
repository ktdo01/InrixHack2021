import './../App.css';
import React from "react";
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
import axios from 'axios';
import cx from './../utils/axios';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;


export default () => {
  const defaultProps = {
    center: {
      lat: 37.7749,
      lng: -122.4194,
    },
    zoom: 13
  };
//process.env.GOOGLE_MAPS_API_KEY
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyD6Fp2ae4kiqwff7Igw5o5htmSx_W_ZpFY' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
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