import Input from './styles/Input'
import { PrimaryButton } from './styles/Buttons'

const LoginForm = ({ 
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <Input
          data-testid='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => handleUsernameChange(target.value)}
        />
      </div>
      <div>
        password
        <Input
          data-testid='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => handlePasswordChange(target.value)}
        />
      </div>
      <PrimaryButton type="submit">login</PrimaryButton>
    </form>
  )
}

export default LoginForm