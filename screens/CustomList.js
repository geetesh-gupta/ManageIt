import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import { List } from "../components/List";
import CreateNewCard from "./CreateNewCard";
import CustomCard from "./CustomCard";
import { Card } from "../components/Card";
import { readFirebaseData, updateFirebaseData } from "../assets/firebase";

export default class CustomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardIds: [], listId: "" };
  }

  componentDidMount() {
    // const { currentUser } = firebase.auth();
    const { listId } = this.props;
    // const listCardsRef = firebase.database().ref(`cards/${listId}`);

    readFirebaseData(
      `lists/${listId}`,
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
    this.setState(
      state => ({
        cardIds: [...state.cardIds, cardId]
      }),
      () => {
        updateFirebaseData(
          `lists/${listId}`,
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

CustomList.propTypes = {
  listId: PropTypes.string.isRequired
};
