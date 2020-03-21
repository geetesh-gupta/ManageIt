import React from "react";
import firebase from "firebase";
import { FormView } from "../components/FormView";
import { FormColoredTextField } from "../components/FormColoredTextField";
import { FormButton } from "../components/FormButton";

export default class CreateNewCard extends React.Component {
  state = { title: "" };

  createNewCard = title => {
    const listRef = firebase.database().ref("cards/");
    const { listId, onComplete } = this.props;
    listRef
      .push({
        title,
        listId
      })
      .then(res => {
        console.log("New Card created");
        console.log(res)
        onComplete(res.key);
      });
  };

  render() {
    return (
      <FormView>
        <FormColoredTextField
          title="Create new card"
          onChangeText={title => this.setState({ title })}
        />
        <FormButton
          value="Create"
          onFormSubmit={() => this.createNewCard(this.state.title)}
        />
      </FormView>
    );
  }
}
