import React from "react";
import { View, ScrollView } from "react-native";
import { layoutStyle } from "./defaultStyles";
import PropTypes from "prop-types";

class FormView extends React.Component {
  render() {
    return (
      <View style={[{ flex: 1, backgroundColor: "#fff" }, this.props.style]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              flex: 1,
              margin: layoutStyle.MARGIN_HORI_PRIMARY,
              justifyContent: "center"
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                padding: layoutStyle.PADDING_HORI_PRIMARY,
                elevation: 3
              }}
            >
              {this.props.children}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

FormView.propTypes = {
  style: PropTypes.object
};

FormView.defaultProps = {
  style: {}
};

export { FormView };
