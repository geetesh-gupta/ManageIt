import React from "react";
import { Button } from "./Button";

class CardButton extends React.Component {
  render() {
    return <Button onPress={this.props.onPress}>{this.props.children}</Button>;
  }
}

export { CardButton };
