import React from "react";
import PropTypes from "prop-types";
import { FormView } from "../components/FormView";
import { FormColoredTextField } from "../components/FormColoredTextField";
import { FormButton } from "../components/FormButton";
import { createFirebaseData, authFirebase } from "../assets/firebase";
import { goBack } from "../components/RootNavigation";

export default class CreateCardItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
  }

  createNewCard = title => {
    const { currentUser } = authFirebase();
    const { listId, callback } = this.props.route.params;
    createFirebaseData(
      `${currentUser.uid}/cards/`,
      { title, listId },
      res => {
        console.log("New Card Created", res.key);
        callback(res.key);
        goBack({ listId });
      },
      err => console.log("Error while creating new card", err)
    );
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
  route: PropTypes.shape({
    params: PropTypes.shape({
      listId: PropTypes.string.isRequired,
      callback: PropTypes.func
    })
  })
};

CreateCardItem.defaultProps = {
  route: { params: { callback: undefined } }
};
