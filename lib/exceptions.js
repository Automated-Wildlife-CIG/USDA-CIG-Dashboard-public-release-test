export class AuthRequiredError extends Error {
    constructor(message = 'Authorization is required to access this resource.') {
        super(message)
        this.name = 'AuthRequiredError'
    }
}