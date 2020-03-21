import React from "react";
import { FlatList, Text, View } from "react-native";
import PropTypes from "prop-types";

const renderItem = (item, index) => {
  return <Text>{index}</Text>;
};

const keyExtractor = (item, index) => {
  return index.toString();
};

const renderListHeaderComponent = () => {
  return <View></View>;
};

const renderListFooterComponent = () => {
  return <View></View>;
};

const renderListEmptyComponent = () => {
  return <View></View>;
};

const renderOnEndReached = () => {
  return <View></View>;
};

class List extends React.Component {
  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.props.data}
        initialNumToRender={
          this.props.initialNumToRender ||
          (this.props.data && this.props.data.length)
        }
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={this.props.onEndReachedThreshold || 0.1}
        renderItem={({ item, index }) => this.props.renderItem(item, index)}
        keyExtractor={(item, index) => this.props.keyExtractor(item, index)}
        ListHeaderComponent={this.props.ListHeaderComponent}
        ListFooterComponent={this.props.ListFooterComponent}
        ListEmptyComponent={this.props.ListEmptyComponent}
        horizontal={this.props.horizontal || false}
      />
    );
  }
}

List.propTypes = {
  data: PropTypes.array.isRequired,
  initialNumToRender: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
  keyExtractor: PropTypes.func,
  onEndReached: PropTypes.func,
  ListHeaderComponent: PropTypes.func,
  ListFooterComponent: PropTypes.func,
  ListEmptyComponent: PropTypes.func
};

List.defaultProps = {
  data: [],
  initialNumToRender: 6,
  renderItem: renderItem,
  keyExtractor: keyExtractor,
  onEndReached: renderOnEndReached,
  ListHeaderComponent: renderListHeaderComponent,
  ListFooterComponent: renderListFooterComponent,
  ListEmptyComponent: renderListEmptyComponent
};

export { List };
