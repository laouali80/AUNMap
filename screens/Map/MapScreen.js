import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Dimensions,
  Animated,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapViewLayout from "./components/MapViewLayout";
import { ChevronLeft, Navigation } from "lucide-react-native";
import DirectionsScreen from "./components/Directions";

const MapScreen = ({ route }) => {
  const { redirectLocation } = route?.params || {};
  console.log("Redirect Location:", redirectLocation);
  const navigation = useNavigation();
  const pulseAnim = new Animated.Value(1);
  const initSelectedLocation = redirectLocation ? redirectLocation : null;
  const initDirections = redirectLocation ? true : false;
  const [selectedLocation, setSelectedLocation] =
    useState(initSelectedLocation);
  const [showDetail, setShowDetail] = useState(false);
  const [directions, setDirections] = useState(initDirections);

  // Start pulse animation
  React.useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, []);

  // Nearby locations data
  const nearbyLocations = [
    {
      id: "1",
      name: "Main Library",
      description: "Central library with study spaces and computer labs",
      category: "Academic",
      distance: "5 min walk",
      icon: "📚",
      color: "#3B82F6",
      bgColor: "#DBEAFE",
      directions: [
        {
          id: "1",
          instruction: "Head past the bus stop after exiting the cafeteria",
          distance: "200m",
          time: "3 mins",
          type: "start",
        },
        {
          id: "2",
          instruction:
            "Turn right at the intersection and head straight to Robert A. Pastor Library and E-learning Center",
          distance: "100m",
          time: "2 mins",
          type: "turn",
        },
        {
          id: "3",
          instruction: "Your destination, Main Library",
          distance: "0m",
          time: "0 mins",
          type: "destination",
        },
      ],
    },
    {
      id: "2",
      name: "Student Cafeteria",
      description: "Main dining hall serving breakfast, lunch and dinner",
      category: "Dining",
      distance: "3 min walk",
      icon: "🍽️",
      color: "#F97316",
      bgColor: "#FFEDD5",
      directions: [
        {
          id: "1",
          instruction:
            "From the entrance of the library, head straight toward the new football field.",
          distance: "200m",
          time: "3 mins",
          type: "start",
        },
        {
          id: "2",
          instruction: "Turn right and walk past the bus stop",
          distance: "100m",
          time: "2 mins",
          type: "turn",
        },
        {
          id: "3",
          instruction: "Your destination, Student Cafeteria",
          distance: "0m",
          time: "0 mins",
          type: "destination",
        },
      ],
    },
    {
      id: "3",
      name: "Health Center",
      description: "Campus medical services and counseling",
      category: "Health",
      distance: "8 min walk",
      icon: "🏥",
      color: "#10B981",
      bgColor: "#D1FAE5",
      directions: [
        {
          id: "1",
          instruction: "Head to Admin 1 and admin 2 buildings.",
          distance: "200m",
          time: "3 mins",
          type: "start",
        },
        {
          id: "2",
          instruction: "Go straight to the end of the road and turn left",
          distance: "100m",
          time: "2 mins",
          type: "turn",
        },
        {
          id: "3",
          instruction: "Your destination, Health Center",
          distance: "0m",
          time: "0 mins",
          type: "destination",
        },
      ],
    },
    {
      id: "4",
      name: "Gym Complex",
      description: "Fitness center with pool and sports facilities",
      category: "Recreation",
      distance: "10 min walk",
      icon: "🏀",
      color: "#8B5CF6",
      bgColor: "#EDE9FE",
      directions: [
        {
          id: "1",
          instruction: "Head to the commencement hall",
          distance: "200m",
          time: "3 mins",
          type: "start",
        },
        {
          id: "2",
          instruction:
            "Go straight to the end of basketball court and turn left",
          distance: "100m",
          time: "2 mins",
          type: "turn",
        },
        {
          id: "3",
          instruction: "Your destination, Gym Complex",
          distance: "0m",
          time: "0 mins",
          type: "destination",
        },
      ],
    },
  ];

  // console.log("Selected Location:", selectedLocation);

  const handleLocationPress = (location) => {
    setSelectedLocation(location);
    setShowDetail(true);
  };

  const handleBackPress = () => {
    setShowDetail(false);
    setSelectedLocation(null);
  };

  const handleGetDirections = () => {
    // Navigate to directions screen or show directions
    console.log("Get directions to:", selectedLocation.name);
    setShowDetail(false);
    setDirections(true);
  };

  const handleSaveLocation = () => {
    // Save location logic
    console.log("Save location:", selectedLocation.name);
  };

  const renderLocationItem = (location) => (
    <TouchableOpacity
      key={location.id}
      style={styles.locationItem}
      onPress={() => handleLocationPress(location)}
    >
      <View
        style={[styles.locationIcon, { backgroundColor: location.bgColor }]}
      >
        <Text style={[styles.locationIconText, { color: location.color }]}>
          {location.icon}
        </Text>
      </View>
      <View style={styles.locationInfo}>
        <Text style={styles.locationName}>{location.name}</Text>
        <Text
          style={styles.locationDescription}
          ellipsizeMode="tail"
          className="line-clamp-1"
        >
          {location.description}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.navigationButton}
        onPress={() => navigation.navigate("Map", { location })}
      >
        <Navigation size={16} color="#2563eb" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const LocationDetailView = () => (
    <View style={styles.detailPanel}>
      <View style={styles.detailContent}>
        <View style={styles.detailHeader}>
          <TouchableOpacity
            onPress={handleBackPress}
            style={styles.backButtonDetail}
          >
            <ChevronLeft color="#2563EB" />
            <Text style={{ color: "#2563EB", fontSize: 14, fontWeight: "500" }}>
              Back
            </Text>
          </TouchableOpacity>
          <Text style={styles.detailTitle}>{selectedLocation?.name}</Text>
          <View style={styles.emptySpace} />
        </View>

        <View style={styles.locationInfoCard}>
          <Text style={styles.locationDescriptionDetail}>
            {selectedLocation?.description}
          </Text>
          <View style={styles.locationMeta}>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>📍</Text>
              <Text style={styles.metaText}>{selectedLocation?.category}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>⏱️</Text>
              <Text style={styles.metaText}>{selectedLocation?.distance}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleGetDirections}
          >
            <Text style={styles.primaryButtonText}>Get Directions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleSaveLocation}
          >
            <Text style={styles.secondaryButtonText}>Save Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      {/* Map Section */}
      <View style={styles.mapContainer}>
        <MapViewLayout />
      </View>

      {/* Nearby Locations Section or Location Detail View */}
      <View style={styles.bottomPanel}>
        {showDetail && selectedLocation ? (
          <LocationDetailView />
        ) : directions && selectedLocation ? (
          <DirectionsScreen
            goBack={() => setDirections(false)}
            selectedLocation={selectedLocation}
          />
        ) : (
          <>
            <View style={styles.locationsHeader}>
              <Text style={styles.locationsTitle}>Nearby Locations</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.locationsList}
              showsVerticalScrollIndicator={false}
            >
              {nearbyLocations.map(renderLocationItem)}
            </ScrollView>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  menuIcon: {
    fontSize: 18,
    color: "#6B7280",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
  },
  mapContainer: {
    flex: 1,
    backgroundColor: "#E5E7EB",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  zoomControls: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "transparent",
  },
  zoomButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  zoomIcon: {
    fontSize: 16,
  },
  marker: {
    position: "absolute",
  },
  markerPin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  markerIcon: {
    fontSize: 14,
    color: "white",
  },
  currentLocation: {
    position: "absolute",
    transform: [{ translateX: -8 }, { translateY: -8 }],
  },
  currentLocationPin: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#3B82F6",
    borderWidth: 2,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  bottomPanel: {
    height: 320,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  locationsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  locationsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  viewAll: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "500",
  },
  locationsList: {
    flex: 1,
    padding: 16,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  locationIconText: {
    fontSize: 18,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1F2937",
    marginBottom: 2,
  },
  locationDescription: {
    fontSize: 12,
    color: "#6B7280",
  },
  arrowContainer: {
    paddingLeft: 8,
  },
  arrowIcon: {
    fontSize: 16,
    color: "#9CA3AF",
  },
  // Detail View Styles
  detailPanel: {
    flex: 1,
    padding: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  backButtonDetail: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  backButtonText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "500",
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
  emptySpace: {
    width: 60, // Same width as back button for balance
  },
  locationInfoCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  locationDescriptionDetail: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
    lineHeight: 20,
  },
  locationMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#6B7280",
  },
  actionButtons: {
    flex: 1,
    justifyContent: "flex-end",
  },
  primaryButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  secondaryButton: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
  },
  bottomNav: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navItem: {
    alignItems: "center",
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navIconActive: {
    color: "#2563EB",
  },
  navIconInactive: {
    color: "#9CA3AF",
  },
  navText: {
    fontSize: 12,
  },
  navTextActive: {
    color: "#2563EB",
    fontWeight: "500",
  },
  navTextInactive: {
    color: "#9CA3AF",
  },
  navigationButton: {
    width: 32,
    height: 32,
    backgroundColor: "#dbeafe",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MapScreen;
