import { Text as NativeText, StyleSheet } from 'react-native';
import theme from '../theme';
import useFontStyle from '../useFontStyle';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  colorBar: {
    color: theme.colors.barText,
  },
  colorError: {
    color: theme.colors.red,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const fontStyle = useFontStyle();
  // console.log(fontStyle);
  
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'bar' && styles.colorBar,
    color === 'red' && styles.colorError,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    fontStyle,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;