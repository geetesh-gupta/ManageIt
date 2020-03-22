import React from "react";
import { View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const Card = props => {
  return <View style={[styles.cardView, props.style]}>{props.children}</View>;
};

Card.propTypes = {
  style: ViewPropTypes.style,
  children: PropTypes.node
};

Card.defaultProps = {
  style: {},
  children: PropTypes.element
};

export { Card };
