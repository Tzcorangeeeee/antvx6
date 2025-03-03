import { reject } from 'eslint-plugin-promise/rules/lib/promise-statics'
import message from 'core-js/internals/is-forced'


function requestData(url) {
  function judge(resolve,reject) {
    const message = {
      noteCode: '111',
      data: 'tzc',
      errMsg: 'Error'
    }

    setTimeout(() => {
      if (message.noteCode === 111) {
        resolve(message.data)
      } else {
        reject(message.Error)
      }
    },1000)
  }
}

requestData('http://localhost:8080')
