import React from 'react';
import { View } from 'react-native';
import { Button } from './Button';
import PropTypes from 'prop-types';

class FormButton extends React.Component {
    render() {
        return (
            <View style={[{ justifyContent: 'center', alignItems: 'center' }, this.props.style]}>
                <Button
                    onPress={this.props.onFormSubmit}
                >
                    {this.props.value}
                </Button>
            </View>
        )
    };
};


FormButton.propTypes = {
    style: PropTypes.func
};

FormButton.defaultProps = {
    style: {}
};

export { FormButton }