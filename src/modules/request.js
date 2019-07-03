import {retrieveToken, saveToken} from '@/modules/tokenizer'

export class Fetcher {
    constructor(endPoint, options = {
        method: 'GET',
        headers: {},
        body: null
    }) {

        this.options = options
        this.endPoint = endPoint

        // Create XMLHttpRequest instance
        const xhr = this.xhr = new XMLHttpRequest

        // Open the request before adding headers
        xhr.open(options.method, `${Fetcher.baseUrl}/${endPoint}`)

        // Run beforeEach handlers
        for (let handler of Fetcher.beforeEachHandlers) {
            try {
                handler(this)
            } catch (e) {
                throw e
            }
        }

        // Set request headers
        for (let header in options.headers) {
            xhr.setRequestHeader(header, options.headers[header])
        }
    }

    locked = false

    response() {
        return new Promise((resolve, reject) => {

            // You can't call this method twice
            if (this.locked) {
                return reject('Response object is locked')
            }

            // Lock the response
            this.locked = true

            const xhr = this.xhr

            // Add onload event handler
            xhr.onload = () => {
                // headers method
                const headers = () => {

                    // Convert the header string into an array
                    // of individual headers
                    const arr = xhr.getAllResponseHeaders().trim().split(/[\r\n]+/)

                    // Create a map of header names to values
                    const headerMap = {}
                    arr.forEach(line => {
                        const parts = line.split(': ')
                        const header = parts.shift()
                        headerMap[header] = parts.join(': ')
                    })

                    return headerMap
                }

                // json method
                const json = () => JSON.parse(xhr.responseText)

                // Response object
                const response = {
                    header: xhr.getResponseHeader.bind(xhr),
                    headers,
                    json,
                    text: xhr.responseText,
                    status: xhr.status
                }

                // Run afterEach handlers
                for (let handler of Fetcher.afterEachHandlers) {
                    try {
                        handler(this, response)
                    } catch (e) {
                        throw e
                    }
                }

                resolve(response)
            }

            xhr.onerror = () => reject(xhr.responseText)

            const body = this.options.body
            if (body && Object.getPrototypeOf(body) === Object.prototype) {
                return xhr.send(Fetcher.objectToFormData(body))
            }

            xhr.send(body)
        })
    }

    static baseUrl = 'http://127.0.0.1:3333'
    static beforeEachHandlers = []
    static afterEachHandlers = []

    static beforeEach(handler) {
        Fetcher.beforeEachHandlers.unshift(handler)
    }

    static afterEach(handler) {
        Fetcher.afterEachHandlers.unshift(handler)
    }

    static objectToFormData(obj) {
        const formData = new FormData

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                formData.append(key, obj[key])
            }
        }

        return formData
    }
}


// Add authentication token
Fetcher.beforeEach(function (instance) {
    const {options} = instance
    const token = retrieveToken()

    if (options.auth !== false && token) {
        options.headers.Authorization = `Bearer ${token}`
    }
})

// Handle refresh token
Fetcher.afterEach(function (instance, response) {
    const refreshToken = response.header('X-refresh-token')

    if (refreshToken) {
        saveToken(refreshToken)
    }
})

export default function request(endPoint, options) {
    return new Fetcher(endPoint, options)
}
