import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";
import CardsList from "./CardsList";
import CreateCardsList from "./CreateCardsList";
import { Card } from "../components/Card";
import { List } from "../components/List";
import {
  authFirebase,
  readFirebaseData,
  updateFirebaseData
} from "../assets/firebase";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { boardId: "", title: "", listIds: [] };
  }

  componentDidMount() {
    const { currentUser } = authFirebase();
    const { key } = this.props.route.params;

    readFirebaseData(
      `${currentUser.uid}/boards/${key}/`,
      "value",
      data => {
        this.setState({
          title: data.title,
          listIds: data.listIds || []
        });
      },
      err => {
        console.log("Unable to read data", err);
      }
    );
    this.setState({
      boardId: key
    });
  }

  onNewListCreated = listId => {
    const { boardId } = this.state;
    const { currentUser } = authFirebase();

    this.setState(
      state => ({
        listIds: [...state.listIds, listId]
      }),
      () => {
        updateFirebaseData(
          `${currentUser.uid}/boards/${boardId}`,
          {
            listIds: this.state.listIds
          },
          () => console.log("Successfully added list to the board"),
          err => console.log("Error in updating", err)
        );
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <List
          data={this.state.listIds}
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
        <CreateCardsList
          boardId={this.state.boardId}
          onComplete={this.onNewListCreated}
        />
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

// Board.propTypes = {
//   key: PropTypes.string.isRequired
// };
