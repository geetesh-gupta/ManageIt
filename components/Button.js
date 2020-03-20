import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

class Button extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={this.props.viewStyle}>
                <Text pointerEvents="none" style={[styles.buttonText, this.props.textStyle]}>
                    {this.props.children}
                </Text>
            </TouchableOpacity>
        )
    };
};

Button.propTypes = {
    textStyle: PropTypes.object,
    viewStyle: PropTypes.object
};

Button.defaultProps = {
    textStyle: {},
    viewStyle: {}
};

export { Button };