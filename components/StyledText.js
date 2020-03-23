import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const StyledText = props => {
  return <Text style={[styles.cardDesc, props.style]}>{props.children}</Text>;
};

StyledText.propTypes = {
  children: PropTypes.node
};

StyledText.defaultProps = {
  children: ""
};

export { StyledText };
