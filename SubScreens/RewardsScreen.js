import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TopScreenDisplay, BottonTools } from "../CommonFunctions/ToolBars";

// TODO: complete realignment of toolbar, title and container.
function RewardsScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TopScreenDisplay navigation={navigation} title={"Rewards"} />
      <BottonTools navigation={navigation} currentpage={"rewardsScreen"} />
    </View>
  );
}

export default RewardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5D5D5",
    padding: 16,
  },
});