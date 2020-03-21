import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";
import { Button } from "../components/Button";
import CustomList from "./CustomList";
import CreateNewList from "./CreateNewList";
import { List } from "../components/List";

export default class Main extends React.Component {
  state = { currentUser: null, lists: [] };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });

    const listRef = firebase.database().ref("lists/");
    listRef.on("value", snap => {
      const data = snap.val() ? snap.val() : {};
      this.setState({
        lists: Object.keys(data)
      });
    });
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
        <List
          data={this.state.lists}
          renderItem={(id, index) => {
            return <CustomList listId={id} />;
          }}
          horizontal
        />
        <CreateNewList />
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
