import React from "react";
import { TextInput, DatePickerAndroid } from "react-native";
import styles from "./styles";
import { FormItemView } from "./FormItemView";
import PropTypes from "prop-types";

class FormDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ""
    };
  }

  setDateAndroid = async () => {
    try {
      var { action, year, month, day } = await DatePickerAndroid.open({
        date: (this.state.date && new Date(this.state.date)) || new Date(),
        maxDate: new Date()
      });
      day = day > 9 ? day : "0" + day;
      month = month > 8 ? month + 1 : "0" + (month + 1);
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({ date: `${year}-${month}-${day}` });
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  render() {
    return (
      <FormItemView {...this.props}>
        <TextInput
          onTouchStart={date => {
            this.setDateAndroid().then(() => {
              this.props.onPress(this.state.date);
            });
          }}
          onChangeText={date => {
            this.setState({ date });
            this.props.onPress(this.state.value);
          }}
          style={[styles.formBorder, styles.formTextfield]}
          value={this.state.date}
          placeholder="Select Date"
          pointerEvents="none"
          selectTextOnFocus={false}
        />
      </FormItemView>
    );
  }
}

FormDatePicker.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

FormDatePicker.defaultProps = {
  onPress: value => {},
  title: "Date"
};

export { FormDatePicker };
