import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import CustomList from "./CustomList";
import CreateNewList from "./CreateNewList";
import { List } from "../components/List";
import {
  authFirebase,
  logoutFirebase,
  readFirebaseData
} from "../assets/firebase";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null, lists: [] };
  }

  componentDidMount() {
    const { currentUser } = authFirebase();
    this.setState({ currentUser });
    readFirebaseData(
      "lists/",
      "value",
      data =>
        this.setState({
          lists: Object.keys(data)
        }),
      err => {
        console.log("Unable to readd data", err);
      }
    );
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
