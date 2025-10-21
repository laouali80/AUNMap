import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native";

const InfoModal = ({ visible }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          className="bg-black/80"
          keyboardShouldPersistTaps="handled"
        >
          {/* <View className="flex-1   justify-center items-center"> */}
          <View className="bg-white rounded-2xl p-6 w-[90%] max-w-md">
            <Text className="text-lg font-semibold mb-4">
              Edit Profile Information
            </Text>

            {/* First Name */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-1">First Name</Text>
              <TextInput
                value={""}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, first_name: text })
                }
                placeholder="Full Name"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:border-green-500"
              />
            </View>

            {/* Last Name */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-1">Last Name</Text>
              <TextInput
                value={""}
                keyboardType="email-address"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:border-green-500"
              />
            </View>

            {/* username */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-1">Email</Text>
              <TextInput
                value={""}
                keyboardType="email-address"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:border-green-500"
              />
            </View>

            {/* Phone */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-1">Student ID</Text>
              <TextInput
                value={""}
                placeholder="ID"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:border-green-500"
              />
            </View>

            {/* Address */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-1">Academic Year</Text>
            </View>

            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-1">Major</Text>
            </View>

            {/* Action Buttons */}
            <View className="flex-row justify-end gap-x-3 mt-6">
              <SubmitButton
                textColor="#4b5563"
                text="Cancel"
                btnStyle={{
                  borderColor: "#d1d5db",
                  borderWidth: 1,
                  backgroundColor: "white",
                }}
                btnClassName="px-4 py-2"
                isDisabled={false}
                handleSubmit={onCancel}
                showSpinner={updStatus === "pending" ? true : false}
              />
              <SubmitButton
                textColor="white"
                text="Update"
                btnClassName="px-4 py-2"
                isDisabled={!isFormValid || isSubmitting}
                handleSubmit={handleSumbit}
                showSpinner={updStatus === "pending" ? true : false}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default InfoModal;

const styles = StyleSheet.create({});
