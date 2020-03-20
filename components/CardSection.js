import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

const CardSection = (props) => {
	return (
		<View style={[styles.cardSectionView, props.style]}>
			{props.children}
		</View>
	);
};

CardSection.propTypes = {
	style: PropTypes.object
};

CardSection.defaultProps = {
	style: {}
};

export { CardSection };
