import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client';
import theme from '../../theme';

import useCreateUser from '../../hooks/useCreateUser';
import useSignIn from '../../hooks/useSignIn';
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
  username: 'kalle',
  password: '12345',
  passwordConfirm: '',
};

const SignupSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const client = useApolloClient();

  const handleSubmit = async (values) => {
    const { username, password } = values;
    
    try {
      const { userId } = await createUser({ username, password });

      if (userId) {
        // console.log('userId:', userId);
        await signIn({ username, password });
        client.resetStore();
        navigate('/');
      } else {
        console.error("No userId is provided");
      }       
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={SignupSchema}>
      {({ handleSubmit, values, handleChange, errors, touched }) => (
        <View>
          <View style={styles.container}>
            <View style={[styles.textContainer, touched.username && errors.username && styles.errorInput]}>
              <TextInput
                value={values.username}
                onChangeText={handleChange('username')}
                placeholder="Username"
                placeholderTextColor={theme.colors.secondary}
              />
            </View>
            {touched.username && errors.username && (
              <View style={styles.errorContainer}>
                <Text color='red'>{errors.username}</Text>
              </View>
            )}
            <View style={[styles.textContainer, touched.password && errors.password && styles.errorInput]}>
              <TextInput
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor={theme.colors.secondary}
              />
            </View>
            {touched.password && errors.password && (
              <View style={styles.errorContainer}>
                <Text color='red'>{errors.password}</Text>
              </View>
            )}
            <View style={[styles.textContainer, touched.passwordConfirm && errors.passwordConfirm && styles.errorInput]}>
              <TextInput
                value={values.passwordConfirm}
                onChangeText={handleChange('passwordConfirm')}
                placeholder="Confirm password"
                secureTextEntry
                placeholderTextColor={theme.colors.secondary}
              />
          </View>
          {touched.passwordConfirm && errors.passwordConfirm && (
            <View style={styles.errorContainer}>
              <Text color="red">{errors.passwordConfirm}</Text>
            </View>
          )}
            <Pressable onPress={handleSubmit} style={styles.buttonContainer}>
              <Text color="bar">Sign up</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;