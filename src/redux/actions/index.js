/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import {
  GET_FURNITURES_ERROR, GET_FURNITURES, GET_FURNITURES_LOADING, GET_USERS_ERROR, GET_USERS_LOADING, GET_USERS, NAME, USERNAME, PASSWORD, LEVEL, EMAIL, ADDRESS, CLEAR_FORM, NAME_ERROR, USERNAME_ERROR, PASSWORD_ERROR, LEVEL_ERROR, ADD_ERROR, REMOVE_ERROR,
} from '../../constants/strings';

/* eslint-disable no-undef */
// const api = 'http://192.168.43.197:3001';
const api = 'https://furniture-server.herokuapp.com';
const FETCH_TIMEOUT = 30000;

export const getFurniture = cat_id => dispatch => {
  const timeout = setTimeout(() => {
    dispatch({
      type: GET_FURNITURES_ERROR,
      payload: 'Check your internet connection'
    });
  }, FETCH_TIMEOUT);
  dispatch({
    type: GET_FURNITURES_LOADING
  });
  fetch(`${api}/api/furniture/category/${cat_id}`, {
      method: 'GET'
    })
    .then(result => {
      clearTimeout(timeout);
      dispatch({
        type: GET_FURNITURES,
        payload: JSON.parse(result._bodyText)
      });
    })
    .catch(() => {
      clearTimeout(timeout);
      dispatch({
        type: GET_FURNITURES_ERROR,
        payload: 'Check your internet connection'
      });
    });
};

export const getUser = () => dispatch => {
  const timeout = setTimeout(() => {
    dispatch({
      type: GET_USERS_ERROR,
      payload: 'Check your internet connection'
    });
  }, FETCH_TIMEOUT);
  dispatch({
    type: GET_USERS_LOADING
  });
  fetch(`${api}/api/user`, {
      method: 'GET'
    })
    .then(result => {
      clearTimeout(timeout);
      dispatch({
        type: GET_USERS,
        payload: JSON.parse(result._bodyText)
      });
    })
    .catch(() => {
      clearTimeout(timeout);
      dispatch({
        type: GET_USERS_ERROR,
        payload: 'Check your internet connection'
      });
    });
};

export const onFormChange = (text, field) => dispatch => {
  switch (field) {
    case NAME:
      dispatch({
        type: NAME,
        payload: text
      });
      break;
    case USERNAME:
      dispatch({
        type: USERNAME,
        payload: text
      });
      break;
    case PASSWORD:
      dispatch({
        type: PASSWORD,
        payload: text
      });
      break;
    case LEVEL:
      dispatch({
        type: LEVEL,
        payload: text
      });
      break;
    case EMAIL:
      dispatch({
        type: EMAIL,
        payload: text
      });
      break;
    case ADDRESS:
      dispatch({
        type: ADDRESS,
        payload: text
      });
      break;
    default:
      break;
  }
};

export const clearForm = () => dispatch => {
  dispatch({
    type: CLEAR_FORM
  });
};

export const addUser = (form, nav) => dispatch => {
  if (form.name.length === 0) {
    dispatch({
      type: NAME_ERROR,
      payload: 'Enter your name'
    });
  }
  if (form.username.length === 0) {
    dispatch({
      type: USERNAME_ERROR,
      payload: 'Enter your username'
    });
  }
  if (form.password.length === 0) {
    dispatch({
      type: PASSWORD_ERROR,
      payload: 'Enter your password'
    });
  }
  if (form.level.length === 0) {
    dispatch({
      type: LEVEL_ERROR,
      payload: 'Enter user level'
    });
  }
  const timeout = setTimeout(() => {
    dispatch({
      type: ADD_ERROR,
      payload: 'Check your internet connection'
    });
  }, FETCH_TIMEOUT);
  if (form.name && form.username && form.password && form.level) {
    fetch(`${api}/api/user/create-account`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      .then(() => {
        clearTimeout(timeout);
        nav.pop();
        dispatch({
          type: ADD_ERROR,
          payload: 'Add User Success'
        });
      })
      .catch(() => {
        clearTimeout(timeout);
        dispatch({
          type: ADD_ERROR,
          payload: 'Check your internet connection'
        });
      });
  }
};

export const deleteUser = id => dispatch => {
  const timeout = setTimeout(() => {
    dispatch({
      type: ADD_ERROR,
      payload: 'Check your internet connection'
    });
  }, FETCH_TIMEOUT);
  fetch(`${api}/api/user/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      clearTimeout(timeout);
      dispatch({
        type: ADD_ERROR,
        payload: 'Delete User Success'
      });
    })
    .catch(() => {
      clearTimeout(timeout);
      dispatch({
        type: ADD_ERROR,
        payload: 'Check your internet connection'
      });
    });
};

export const updateUser = (form, nav) => dispatch => {
  if (form.name.length === 0) {
    dispatch({
      type: NAME_ERROR,
      payload: 'Enter your name'
    });
  }
  if (form.username.length === 0) {
    dispatch({
      type: USERNAME_ERROR,
      payload: 'Enter your username'
    });
  }
  if (form.password.length === 0) {
    dispatch({
      type: PASSWORD_ERROR,
      payload: 'Enter your password'
    });
  }
  if (form.level.length === 0) {
    dispatch({
      type: LEVEL_ERROR,
      payload: 'Enter user level'
    });
  }
  const timeout = setTimeout(() => {
    dispatch({
      type: ADD_ERROR,
      payload: 'Check your internet connection'
    });
  }, FETCH_TIMEOUT);
  if (form.name && form.username && form.password && form.level) {
    fetch(`${api}/api/user/${form._id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      .then(() => {
        clearTimeout(timeout);
        nav.pop();
        dispatch({
          type: ADD_ERROR,
          payload: 'Update User Success'
        });
      })
      .catch(() => {
        clearTimeout(timeout);
        dispatch({
          type: ADD_ERROR,
          payload: 'Check your internet connection'
        });
      });
  }
};

export const removeError = () => dispatch => {
  dispatch({
    type: REMOVE_ERROR
  });
};
