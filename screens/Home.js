import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";
import { Button } from "../components/Button";

export default class Main extends React.Component {
  state = { currentUser: null };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }

  handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.warn("Logged Out successfully");
        // console.log("Logged Out successfully")
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Button onPress={this.handleLogOut}>Logout</Button>
        <Text>Hi {currentUser && currentUser.email}!</Text>
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
