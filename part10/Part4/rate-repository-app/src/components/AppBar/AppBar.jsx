import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigate } from 'react-router-native';
import Constants from 'expo-constants';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../../hooks/useAuthStorage';
import useMe from '../../hooks/useMe';
import { AppBarTab, AppBarSignIn, AppBarSignOut, AppBarCreateReview, AppBarSignUp, AppBarMyReviews } from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    backgroundColor: 'rgba(36, 41, 46, 0.7)',
  },
  bar: {
    flexDirection: 'row',
  },
  appBarTabContainer: {
    padding: 10,
  }
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const { me } = useMe();

  // console.log('about me:', me)

  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await client.resetStore();
    navigate('/signIn');
  };

  const handleSignUp = async () => {
    navigate('/signUp');
  };

  const handleAddReview = async () => {
    navigate('/createReview')
  };

  const handleMyReviews = async () => {
    navigate('/myReviews')
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.bar}>
          <View style={styles.appBarTabContainer}>
            <AppBarTab />
          </View>
            {me && me.username ? (
              <View style={styles.appBarTabContainer}>
                <AppBarCreateReview onPress={handleAddReview}/>
              </View>
            ) : (
              null
            )}
            {me && me.username ? (
              <View style={styles.appBarTabContainer}>
                <AppBarMyReviews onPress={handleMyReviews}/>
              </View>
            ) : (
              null
            )}          
          <View style={styles.appBarTabContainer}>
            {me && me.username ? (
              <AppBarSignOut onPress={handleSignOut}/>
            ) : (
              <AppBarSignIn />
            )}
          </View>
          <View style={styles.appBarTabContainer}>
            {!me ? (
              <AppBarSignUp onPress={handleSignUp}/>
            ) : (
              null
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  ); 
};

export default AppBar;