import React from "react";
import { StyleSheet, View } from "react-native";
import BoardsList from "./BoardsList";
import { baseColors } from "../components/defaultStyles";

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <BoardsList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseColors.BACKGROUND_COLOR_PRIMARY
  }
});
