import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // built into Expo

const CustomCheckbox = ({ value, onValueChange }) => (
  <TouchableOpacity onPress={() => onValueChange(!value)}>
    {value ? (
      <Ionicons name="checkbox" size={24} color="#2563EB" />
    ) : (
      <Ionicons name="square-outline" size={24} color="#6B7280" />
    )}
  </TouchableOpacity>
);
export default CustomCheckbox;
