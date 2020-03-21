import React from 'react';
import {View} from 'react-native';
import {Button} from './Button';

class FormButton extends React.Component {
    render() {
        return (
            <View style={[{justifyContent: 'center', alignItems: 'center'}, this.props.style]}>
                <Button
                    onPress={this.props.onFormSubmit}
                >
                    {this.props.value}
                </Button>
            </View>
        )
    };
}

export {FormButton}