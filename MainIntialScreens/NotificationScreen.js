import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  SectionList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { TopScreenDisplay, BottonTools } from "../CommonFunctions/ToolBars";

const notifications = [
  {
    text: "Brushing and Flossing",
    timeSent: "30 minutes ago",
  },
  {
    text: "Basic Leg Stretching Exercise",
    timeSent: "44 minutes ago",
  },
  {
    text: "Notification 3",
    timeSent: "1 hour ago",
  },
  {
    text: "Notification 4",
    timeSent: "1 hour 22 minutes ago",
  },
];

const moreNotifications = [
  {
    text: "Notification 5",
    timeSent: "4 hours ago",
  },
  {
    text: "Notification 6",
    timeSent: "4 hours 24 minutes ago",
  },
  {
    text: "Notification 7",
    timeSent: "7 hours ago",
  },
];

function RenderNotification() {
  return (
    <SectionList
      sections={[
        { title: "New", data: notifications },
        {
          title: "Earlier",
          data: moreNotifications,
        },
      ]}
      renderSectionHeader={({ section }) => (
        <View style={styles.headingContainer}>
          <Text style={styles.notificationHeadingText}>{section.title}</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={{ paddingLeft: 10 }}>
          <View style={styles.notification}>
            <View style={styles.iconBackground}>
              <Icon
                name="bell"
                size={styles.iconSize}
                color="white"
                style={styles.icon}
              />
            </View>
            <View>
              <Text style={styles.notificationText}>{item.text}</Text>
              <Text style={styles.timeSentText}>{item.timeSent}</Text>
            </View>
          </View>
        </View>
      )}
      keyExtractor={(item) => `basicListEntry-${item.text}`}
    />
  );
}

function NotificationScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TopScreenDisplay navigation={navigation} title={"Notifications"} />

      <RenderNotification />

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
  notification: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
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
    marginTop: 15,
  },
  iconSize: 28.8,
  notificationText: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 12,
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
  notificationHeadingText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
