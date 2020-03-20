import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

class ExpandableText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMore: true,
            numLines: 1

        };
    }

    onPress = () => {
        this.setState({
            showMore: !this.state.showMore,
        });
    };

    render() {
        const { text, numberOfLines, textStyle, viewStyle } = this.props;
        maxNumLines = numberOfLines;
        if (!text) return null;
        return (
            (
                <View style={viewStyle}>
                    {
                        this.state.numLines > maxNumLines ?
                            <View>
                                {
                                    this.state.showMore ?
                                        <Text numberOfLines={maxNumLines} style={textStyle}>
                                            {text}
                                        </Text> :
                                        <Text style={textStyle} >
                                            {text}
                                        </Text>

                                }
                                {
                                    this.state.showMore ?
                                        <Text style={styles.showMoreText} onPress={() => this.onPress()}>Read More</Text> :
                                        <Text style={styles.showMoreText} onPress={() => this.onPress()}>Show Less</Text>
                                }
                            </View> :
                            <Text style={textStyle} onTextLayout={({ nativeEvent: { lines } }) =>
                                this.setState({ numLines: lines.length })
                            }>
                                {text}
                            </Text>

                    }
                </View>
            )
        );
    }
}

ExpandableText.propTypes = {
    text: PropTypes.string.isRequired,
    viewStyle: PropTypes.object,
    textStyle: PropTypes.object,
    numberOfLines: PropTypes.number,
};

ExpandableText.defaultProps = {
    text: "",
    viewStyle: {},
    textStyle: {},
    numberOfLines: 2,
};

export { ExpandableText };