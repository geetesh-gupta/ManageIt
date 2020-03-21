import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { FormView } from "../components/FormView";
import { FormButton } from "../components/FormButton";
import { FormColoredTextField } from "../components/FormColoredTextField";
import { loginFirebase } from "../assets/firebase";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", errorMessage: null };
  }

  handleLogin = () => {
    const { email, password } = this.state;
    loginFirebase(
      email,
      password,
      () => this.props.navigation.navigate("Main"),
      error => this.setState({ errorMessage: error.message })
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Card>
          <FormView>
            <Text>Login</Text>
            {this.state.errorMessage && (
              <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
            )}
            <FormColoredTextField
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              title="Email"
            />
            <FormColoredTextField
              secureTextEntry
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Password"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              title="Password"
            />
            <FormButton value="Login" onFormSubmit={this.handleLogin} />
            <FormButton
              value="Don't have an account? Sign Up"
              onFormSubmit={() => this.props.navigation.navigate("SignUp")}
            />
          </FormView>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  }
});
