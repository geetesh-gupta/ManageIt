import { Alert } from "react-native";

export const alertDialog = (onSuccess) => {
    Alert.alert(
        'Verify',
        'Are you sure you want to perform the action?',
        [
            {
                text: 'No',
                onPress: () => console.warn('No Pressed'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => onSuccess() },
        ],
        { cancelable: false },
    );
}