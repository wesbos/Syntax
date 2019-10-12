function LocalStorageObject() {   
}

LocalStorageObject.prototype.getAll = function() {
    if (!localStorage) return {}

    const result = {}
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key))
        result[key] = value
    }
    return result
}

LocalStorageObject.prototype.clear = function () {
    if (!localStorage) return

    localStorage.clear()
}

LocalStorageObject.prototype.apply = function(newObj) {
    if(!localStorage) return

    Object.entries(newObj).forEach(([key, value]) => {
        this[key] = value
    })
}

LocalStorageObject.prototype.has = function(key) {
    if(!localStorage) return

    localStorage.getItem(key) !== null
}

LocalStorageObject.prototype.remove = function(key) {
    if(!localStorage) return

    localStorage.removeItem(key)

}


const localStorageHandler = {
    
    get: function(obj, key) {
        if (obj[key]) return obj[key]
        if (!localStorage) return undefined

        const string = localStorage.getItem(key)
        const value = JSON.parse(string)
        return value
    },

    set: function(obj, key, value) {
        if (!localStorage) return

        const string = JSON.stringify(value)
        localStorage.setItem(key,string)
        return string
    },

}

const ls = new Proxy(new LocalStorageObject(), localStorageHandler)

export default ls