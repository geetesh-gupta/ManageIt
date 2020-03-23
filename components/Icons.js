import React from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { baseColors, iconStyle } from "./defaultStyles";

const CheckCircle = props => {
  return (
    <Icon.Button
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
    <Icon.Button
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
    <Icon.Button
      name={"plus"}
      size={iconStyle.ICON_SIZE_LARGE}
      color={"white"}
      backgroundColor={baseColors.BACKGROUND_COLOR_SECONDARY}
      borderRadius={iconStyle.ICON_SIZE_LARGE}
      onPress={props.onPress}
      style={[
        {
          paddingRight: 0
        },
        props.style
      ]}
    />
  );
};

const EditCircle = props => {
  return (
    <Icon.Button
      name={"pencil"}
      size={iconStyle.ICON_SIZE_LARGE}
      color={"white"}
      backgroundColor={baseColors.BACKGROUND_COLOR_SECONDARY}
      borderRadius={iconStyle.ICON_SIZE_LARGE}
      onPress={props.onPress}
      style={[
        {
          paddingRight: 0
        },
        props.style
      ]}
    />
  );
};

const AttachmentCircle = props => {
  return (
    <Icon.Button
      name={"attachment"}
      size={iconStyle.ICON_SIZE_LARGE}
      color={"white"}
      backgroundColor={baseColors.BACKGROUND_COLOR_SECONDARY}
      borderRadius={iconStyle.ICON_SIZE_LARGE}
      onPress={props.onPress}
      style={[
        {
          paddingRight: 0
        },
        props.style
      ]}
    />
  );
};

const CloseCircle = props => {
  return (
    <Icon.Button
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

export {
  CheckCircle,
  PlusCircle,
  EditCircle,
  AttachmentCircle,
  CloseCircle,
  CrossCircle
};
