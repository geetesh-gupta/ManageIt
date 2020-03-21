import React from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { baseColors, iconStyle } from "./defaultStyles";

const CheckCircle = props => {
  return (
    <Icon
      name="check-circle"
      size={props.size}
      color={iconStyle.ICON_COLOR_GREEN}
      style={{
        backgroundColor: "white",
        borderRadius: props.size / 2
      }}
    />
  );
};

const CrossCircle = props => {
  return (
    <Icon
      name="close-circle"
      size={props.size}
      color={iconStyle.ICON_COLOR_RED}
      style={{
        backgroundColor: "white",
        borderRadius: props.size / 2
      }}
    />
  );
};

const PlusCircle = props => {
  return (
    <Icon
      name={"plus"}
      size={iconStyle.ICON_SIZE_LARGE}
      color={"white"}
      style={[
        {
          backgroundColor: baseColors.BACKGROUND_COLOR_SECONDARY,
          // paddingRight: 0,
          borderRadius: iconStyle.ICON_SIZE_LARGE / 2
        },
        props.style
      ]}
    />
  );
};

const CloseCircle = props => {
  return (
    <Icon
      name="close"
      size={iconStyle.ICON_SIZE_LARGE}
      color={"white"}
      style={[
        {
          backgroundColor: "transparent"
        }
      ]}
    />
  );
};

export { CheckCircle, PlusCircle, CloseCircle, CrossCircle };
