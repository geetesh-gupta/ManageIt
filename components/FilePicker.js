import React from "react";
import { TouchableOpacity } from "react-native";
import * as DocPicker from "expo-document-picker";

export class DocPick extends React.Component {
  pick = async type => {
    try {
      const res = await DocPicker.getDocumentAsync({
        type: `${type}/*`,
        multiple: true
      });
      this.props.onAttachComplete(res);
      alert("Files attached");
    } catch (err) {
      alert(`Unknown Error: ${JSON.stringify(err)}`);
      throw err;
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={() => this.pick("application/pdf")}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
