import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { TopScreenDisplay } from "./ToolBars";

function TaskDetailsScreen() {
  const navigation = useNavigation();
  return (
    <TopScreenDisplay
      navigation={navigation}
      title={"Completed Task Details"}
    />
  );
}

export default TaskDetailsScreen;
