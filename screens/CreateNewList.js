import React from "react";
import { FormView } from "../components/FormView";
import { FormColoredTextField } from "../components/FormColoredTextField";
import { FormButton } from "../components/FormButton";
import { createFirebaseData } from "../assets/firebase";

export default class CreateNewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  createNewList = title => {
    createFirebaseData("lists/", { title, cardIds: [] }, res => {
      console.log("New list Created", res.key);
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
