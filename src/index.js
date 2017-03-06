import Promise from 'promise/lib/es6-extensions'

class ImgPing {
  constructor() {
    this._timeout = 3000
  }

  set timeout(t) {
    if (typeof t === 'number' && t > 0) {
      this._timeout = t
    } else {
      console.error('[tackpings] Please set a valid number larger than 0.')
    }
  }

  /**
   * https://stereochro.me/ideas/detecting-broken-images-js
   */
  _isImageOk(image) {
    if (image.complete) return false
    if (typeof image.naturalWidth !== 'undefined') return false
    if (image.naturalWidth === 0) return false
    return true
  }

  _pingPromise(imageSrc) {
    return new Promise((resolve, reject) => {
      const start = new Date().getTime()
      const diff = () => new Date().getTime() - start

      const timer = setTimeout(() => reject(diff()), this._timeout)
      const complete = (cb) => {
        cb(diff())
        clearTimeout(timer)
      }

      const image = new Image()
      image.onload = () => complete(this._isImageOk ? resolve : reject)
      image.onerror = () => complete(reject)
      image.src = `${imageSrc}?t=${start}`
    })
  }

  _pingFinally(imageSrc) {
    return new Promise((resolve) => {
      this._pingPromise(imageSrc)
      .then((responseTime) => resolve({
        imageSrc,
        responseTime,
        success: true
      }))
      .catch(() => resolve({
        imageSrc,
        responseTime: this._timeout,
        success: false
      }))
    })
  }

  /**
   * Get a single image response time
   * @param {string} src - image src
   * @return {Promise}
   */
  img(src) {
    return this._pingPromise(src)
  }

  /**
   * Get a batch of images response time
   * @param {string[]} list - image src list
   * @return {Promise}
   */
  imgs(list) {
    return Promise.all(list.map((src) => this._pingFinally(src)))
  }

  /**
   * Resolve as soon as one of the images is loaded
   * @param {string[]} list - image src list
   * @return {Promise}
   */
  race(list) {
    const rejectList = []
    return new Promise((resolve, reject) => {
      list.forEach((src) => {
        return this._pingFinally(src)
        .then((result) => {
          const { success } = result
          if (success) {
            return resolve(result)
          } else {
            rejectList.push(result)
            if (rejectList.length === list.length) return reject(rejectList)
          }
        })
      })
    })
  }
}

const ping = new ImgPing()
window.ping = ping
export default ping
