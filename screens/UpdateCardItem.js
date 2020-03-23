import React from "react";
import PropTypes from "prop-types";
import { FormView } from "../components/FormView";
import { FormColoredTextField } from "../components/FormColoredTextField";
import { FormButton } from "../components/FormButton";
import { authFirebase, updateFirebaseData } from "../assets/firebase";
import { goBack } from "../components/RootNavigation";
import { FormDatePicker } from "../components/FormDatePicker";
import { FormTimePicker } from "../components/FormTimePicker";

export default class CreateCardItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", desc: "", dueDate: "", dueTime: "" };
  }

  componentDidMount() {
    const { data } = this.props.route.params;
    const { title, desc, dueDate, dueTime } = data;
    this.setState({ title, desc, dueDate, dueTime });
  }

  updateCard = () => {
    const { title, desc, dueDate, dueTime } = this.state;
    const { currentUser } = authFirebase();
    const { data, callback } = this.props.route.params;
    const { cardId } = data;

    updateFirebaseData(
      `${currentUser.uid}/cards/${cardId}`,
      { title, desc, dueDate, dueTime },
      res => {
        console.log(" Card updated");
        if (callback) callback(res.key);
        goBack({ cardId });
      },
      err => console.log("Error while updating card", err)
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
        <FormButton value="Update" onFormSubmit={() => this.updateCard()} />
      </FormView>
    );
  }
}

CreateCardItem.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      data: PropTypes.object.isRequired,
      callback: PropTypes.func
    })
  })
};

CreateCardItem.defaultProps = {
  route: { params: { callback: undefined } }
};
