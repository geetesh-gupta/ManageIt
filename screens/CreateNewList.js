import React from "react";
import firebase from "firebase";
import { FormView } from "../components/FormView";
import { FormColoredTextField } from "../components/FormColoredTextField";
import { FormButton } from "../components/FormButton";

export default class CreateNewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  createNewList = title => {
    firebase
      .database()
      .ref("lists/")
      .push({ title, cardIds: [] })
      .then(() => {
        console.log("New list created");
      });
  };

  render() {
    return (
      <FormView>
        <FormColoredTextField
          title="Create new List"
          onChangeText={title => this.setState({ title })}
        />
        <FormButton
          value="Create"
          onFormSubmit={() => this.createNewList(this.state.title)}
        />
      </FormView>
    );
  }
}
