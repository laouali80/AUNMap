import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BuildingCard from "./components/BuildingCard";

// const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  // const navigation = useNavigation();

  // Calculate if we should show 1 or 2 cards per row based on screen width
  const isSmallScreen = width < 400;
  const cardWidth = isSmallScreen ? width - 48 : (width - 64) / 2; // 48 = 24*2 padding, 64 = 24*2 padding + 16 gap

  // Frequently visited locations data
  const frequentLocations = [
    {
      id: "1",
      name: "Library Main Hall",
      category: "Study",
      visits: 24,
      icon: "📚",
      color: "#3B82F6",
    },
    {
      id: "2",
      name: "Student Cafeteria",
      category: "Dining",
      visits: 18,
      icon: "🍽️",
      color: "#3B82F6",
    },
    {
      id: "3",
      name: "Class A-101",
      category: "Academic",
      visits: 15,
      icon: "🏫",
      color: "#3B82F6",
    },
    {
      id: "4",
      name: "Gym Center",
      category: "Recreation",
      visits: 12,
      icon: "🏀",
      color: "#3B82F6",
    },
    {
      id: "5",
      name: "Computer Lab B",
      category: "Study",
      visits: 10,
      icon: "💻",
      color: "#3B82F6",
    },
  ];

  // Campus buildings data
  const campusBuildings = [
    {
      id: "1",
      title: "Classrooms",
      count: 6,
      icon: "🏫",
      gradient: ["#60A5FA", "#3B82F6"],
      locations: ["Class A-101", "Class A-102", "Class B-201", "+3 more"],
    },
    {
      id: "2",
      title: "Administration",
      count: 6,
      icon: "🏢",
      gradient: ["#A78BFA", "#8B5CF6"],
      locations: [
        "President Office",
        "Dean Office",
        "Student Affairs",
        "+3 more",
      ],
    },
    {
      id: "3",
      title: "Dormitories",
      count: 5,
      icon: "🏠",
      gradient: ["#34D399", "#10B981"],
      locations: [
        "Dorm A - East Wing",
        "Dorm A - West Wing",
        "Dorm B - North",
        "+2 more",
      ],
    },
    {
      id: "4",
      title: "Dining & Recreation",
      count: 6,
      icon: "🍔",
      gradient: ["#FB923C", "#F97316"],
      locations: ["Main Cafeteria", "Coffee Shop", "Gym Center", "+3 more"],
    },
    {
      id: "5",
      title: "Academic Support",
      count: 6,
      icon: "📚",
      gradient: ["#F472B6", "#EC4899"],
      locations: [
        "Main Library",
        "Computer Lab A",
        "Computer Lab B",
        "+3 more",
      ],
    },
    {
      id: "6",
      title: "Health & Services",
      count: 5,
      icon: "🏥",
      gradient: ["#2DD4BF", "#14B8A6"],
      locations: [
        "Health Center",
        "Counseling Services",
        "Campus Store",
        "+2 more",
      ],
    },
  ];

  // Render functions that are actually used
  const renderFrequentLocation = ({ item }) => (
    <View style={styles.locationCard}>
      <View style={styles.locationLeft}>
        <View
          style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}
        >
          <Text style={styles.icon}>{item.icon}</Text>
        </View>
        <View>
          <Text style={styles.locationName}>{item.name}</Text>
          <Text style={styles.locationCategory}>{item.category}</Text>
        </View>
      </View>
      <View style={styles.visitsContainer}>
        <Text style={styles.visitsCount}>{item.visits}</Text>
        <Text style={styles.visitsLabel}>visits</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F97316" barStyle="light-content" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerGradient}>
            <View style={styles.headerContent}>
              <View style={styles.headerTop}>
                <View>
                  <Text style={styles.logo}>Campus</Text>
                  <Text style={styles.welcome}>Welcome back, Sarah!</Text>
                </View>
                <View style={styles.avatar}>
                  <Text style={styles.avatarIcon}>👤</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.searchContainer}
                onPress={() => navigation.navigate("Search")}
              >
                <View style={styles.searchIcon}>
                  <Text>🔍</Text>
                </View>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search campus locations..."
                  placeholderTextColor="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Frequently Visited Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Frequently Visited</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={frequentLocations}
              renderItem={renderFrequentLocation}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>

          {/* Campus Buildings Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, styles.sectionTitleLarge]}>
              Campus Buildings
            </Text>
            <FlatList
              data={campusBuildings}
              renderItem={({ item, index }) => (
                <BuildingCard item={item} index={index} />
              )}
              keyExtractor={(item) => item.id}
              // numColumns={isSmallScreen ? 1 : 2}
              // columnWrapperStyle={!isSmallScreen && styles.columnWrapper}
              // scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
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
    paddingBottom: 20, // Space for bottom navigation
  },
  header: {
    marginBottom: -20,
  },
  headerGradient: {
    backgroundColor: "#F97316",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    marginTop: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    fontFamily: "Pacifico",
    fontSize: 24,
    color: "white",
    marginBottom: 4,
  },
  welcome: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarIcon: {
    fontSize: 18,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  sectionTitleLarge: {
    fontSize: 18,
    marginBottom: 16,
  },
  viewAll: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "500",
  },
  locationCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  locationLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 18,
  },
  locationName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1F2937",
    marginBottom: 2,
  },
  locationCategory: {
    fontSize: 12,
    color: "#6B7280",
  },
  visitsContainer: {
    alignItems: "flex-end",
  },
  visitsCount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  visitsLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  buildingsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  // buildingsGrid: {
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   justifyContent: "space-between",
  // },
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
  quickAction: {
    // width: (width - 88) / 3,
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionIcon: {
    fontSize: 18,
  },
  actionText: {
    fontSize: 12,
    fontWeight: "500",
  },

  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
});

export default HomeScreen;
