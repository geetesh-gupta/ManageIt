import React from "react";
import { FormView } from "../components/FormView";
import { FormColoredTextField } from "../components/FormColoredTextField";
import { FormButton } from "../components/FormButton";
import { createFirebaseData, authFirebase } from "../assets/firebase";
import PropTypes from "prop-types";

export default class CreateCardsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  createNewList = title => {
    const { currentUser } = authFirebase();
    const { boardId, onComplete } = this.props;
    createFirebaseData(
      `${currentUser.uid}/lists/`,
      { title, cardIds: [], boardId },
      res => {
        console.log("New list Created", res.key);
        onComplete(res.key);
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

CreateCardsList.propTypes = {
  boardId: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired
};
