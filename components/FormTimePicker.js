import React from "react";
import { TextInput, TimePickerAndroid } from "react-native";
import styles from "./styles";
import { FormItemView } from "./FormItemView";
import PropTypes from "prop-types";

class FormTimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: ""
    };
  }

  setTimeAndroid = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        const m = minute < 10 ? `0${minute}` : minute;
        const h = hour < 10 ? `0${hour}` : hour;
        // console.warn(`time: ${hour}:${minute}`);
        this.setState({ time: `${h}:${m}` });
      }
    } catch ({ code, message }) {
      console.warn("Cannot open time picker", message);
    }
  };

  render() {
    return (
      <FormItemView {...this.props}>
        <TextInput
          onTouchStart={time => {
            this.setTimeAndroid().then(() => {
              this.props.onPress(this.state.time);
            });
          }}
          style={[styles.formBorder, styles.formTextfield]}
          value={this.state.time}
          placeholder="Select Time"
          pointerEvents="none"
        />
      </FormItemView>
    );
  }
}

FormTimePicker.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

FormTimePicker.defaultProps = {
  title: "Time Picker",
  onPress: value => {}
};

export { FormTimePicker };
