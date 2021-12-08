import { LOGIN_ACTION } from '../actions/index';

const INITIAL_STATE = {
  login: '',
};

const Login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_ACTION:
    return { ...state, login: action.payload };
  default:
    return { ...state };
  }
};

export default Login;
