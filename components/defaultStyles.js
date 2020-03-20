export const baseColors = {
    THEME_COLOR: "#6818A0",
    COLOR_PRIMARY: '#352641',
    COLOR_SECONDARY: '#fff',
    NAV_COLOR: '#020206',
    ICON_COLOR_GREEN: '#2FFA3C',
    BACKGROUND_COLOR_PRIMARY: '#fff',
    BACKGROUND_COLOR_SECONDARY: this.THEME_COLOR,
}

export const fontStyle = {
    FONT_FAMILY_LIGHT: 'Montserrat-Light',
    FONT_FAMILY_SEMI_BOLD: 'Montserrat-SemiBold',
    FONT_FAMILY_EXTRA_LIGHT: 'Montserrat-ExtraLight',
    FONT_FAMILY_EXTRA_BOLD: 'Montserrat-ExtraBold',
    FONT_FAMILY_BLACK: 'Montserrat-Black',
    FONT_FAMILY_BOLD_ITALIC: 'Montserrat-BoldItalic',
    FONT_FAMILY_ITALIC: 'Montserrat-Italic',
    FONT_FAMILY_LIGHT_ITALIC: 'Montserrat-LightItalic',
    FONT_FAMILY_MEDIUM_ITALIC: 'Montserrat-MediumItalic',
    FONT_FAMILY_SEMI_BOLD_ITALIC: 'Montserrat-SemiBoldItalic',
    FONT_FAMILY_THIN: 'Montserrat-Thin',
    FONT_FAMILY_THIN_ITALIC: 'Montserrat-ThinItalic',
    FONT_FAMILY_EXTRA_BOLD_ITALIC: 'Montserrat-ExtraBoldItalic',
    FONT_FAMILY_EXTRA_LIGHT_ITALIC: 'Montserrat-ExtraLightItalic',
    FONT_FAMILY_MEDIUM: 'Montserrat-Medium',
    FONT_FAMILY_NORMAL: 'Montserrat-Regular',
    FONT_FAMILY_BOLD: 'Montserrat-Bold',

    FONT_SIZE_LARGE: 24,
    FONT_SIZE_TITLE: 20,
    FONT_SIZE_PRIMARY: 14,
    FONT_SIZE_SECONDARY: 16,
    FONT_SIZE_TERTIARY: 18,
    FONT_SIZE_SMALL: 12,

    FONT_WEIGHT_VERY_LIGHT: "100",
    FONT_WEIGHT_LIGHT: "200",
    FONT_WEIGHT_NORMAL: "400",
    FONT_WEIGHT_SEMI_BOLD: "600",
    FONT_WEIGHT_BOLD: "800",

    FONT_COLOR_PRIMARY: baseColors.COLOR_PRIMARY,
    FONT_COLOR_SECONDARY: baseColors.COLOR_SECONDARY,

    FONT_LETTER_SPACING_PRIMARY: -0.5
}

export const layoutStyle = {
    MARGIN_HORI_SMALL: 8,
    MARGIN_HORI_PRIMARY: 16,
    MARGIN_HORI_SECONDARY: 32,
    MARGIN_VERT_VERY_SMALL: 4,
    MARGIN_VERT_SMALL: 8,
    MARGIN_VERT_PRIMARY: 16,
    MARGIN_VERT_SECONDARY: 24,

    PADDING_HORI_VERY_SMALL: 4,
    PADDING_HORI_SMALL: 8,
    PADDING_HORI_PRIMARY: 16,
    PADDING_HORI_SECONDARY: 32,
    PADDING_VERT_VERY_SMALL: 4,
    PADDING_VERT_SMALL: 8,
    PADDING_VERT_PRIMARY: 16,
    PADDING_VERT_SECONDARY: 32,

    ELEVATION_PRIMARY: 1,
    ELEVATION_SECONDARY: 2,
    ELEVATION_HIGH: 4,

    SHADOW_COLOR: baseColors.COLOR_PRIMARY,
    SHADOW_OFFSET: { width: 0, height: 2 },
    SHADOW_OPACITY: 0.2,
    SHADOW_RADIUS: 2,
}


export const borderStyle = {
    BORDER_RADIUS_PRIMARY: 10,
    BORDER_RADIUS_SECONDARY: 20,

    BORDER_WIDTH_PRIMARY: 1,
    BORDER_WIDTH_SECONDARY: 2,

    BORDER_COLOR_PRIMARY: baseColors.THEME_COLOR,
    BORDER_COLOR_SECONDARY: baseColors.COLOR_SECONDARY,
}

export const buttonStyle = {
    BUTTON_BORDER_COLOR_PRIMARY: baseColors.THEME_COLOR,

    BUTTON_BORDER_RADIUS_PRIMARY: borderStyle.BORDER_RADIUS_PRIMARY,
    BUTTON_BORDER_RADIUS_SECONDARY: borderStyle.BORDER_RADIUS_SECONDARY,

    BUTTON_BORDER_WIDTH_PRIMARY: 2,
    BUTTON_BORDER_WIDTH_SECONDARY: 4,

    BUTTON_BACKGROUND_COLOR_PRIMARY: baseColors.THEME_COLOR,
    BUTTON_BACKGROUND_COLOR_SECONDARY: baseColors.COLOR_SECONDARY,

    BUTTON_MARGIN_VERT: layoutStyle.MARGIN_VERT_PRIMARY,
    BUTTON_MARGIN_VERT_SMALL: layoutStyle.MARGIN_VERT_SMALL,
    BUTTON_MARGIN_HORI: layoutStyle.MARGIN_HORI_SMALL,
    BUTTON_PADDING_PRIMARY: layoutStyle.PADDING_HORI_PRIMARY,
    BUTTON_PADDING_SMALL: layoutStyle.PADDING_HORI_SMALL,

    BUTTON_FONT_SIZE_PRIMARY: fontStyle.FONT_SIZE_SECONDARY,
    BUTTON_FONT_COLOR_PRIMARY: baseColors.COLOR_SECONDARY,
    BUTTON_FONT_FAMILY_PRIMARY: fontStyle.FONT_FAMILY_NORMAL,
    BUTTON_FONT_FAMILY_BOLD: fontStyle.FONT_FAMILY_BOLD,
    BUTTON_FONT_WEIGHT_PRIMARY: fontStyle.FONT_WEIGHT_SEMI_BOLD,

    BUTTON_LETTER_SPACING_PRIMARY: -0.2,

    BUTTON_TEXT_TRANSFORM: 'uppercase',
}

export const iconStyle = {
    ICON_MARGIN_HORI: layoutStyle.MARGIN_HORI_SMALL,
    ICON_MARGIN_HORI_FIX: layoutStyle.MARGIN_HORI_PRIMARY * 3 / 4,
    ICON_MARGIN_VERT: layoutStyle.MARGIN_VERT_SMALL,
    ICON_PADDING: 0,

    ICON_SIZE_PRIMARY: 20,
    ICON_SIZE_SECONDARY: 24,
    ICON_SIZE_LARGE: 30,

    ICON_COLOR_PRIMARY: baseColors.COLOR_PRIMARY,
    ICON_COLOR_SECONDARY: baseColors.COLOR_SECONDARY,
    ICON_COLOR_GREEN: baseColors.ICON_COLOR_GREEN,

    ICON_BACKGROUND_COLOR_PRIMARY: baseColors.BACKGROUND_COLOR_PRIMARY,
    ICON_BACKGROUND_COLOR_SECONDARY: baseColors.BACKGROUND_COLOR_SECONDARY
}

export const imageStyle = {
    IMAGE_SIZE_PRIMARY: 50,
    IMAGE_SIZE_SECONDARY: 75,
    IMAGE_RADIUS_PRIMARY: 50 / 2,
    IMAGE_RADIUS_SECONDARY: 75 / 2,
    IMAGE_BORDER_RADIUS_PRIMARY: 50 / 3,
    IMAGE_BORDER_RADIUS_SECONDARY: 75 / 3,
    IMAGE_BACKGROUND_COLOR: baseColors.COLOR_PRIMARY
}
