const storageHandler = {
    /**
     * Retrieve an json from local storage and parses it
     * @param {object} obj not used, just here 
     * @param {*} prop 
     */
    get(obj, prop){
        const json = localStorage.getItem(prop)
        if(json===null){
            return undefined
        }
        return JSON.parse(json)
    },

    set(obj, prop, value){
        localStorage.setItem(prop, JSON.stringify(value))
        return true
    }
}


/**
 * This will behave like an object (you can get and set attribute) 
 * but every read / write will be proxied to local storage
 */
export default new Proxy({}, storageHandler)
