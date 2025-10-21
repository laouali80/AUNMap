import {
  FlatList,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { FontAwesome } from "@expo/vector-icons";
import LocationCard from "./LocationCard";

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");

  const [selectedFloor, setSelectedFloor] = useState("all");
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
      icon: "presentation",
      iconColor: "#7c3aed",
    },
  ];

  // Filter based on query
  const filteredLocations = locations.filter((location) => {
    const q = query.toLowerCase();
    return (
      location.name.toLowerCase().includes(q) ||
      location.description.toLowerCase().includes(q)
    );
  });

  const renderContent = () => {
    // Case 1: No query yet → show "Search Locations"
    if (!query.trim()) {
      return (
        <View style={styles.centerTextContainer}>
          <Text style={styles.placeholderText}>Search Locations</Text>
        </View>
      );
    }

    // Case 2: Query exists but no results
    if (query.trim() && filteredLocations.length === 0) {
      return (
        <View style={styles.centerTextContainer}>
          <Text style={styles.placeholderText}>
            No location found for "{query}"
          </Text>
        </View>
      );
    }

    // Case 3: Show filtered results
    return (
      <FlatList
        data={filteredLocations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <LocationCard location={item} />}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={[styles.searchContainer, { marginHorizontal: 10 }]}>
            <FontAwesome
              name="search"
              size={20}
              color={"#F97316"}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search..."
              placeholderTextColor="#b0b0b0"
              style={styles.searchInput}
              value={query}
              onChangeText={setQuery}
              autoFocus
              returnKeyType="search"
            />
          </View>
          {renderContent()}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e1e2e4",
    margin: 16,
    borderRadius: 26,
    paddingHorizontal: 16,
    height: 52,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "black",
    paddingVertical: 0,
  },
  centerTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#c3c3c3",
    fontSize: 16,
  },
});
