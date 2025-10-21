import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  StatusBar,
} from "react-native";
import {
  ArrowLeft,
  Bookmark,
  Search,
  Building,
  MapPin,
  Users,
  Navigation,
  DoorClosed,
  CircleChevronLeft,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";

const BuildingDetailScreen = ({ route }) => {
  const { building } = route.params;

  console.log("Building detail route params:", route.params);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("all");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Buiding Detail",
      headerTitleAlign: "center",
      headerLeft: () => (
        <TouchableOpacity
          onPress={navigation.goBack}
          style={styles.backButton}
          // style={{ paddingLeft: 3 }}
        >
          <CircleChevronLeft size={30} color="#4b5563" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  // Sample data - replace with your actual data
  const buildingData = {
    name: "Academic Building A",
    address: "123 Campus Drive",
    floors: 3,
    rooms: 24,
    operatingHours: "Mon-Fri: 6:00 AM - 10:00 PM, Sat-Sun: 8:00 AM - 8:00 PM",
    contact: "Building Services: (555) 123-4567",
    description: "Main academic building housing classrooms and lecture halls",
  };

  const locations = [
    {
      id: 1,
      name: "Class A-101",
      status: "available",
      statusColor: "#16a34a",
      statusBg: "#dcfce7",
      description: "Standard classroom with projector and whiteboard",
      floor: "1st Floor • A-101",
      seats: 30,
      amenities: ["Projector", "Whiteboard", "Air Conditioning", "WiFi"],
      icon: "school",
      iconColor: "#2563eb",
    },
    {
      id: 2,
      name: "Class A-102",
      status: "occupied",
      statusColor: "#dc2626",
      statusBg: "#fecaca",
      description: "Small classroom ideal for seminars",
      floor: "1st Floor • A-102",
      seats: 25,
      amenities: ["Smart Board", "Air Conditioning", "WiFi"],
      icon: "school",
      iconColor: "#2563eb",
    },
    {
      id: 3,
      name: "Class B-201",
      status: "available",
      statusColor: "#16a34a",
      statusBg: "#dcfce7",
      description: "Large lecture hall with tiered seating",
      floor: "2nd Floor • B-201",
      seats: 80,
      amenities: ["Projector", "Microphone System", "Tiered Seating", "WiFi"],
      icon: "presentation",
      iconColor: "#7c3aed",
    },
    {
      id: 4,
      name: "Class B-202",
      status: "maintenance",
      statusColor: "#ca8a04",
      statusBg: "#fef9c3",
      description: "Computer lab with latest software",
      floor: "2nd Floor • B-202",
      seats: 40,
      amenities: ["40 Computers", "Software Suite", "Printer", "WiFi"],
      icon: "computer",
      iconColor: "#16a34a",
    },
    {
      id: 5,
      name: "Class C-301",
      status: "available",
      statusColor: "#16a34a",
      statusBg: "#dcfce7",
      description: "Meeting room for faculty and staff",
      floor: "3rd Floor • C-301",
      seats: 15,
      amenities: [
        "Conference Table",
        "Video Conferencing",
        "Whiteboard",
        "WiFi",
      ],
      icon: "group",
      iconColor: "#ea580c",
    },
    {
      id: 6,
      name: "Lecture Hall 1",
      status: "occupied",
      statusColor: "#dc2626",
      statusBg: "#fecaca",
      description: "Main lecture hall for large classes",
      floor: "3rd Floor • LH-1",
      seats: 120,
      amenities: [
        "Stage",
        "Microphone System",
        "Projector",
        "Recording Equipment",
      ],
      icon: "presentation",
      iconColor: "#7c3aed",
    },
  ];

  const floors = [
    { id: "all", name: "All Floors" },
    { id: "1", name: "1st Floor" },
    { id: "2", name: "2nd Floor" },
    { id: "3", name: "3rd Floor" },
  ];

  const getIconComponent = (iconName, color, size = 20) => {
    const props = { color, size };
    switch (iconName) {
      case "school":
        return <Building {...props} />;
      case "presentation":
        return <Building {...props} />; // Using Building as placeholder
      case "computer":
        return <Building {...props} />; // Using Building as placeholder
      case "group":
        return <Users {...props} />;
      default:
        return <Building {...props} />;
    }
  };

  const filteredLocations = locations.filter((location) => {
    const matchesSearch =
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFloor =
      selectedFloor === "all" || location.floor.includes(selectedFloor);
    return matchesSearch && matchesFloor;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <ImageBackground
            source={require("../../assets/images/bg.jpg")}
            resizeMode="resize"
            style={styles.heroBackground}
            imageStyle={styles.heroImage}
          >
            <View
              style={[
                styles.heroOverlay,
                { backgroundColor: building.gradient[0], opacity: 0.6 },
              ]}
            />
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>{building.title}</Text>
              <View style={styles.heroStats}>
                <View style={styles.statItem}>
                  <DoorClosed size={16} color="white" />
                  <Text style={styles.statText}>
                    {buildingData.rooms} rooms/locations
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchIcon}>
            <Search size={20} color="#9ca3af" />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search rooms or locations..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Locations Section */}
        <View style={styles.locationsSection}>
          <View style={styles.locationsList}>
            {filteredLocations.map((location) => (
              <View key={location.id} style={styles.locationCard}>
                <View style={styles.locationHeader}>
                  <View style={styles.locationInfo}>
                    <View style={styles.locationIcon}>
                      {getIconComponent(location.icon, building.gradient[1])}
                    </View>
                    <View style={styles.locationDetails}>
                      <View style={styles.locationTitleRow}>
                        <Text style={styles.locationName}>{location.name}</Text>
                      </View>
                      <Text style={styles.locationDescription}>
                        {location.description}
                      </Text>
                      <View style={styles.locationMeta}>
                        <View style={styles.metaItem}>
                          <MapPin size={14} color="#6b7280" />
                          <Text style={styles.metaText}>{location.floor}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.navigationButton}
                    onPress={() => navigation.navigate("Map", { location })}
                  >
                    <Navigation size={16} color="#2563eb" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  heroSection: {
    margin: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  heroBackground: {
    height: 120,
  },
  heroImage: {
    opacity: 0.2,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: "rgba(59, 130, 246, 0.6)",
  },
  heroContent: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 4,
  },
  heroAddress: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 12,
  },
  heroStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    left: 16,
    top: 12,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingLeft: 48,
    paddingRight: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: "#1f2937",
  },
  floorScroll: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  floorContainer: {
    gap: 8,
  },
  floorButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
  },
  floorButtonActive: {
    backgroundColor: "#2563eb",
  },
  floorButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
  floorButtonTextActive: {
    color: "white",
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
  },
  infoContent: {
    gap: 12,
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  infoGrid: {
    gap: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 16,
  },
  locationsSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  locationsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  viewMapText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2563eb",
  },
  locationsList: {
    gap: 12,
  },
  locationCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  locationHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    flex: 1,
  },
  locationIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  locationDetails: {
    flex: 1,
  },
  locationTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  locationName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  locationDescription: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 8,
    lineHeight: 16,
  },
  locationMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#6b7280",
  },
  navigationButton: {
    width: 32,
    height: 32,
    backgroundColor: "#dbeafe",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  amenitiesSection: {
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingTop: 12,
  },
  amenitiesTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  amenitiesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  amenityTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#f3f4f6",
    borderRadius: 6,
  },
  amenityText: {
    fontSize: 12,
    color: "#6b7280",
  },
});

export default BuildingDetailScreen;
