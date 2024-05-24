import { View, Image, StyleSheet, Pressable } from 'react-native';
import Text from '../Common/Text';
import FormatCount from '../../utils/shortBigNumber';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  firstLevelContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingTop: 7,
  },
  secondLevelContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingTop: 3,
  },
  thirdLevelContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flexBasis: 0,
    flexGrow: 1,
    paddingLeft: 10,
  },
  fourthLevelContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 5,
  },
  fifthLevelContainer: {
    flexDirection: 'column',
    gap: 10,
    padding: 10,
  },
  logoContainer: {
    paddingLeft: 10,
  },
  textContainer: {
    paddingTop: 3,
    paddingBottom: 3,
    flexDirection: 'row',
  },
  secondTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainerMain: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
});

const Item = ({ fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage, ownerAvatarUrl, url }) => {
  const handlePress = () => {
    Linking.openURL(url)
  };  

  return (
    <View style={styles.firstLevelContainer} testID="repositoryItem">
      <View style={styles.secondLevelContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={{
              uri: ownerAvatarUrl
            }}
          />
        </View>
        <View style={styles.thirdLevelContainer}>
          <View style={styles.textContainer}>
            <Text fontWeight='bold' fontSize='subheading' color='primary'>{fullName}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>{description}</Text>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.buttonContainer}>
              <Text color='bar'>{language}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.fourthLevelContainer}>
        <View style={styles.firstLevelContainer}>
          <View style={styles.secondTextContainer}>
            <Text fontWeight="bold">{FormatCount(stargazersCount)}</Text>
          </View>
          <View style={styles.secondTextContainer}>
            <Text>Stars</Text>
          </View>
        </View>
        <View style={styles.firstLevelContainer}>
          <View style={styles.secondTextContainer}>
            <Text fontWeight="bold">{FormatCount(forksCount)}</Text>
          </View>
          <View style={styles.secondTextContainer}>
            <Text>Forks</Text> 
          </View>
        </View>
        <View style={styles.firstLevelContainer}>
          <View style={styles.secondTextContainer}>
            <Text fontWeight="bold">{reviewCount}</Text>
          </View>
          <View style={styles.secondTextContainer}>
            <Text>Reviews</Text>
          </View>
        </View>
        <View style={styles.firstLevelContainer}>
          <View style={styles.secondTextContainer}>
            <Text fontWeight="bold">{ratingAverage}</Text>
          </View>
          <View style={styles.secondTextContainer}>
            <Text>Rating</Text>
          </View>
        </View>
      </View>
      {url ? (
        <View style={styles.fifthLevelContainer}>
          <Pressable onPress={handlePress} style={styles.buttonContainerMain}>
            <Text color='bar'>Open in GitHub</Text>
          </Pressable>
        </View>) : (
          null
        )
      }
    </View>
  )
};

export default Item;