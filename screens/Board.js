import React from "react";
import { StyleSheet, View } from "react-native";
import CardsList from "./CardsList";
import CreateCardsList from "./CreateCardsList";
import { List } from "../components/List";
import { authFirebase, readFirebaseData } from "../assets/firebase";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lists: [] };
  }

  componentDidMount() {
    const { currentUser } = authFirebase();

    readFirebaseData(
      `${currentUser.uid}/lists/`,
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
            return <CardsList listId={id} />;
          }}
          horizontal
        />
        <CreateCardsList />
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
