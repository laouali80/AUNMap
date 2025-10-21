import { useNavigation } from "@react-navigation/core";
import React from "react";
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

const LoginScreen = () => {
  const navigation = useNavigation();
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
              <Text style={styles.welcome}>Welcome Back</Text>
              <Text style={styles.subtitle}>
                Discover essential facilities like the library, health center,
                sports complex, and dining halls — all at your fingertips.
              </Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="#6B7280"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#6B7280"
                  secureTextEntry
                />

                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.loginButton}
                  // onPress={() => navigation.navigate("Home")}
                  onPress={() => navigation.navigate("Saved")}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>
                    Don't have an account?{" "}
                    <Text
                      style={styles.signupLink}
                      onPress={() => navigation.navigate("SignUp")}
                    >
                      Create Account
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
    paddingTop: 80,
    paddingBottom: 48,
    alignItems: "center",
  },
  logo: {
    fontFamily: Platform.OS === "ios" ? "Pacifico" : "sans-serif",
    fontSize: 32,
    color: "white",
    marginBottom: 16,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    marginBottom: 12,
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
    paddingBottom: 96,
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
  input: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 14,
  },
  forgotPassword: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "right",
    marginBottom: 24,
  },
  loginButton: {
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
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  signupContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  signupText: {
    color: "#4B5563",
    fontSize: 14,
  },
  signupLink: {
    color: "#2563EB",
    fontWeight: "600",
  },
});

export default LoginScreen;
