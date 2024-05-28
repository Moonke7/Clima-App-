import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <View style={styles.moonke7}>
      <Text>a Moonke7´s production</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  moonke7: {
    position: "absolute",
    bottom: 0,
    marginTop: 5,
    alignItems: "start",
    justifyContent: "center",
    width: "100%",
    height: 30,
    paddingLeft: 5
  },
});
export default Footer;
