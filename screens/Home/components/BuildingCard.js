import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SIZES } from "../../../constant/dimensions";
import { useNavigation } from "@react-navigation/core";

const BuildingCard = ({ item, index }) => {
  const navigation = useNavigation();
  const isSmallScreen = SIZES.width < 400;
  //   console.log("render item:", item);
  const _navigate = () => {
    // console.log("Navigate to building detail:", item);
    navigation.navigate("BuildingDetail", { building: item });
  };

  return (
    <TouchableOpacity
      onPress={_navigate}
      style={[
        styles.buildingCard,
        { width: "100%" },
        !isSmallScreen && index % 2 === 0
          ? { marginRight: 8 }
          : { marginLeft: 0 },
      ]}
    >
      <View
        style={[styles.buildingHeader, { backgroundColor: item.gradient[0] }]}
      >
        <Text style={styles.buildingIcon}>{item.icon}</Text>
        <View>
          <Text style={styles.buildingTitle}>{item.title}</Text>
          <Text style={styles.buildingCount}>{item.count} locations</Text>
        </View>
      </View>
      <View style={styles.buildingContent}>
        {item.locations.map((location, idx) => (
          <View key={idx} style={styles.locationRow}>
            <Text style={styles.locationText} numberOfLines={1}>
              {location}
            </Text>
            <View style={styles.statusDot} />
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buildingsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  buildingCard: {
    // width: (width - 64) / 2,
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buildingHeader: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  buildingIcon: {
    fontSize: 24,
    marginRight: 12,
    color: "white",
  },
  buildingTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    marginBottom: 2,
  },
  buildingCount: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  buildingContent: {
    padding: 16,
  },
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: "#374151",
    flex: 1,
    marginRight: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D1D5DB",
  },
});

export default BuildingCard;
