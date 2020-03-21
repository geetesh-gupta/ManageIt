import React from "react";
import { FormView } from "../components/FormView";
import { FormColoredTextField } from "../components/FormColoredTextField";
import { FormButton } from "../components/FormButton";
import { createFirebaseData, authFirebase } from "../assets/firebase";

export default class CreateCardsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  createNewList = title => {
    const { currentUser } = authFirebase();
    createFirebaseData(
      `${currentUser.uid}/lists/`,
      { title, cardIds: [] },
      res => {
        console.log("New list Created", res.key);
      }
    );
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
