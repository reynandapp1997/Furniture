import { NAME, USERNAME, PASSWORD, LEVEL, EMAIL, ADDRESS, CLEAR_FORM, NAME_ERROR, USERNAME_ERROR, PASSWORD_ERROR, LEVEL_ERROR, ADD_ERROR, REMOVE_ERROR } from '../../constants/strings';

export default (state = {
  name: '',
  username: '',
  password: '',
  level: '',
  nameError: '',
  usernameError: '',
  passwordError: '',
  levelError: '',
  email: '',
  address: '',
  addError: ''
}, action) => {
  switch (action.type) {
    case NAME:
      return {
        ...state,
        name: action.payload,
        nameError: ''
      };
    case USERNAME:
      return {
        ...state,
        username: action.payload,
        usernameError: ''
      };
    case PASSWORD:
      return {
        ...state,
        password: action.payload,
        passwordError: ''
      };
    case LEVEL:
      return {
        ...state,
        level: action.payload,
        levelError: ''
      };
    case EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    case CLEAR_FORM:
      return {
        ...state,
        name: '',
        username: '',
        password: '',
        level: '',
        nameError: '',
        usernameError: '',
        passwordError: '',
        levelError: '',
        email: '',
        address: '',
        addError: ''
      };
    case NAME_ERROR:
      return {
        ...state,
        nameError: action.payload
      };
    case USERNAME_ERROR:
      return {
        ...state,
        usernameError: action.payload
      };
    case PASSWORD_ERROR:
      return {
        ...state,
        passwordError: action.payload
      };
    case LEVEL_ERROR:
      return {
        ...state,
        levelError: action.payload
      };
    case ADD_ERROR:
      return {
        ...state,
        addError: action.payload
      };
    case REMOVE_ERROR:
      return {
        ...state,
        addError: ''
      };
    default:
      return state;
  }
};
