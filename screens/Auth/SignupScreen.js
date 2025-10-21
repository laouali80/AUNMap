// import CheckBox from "@react-native-community/checkbox";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomCheckbox from "../../components/CustomCheckbox";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/Sunset.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoid}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
              <Text style={styles.logo}>Campus</Text>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>
                Join our campus community and explore all the amazing resources
                available to you
              </Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.form}>
                <View style={styles.nameContainer}>
                  <View style={styles.nameInput}>
                    <TextInput
                      style={styles.input}
                      placeholder="First Name"
                      placeholderTextColor="#6B7280"
                      value={formData.firstName}
                      onChangeText={(text) =>
                        handleInputChange("firstName", text)
                      }
                    />
                  </View>
                  <View style={styles.nameInput}>
                    <TextInput
                      style={styles.input}
                      placeholder="Last Name"
                      placeholderTextColor="#6B7280"
                      value={formData.lastName}
                      onChangeText={(text) =>
                        handleInputChange("lastName", text)
                      }
                    />
                  </View>
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="#6B7280"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange("email", text)}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Student ID"
                  placeholderTextColor="#6B7280"
                  value={formData.studentId}
                  onChangeText={(text) => handleInputChange("studentId", text)}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#6B7280"
                  secureTextEntry
                  value={formData.password}
                  onChangeText={(text) => handleInputChange("password", text)}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#6B7280"
                  secureTextEntry
                  value={formData.confirmPassword}
                  onChangeText={(text) =>
                    handleInputChange("confirmPassword", text)
                  }
                />

                <View style={styles.termsContainer}>
                  {/* <CheckBox
                    value={isChecked}
                    onValueChange={setChecked}
                    tintColors={{ true: "#2563EB", false: "#6B7280" }}
                  /> */}
                  <CustomCheckbox
                    value={isChecked}
                    onValueChange={setChecked}
                  />
                  <Text style={styles.termsText}>
                    I agree to the Terms of Service and Privacy Policy
                  </Text>
                </View>

                <TouchableOpacity style={styles.signupButton}>
                  <Text style={styles.signupButtonText}>Create Account</Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>
                    Already have an account?{" "}
                    <Text
                      style={styles.loginLink}
                      onPress={() => navigation.navigate("Login")}
                    >
                      Sign In
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  header: {
    paddingTop: 64,
    paddingBottom: 32,
    alignItems: "center",
  },
  logo: {
    fontFamily: Platform.OS === "ios" ? "Pacifico" : "sans-serif",
    fontSize: 32,
    color: "white",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    paddingHorizontal: 16,
    lineHeight: 22,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 80,
  },
  form: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  nameInput: {
    width: "48%",
  },
  input: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 14,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
    marginTop: 8,
  },
  termsText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
  signupButton: {
    width: "100%",
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  signupButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  loginContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  loginText: {
    color: "#4B5563",
    fontSize: 14,
  },
  loginLink: {
    color: "#2563EB",
    fontWeight: "600",
  },
});

export default SignupScreen;
