import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { Card } from "../components/Card";
import { CardSection } from "../components/CardSection";
import { StyledText } from "../components/StyledText";
import {
  readFirebaseData,
  updateFirebaseData,
  authFirebase
} from "../assets/firebase";

export default class CardItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", cardId: "", listId: "" };
  }

  componentDidMount() {
    const { cardId, listId } = this.props;
    const { currentUser } = authFirebase();

    this.setState({
      listId,
      cardId
    });

    readFirebaseData(
      `${currentUser.uid}/cards/${cardId}`,
      "value",
      data => {
        if (data) {
          this.setState({
            title: data.title
          });
        }
      },
      err => console.log("Unable to read card", err)
    );
  }

  updateCard = title => {
    const { currentUser } = authFirebase();

    updateFirebaseData(
      `${currentUser.uid}/cards/`,
      {
        [this.state.cardId]: {
          title
        }
      },
      () => console.log("Card updated", this.state.cardId),
      err => console.log("Err:", err, "| Card not updated", this.state.cardId)
    );
  };

  render() {
    const { title, cardId, listId } = this.state;
    return (
      <Card style={styles.card}>
        <CardSection>
          <StyledText>{title}</StyledText>
        </CardSection>
        <CardSection>
          <StyledText>{cardId}</StyledText>
        </CardSection>
        <CardSection>
          <StyledText>{listId}</StyledText>
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderColor: "black",
    margin: 10
  }
});

CardItem.propTypes = {
  cardId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired
};
