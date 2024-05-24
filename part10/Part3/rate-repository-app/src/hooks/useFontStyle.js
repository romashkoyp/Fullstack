import { Platform } from 'react-native';
import theme from '../theme';

const useFontStyle = () => {
  const font = Platform.select({
    android: theme.fonts.android,
    ios: theme.fonts.ios,
    default: theme.fonts.main,
  });

  return { fontFamily: font };
};

export default useFontStyle;