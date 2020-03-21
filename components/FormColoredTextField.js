import React from "react";
import { TextInput } from "react-native";
import styles from "./styles";
import { FormItemView } from "./FormItemView";
import PropTypes from "prop-types";

class FormColoredTextField extends React.Component {
  static defaultProps = {
    onChangeText: value => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  componentDidMount() {
    this.setState({
      value: this.props.value
    });
  }

  renderTextInputStyle = () => {
    if (this.props.multiline === true) {
      return [
        styles.formTextfield,
        styles.formBorder,
        { height: styles.formBorder.height * 3, textAlignVertical: "top" }
      ];
    } else {
      return [styles.formTextfield, styles.formBorder];
    }
  };

  render() {
    return (
      <FormItemView {...this.props}>
        <TextInput
          style={this.renderTextInputStyle()}
          onChangeText={value => {
            this.setState({ value });
            this.props.onChangeText(value);
          }}
          value={this.state.value}
          placeholder={this.props.placeholder}
          multiline={this.props.multiline}
        />
      </FormItemView>
    );
  }
}

FormColoredTextField.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  multiline: PropTypes.bool,
  placeholder: PropTypes.string
};

FormColoredTextField.defaultProps = {
  onChangeText: value => {},
  title: "Text",
  value: "",
  multiline: false,
  placeholder: "Enter Text..."
};

export { FormColoredTextField };
