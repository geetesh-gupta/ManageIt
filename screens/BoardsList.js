import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { List } from "../components/List";
import { Card } from "../components/Card";
import { authFirebase, readFirebaseData } from "../assets/firebase";
import { CardSection } from "../components/CardSection";
import { PlusCircle } from "../components/Icons";
import { StyledText } from "../components/StyledText";
import { navigate } from "../components/RootNavigation";

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
            boardId: key
          });
        });
        this.setState({
          boards
        });
      },
      err => console.log("Unable to read boards", err)
    );
  }

  renderItem = ({ title, boardId }) => {
    return (
      <TouchableOpacity onPress={() => navigate("Board", { boardId })}>
        <Card style={{ borderColor: "black", margin: 10 }}>
          <CardSection>
            <StyledText>{title}</StyledText>
          </CardSection>
        </Card>
      </TouchableOpacity>
    );
  };

  render() {
    const { currentUser } = authFirebase();
    return (
      <View style={styles.container}>
        <CardSection style={styles.cardSection}>
          <StyledText>Hi {currentUser && currentUser.email}!</StyledText>
          <PlusCircle size={30} onPress={() => navigate("NewBoard")} />
        </CardSection>
        <CardSection style={styles.cardSection}>
          <List data={this.state.boards} renderItem={this.renderItem} />
        </CardSection>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardSection: {
    justifyContent: "space-between",
    alignItems: "flex-start"
  }
});
