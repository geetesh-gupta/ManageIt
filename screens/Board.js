import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomList from "./CustomList";
import CreateNewList from "./CreateNewList";
import { List } from "../components/List";
import {
  authFirebase,
  logoutFirebase,
  readFirebaseData
} from "../assets/firebase";

export default class Board extends React.Component {
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
        console.log("Unable to read data", err);
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <List
          data={this.state.lists}
          renderItem={id => {
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
