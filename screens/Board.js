import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";
import CardsList from "./CardsList";
import CreateCardsList from "./CreateCardsList";
import { Card } from "../components/Card";
import { List } from "../components/List";
import { authFirebase, readFirebaseData } from "../assets/firebase";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", lists: [] };
  }

  componentDidMount() {
    const { currentUser } = authFirebase();
    const { key } = this.props;

    readFirebaseData(
      `${currentUser.uid}/boards/${key}/`,
      "value",
      data =>
        this.setState({
          lists: Object.keys(data.listIds),
          title: data.title
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
          ListHeaderComponent={() => {
            return (
              <Card>
                <Text>{this.state.title}</Text>
              </Card>
            );
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

Board.propTypes = {
  key: PropTypes.string.isRequired
};
