import { GET_USERS, GET_USERS_LOADING, GET_USERS_ERROR } from '../../constants/strings';

export default (state = {
  user: [],
  isLoadingUser: true,
  isErrorUser: false,
  messageUser: ''
}, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        user: action.payload,
        isLoadingUser: false
      };
    case GET_USERS_LOADING:
      return {
        ...state,
        isLoadingUser: true,
        isErrorUser: false,
        messageUser: ''
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        isLoadingUser: false,
        isErrorUser: true,
        messageUser: action.payload
      };
    default:
      return state;
  }
};
