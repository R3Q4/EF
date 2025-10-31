import React from 'react'

// Utility to check password conditions
export const checkPasswordConditions = (password) => {
    const checks = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /\d/.test(password),
        symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    const score = Object.values(checks).filter(Boolean).length
    return { checks, score }
}



const getStrengthColor = (score) => {
    if (score <= 2) return 'bg-red-500'
    if (score === 3 || score === 4) return 'bg-yellow-400'
    if (score === 5) return 'bg-green-500'
    return 'bg-gray-300'
}



const checkPass = ({ password }) => {
    if (!password) return null

    const { checks, score } = checkPasswordConditions(password)

    const rules = [
    { key: 'length', label: 'At least 8 characters' },
    { key: 'lowercase', label: 'At least one lowercase letter' },
    { key: 'uppercase', label: 'At least one uppercase letter' },
    { key: 'number', label: 'At least one number' },
    { key: 'symbol', label: 'At least one symbol (!@#$%^&* etc.)' },
    ]

    return (
        <div className="mt-2 transition">
            <div className='w-full bg-gray-300 h-3 rounded'>
                <div
                    className={`h-3 rounded ${getStrengthColor(score)}`}
                    style={{ width: `${(score / 5) * 100}%` }}
                ></div>
            </div>

            <p className='mt-1 text-sm text-gray-700'>
                {score <= 2 && 'Weak'}
                {(score === 3 || score === 4) && 'Medium'}
                {score === 5 && 'Strong'}
            </p>


            <ul className='mt-2 text-sm'>
            {rules.map(rule => (
                <li
                key={rule.key}
                className={`${checks[rule.key] ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}
                >
                <span className="material-symbols-outlined">
                    {checks[rule.key] ? 'check' : 'close'}
                </span>
                {rule.label}
                </li>
            ))}
            </ul>
        </div>
    )
}

export default checkPass
