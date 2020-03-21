import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { List } from "../components/List";
import { Card } from "../components/Card";
import { authFirebase, readFirebaseData } from "../assets/firebase";
import CreateBoard from "./CreateBoard";
import { CardSection } from "../components/CardSection";

export default class CardsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { boards: [] };
  }

  componentDidMount() {
    const { currentUser } = authFirebase();

    readFirebaseData(
      `${currentUser.uid}/boards/`,
      "value",
      data => {
        const boards = [];
        Object.keys(data).forEach(key => {
          boards.push({
            title: data[key].title,
            key
          });
        });
        this.setState({
          boards
        });
      },
      err => console.log("Unable to read boards", err)
    );
  }

  renderItem = board => {
    return (
      <Card>
        <CardSection>
          <Text>{board.title}</Text>
        </CardSection>
      </Card>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <List
          data={this.state.boards}
          renderItem={this.renderItem}
          ListHeaderComponent={() => {
            return (
              <Card>
                <Text>{this.state.title}</Text>
              </Card>
            );
          }}
        />
        <CreateBoard />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
