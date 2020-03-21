import React from "react";
import { Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const ClickableImage = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.imageViewStyle}>
      <Image
        style={props.imageThumbnailStyle}
        source={props.source}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

ClickableImage.propTypes = {
  source: PropTypes.object.isRequired,
  imageViewStyle: PropTypes.object,
  imageThumbnailStyle: PropTypes.object
};

ClickableImage.defaultProps = {
  source: {},
  imageViewStyle: {},
  imageThumbnailStyle: {}
};

export { ClickableImage };
