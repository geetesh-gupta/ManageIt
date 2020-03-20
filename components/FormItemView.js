import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

class FormItemView extends React.Component {
    static defaultProps = {
        style: {}
    }

    render() {
        return (
            <View style={[styles.formItemView, this.props.viewStyle]}>
                {
                    this.props.title !== undefined &&
                    <Text style={[styles.formItemTitle, this.props.titleStyle]}>{this.props.title}</Text>
                }
                {this.props.children}
            </View>
        )
    };
};

FormItemView.propTypes = {
    title: PropTypes.string.isRequired,
    viewStyle: PropTypes.object,
    titleStyle: PropTypes.object
};

FormItemView.defaultProps = {
    title: "Title",
    viewStyle: {},
    textStyle: {}
};

export { FormItemView };