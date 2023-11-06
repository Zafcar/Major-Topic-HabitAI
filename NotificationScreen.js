import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5"; 

import { TopScreenDisplay, BottonTools } from "./ToolBars";

function NotificationScreen() {
  const navigation = useNavigation();

  const notifications = [
    {
      id: 1,
      text: "Notification 1",
      timeSent: "30 minutes ago",
    },
    {
      id: 2,
      text: "Notification 2",
      timeSent: "44 minutes ago",
    },
    {
      id: 3,
      text: "Notification 3",
      timeSent: "1 hour ago",
    },
    {
      id: 4,
      text: "Notification 4",
      timeSent: "1 hour 22 minutes ago",
    },
  ];

  const moreNotifications = [
    {
      id: 5,
      text: "Notification 5",
      timeSent: "4 hours ago",
    },
    {
      id: 6,
      text: "Notification 6",
      timeSent: "4 hours 24 minutes ago",
    },
    {
      id: 7,
      text: "Notification 7",
      timeSent: "7 hours ago",
    },
  ];

  const renderNotification = ({ item }) => (
    <View style={styles.notification}>
      <View style={styles.iconBackground}>
        <Icon name="bell" size={styles.iconSize} color="white" style={styles.icon} />
      </View>
      <View>
        <Text style={styles.notificationText}>{item.text}</Text>
        <Text style={styles.timeSentText}>{item.timeSent}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TopScreenDisplay navigation={navigation} title={"Notifications"} />

      <View style={styles.headingContainer}>
        <Text style={styles.newHeadingText}>New</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
      />

      <View style={styles.headingContainer}>
        <Text style={styles.earlierHeadingText}>Earlier</Text>
      </View>
      <FlatList
        data={moreNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
      />

      <BottonTools navigation={navigation} currentpage={"notificationScreen"} />
    </View>
  );
}

export default NotificationScreen;

const iconSizeFactor = 0.6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5D5D5",
  },
  notification: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconBackground: {
    height: 48,
    width: 48,
    backgroundColor: "black",
    borderRadius: 14,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    marginTop: 20,
  },
  iconSize: 48 * iconSizeFactor,
  notificationText: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
    fontWeight: "bold",
  },
  timeSentText: {
    fontSize: 14,
    marginLeft: 10,
    color: "gray",
  },
  headingContainer: {
    backgroundColor: "#D5D5D5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 0,
  },
  newHeadingText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  earlierHeadingText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
