import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { Card } from "../components/Card";
import { CardSection } from "../components/CardSection";
import { FormColoredTextField } from "../components/FormColoredTextField";
import { FormView } from "../components/FormView";
import { FormButton } from "../components/FormButton";
import { readFirebaseData, updateFirebaseData } from "../assets/firebase";

export default class CustomCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", cardId: "", listId: "" };
  }

  componentDidMount() {
    const { cardId, listId } = this.props;
    this.setState({
      listId,
      cardId
    });

    readFirebaseData(
      `cards/${cardId}`,
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
    updateFirebaseData(
      "cards/",
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
      <View>
        <Card>
          <CardSection>
            <Text>{title}</Text>
          </CardSection>
          <CardSection>
            <Text>{cardId}</Text>
          </CardSection>
          <CardSection>
            <Text>{listId}</Text>
          </CardSection>
        </Card>
        <FormView>
          <FormColoredTextField
            title="Change Title"
            onChangeText={val => this.setState({ title: val })}
          />
          <FormButton
            value="Change"
            onFormSubmit={() => this.updateCard(this.state.title)}
          />
        </FormView>
      </View>
    );
  }
}

CustomCard.propTypes = {
  cardId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired
};
