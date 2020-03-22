import React from "react";
import { View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const CardSection = props => {
  return (
    <View style={[styles.cardSectionView, props.style]}>{props.children}</View>
  );
};

CardSection.propTypes = {
  style: ViewPropTypes.style,
  children: PropTypes.node
};

CardSection.defaultProps = {
  style: {},
  children: PropTypes.element
};

export { CardSection };
