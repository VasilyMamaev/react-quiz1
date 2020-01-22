import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz1-40012.firebaseio.com'
})