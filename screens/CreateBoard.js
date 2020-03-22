import React from "react";
import PropTypes from "prop-types";
import { FormView } from "../components/FormView";
import { FormColoredTextField } from "../components/FormColoredTextField";
import { FormButton } from "../components/FormButton";
import { createFirebaseData, authFirebase } from "../assets/firebase";

export default class CreateBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  createNewBoard = title => {
    const { currentUser } = authFirebase();
    // const { callback } = this.props;

    createFirebaseData(
      `${currentUser.uid}/boards/`,
      { title, listIds: [] },
      res => {
        console.log("New board Created", res.key);
        // callback(res.boardId);
        this.props.navigation.goBack();
      },
      err => {
        console.log("Error in creating new board", err);
      }
    );
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
CreateBoard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  }).isRequired
};
