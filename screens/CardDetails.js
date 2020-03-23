import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card } from "../components/Card";
import { CardSection } from "../components/CardSection";
import { StyledText } from "../components/StyledText";
import {
  readFirebaseData,
  updateFirebaseData,
  authFirebase
} from "../assets/firebase";
import { navigate } from "../components/RootNavigation";
import { baseColors, layoutStyle } from "../components/defaultStyles";
import customStyles from "../components/styles";
import { currentDate, formatDate3, formatTime } from "../assets/date";

export default class CardDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desc: "",
      dueDate: "",
      dueTime: "",
      // archived: false,
      // attachments: [],
      cardId: ""
    };
  }

  componentDidMount() {
    const { cardId } = this.props.route.params;
    const { currentUser } = authFirebase();
    this.setState({
      cardId
    });

    readFirebaseData(
      `${currentUser.uid}/cards/${cardId}`,
      "value",
      data => {
        const { title, desc, dueDate, dueTime } = data;
        if (data) {
          this.setState({
            title,
            desc,
            dueDate,
            dueTime
          });
        }
      },
      err => console.log("Unable to read card", err)
    );
  }

  updateCard = title => {
    const { currentUser } = authFirebase();

    updateFirebaseData(
      `${currentUser.uid}/cards/`,
      {
        [this.state.cardId]: {
          title
        }
      },
      () => console.log("Card updated", this.state.cardId),
      err => console.log("Err:", err, "| Card not updated", this.state.cardId)
    );
  };

  render() {
    const { cardId, title, desc, dueDate, dueTime } = this.state;
    console.log(this.state);
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigate("CardDetails", { cardId })}>
          <Card style={styles.card}>
            <View style={styles.topCardSectionView}>
              <CardSection customStyles={{ flex: 1, flexWrap: "wrap" }}>
                <StyledText
                  style={[customStyles.cardTitleLarge, { textAlign: "left" }]}
                >
                  {title}
                </StyledText>
              </CardSection>
            </View>
            <View style={styles.bottomCardSectionView}>
              <View style={styles.bottomCardSectionSubView}>
                {desc !== undefined && (
                  <CardSection customStyles={{ flex: 1, flexWrap: "wrap" }}>
                    <StyledText style={customStyles.cardDesc}>
                      {desc}
                    </StyledText>
                  </CardSection>
                )}
                {dueDate !== undefined && dueDate !== "" && (
                  <CardSection>
                    <StyledText style={customStyles.cardDateBold}>
                      Due Date: {formatDate3(dueDate)}
                    </StyledText>
                  </CardSection>
                )}
                {dueTime !== undefined && dueTime !== "" && (
                  <CardSection>
                    <StyledText style={customStyles.cardDateBold}>
                      Due Time: {formatTime(dueTime)}
                    </StyledText>
                  </CardSection>
                )}
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: baseColors.BACKGROUND_COLOR_PRIMARY
  },
  card: {
    borderColor: "black",
    margin: 10,
    width: 320
  },
  topCardSectionView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignContent: "center"
  },
  bottomCardSectionView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  bottomCardSectionSubView: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
    flexWrap: "wrap"
  },
  buttonCardSection: {
    alignSelf: "flex-end",
    marginBottom: layoutStyle.MARGIN_VERT_PRIMARY,
    paddingRight: layoutStyle.PADDING_HORI_SMALL
  },
  modalButtonSection: {
    justifyContent: "space-between",
    alignSelf: "center"
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  scrollViewContainerForm: {
    flex: 1,
    backgroundColor: "#fff",
    padding: layoutStyle.PADDING_HORI_PRIMARY
  },
  leftCard: {
    flex: 5,
    flexWrap: "wrap"
  },
  rightCard: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: layoutStyle.PADDING_HORI_SMALL
  }
});

CardDetails.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      cardId: PropTypes.string.isRequired
    })
  }).isRequired
};
