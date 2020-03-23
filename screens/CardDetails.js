import React from "react";
import PropTypes from "prop-types";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Card } from "../components/Card";
import { CardSection } from "../components/CardSection";
import { StyledText } from "../components/StyledText";
import {
  readFirebaseData,
  authFirebase,
  updateFirebaseData
} from "../assets/firebase";
import { navigate } from "../components/RootNavigation";
import {
  baseColors,
  borderStyle,
  buttonStyle,
  iconStyle,
  layoutStyle
} from "../components/defaultStyles";
import customStyles from "../components/styles";
import { formatDate3, formatTime } from "../assets/date";
import { EditCircle } from "../components/Icons";
import { AttachFiles } from "../components/AttachFiles";
import { List } from "../components/List";

export default class CardDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      desc: "",
      dueDate: "",
      dueTime: "",
      // archived: false,
      files: [],
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
        const { title, desc, dueDate, dueTime, files } = data;
        if (data) {
          this.setState({
            title,
            desc,
            dueDate,
            dueTime,
            files
          });
        }
      },
      err => console.log("Unable to read card", err)
    );
  }

  onAttachComplete = newFile => {
    const existingFiles = this.state.files || [];
    let files = [];
    if (existingFiles.length) files = [...existingFiles, newFile];
    else files = [newFile];
    console.log(files);
    this.setState({ files });
    const { currentUser } = authFirebase();
    updateFirebaseData(
      `${currentUser.uid}/cards/${this.state.cardId}/`,
      { files },
      res => {
        console.log("Files attached");
      },
      err => console.log("Error while attaching files", err)
    );
  };
  // downloadPdf = link => {
  //   download(link, "pdf");
  // };
  renderFile = item => {
    return (
      <Card>
        <CardSection customStyles={{ alignItems: "center" }}>
          <Icon
            name="file"
            size={iconStyle.ICON_SIZE_LARGE}
            color={iconStyle.ICON_COLOR_PRIMARY}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              marginLeft: layoutStyle.MARGIN_HORI_SMALL
            }}
          >
            <Text style={customStyles.cardDesc}>
              <Text style={customStyles.cardSubTitleBold}>Name: </Text>
              {item.name ? item.name : ""}
            </Text>
            <Text style={customStyles.cardDesc}>
              <Text style={customStyles.cardSubTitleBold}>Size: </Text>
              {item.size ? `${(item.size / 1024 / 1024).toFixed(2)} MB` : ""}
            </Text>
          </View>
        </CardSection>
      </Card>
    );
  };

  render() {
    const { title, desc, dueDate, dueTime } = this.state;
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.topCardSectionView}>
            <CardSection customStyles={{ flex: 1, flexWrap: "wrap" }}>
              <StyledText
                style={[customStyles.cardTitleLarge, { textAlign: "left" }]}
              >
                {title}
              </StyledText>
            </CardSection>
            <CardSection customStyles={{ flex: 1, flexWrap: "wrap" }}>
              <EditCircle
                size={30}
                onPress={() =>
                  navigate("UpdateCardItem", {
                    data: this.state
                  })
                }
              />
            </CardSection>
          </View>
          <View style={styles.bottomCardSectionView}>
            <View style={styles.bottomCardSectionSubView}>
              {desc !== undefined && (
                <CardSection customStyles={{ flex: 1, flexWrap: "wrap" }}>
                  <StyledText style={customStyles.cardDesc}>{desc}</StyledText>
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
              <CardSection customStyles={styles.buttonCardSection}>
                <AttachFiles
                  customStyles={{ alignSelf: "flex-end" }}
                  onAttachComplete={this.onAttachComplete}
                />
              </CardSection>
              <CardSection customStyles={styles.buttonCardSection}>
                <ScrollView
                  style={{
                    flex: 1,
                    backgroundColor: baseColors.BACKGROUND_COLOR_PRIMARY,
                    margin: layoutStyle.MARGIN_HORI_PRIMARY,
                    borderTopWidth: borderStyle.BORDER_WIDTH_PRIMARY,
                    borderColor: buttonStyle.BUTTON_BORDER_COLOR_PRIMARY
                  }}
                >
                  <Card>
                    <StyledText>Attached Files</StyledText>
                    <List
                      data={this.state.files}
                      renderItem={this.renderFile}
                    />
                  </Card>
                </ScrollView>
              </CardSection>
            </View>
          </View>
        </Card>
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
