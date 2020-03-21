import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";

const CardHeader = props => {
  return (
    <View style={[styles.cardHeaderView, props.viewStyle]}>
      <Text style={[styles.cardHeaderText, props.textStyle]}>
        {props.headerText}
      </Text>
      {props.children}
    </View>
  );
};

CardHeader.propTypes = {
  viewStyle: PropTypes.object,
  textStyle: PropTypes.object
};

CardHeader.defaultProps = {
  viewStyle: {},
  textStyle: {}
};

export { CardHeader };
