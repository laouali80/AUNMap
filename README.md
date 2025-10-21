ressources
https://reactnavigation.org/docs/bottom-tab-navigator?config=dynamic

https://lucide.dev/guide/packages/lucide-react-native

Great! You're working on integrating a **Google Earth polygon** into a custom `MapScreen` view that currently uses a static image as a map. You also want to add the polygon and center the view around your **current location**.

Here's a step-by-step breakdown of how to:

---

## ✅ Goal

**Display a custom-drawn polygon from Google Earth on your current map screen**, and **center the view on your current location**.

---

## 🔧 Step 1: Export the Polygon from Google Earth

1. **Go to [earth.google.com](https://earth.google.com).**
2. Draw your polygon using the **"Add Polygon"** tool.
3. Save the polygon to a **Project** (if not already).
4. **Export as KML/KMZ**:

   - Open the Project panel.
   - Click on the three-dot menu (`⋮`) next to your polygon or folder.
   - Select **“Export as KML”**.
   - Download the `.kml` file.

---

## 📌 Step 2: Convert KML to GeoJSON (Optional but Recommended)

React Native does not support KML directly unless you're using a specific plugin. To render polygons easily, **convert the KML to GeoJSON**.

### Tools to Convert KML → GeoJSON:

- [https://mapshaper.org/](https://mapshaper.org/)
- [https://geojson.io/](https://geojson.io/)
- [https://mygeodata.cloud/converter/kml-to-geojson](https://mygeodata.cloud/converter/kml-to-geojson)

> After conversion, you'll get coordinates like this:

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [longitude1, latitude1],
        [longitude2, latitude2],
        ...
        [longitude1, latitude1]  // closed polygon
      ]
    ]
  },
  ...
}
```

---

## 🗺️ Step 3: Replace the Static Image Map with `react-native-maps`

To render polygons and current location dynamically, you'll need to switch from using a static `ImageBackground` to an actual **interactive map**, like [react-native-maps](https://github.com/react-native-maps/react-native-maps).

### Install the Library

```bash
npm install react-native-maps
# or
yarn add react-native-maps
```

---

## 🧭 Step 4: Get Current Location

Use `react-native-geolocation` or `expo-location` (if using Expo) to get user position.

### Example:

```js
import Geolocation from "@react-native-community/geolocation";

// inside useEffect
Geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    setCurrentLocation({ latitude, longitude });
  },
  (error) => console.error(error),
  { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
);
```

---

## 🧱 Step 5: Display the Polygon and User Location on Map

Replace your `ImageBackground` section with a live map and use `MapView`, `Polygon`, and `Marker`.

### Replace Map Section:

```jsx
import MapView, { Marker, Polygon } from 'react-native-maps';

// Add in your state
const [currentLocation, setCurrentLocation] = useState(null);

// Your polygon coordinates from GeoJSON
const polygonCoordinates = [
  { latitude: 12.9716, longitude: 77.5946 },
  { latitude: 12.9726, longitude: 77.5956 },
  { latitude: 12.9736, longitude: 77.5936 },
  { latitude: 12.9716, longitude: 77.5946 }, // closed
];

...

<View style={styles.mapContainer}>
  {currentLocation && (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      showsUserLocation={true}
    >
      <Polygon
        coordinates={polygonCoordinates}
        fillColor="rgba(0, 128, 255, 0.2)"
        strokeColor="blue"
        strokeWidth={2}
      />

      {/* Example Marker */}
      {nearbyLocations.map((location) => (
        <Marker
          key={location.id}
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title={location.name}
          description={location.description}
          onPress={() => handleLocationPress(location)}
        />
      ))}
    </MapView>
  )}
</View>
```

---

## 🧭 Step 6: Update `nearbyLocations` with Coordinates

You’ll need to add latitude/longitude to your static `nearbyLocations`:

```js
const nearbyLocations = [
  {
    id: "1",
    name: "Main Library",
    description: "...",
    category: "Academic",
    distance: "5 min walk",
    icon: "📚",
    latitude: 12.9718,
    longitude: 77.5947,
  },
  ...
];
```

---

## ✅ Final Checklist

| Task                                     | Done? |
| ---------------------------------------- | ----- |
| Exported KML from Google Earth           | ✅    |
| Converted KML to GeoJSON                 | ✅    |
| Installed and set up `react-native-maps` | ✅    |
| Replaced static image map with `MapView` | ✅    |
| Added polygon and markers to the map     | ✅    |
| Centered map on user's location          | ✅    |

---

## 🧠 Bonus Tips

- You can dynamically load GeoJSON using [geojson-utils](https://www.npmjs.com/package/geojson-utils) if you want.
- For campus apps, offline maps are also an option using `Mapbox`.

---

If you want, I can help you **refactor your `MapScreen` component** with this updated dynamic map setup. Let me know if you want the full updated code!
# AUNMap
