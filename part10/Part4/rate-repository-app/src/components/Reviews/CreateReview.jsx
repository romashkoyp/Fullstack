import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client';
import theme from '../../theme';

import useCreateReview from '../../hooks/useCreateReview';
import * as yup from 'yup';
import Text from '../Common/Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 10,
    padding: 10,
  },
  textContainer: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  errorContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
});

const initialValues = {
  ownerName: 'zeit',
  repositoryName: 'swr',
  rating: 50,
  text: 'test',
};

const addReviewSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number()
    .integer('Rating must be an integer')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating cannot exceed 100')
    .required('Rating is required'),
  text: yup.string().max(2000),
});

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();
  const client = useApolloClient();

  const handleSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { repositoryId } = await createReview({ ownerName, repositoryName, rating, text });

      if (repositoryId) {
        // console.log('repositoryId:', repositoryId)

        client.resetStore();  
        navigate(`/repository/${repositoryId}`); 
      } else {
        console.error("No repositoryId is provided");
      }     
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={addReviewSchema}>
      {({ handleSubmit, values, handleChange, errors, touched }) => (
        <View>
          <View style={styles.container}>
            <View style={[styles.textContainer, touched.ownerName && errors.ownerName && styles.errorInput]}>
              <TextInput
                value={values.ownerName}
                onChangeText={handleChange('ownerName')}
                placeholder='Repository owner name'
                placeholderTextColor={theme.colors.secondary}
              />
            </View>
            {touched.ownerName && errors.ownerName && (
              <View style={styles.errorContainer}>
                <Text color='red'>{errors.ownerName}</Text>
              </View>
            )}
            <View style={[styles.textContainer, touched.repositoryName && errors.repositoryName && styles.errorInput]}>
              <TextInput
                value={values.repositoryName}
                onChangeText={handleChange('repositoryName')}
                placeholder='Repository name'
                placeholderTextColor={theme.colors.secondary}
              />
            </View>
            {touched.repositoryName && errors.repositoryName && (
              <View style={styles.errorContainer}>
                <Text color='red'>{errors.repositoryName}</Text>
              </View>
            )}
            <View style={[styles.textContainer, touched.rating && errors.rating && styles.errorInput]}>
              <TextInput
                value={values.rating.toString()}
                onChangeText={handleChange('rating')}
                placeholder='Rating between 0 and 100'
                keyboardType='numeric'
                placeholderTextColor={theme.colors.secondary}
              />
            </View>
            {touched.rating && errors.rating && (
              <View style={styles.errorContainer}>
                <Text color='red'>{errors.rating}</Text>
              </View>
            )}
            <View style={[styles.textContainer]}>
              <TextInput
                value={values.text}
                onChangeText={handleChange('text')}
                placeholder='Review'
                placeholderTextColor={theme.colors.secondary}
              />
            </View>
            <Pressable onPress={handleSubmit} style={styles.buttonContainer}>
              <Text color="bar">Create a review</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default CreateReview;