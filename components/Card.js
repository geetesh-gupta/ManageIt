import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

const Card = (props) => {
    return (
        <View style={[styles.cardView, props.style]}>
            {props.children}
        </View>
    );
};

Card.propTypes = {
    style: PropTypes.object,
};

Card.defaultProps = {
    style: {},
};

export { Card };