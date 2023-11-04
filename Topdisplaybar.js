import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function TopScreenDIsplay({ navigation, title }) {
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

export default TopScreenDIsplay;

const styles = StyleSheet.create({});
