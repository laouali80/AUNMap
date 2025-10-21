import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const SavedScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("All");

  // Saved locations data grouped by category
  const savedLocations = {
    Dining: [
      {
        id: "1",
        name: "Coffee Shop",
        description: "Cozy cafe with premium coffee and light snacks",
        category: "Dining",
        icon: "☕",
        color: "#F97316",
        bgColor: "#FFEDD5",
        savedDate: "1/16/2024",
        lastVisited: null,
        visits: 5,
      },
      {
        id: "2",
        name: "Student Cafeteria",
        description: "Main dining hall serving breakfast, lunch and dinner",
        category: "Dining",
        icon: "🍽️",
        color: "#F97316",
        bgColor: "#FFEDD5",
        savedDate: "1/10/2024",
        lastVisited: "1/19/2024",
        visits: 18,
      },
    ],
    Academic: [
      {
        id: "3",
        name: "Main Library",
        description: "Central library with study spaces and computer labs",
        category: "Academic",
        icon: "📚",
        color: "#3B82F6",
        bgColor: "#DBEAFE",
        savedDate: "1/15/2024",
        lastVisited: "1/20/2024",
        visits: 24,
      },
      {
        id: "4",
        name: "Computer Lab B",
        description: "Advanced computing lab with specialized software",
        category: "Academic",
        icon: "💻",
        color: "#3B82F6",
        bgColor: "#DBEAFE",
        savedDate: "1/14/2024",
        lastVisited: "1/17/2024",
        visits: 8,
      },
    ],
    Recreation: [
      {
        id: "5",
        name: "Gym Complex",
        description: "Fitness center with pool and sports facilities",
        category: "Recreation",
        icon: "🏀",
        color: "#8B5CF6",
        bgColor: "#EDE9FE",
        savedDate: "1/12/2024",
        lastVisited: "1/18/2024",
        visits: 12,
      },
    ],
    Services: [
      {
        id: "6",
        name: "Health Center",
        description: "Campus medical services and counseling",
        category: "Services",
        icon: "🏥",
        color: "#10B981",
        bgColor: "#D1FAE5",
        savedDate: "1/8/2024",
        lastVisited: null,
        visits: 3,
      },
    ],
  };

  // Statistics data
  const stats = [
    {
      id: "1",
      title: "Saved",
      value: "6",
      icon: "🔖",
      color: "#3B82F6",
      bgColor: "#DBEAFE",
    },
    {
      id: "2",
      title: "Visited",
      value: "4",
      icon: "⏱️",
      color: "#10B981",
      bgColor: "#D1FAE5",
    },
    {
      id: "3",
      title: "Avg Visits",
      value: "12",
      icon: "📊",
      color: "#8B5CF6",
      bgColor: "#EDE9FE",
    },
  ];

  // Bottom navigation items
  const navItems = [
    { id: "1", title: "Home", icon: "🏠", active: false, screen: "Home" },
    { id: "2", title: "Map", icon: "🗺️", active: false, screen: "Map" },
    { id: "3", title: "Saved", icon: "🔖", active: true, screen: "Saved" },
    { id: "4", title: "Profile", icon: "👤", active: false, screen: "Profile" },
  ];

  const handleRemoveSaved = (locationId) => {
    // Handle remove from saved locations
    console.log("Remove location:", locationId);
  };

  const handleGetDirections = (location) => {
    navigation.navigate("Map", { location });
  };

  const handleShareLocation = (location) => {
    // Handle share location logic
    console.log("Share location:", location.name);
  };

  const renderStatCard = (stat) => (
    <View key={stat.id} style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: stat.bgColor }]}>
        <Text style={[styles.statIconText, { color: stat.color }]}>
          {stat.icon}
        </Text>
      </View>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statLabel}>{stat.title}</Text>
    </View>
  );

  const renderLocationCard = (location) => (
    <View key={location.id} style={styles.locationCard}>
      <View style={styles.locationHeader}>
        <View style={styles.locationInfo}>
          <View
            style={[styles.locationIcon, { backgroundColor: location.bgColor }]}
          >
            <Text style={[styles.locationIconText, { color: location.color }]}>
              {location.icon}
            </Text>
          </View>
          <View style={styles.locationDetails}>
            <Text style={styles.locationName}>{location.name}</Text>
            <Text style={styles.locationDescription}>
              {location.description}
            </Text>
            <View style={styles.locationMeta}>
              <Text style={styles.metaText}>Saved {location.savedDate}</Text>
              {location.lastVisited && (
                <>
                  <Text style={styles.metaDot}>•</Text>
                  <Text style={styles.metaText}>
                    Last visited {location.lastVisited}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={() => handleRemoveSaved(location.id)}
        >
          <Text style={styles.bookmarkIcon}>🔖</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.locationFooter}>
        <View style={styles.visitsInfo}>
          <Text style={styles.visitsIcon}>📍</Text>
          <Text style={styles.visitsText}>{location.visits} visits</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.directionsButton}
            onPress={() => handleGetDirections(location)}
          >
            <Text style={styles.directionsButtonText}>Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => handleShareLocation(location)}
          >
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderNavItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.navItem}
      onPress={() => navigation.navigate(item.screen)}
    >
      <Text
        style={[
          styles.navIcon,
          item.active ? styles.navIconActive : styles.navIconInactive,
        ]}
      >
        {item.icon}
      </Text>
      <Text
        style={[
          styles.navText,
          item.active ? styles.navTextActive : styles.navTextInactive,
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>⬅️</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Saved Locations</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuIcon}>⋮</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchIcon}>
            <Text>🔍</Text>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search saved locations..."
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Tab Filter */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "All" && styles.activeTab]}
            onPress={() => setActiveTab("All")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "All" && styles.activeTabText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Recent" && styles.activeTab]}
            onPress={() => setActiveTab("Recent")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Recent" && styles.activeTabText,
              ]}
            >
              Recent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Frequent" && styles.activeTab]}
            onPress={() => setActiveTab("Frequent")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Frequent" && styles.activeTabText,
              ]}
            >
              Frequent
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Statistics Cards */}
        <View style={styles.statsContainer}>{stats.map(renderStatCard)}</View>

        {/* Saved Locations by Category */}
        <View style={styles.locationsContainer}>
          {Object.entries(savedLocations).map(([category, locations]) => (
            <View key={category} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <View style={styles.locationsList}>
                {locations.map(renderLocationCard)}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNav}>{navItems.map(renderNavItem)}</View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
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
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  activeTabText: {
    color: "#2563EB",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    paddingBottom: 8,
  },
  statCard: {
    width: (width - 64) / 3,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statIconText: {
    fontSize: 14,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  locationsContainer: {
    padding: 16,
    paddingTop: 8,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
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
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  locationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  locationInfo: {
    flexDirection: "row",
    flex: 1,
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
  locationDetails: {
    flex: 1,
  },
  locationName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  locationDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
    lineHeight: 16,
  },
  locationMeta: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  metaText: {
    fontSize: 11,
    color: "#6B7280",
  },
  metaDot: {
    fontSize: 11,
    color: "#6B7280",
    marginHorizontal: 4,
  },
  bookmarkButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FEF2F2",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  bookmarkIcon: {
    fontSize: 14,
    color: "#EF4444",
  },
  locationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  visitsInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  visitsIcon: {
    fontSize: 12,
    color: "#6B7280",
    marginRight: 4,
  },
  visitsText: {
    fontSize: 12,
    color: "#6B7280",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  directionsButton: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  directionsButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#2563EB",
  },
  shareButton: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  shareButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#374151",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
});

export default SavedScreen;
