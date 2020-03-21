import React from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";
import { List } from "../components/List";
import CreateNewCard from "./CreateNewCard";
import CustomCard from "./CustomCard";
import { Card } from "../components/Card";

export default class CustomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardIds: [], listId: "", listRef: null };
  }

  componentDidMount() {
    // const { currentUser } = firebase.auth();
    const { listId } = this.props;
    // const listCardsRef = firebase.database().ref(`cards/${listId}`);
    const listRef = firebase.database().ref(`lists/${listId}`);

    listRef.on("value", snap => {
      const data = snap.val() ? snap.val() : {};
      this.setState({
        title: data.title,
        cardIds: data.cardIds || []
      });
    });
    this.setState({
      listId,
      listRef
    });
  }

  onNewCardCreated = cardId => {
    const { listRef } = this.state;
    this.setState(
      state => ({
        cardIds: [...state.cardIds, cardId]
      }),
      () => {
        listRef.update({
          cardIds: this.state.cardIds
        });
      }
    );
  };

  renderItem = (cardId, index) => {
    return <CustomCard cardId={cardId} listId={this.state.listId} />;
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
          s
        />
        <CreateNewCard
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
