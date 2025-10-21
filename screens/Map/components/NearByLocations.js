import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { CircleChevronLeft } from "lucide-react-native";

const NearByLocations = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={navigation.goBack}
          style={styles.backButton}
          // style={{ paddingLeft: 3 }}
        >
          <CircleChevronLeft size={30} color="#4b5563" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text>NearByLocations</Text>
    </View>
  );
};

export default NearByLocations;

const styles = StyleSheet.create({});

{
  /* <View style={styles.bottomPanel}>
        {showDetail && selectedLocation ? (
          <LocationDetailView />
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
      </View> */
}
