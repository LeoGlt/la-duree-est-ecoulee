const storageHandler = {
  /**
   * Retrieve an json from local storage and parses it
   * @param {object} obj not used
   * @param {string} prop name of property on object
   * @returns the value of the object from local storage
   */
  get(obj, prop) {
    const json = localStorage.getItem(prop)
    if (json === null) {
      return undefined
    }
    return JSON.parse(json)
  },

  /**
   * Serializes and write an object in local storage
   * @param {object} obj not used
   * @param {string} prop name of property to set
   * @param {object} value value of property
   * @returns true to tell the assignment was done right
   */
  set(obj, prop, value) {
    localStorage.setItem(prop, JSON.stringify(value))
    return true
  }
}

/**
 * This will behave like an object (you can get and set attribute)
 * but every read / write will be proxied to local storage
 */
export default new Proxy({}, storageHandler)
