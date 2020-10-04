import React from "react";
import { StyleSheet, View } from "react-native";

export default function Card(props) {
  return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>;
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 7,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
