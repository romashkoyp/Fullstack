import { Pressable, Text } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../../theme';

export const AppBarTab = () => {
  return (
    <Link to="/">
      <Text style={{ color: theme.colors.barText, fontSize: theme.fontSizes.subheading }}>Repositories</Text>
    </Link>
  );
};

export const AppBarCreateReview = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={{ color: theme.colors.barText, fontSize: theme.fontSizes.subheading }}>Create a review</Text>
    </Pressable>
  );
};

export const AppBarMyReviews = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={{ color: theme.colors.barText, fontSize: theme.fontSizes.subheading }}>My reviews</Text>
    </Pressable>
  );
};

export const AppBarSignIn = () => {
  return (
    <Link to="/signIn">
      <Text style={{ color: theme.colors.barText, fontSize: theme.fontSizes.subheading }}>Sign In</Text>
    </Link>
  );
};

export const AppBarSignUp = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={{ color: theme.colors.barText, fontSize: theme.fontSizes.subheading }}>Sign up</Text>
    </Pressable>
  );
};

export const AppBarSignOut = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={{ color: theme.colors.barText, fontSize: theme.fontSizes.subheading }}>Sign Out</Text>
    </Pressable>
  );
};