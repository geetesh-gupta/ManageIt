import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import {
  readFirebaseData,
  updateFirebaseData,
  authFirebase
} from "../assets/firebase";
import CardItem from "./CardItem";
import { baseColors } from "../components/defaultStyles";
import { List } from "../components/List";
import { Card } from "../components/Card";
import { StyledText } from "../components/StyledText";
import { CardSection } from "../components/CardSection";
import { PlusCircle } from "../components/Icons";
import { navigate } from "../components/RootNavigation";

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

  renderItem = cardId => {
    return <CardItem cardId={cardId} listId={this.state.listId} />;
  };

  render() {
    return (
      <Card style={styles.card}>
        <CardSection style={styles.cardSection}>
          <StyledText>{this.state.title}</StyledText>
          <PlusCircle
            size={30}
            onPress={() =>
              navigate("NewCard", {
                listId: this.state.listId,
                callback: this.onNewCardCreated
              })
            }
          />
        </CardSection>
        <CardSection style={styles.cardSection}>
          <List data={this.state.cardIds} renderItem={this.renderItem} />
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderColor: baseColors.BACKGROUND_COLOR_SECONDARY,
    margin: 10
  },
  cardSection: {
    justifyContent: "space-between",
    alignItems: "flex-start"
  }
});

CardsList.propTypes = {
  listId: PropTypes.string.isRequired
};
