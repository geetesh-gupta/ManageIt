import React from "react";
import PropTypes from "prop-types";
import { FormView } from "../components/FormView";
import { FormColoredTextField } from "../components/FormColoredTextField";
import { FormButton } from "../components/FormButton";
import { createFirebaseData, authFirebase } from "../assets/firebase";
import { goBack } from "../components/RootNavigation";
import { FormDatePicker } from "../components/FormDatePicker";
import { FormTimePicker } from "../components/FormTimePicker";

export default class CreateCardItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", desc: "", dueDate: "", dueTime: "" };
  }

  createNewCard = () => {
    const { title, desc, dueDate, dueTime } = this.state;
    const { currentUser } = authFirebase();
    const { listId, callback } = this.props.route.params;
    createFirebaseData(
      `${currentUser.uid}/cards/`,
      { title, desc, dueDate, dueTime, listId },
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
          title="Title"
          onChangeText={title => this.setState({ title })}
        />
        <FormColoredTextField
          title="Description"
          onChangeText={desc => this.setState({ desc })}
        />
        <FormDatePicker
          title="Select Date"
          onPress={dueDate => this.setState({ dueDate })}
        />
        <FormTimePicker
          title="Select Time"
          onPress={dueTime => this.setState({ dueTime })}
        />
        <FormButton value="Create" onFormSubmit={() => this.createNewCard()} />
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
