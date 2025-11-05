import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import AuthService from '../service/auth.service.js'

dotenv.config()

// Black Box Testing

test('Register with Valid Inputs', async () => {
    const result = await AuthService.register({ email: 'validuser@email.com', password: 'P@ssw0rd' })

    expect(result).toEqual({
        message: 'Registration successful. Please check your email to verify your account before logging in.'
    })
})

test('Register with Invalid Email - Exclude "@"', async () => {
    const call = async () => await AuthService.register({ email: 'invaliduseremail.com', password: "P@ssw0rd" })

    await expect(call()).rejects.toThrow('Invalid Email')
})

test('Register with Invalid Email - Exclude Domain', async () => {
    const call = async () => await AuthService.register({ email: 'invaliduser@email', password: "P@ssw0rd" })

    await expect(call()).rejects.toThrow('Invalid Email')
})

test('Register with Invalid Email - Existing User', async () => {
    const call = async () => await AuthService.register({ email: 'existinguser@email.com', password: "P@ssw0rd" })

    await expect(call()).rejects.toThrow('Email Taken')
})

test('Register with Invalid Password - Password Length', async () => {
    const call = async () => await AuthService.register({ email: 'validuser@email.com', password: 'P@ssw0r' })

    await expect(call()).rejects.toThrow('Error! Passwords must be at least 8 characters and include a mix of letters, numbers, symbols and upper lower cases.')
})

test('Register with Invalid Password - Missing Symbol', async () => {
    const call = async () => await AuthService.register({ email: 'validuser@email.com', password: 'Passw0rd' })

    await expect(call()).rejects.toThrow('Error! Passwords must be at least 8 characters and include a mix of letters, numbers, symbols and upper lower cases.')
})

test('Register with Invalid Password - Missing Number', async () => {
    const call = async () => await AuthService.register({ email: 'validuser@email.com', password: 'P@ssword' })

    await expect(call()).rejects.toThrow('Error! Passwords must be at least 8 characters and include a mix of letters, numbers, symbols and upper lower cases.')
})

test('Register with Invalid Password - Missing Upper Case', async () => {
    const call = async () => await AuthService.register({ email: 'validuser@email.com', password: 'p@ssw0rd' })

    await expect(call()).rejects.toThrow('Error! Passwords must be at least 8 characters and include a mix of letters, numbers, symbols and upper lower cases.')
})

test('Register with Invalid Password - Missing Lower Case', async () => {
    const call = async () => await AuthService.register({ email: 'validuser@email.com', password: 'P@SSW0RD' })

    await expect(call()).rejects.toThrow('Error! Passwords must be at least 8 characters and include a mix of letters, numbers, symbols and upper lower cases.')
})

// Black Box Testing

test('Login with Valid Inputs', async () => {
    const result = await AuthService.login({ email: 'validuser@email.com', password: 'P@ssw0rd' })

    await expect(() => jwt.verify(result, process.env.JWT_SECRET)).not.toThrow()
})

test('Login with Invalid Email', async () => {
    const call = async () => await AuthService.login({ email: 'invaliduser@email.com', password: 'P@ssw0rd' })

    await expect(call()).rejects.toThrow("Email not found")
})

test('Login with Invalid Password', async () => {
    const call = async () => await AuthService.login({ email: 'validuser@email.com', password: 'inVa1idP@ss' })

    await expect(call()).rejects.toThrow("Incorrect Password")
})

// Black Box Testing

test('Forget Password with Valid Email', async () => {
    const call = async () => await AuthService.forget('validuser@email.com')
    await expect(call()).resolves.toEqual({ message: 'Email Sent' })
})

test('Forget Password with Unregistered Email', async () => {
    const call = async () => await AuthService.forget('invaliduser@email.com')
    await expect(call()).rejects.toThrow('Email not found. Please create an account instead.')
})
