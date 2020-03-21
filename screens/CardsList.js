import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import { List } from "../components/List";
import CreateCardItem from "./CreateCardItem";
import CardItem from "./CardItem";
import { Card } from "../components/Card";
import {
  readFirebaseData,
  updateFirebaseData,
  authFirebase
} from "../assets/firebase";

export default class CardsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardIds: [], listId: "" };
  }

  componentDidMount() {
    const { currentUser } = authFirebase();
    const { listId } = this.props;

    readFirebaseData(
      `${currentUser.uid}/lists/${listId}`,
      "value",
      data => {
        this.setState({
          title: data.title,
          cardIds: data.cardIds || []
        });
      },
      err => console.log("Unable to read list", err)
    );
    this.setState({
      listId
    });
  }

  onNewCardCreated = cardId => {
    const { listId } = this.state;
    const { currentUser } = authFirebase();

    this.setState(
      state => ({
        cardIds: [...state.cardIds, cardId]
      }),
      () => {
        updateFirebaseData(
          `${currentUser.uid}/lists/${listId}`,
          {
            cardIds: this.state.cardIds
          },
          () => console.log("Successfully added card to the list"),
          err => console.log("Error in updating", err)
        );
      }
    );
  };

  renderItem = (cardId, index) => {
    return <CardItem cardId={cardId} listId={this.state.listId} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <List
          data={this.state.cardIds}
          renderItem={this.renderItem}
          ListHeaderComponent={() => {
            return (
              <Card>
                <Text>{this.state.title}</Text>
              </Card>
            );
          }}
        />
        <CreateCardItem
          listId={this.state.listId}
          onComplete={this.onNewCardCreated}
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

CardsList.propTypes = {
  listId: PropTypes.string.isRequired
};
