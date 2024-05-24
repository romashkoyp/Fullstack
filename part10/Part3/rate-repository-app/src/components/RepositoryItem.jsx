import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import FormatCount from '../utils/shortBigNumber';

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
  buttonContainer:{
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
});

const Item = ({ fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage, ownerAvatarUrl }) => {
  return (
    <View style={styles.firstLevelContainer}>
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
            <Text fontWeight='bold' fontSize='subheading' color='primary'>Full name: {fullName}</Text>
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
    </View>
  )
}

export default Item;