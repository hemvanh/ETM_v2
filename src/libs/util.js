import axios from 'axios'
import {Toast} from 'quasar'

const _ax = axios.create({
  timeout: 20000,
  // remove the abundant "data" key from grahql response
  transformResponse: axios.defaults.transformResponse.concat(data => {
    return data.data
  }),
})

const _alert = (msg, type) => {
  Toast.create[type]({
    html: msg.toString(),
    timeout: 2000,
  })
}

export {_ax, _alert}
