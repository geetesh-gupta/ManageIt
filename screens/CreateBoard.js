import React from "react";
import { FormView } from "../components/FormView";
import { FormColoredTextField } from "../components/FormColoredTextField";
import { FormButton } from "../components/FormButton";
import { createFirebaseData } from "../assets/firebase";

export default class CreateCardsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  createNewBoard = title => {
    createFirebaseData("boards/", { title, listIds: [] }, res => {
      console.log("New board Created", res.key);
    });
  };

  render() {
    return (
      <FormView>
        <FormColoredTextField
          title="Create new Board"
          onChangeText={title => this.setState({ title })}
        />
        <FormButton
          value="Create"
          onFormSubmit={() => this.createNewBoard(this.state.title)}
        />
      </FormView>
    );
  }
}
