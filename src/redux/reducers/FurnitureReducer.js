import { GET_FURNITURES, GET_FURNITURES_LOADING, GET_FURNITURES_ERROR } from '../../constants/strings';

export default (state = {
  furniture: [],
  isLoadingFurniture: true,
  isErrorFurniture: false,
  messageFurniture: ''
}, action) => {
  switch (action.type) {
    case GET_FURNITURES:
      return {
        ...state,
        furniture: action.payload,
        isLoadingFurniture: false
      };
    case GET_FURNITURES_LOADING:
      return {
        ...state,
        isLoadingFurniture: true,
        isErrorFurniture: false,
        messageFurniture: ''
      };
    case GET_FURNITURES_ERROR:
      return {
        ...state,
        isLoadingFurniture: false,
        isErrorFurniture: true,
        messageFurniture: action.payload
      };
    default:
      return state;
  }
};
