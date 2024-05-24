import { Pressable, Text } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../theme';

export const AppBarTab = () => {
  return (
    <Link to="/">
      <Text style={{ color: theme.colors.barText, fontSize: theme.fontSizes.subheading }}>Repositories</Text>
    </Link>
  );
};

export const AppBarSignIn = () => {
  return (
    <Link to="/signIn">
      <Text style={{ color: theme.colors.barText, fontSize: theme.fontSizes.subheading }}>Sign In</Text>
    </Link>
  );
};

export const AppBarSignOut = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={{ color: theme.colors.barText, fontSize: theme.fontSizes.subheading }}>Sign Out</Text>
    </Pressable>
  );
};