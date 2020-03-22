import React from "react";
import PropTypes from "prop-types";
import { createFirebaseData, authFirebase } from "../assets/firebase";
import { FormView } from "../components/FormView";
import { FormColoredTextField } from "../components/FormColoredTextField";
import { FormButton } from "../components/FormButton";
import { goBack } from "../components/RootNavigation";

export default class CreateCardsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  createNewList = title => {
    const { currentUser } = authFirebase();
    const { boardId, callback } = this.props.route.params;
    createFirebaseData(
      `${currentUser.uid}/lists/`,
      { title, cardIds: [], boardId },
      res => {
        console.log("New list Created", res.key);
        callback(res.key);
        goBack({ key: boardId });
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
  route: PropTypes.shape({
    params: PropTypes.shape({
      boardId: PropTypes.string.isRequired,
      callback: PropTypes.func
    })
  })
};

CreateCardsList.defaultProps = {
  route: { params: { callback: undefined } }
};
