import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import firebase from 'firebase'
import {Card} from "../components/Card";
import {FormColoredTextField} from "../components/FormColoredTextField";
import {FormButton} from "../components/FormButton";
import {FormView} from "../components/FormView";

export default class SignUp extends React.Component {
    state = {email: '', password: '', errorMessage: null}
    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Main'))
            .catch(error => this.setState({errorMessage: error.message}))
    }

    render() {
        return (
            <View style={styles.container}>
                <Card>
                    <FormView>
                        <Text>Sign Up</Text>
                        {this.state.errorMessage &&
                        <Text style={{color: 'red'}}>
                            {this.state.errorMessage}
                        </Text>}
                        <FormColoredTextField
                            placeholder="Email"
                            autoCapitalize="none"
                            style={styles.textInput}
                            onChangeText={email => this.setState({email})}
                            value={this.state.email}
                            title="Email"
                        />
                        <FormColoredTextField
                            secureTextEntry
                            placeholder="Password"
                            autoCapitalize="none"
                            style={styles.textInput}
                            onChangeText={password => this.setState({password})}
                            value={this.state.password}
                            title="Password"
                        />
                        <FormButton value="Sign Up" onFormSubmit={this.handleSignUp}/>
                        <FormButton
                            value="Already have an account? Login"
                            onFormSubmit={() => this.props.navigation.navigate('Login')}
                        />
                    </FormView>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    }
})