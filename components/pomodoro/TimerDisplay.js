import React from "react";
import { StyleSheet, Text, View } from "react-native";

class TimerDisplay extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>
          {Math.floor(this.props.time / 60)
            .toString()
            .padStart(2, "0") +
            ":" +
            (this.props.time % 60).toString().padStart(2, "0")}
        </Text>
      </View>
    );
  }
}

export default TimerDisplay;

const styles = StyleSheet.create({
  container: {
    marginTop: "30%",
    marginBottom: "30%",
    marginLeft: "10%",
    marginRight: "10%",
    padding: "20%",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 6.5,
    alignItems: "center",
  },
  textStyle: {
    color: "black",
    fontSize: 50,
    fontWeight: "400",
  },
});
