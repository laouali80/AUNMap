import { StyleSheet, Text, View } from "react-native";
import React from "react";

const LocationCard = () => {
  return (
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
    </View>
  );
};

export default LocationCard;

const styles = StyleSheet.create({});
