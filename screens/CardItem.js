import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "../components/Card";
import { CardSection } from "../components/CardSection";
import { StyledText } from "../components/StyledText";
import { readFirebaseData, authFirebase } from "../assets/firebase";
import { navigate } from "../components/RootNavigation";

export default class CardItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", cardId: "" };
  }

  componentDidMount() {
    const { cardId } = this.props;
    const { currentUser } = authFirebase();

    this.setState({
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

  render() {
    const { title, cardId } = this.state;
    return (
      <TouchableOpacity onPress={() => navigate("CardDetails", { cardId })}>
        <Card style={styles.card}>
          <CardSection>
            <StyledText>{title}</StyledText>
          </CardSection>
        </Card>
      </TouchableOpacity>
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
  cardId: PropTypes.string.isRequired
};
