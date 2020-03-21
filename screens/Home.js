import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { authFirebase } from "../assets/firebase";
import BoardsList from "./BoardsList";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null };
  }

  componentDidMount() {
    const { currentUser } = authFirebase();
    this.setState({ currentUser });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Text>Hi {currentUser && currentUser.email}!</Text>
        <BoardsList {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
