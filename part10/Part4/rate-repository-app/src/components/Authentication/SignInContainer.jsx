import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import Text from '../Text';

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

const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <View>
          <View style={styles.container}>
            <View
              style={[
                styles.textContainer,
                touched.username && errors.username && styles.errorInput,
              ]}
            >
              <TextInput
                value={values.username}
                onChangeText={handleChange('username')}
                placeholder="Username"
              />
            </View>
            {touched.username && errors.username && (
              <View style={styles.errorContainer}>
                <Text color="red">{errors.username}</Text>
              </View>
            )}
            <View
              style={[
                styles.textContainer,
                touched.password && errors.password && styles.errorInput,
              ]}
            >
              <TextInput
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="Password"
                secureTextEntry
              />
            </View>
            {touched.password && errors.password && (
              <View style={styles.errorContainer}>
                <Text color="red">{errors.password}</Text>
              </View>
            )}
            <View style={styles.buttonContainer}>
              <Pressable onPress={handleSubmit}>
                <Text color="bar">Sign in</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignInContainer;