export const MESSAGES = {
    ERROR_MESSAGES: {
        INVALID_EMAIL_FORMAT: "Invalid Email format.",
        INVALID_USERNAME_FORMAT: "Username not as per standards.",
        INVALID_PASSWORD_STANDARD: "Password must be at least 8 characters long and include at least one letter, one number, and one special character.",
        MISSING_AUTHENTICATION_TOKEN: "Authentication token is missing.",
        INVALID_AUTH_TOKEN: "Invalid authentication token.",
        REGISTER_USER_ERROR: "Error in registering the user.",
        INVALID_LOGIN_CREDENTIALS: "Invalid login credentials.",
        LOGIN_USER_ERROR: "Error logging in the user. Verify Credentials.",
        FETCH_USER_ERROR: "Error in fetching the user.",
        EMAIL_ALREADY_EXIST: "Email already exists."
    },
    REGEX: {
        PASSWORD_REGEX: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    },
    TRACING: {
        CONTROLLER: {
            REGISTER_USER: "Entering the register controller.",
            REGISTER_USER_EXIT: "Exiting the register controller.",
            LOGIN_USER: "Entering the login controller.",
            GET_ALL_USERS: "Entering the getAllUser controller."
        },
        SERVICE: {
            REGISTER_USER: "Entering the register service.",
            REGISTER_USER_EXIT: "Exiting the register service.",
            LOGIN_USER: "Entering the login service.",
            LOGIN_USER_EXIT: "Exiting the login service.",
            GET_ALL_USERS: "Entering the getAllUser service.",
            GET_ALL_USERS_EXIT: "Exiting the getAllUser service."
        }
    },
    SUCCESS_MESSAGES: {
        REGISTER_USER: "User registered successfully.",
        LOGIN_USER: "User logged in successfully.",
        GET_ALL_USERS: "Fetched users successfully."
    }
}