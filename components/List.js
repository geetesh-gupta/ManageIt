import React from "react";
import { FlatList, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const keyExtractor = (item, index) => {
  return index.toString();
};

const ListHeaderComponent = () => {
  return <View />;
};

const ListFooterComponent = () => {
  return <View />;
};

const ListEmptyComponent = () => {
  return <View />;
};

const onEndReached = () => {
  return <View />;
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
        onEndReachedThreshold={this.props.onEndReachedThreshold}
        renderItem={({ item, index }) => this.props.renderItem(item, index)}
        keyExtractor={(item, index) => this.props.keyExtractor(item, index)}
        ListHeaderComponent={this.props.ListHeaderComponent}
        ListFooterComponent={this.props.ListFooterComponent}
        ListEmptyComponent={this.props.ListEmptyComponent}
        horizontal={this.props.horizontal}
        pagingEnabled={this.props.pagingEnabled}
        showsHorizontalScrollIndicator={
          this.props.showsHorizontalScrollIndicator
        }
        style={this.props.style}
        contentContainerStyle={this.props.contentContainerStyle}
        numColumns={this.props.numColumns}
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
  onEndReachedThreshold: PropTypes.number,
  ListHeaderComponent: PropTypes.func,
  ListFooterComponent: PropTypes.func,
  ListEmptyComponent: PropTypes.func,
  horizontal: PropTypes.bool,
  pagingEnabled: PropTypes.bool,
  showsHorizontalScrollIndicator: PropTypes.bool,
  style: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  numColumns: PropTypes.number
};

List.defaultProps = {
  initialNumToRender: 6,
  keyExtractor,
  onEndReached,
  onEndReachedThreshold: 0.1,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  horizontal: false,
  pagingEnabled: false,
  showsHorizontalScrollIndicator: false,
  style: {},
  contentContainerStyle: {},
  numColumns: 1
};

export { List };
