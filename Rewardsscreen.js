import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";

import TopPageDisplay from "./Topdisplaybar";

function RewardsLayout() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TopPageDisplay navigation={navigation} title={"Rewards"} />
    </View>
  );
}

function RewardsScreen() {}

export default RewardsLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5D5D5",
    padding: 16,
  },
});
