import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import CardsList from "./CardsList";
import {
  authFirebase,
  readFirebaseData,
  updateFirebaseData
} from "../assets/firebase";
import { baseColors } from "../components/defaultStyles";
import { List } from "../components/List";
import { CardSection } from "../components/CardSection";
import { StyledText } from "../components/StyledText";
import { PlusCircle } from "../components/Icons";
import { navigate } from "../components/RootNavigation";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { boardId: "", title: "", listIds: [] };
  }

  componentDidMount() {
    const { currentUser } = authFirebase();
    const { boardId } = this.props.route.params;

    readFirebaseData(
      `${currentUser.uid}/boards/${boardId}/`,
      "value",
      data => {
        this.setState({
          title: data.title,
          listIds: data.listIds || []
        });
      },
      err => {
        console.log("Unable to read data", err);
      }
    );
    this.setState({
      boardId
    });
  }

  onNewListCreated = listId => {
    const { boardId } = this.state;
    const { currentUser } = authFirebase();

    this.setState(
      state => ({
        listIds: [...state.listIds, listId]
      }),
      () => {
        updateFirebaseData(
          `${currentUser.uid}/boards/${boardId}`,
          {
            listIds: this.state.listIds
          },
          () => console.log("Successfully added list to the board"),
          err => console.log("Error in updating", err)
        );
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <CardSection style={styles.cardSection}>
          <StyledText>{this.state.title}</StyledText>
          <PlusCircle
            size={30}
            onPress={() =>
              navigate("NewList", {
                boardId: this.state.boardId,
                callback: this.onNewListCreated
              })
            }
          />
        </CardSection>
        <View style={{ flex: 1 }}>
          <List
            data={this.state.listIds}
            renderItem={id => {
              return <CardsList listId={id} />;
            }}
            horizontal
            showsHorizontalScrollIndicator
            pagingEnabled
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseColors.BACKGROUND_COLOR_PRIMARY
  },
  cardSection: {
    justifyContent: "space-between",
    alignItems: "flex-start"
  }
});

Board.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      boardId: PropTypes.string.isRequired
    })
  }).isRequired
};
