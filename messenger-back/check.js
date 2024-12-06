export const isPasswordStrong = (password) => {
    const criteria = {
        minLength: 10,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const isStrong = password.length >= criteria.minLength &&
        criteria.hasUppercase &&
        criteria.hasLowercase &&
        criteria.hasNumber &&
        criteria.hasSpecialChar;

    return isStrong;
}

export const isEmpty = (string) => {
    return string.trim().length == 0
}

