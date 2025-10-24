import validator from 'validator'

export const verifyPassword = (password) => {
    const passwordOptions = {
        minLength: 12,
        minLowercase: 1, 
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }

    return validator.isStrongPassword(password, passwordOptions)
}

export const verifyEmail = (email) => {
    return validator.isEmail(email)
}
