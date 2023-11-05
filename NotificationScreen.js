import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { TopScreenDisplay, BottonTools } from "./ToolBars";

function NotificationScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TopScreenDisplay navigation={navigation} title={"Notifications"} />
      <BottonTools navigation={navigation} currentpage={"notificationScreen"} />
    </View>
  );
}

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5D5D5",
    padding: 16,
  },
});
