import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogOut, Pen } from "lucide-react-native";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Overview");
  const [infoModal, setInfoModal] = useState(false);

  // Profile statistics
  const profileStats = [
    {
      id: "1",
      value: "127",
      label: "Visits",
      icon: "👣",
    },
    {
      id: "2",
      value: "6",
      label: "Saved",
      icon: "🔖",
    },
    {
      id: "3",
      value: "45 min",
      label: "Avg Stay",
      icon: "⏱️",
    },
    {
      id: "4",
      value: "3",
      label: "Badges",
      icon: "🏆",
    },
  ];

  // Personal information
  const personalInfo = [
    {
      id: "1",
      label: "Full Name",
      value: "Sarah Johnson",
    },
    {
      id: "2",
      label: "Email",
      value: "sarah.johnson@aun.edu.ng",
    },
  ];

  const renderStatCard = (stat) => (
    <View key={stat.id} style={styles.statCard}>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </View>
  );

  const renderInfoItem = (item) => (
    <View key={item.id} style={styles.infoItem}>
      <Text style={styles.infoLabel}>{item.label}</Text>
      <Text style={styles.infoValue}>{item.value}</Text>
    </View>
  );

  const renderQuickAction = (action) => (
    <TouchableOpacity
      key={action.id}
      style={[styles.quickAction, { backgroundColor: action.bgColor }]}
    >
      <View
        style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}
      >
        <Text style={[styles.actionIconText, { color: action.color }]}>
          {action.icon}
        </Text>
      </View>
      <Text style={[styles.actionText, { color: action.color }]}>
        {action.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F97316" barStyle="light-content" />

      {/* Header Section with Gradient Background */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../assets/images/sarah.jpg")}
              style={styles.avatar}
            />
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>Sarah Johnson</Text>
            <Text style={styles.profileRole}>sarah.johnson@aun.edu.ng</Text>
          </View>
        </View>

        {/* Statistics Grid */}
        <View style={styles.statsGrid}>{profileStats.map(renderStatCard)}</View>
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Overview" && styles.activeTab]}
            onPress={() => setActiveTab("Overview")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Overview" && styles.activeTabText,
              ]}
            >
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "Achievements" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("Achievements")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Achievements" && styles.activeTabText,
              ]}
            >
              Achievements
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "History" && styles.activeTab]}
            onPress={() => setActiveTab("History")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "History" && styles.activeTabText,
              ]}
            >
              History
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content based on active tab */}
        {activeTab === "Overview" && (
          <View style={styles.tabContent}>
            {/* Personal Information */}
            <View style={styles.section}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <TouchableOpacity onPress={() => setInfoModal(true)}>
                  <Pen size={16} color="#2563eb" />
                </TouchableOpacity>
              </View>
              <View style={styles.infoList}>
                {personalInfo.map(renderInfoItem)}
              </View>
            </View>

            {/* Campus Activity */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Campus Activity</Text>
              <View style={styles.activityCard}>
                <View style={styles.activityContent}>
                  <View style={styles.activityIcon}>
                    <Text style={styles.activityIconText}>📚</Text>
                  </View>
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityTitle}>
                      Most Visited Category
                    </Text>
                    <Text style={styles.activitySubtitle}>
                      Academic Buildings
                    </Text>
                  </View>
                </View>
                <View style={styles.activityStats}>
                  <Text style={styles.activityPercentage}>67%</Text>
                  <Text style={styles.activityLabel}>of visits</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#2563EB",
                // paddingVertical: 14,
                // borderRadius: 12,
                // alignItems: "center",
                // marginBottom: 12,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                marginTop: 16,
                paddingVertical: 12,
                borderRadius: 8,
                flex: 1,
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              <LogOut size={20} color="white" />
              <Text style={{ color: "white" }}>Sign out</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === "Achievements" && (
          <View style={styles.tabContent}>
            <Text style={styles.comingSoon}>Achievements coming soon...</Text>
          </View>
        )}

        {activeTab === "History" && (
          <View style={styles.tabContent}>
            <Text style={styles.comingSoon}>History coming soon...</Text>
          </View>
        )}
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
    paddingBottom: 80,
  },
  header: {
    backgroundColor: "#F97316", // Orange gradient start color
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 18,
    color: "white",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsIcon: {
    fontSize: 18,
    color: "white",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    overflow: "hidden",
    marginRight: 16,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 2,
  },
  profileId: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    width: (width - 80) / 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    backdropFilter: "blur(10px)",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.9)",
  },
  tabContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 4,
    margin: 16,
    marginBottom: 0,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#2563EB",
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
    color: "white",
  },
  tabContent: {
    padding: 16,
    paddingTop: 0,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1F2937",
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  quickAction: {
    width: (width - 72) / 2,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 0,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  actionIconText: {
    fontSize: 18,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  activityCard: {
    backgroundColor: "#DBEAFE",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activityContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#BFDBFE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityIconText: {
    fontSize: 20,
    color: "#1E40AF",
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 12,
    color: "#2563EB",
    fontWeight: "500",
  },
  activityStats: {
    alignItems: "flex-end",
  },
  activityPercentage: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2563EB",
    marginBottom: 2,
  },
  activityLabel: {
    fontSize: 12,
    color: "#2563EB",
  },
  comingSoon: {
    textAlign: "center",
    fontSize: 16,
    color: "#6B7280",
    marginTop: 40,
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

export default ProfileScreen;
