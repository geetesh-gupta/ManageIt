import React from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";
import { Card } from "../components/Card";
import { CardSection } from "../components/CardSection";
import { FormColoredTextField } from "../components/FormColoredTextField";
import { FormView } from "../components/FormView";
import { FormButton } from "../components/FormButton";

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

    const cardRef = firebase.database().ref(`cards/${cardId}`);

    cardRef.on("value", snap => {
      const data = snap.val() ? snap.val() : {};
      if (data)
        this.setState({
          title: data.title
        });
    });
  }

  updateCard = title => {
    const listRef = firebase.database().ref("cards/");
    listRef
      .update({
        [this.state.cardId]: {
          title
        }
      })
      .then(() => {
        console.log("Card added", this.state.cardId);
      });
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
