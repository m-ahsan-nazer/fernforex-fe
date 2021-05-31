const {serverip} = require("./serverip.js");

export const be ={
    //end points
    auth: {
        // login: 'http://localhost:3001/v1/auth/login',
        forgotPassword: 'http://'+serverip+"/v1/auth/forgot-password",
        login: 'http://'+serverip+"/v1/auth/login",
        logout: 'http://'+serverip+"/v1/auth/logout",
        register: 'http://'+serverip+"/v1/auth/register",
        resetPassword: 'http://'+serverip+"/v1/auth/reset-password",
        sendVerificationEmail: 'http://'+serverip+"/v1/auth/send-verification-email",
        verifyEmail: 'http://'+serverip+"/v1/auth/verify-email",
    },

    users: {
        users: 'http://'+serverip+"/v1/users",
    }
}