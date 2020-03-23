import React from "react";
import { Text } from "react-native";
import { FormItemView } from "./FormItemView";
import { DocPick } from "./FilePicker";
import { fontStyle } from "./defaultStyles";

export const AttachFiles = props => {
  return (
    <DocPick onAttachComplete={files => props.onAttachComplete(files)}>
      <Text
        style={{
          textDecorationLine: "underline",
          fontSize: fontStyle.FONT_SIZE_TITLE,
          color: fontStyle.FONT_COLOR_PRIMARY,
          flexWrap: "wrap",
          textAlign: "center"
        }}
      >
        + Attach Files
      </Text>
    </DocPick>
  );
};
