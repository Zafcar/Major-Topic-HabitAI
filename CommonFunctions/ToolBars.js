import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function TopScreenDisplay({ navigation, title }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 15,
        paddingTop: 20,
      }}
    >
      <View style={{ flex: 0, paddingTop: 7 }}>
        <TouchableOpacity
          style={([styles.backButton], { flex: 0 })}
          onPress={() => navigation.navigate("homeScreen")}
        >
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.header,
          { flex: 1, alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", paddingRight: 20 }}>
          {title}
        </Text>
      </View>
    </View>
  );
}

function UtilTool({ page, icon, navigation, currentPage }) {
  return (
    <View
      style={[
        { padding: 10 },
        currentPage ? { backgroundColor: "black", borderRadius: 14 } : null,
      ]}
    >
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigation.navigate(page)}
      >
        <View style={styles.buttonContent}>
          <Icon name={icon} size={30} color={currentPage ? "white" : "black"} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

function BottonTools({ navigation, currentpage }) {
  return (
    <View style={styles.buttonBar}>
      <UtilTool
        page="homeScreen"
        icon="home"
        size={15}
        navigation={navigation}
        currentPage={"homeScreen" == currentpage}
      />

      <UtilTool
        page="rewardsScreen"
        icon="line-chart"
        size={15}
        navigation={navigation}
        currentPage={"rewardsScreen" == currentpage}
      />

      <TouchableOpacity
        style={styles.middleButton}
        onPress={() => navigation.navigate("createTaskScreen")}
      >
        <View style={styles.middleButtonContent}>
          <Icon name="plus" size={24} color="white" style={styles.plusIcon} />
        </View>
      </TouchableOpacity>

      <UtilTool
        page="calendarScreen"
        icon="calendar"
        size={15}
        navigation={navigation}
        currentPage={"calendarScreen" == currentpage}
      />

      <UtilTool
        page="notificationScreen"
        icon="bell"
        size={15}
        navigation={navigation}
        currentPage={"notificationScreen" == currentpage}
      />
    </View>
  );
}

export { TopScreenDisplay, BottonTools };

const styles = StyleSheet.create({
  buttonBar: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 5,
    position: "absolute",
    bottom: 10,
    left: 5,
    right: 5,
    borderRadius: 14,
    elevation: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  bottomButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  middleButton: {
    backgroundColor: "black",
    width: 60, // Increased width to make it a circle
    height: 60, // Increased height to make it a circle
    borderRadius: 30, // Added borderRadius to make it a circle
    overflow: "hidden",
    marginBottom: 1,
  },
  middleButtonContent: {
    alignItems: "center",
  },
  plusIcon: {
    fontSize: 24, // Reduce the thickness
    marginTop: 18, // Adjust the vertical alignment
  },
});
