import React from "react";
import { baseColors, fontStyle } from "./defaultStyles";
import { Button } from "./Button";
import { authFirebase, logoutFirebase } from "../assets/firebase";

export const headerOptions = {
  headerStyle: {
    backgroundColor: baseColors.BACKGROUND_COLOR_SECONDARY
  },
  headerTintColor: baseColors.COLOR_SECONDARY,
  headerTitleStyle: {
    fontWeight: fontStyle.FONT_FAMILY_BOLD
  },
  headerRight: () =>
    authFirebase().currentUser && (
      <Button
        onPress={() => {
          logoutFirebase(
            () => console.log("Logged out succsessfully"),
            err => console.log("Error while logging out", err)
          );
        }}
        viewStyle={{ marginTop: 0 }}
      >
        Logout
      </Button>
    )
};
