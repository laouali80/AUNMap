import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
// import MapView, { Marker, Polygon } from "react-native-maps";
import * as Location from "expo-location";
import polygonData2 from "../../../constant/AUNMap-Polygon/AUNMap-Polygon2.json";
import polygonData1 from "../../../constant/AUNMap-Polygon/AUNMap-Polygon1.json";
import { getPolygonBounds } from "./helpers";

const MapViewLayout = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null); // State for error messages
  const [destination, setDestination] = useState(null);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [markerPoints, setMarkerPoints] = useState([]);
  const [mapBounds, setMapBounds] = useState(null);
  const mapRef = useRef(null);
  const [mapType, setMapType] = useState("standard");

  // useLayoutEffect(() => {
  //   async function getCurrentLocation() {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     // console.log("here........ ", status);
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     //   let nigelec = await Location.geocodeAsync("A8, Wuro Jebbe, Nigeria");
  //     // console.log(location);
  //     setCurrentLocation(location);
  //     //   setGeoLocat(nigelec[0]);
  //   }

  //   getCurrentLocation();
  // }, []);

  // useEffect(() => {
  //   // === Handle University Polygon (polygonData1) ===
  //   if (polygonData2?.features?.length) {
  //     const polygonFeature = polygonData2.features[0];

  //     if (polygonFeature.geometry.type === "Polygon") {
  //       const rawCoords = polygonFeature.geometry.coordinates[0]; // outer ring
  //       const formattedPolygon = rawCoords.map(([lng, lat]) => ({
  //         latitude: lat,
  //         longitude: lng,
  //       }));
  //       setPolygonCoordinates(formattedPolygon); // <- set university layout polygon
  //       const bounds = getPolygonBounds(formattedPolygon);
  //       setMapBounds(bounds);
  //     }
  //   }

  //   // === Handle Marker Points (polygonData1) ===
  //   if (polygonData1?.features?.length) {
  //     const markerFeatures = polygonData1.features.filter(
  //       (f) => f.geometry.type === "Point"
  //     );

  //     const markers = markerFeatures.map((feature) => {
  //       const [lng, lat] = feature.geometry.coordinates;

  //       return {
  //         id: feature.id,
  //         name: feature.properties.name,
  //         description: feature.properties.description?.value || "",
  //         coordinate: {
  //           latitude: lat,
  //           longitude: lng,
  //         },
  //       };
  //     });

  //     setMarkerPoints(markers); // <- set marker points
  //   }
  // }, []);

  const keepMapInBounds = (region) => {
    if (!mapBounds || !mapRef.current) return;

    const { minLat, maxLat, minLng, maxLng } = mapBounds;

    let latitude = region.latitude;
    let longitude = region.longitude;

    let changed = false;

    if (latitude < minLat) {
      latitude = minLat;
      changed = true;
    }
    if (latitude > maxLat) {
      latitude = maxLat;
      changed = true;
    }
    if (longitude < minLng) {
      longitude = minLng;
      changed = true;
    }
    if (longitude > maxLng) {
      longitude = maxLng;
      changed = true;
    }

    if (changed) {
      mapRef.current.animateToRegion({
        ...region,
        latitude,
        longitude,
      });
    }
  };

  useEffect(() => {
    if (polygonCoordinates.length && mapRef.current) {
      mapRef.current.fitToCoordinates(polygonCoordinates, {
        edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
        animated: true,
      });
    }
  }, [polygonCoordinates]);

  if (!currentLocation && !errorMsg) {
    // Show a loading indicator while fetching location
    return (
      <View style={styles.mapContainer}>
        <Text>Fetching location...</Text>
      </View>
    );
  }

  if (errorMsg) {
    // Show an error message if permissions are denied
    return (
      <View style={styles.mapContainer}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  // console.log("polygonCoordinates:", polygonCoordinates);
  return (
    <View style={styles.mapContainer}>
      {/* {currentLocation && (
        <MapView
          style={{ flex: 1 }}
          ref={mapRef}
          initialRegion={{
            latitude: currentLocation?.coords?.latitude ?? 0,
            longitude: currentLocation?.coords?.longitude ?? 0,

            latitudeDelta: 0.005, // Good zoom level for buildings
            longitudeDelta: 0.005,
          }}
          cameraZoomRange={{ minZoomLevel: 15, maxZoomLevel: 20 }}
          onRegionChangeComplete={keepMapInBounds}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {polygonCoordinates.length > 2 && (
            <Polygon
              coordinates={polygonCoordinates}
              fillColor="rgba(0, 128, 255, 0.2)"
              strokeColor="blue"
              strokeWidth={2}
            />
          )}

          {markerPoints.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.name}
              description={marker.description.replace(/<[^>]*>?/gm, "")} // strip HTML tags
            />
          ))}

          <Marker
            title="Origin"
            key={currentLocation.id}
            coordinate={{
              latitude: currentLocation?.coords?.latitude ?? 0,
              longitude: currentLocation?.coords?.longitude ?? 0,
            }}
            //   title={location.name}
            // description={currentLocation.description}
            // onPress={() => handleLocationPress(currentLocation)}
          />
        </MapView>
      )} */}
      <Button
        title="Toggle Map Type"
        style={{ position: "absolute", bottom: 10, right: 10, width: 150 }}
        onPress={() => {
          setMapType((prev) =>
            prev === "standard" ? "satellite" : "standard"
          );
        }}
      />
    </View>
  );
};

export default MapViewLayout;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: "#E5E7EB",
  },
});
