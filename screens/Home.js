import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { authFirebase, logoutFirebase } from "../assets/firebase";
import BoardsList from "./BoardsList";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null };
  }

  componentDidMount() {
    const { currentUser } = authFirebase();
    this.setState({ currentUser });
  }

  handleLogOut = () => {
    logoutFirebase(
      () => console.warn("Logged Out successfully"),
      err => console.log(err)
    );
  };

  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Button onPress={this.handleLogOut}>Logout</Button>
        <Text>Hi {currentUser && currentUser.email}!</Text>
        <BoardsList />
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
