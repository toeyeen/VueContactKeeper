import axios from 'axios'
const setAuthToken = (token) => {
  // Check to see if tokeen

  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token
  } else {
    delete axios.defaults.headers.common['x-auth-token']
  }
}

export default setAuthToken
