import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

class Button extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={[styles.buttonTouchable, this.props.viewStyle]}>
                <Text pointerEvents="none" style={[styles.buttonText, this.props.textStyle]}>
                    {this.props.children}
                </Text>
            </TouchableOpacity>
        )
    };
};

export {Button};