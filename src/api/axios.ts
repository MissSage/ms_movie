/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import axios from 'axios'
const config = {
  baseURL: 'http://localhost:3000',
  timeout: 1000 * 180
}

const _axios = axios.create(config)

export default _axios
