import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { List } from "../components/List";
import { Card } from "../components/Card";
import { authFirebase, readFirebaseData } from "../assets/firebase";
import { CardSection } from "../components/CardSection";
import { PlusCircle } from "../components/Icons";
import { StyledText } from "../components/StyledText";
import { navigate } from "../components/RootNavigation";
import Layout from "../constants/Layout";
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
      <TouchableOpacity
        onPress={() => navigate("Board", { boardId })}
        style={{ flexGrow: 1, alignSelf: "center" }}
      >
        <Card
          style={{
            borderColor: "black",
            margin: 10,
            height: 120,
            width: 240
          }}
        >
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
        <View style={{ flex: 1 }}>
          {Layout.isSmallDevice ? (
            <List data={this.state.boards} renderItem={this.renderItem} />
          ) : (
            <List
              data={this.state.boards}
              renderItem={this.renderItem}
              numColumns={3}
              contentContainerStyle={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            />
          )}
        </View>
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
