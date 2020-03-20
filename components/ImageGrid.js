import React from 'react';
import { View, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class ImageGrid extends React.Component {
    renderImageGridItem = ({ item, index }) => {
        const numColumns = this.props.numColumns;
        const margin = this.props.margin;
        const size = (Dimensions.get('window').width - (numColumns * 2) * margin) / numColumns;
        return (
            <TouchableOpacity
                style={[{ margin: margin }, this.props.imageViewStyles]}
                onPress={() => this.props.onPress(index)}
            >
                <Image
                    style={[{ height: size, width: size }, this.props.imageStyles]}
                    source={item.source}
                />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={this.props.gridViewStyles}>
                <FlatList
                    data={this.props.data}
                    extraData={this.props.data}
                    renderItem={this.props.renderImageGridItem || this.renderImageGridItem}
                    numColumns={this.props.numColumns}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

ImageGrid.propTypes = {
    data: PropTypes.array.isRequired,

    gridViewStyles: PropTypes.object,
    imageStyles: PropTypes.object,
    imageViewStyles: PropTypes.object,
    numColumns: PropTypes.number,
    margin: PropTypes.number
};

ImageGrid.defaultProps = {
    data: [],
    gridViewStyles: {},
    imageStyles: {},
    imageViewStyles: {},
    numColumns: 3,
    margin: 2
};

export { ImageGrid };