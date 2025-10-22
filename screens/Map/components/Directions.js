import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";

const DirectionsScreen = ({ goBack }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [navigationStarted, setNavigationStarted] = useState(false);

  const destination = route.params?.destination || "Health Center";

  const routeInfo = {
    type: "Walking Route",
    time: "6 min",
    distance: "0.3 mi",
    description: `Fastest route to ${destination}`,
    eta: "2:45 PM", // Estimated arrival time
  };

  const steps = [
    {
      id: "1",
      instruction: "Head northeast on Campus Drive toward Academic Plaza",
      distance: "0.2 mi",
      time: "3 min",
      type: "start",
    },
    {
      id: "2",
      instruction: "Turn left at the fountain and continue straight",
      distance: "0.1 mi",
      time: "2 min",
      type: "turn",
    },
    {
      id: "3",
      instruction: "Enter the building on your right",
      distance: "50 ft",
      time: "1 min",
      type: "destination",
    },
  ];

  const handleStartNavigation = () => {
    setNavigationStarted(true);
    Alert.alert(
      "Navigation Started",
      `Navigating to ${destination}. Follow the instructions.`,
      [{ text: "OK", onPress: () => console.log("Navigation in progress") }]
    );
  };

  const handleStopNavigation = () => {
    setNavigationStarted(false);
    Alert.alert("Navigation Stopped", "Navigation has been stopped.", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  const getStepIcon = (type) => {
    switch (type) {
      case "start":
        return "📍";
      case "turn":
        return "↩️";
      case "destination":
        return "🏁";
      default:
        return "📍";
    }
  };

  const renderStep = (step, index) => (
    <View key={step.id} style={styles.stepContainer}>
      <View style={styles.stepIconContainer}>
        <Text style={styles.stepIcon}>{getStepIcon(step.type)}</Text>
        {index < steps.length - 1 && <View style={styles.stepLine} />}
      </View>
      <View style={styles.stepContent}>
        <Text style={styles.stepInstruction}>{step.instruction}</Text>
        <Text style={styles.stepDetails}>
          {step.distance} • {step.time}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <View style={styles.backButtonText}>
              <ChevronLeft color="#2563EB" />
              <Text
                style={{ color: "#2563EB", fontSize: 14, fontWeight: "500" }}
              >
                Back
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>Directions</Text>
          <View style={styles.emptySpace} />
        </View>

        {/* Route Summary */}
        <View style={styles.routeSummary}>
          <View style={styles.routeHeader}>
            <Text style={styles.routeType}>{routeInfo.type}</Text>
            <Text style={styles.routeTimeDistance}>
              {routeInfo.time} • {routeInfo.distance}
            </Text>
          </View>
          <Text style={styles.routeDescription}>{routeInfo.description}</Text>
          <View style={styles.etaContainer}>
            <Text style={styles.etaLabel}>ETA: </Text>
            <Text style={styles.etaTime}>{routeInfo.eta}</Text>
          </View>
        </View>

        {/* Steps List */}
        <ScrollView
          style={styles.stepsList}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.stepsTitle}>Step-by-Step Directions</Text>
          {steps.map(renderStep)}
        </ScrollView>

        {/* Action Button */}
        {/* <TouchableOpacity
          style={[
            styles.actionButton,
            navigationStarted ? styles.stopButton : styles.startButton,
          ]}
          onPress={
            navigationStarted ? handleStopNavigation : handleStartNavigation
          }
        >
          <Text style={styles.actionButtonText}>
            {navigationStarted ? "Stop Navigation" : "Start Navigation"}
          </Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    flexDirection: "row",

    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
  emptySpace: {
    width: 60,
  },
  routeSummary: {
    backgroundColor: "#DBEAFE",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  routeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  routeType: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E40AF",
  },
  routeTimeDistance: {
    fontSize: 12,
    color: "#2563EB",
  },
  routeDescription: {
    fontSize: 12,
    color: "#3730A3",
    marginBottom: 8,
  },
  etaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  etaLabel: {
    fontSize: 12,
    color: "#3730A3",
    fontWeight: "500",
  },
  etaTime: {
    fontSize: 12,
    color: "#1E40AF",
    fontWeight: "600",
  },
  stepsList: {
    flex: 1,
    marginBottom: 16,
  },
  stepsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  stepIconContainer: {
    alignItems: "center",
    marginRight: 12,
  },
  stepIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  stepLine: {
    width: 2,
    height: 40,
    backgroundColor: "#E5E7EB",
    marginVertical: 4,
  },
  stepContent: {
    flex: 1,
  },
  stepInstruction: {
    fontSize: 14,
    color: "#1F2937",
    marginBottom: 4,
    lineHeight: 20,
  },
  stepDetails: {
    fontSize: 12,
    color: "#6B7280",
  },
  actionButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  startButton: {
    backgroundColor: "#10B981",
  },
  stopButton: {
    backgroundColor: "#EF4444",
  },
  actionButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default DirectionsScreen;
