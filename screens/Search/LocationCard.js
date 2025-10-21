import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Building, MapPin, Users, Navigation } from "lucide-react-native";
import { useNavigation } from "@react-navigation/core";

const LocationCard = ({ location }) => {
  const navigation = useNavigation();

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
  return (
    <View key={location.id} style={styles.locationCard}>
      <View style={styles.locationHeader}>
        <View style={styles.locationInfo}>
          <View style={styles.locationIcon}>
            {getIconComponent(location.icon, "#2563eb")}
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
  );
};

export default LocationCard;

const styles = StyleSheet.create({
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
