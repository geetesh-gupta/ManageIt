import React from "react";
import PropTypes from "prop-types";
import { FormView } from "../components/FormView";
import { FormColoredTextField } from "../components/FormColoredTextField";
import { FormButton } from "../components/FormButton";
import { createFirebaseData } from "../assets/firebase";

export default class CreateCardItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
  }

  createNewCard = title => {
    const { listId, onComplete } = this.props;
    createFirebaseData("cards/", { title, listId }, res => {
      console.log("New Card Created", res.key);
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

CreateCardItem.propTypes = {
  listId: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired
};
