const {serverip, protocol} = require("./serverip.js");

export const be ={
    //end points
    auth: {
        contact: protocol+serverip+"/v1/auth/contact",
        forgotPassword: protocol+serverip+"/v1/auth/forgot-password",
        login: protocol+serverip+"/v1/auth/login",
        logout: protocol+serverip+"/v1/auth/logout",
        refresh: protocol+serverip+"/v1/auth/refresh-tokens",
        register: protocol+serverip+"/v1/auth/register",
        resetPassword: protocol+serverip+"/v1/auth/reset-password?token=tokenValue",
        sendVerificationEmail: protocol+serverip+"/v1/auth/send-verification-email",
        verifyEmail: protocol+serverip+"/v1/auth/verify-email?token=tokenValue",
    },

    users: {
        getUser: protocol+serverip+"/v1/users/userId",
        patchUser: protocol+serverip+"/v1/users/userId",
    },

    orders: {
        postOrder: protocol+serverip+"/v1/users/orders/userId",
        getOrders: protocol+serverip+"/v1/users/orders/userId",
        getOrder: protocol+serverip+"/v1/users/orders/userId/orderId",
        patchOrder: protocol+serverip+"/v1/users/orders/userId/orderId",
        matches: protocol+serverip+"/v1/users/orders/matches/userId/orderId",
    }
}

export const siteTitle = "FernForex";
export const titleTemplate = "%s | " + siteTitle;
export const siteUrl = protocol+serverip;