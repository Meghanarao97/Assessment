import axios from "axios";
import React, { useState, useEffect } from "react";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Cities from "../MapMarkerLayer/Cities.json";
import { useDispatch, useSelector } from "react-redux";
import { setlocation } from "../redux/actions/locationActions";

const key =
  "pk.eyJ1IjoibWVnaGFuYWdvbmEiLCJhIjoiY2wwdm95bGR4MTk1NjNqbnhxdjVpOXg2cCJ9.mGgMzV5GXVg-rvO1ZTH94Q";
const styling =
  "https://api.maptiler.com/maps/basic/style.json?key=yhktnDuKG7EtKLRTYn43";

const MapAssessment = () => {
  const toDosData = useSelector((state) => state.product.location);
  console.log(toDosData);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  //   const [toDosData, setToDosData] = useState([]);
  const [toDoList, setTodoList] = useState({});
  const [popupData, setPopUPData] = useState({
    lat: 37.8,
    lng: -122.4,
  });
  const [viewState, setViewState] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 5,
  });

  const getTodoListFun = () => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      console.log("res", res);
      if (res.data.length > 0) {
        // setToDosData(res.data);
        dispatch(setlocation(res.data));
      }
    });
  };

  useEffect(() => {
    getTodoListFun();
  }, []);

  const mapOnClickFun = (evt) => {
    const lat = evt.lngLat.lat;
    const lng = evt.lngLat.lng;
    const todoslist =
      toDosData.length > 0
        ? toDosData[Math.floor(Math.random() * toDosData.length)]
        : null;

    setPopUPData({ lat, lng });
    setTodoList(todoslist);
    setShowPopup(true);
  };

  const onMoveFun = (evt) => {
    setViewState(evt.viewState);
  };
  return (
    <div>
      <Map
        {...viewState}
        onMove={(evt) => onMoveFun(evt)}
        onClick={(evt) => mapOnClickFun(evt)}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle={styling}
        mapboxAccessToken={key}
      >
        <NavigationControl />
        {Cities.length > 0
          ? Cities.map((loc) => (
              <Marker
                key={loc.latitude}
                longitude={loc.longitude}
                latitude={loc.latitude}
                color="red"
              />
            ))
          : null}
        {showPopup && (
          <Popup
            longitude={popupData.lng}
            latitude={popupData.lat}
            anchor="bottom"
            onClose={() => setShowPopup(false)}
          >
            <div className="popup-details">
              <p style={{ marginBottom: "0px" }}>TITLE: {toDoList.title}</p>
              <p style={{ marginTop: "0px" }}>USER ID: {toDoList.id}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};
export default MapAssessment;
