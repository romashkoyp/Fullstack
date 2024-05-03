// RepositoryItem a single item on the list (hint: use the FlatList component's renderItem prop)
import { View } from 'react-native';
import Text from './Text';

const Item = ({ fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage }) => {
  return (
    <View>
      <Text fontWeight='bold' fontSize='subheading' color='primary'>Full name: {fullName}</Text>
      <Text>Description:  {description}</Text>
      <Text>Language: {language}</Text>
      <Text>Stars: {stargazersCount}</Text>
      <Text>Forks: {forksCount}</Text>
      <Text>Reviews: {reviewCount}</Text>
      <Text>Rating: {ratingAverage}</Text>
    </View>
  )
}

export default Item;