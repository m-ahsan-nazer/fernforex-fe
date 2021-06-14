import {be} from "/config/config.js";

/*
Only needs to be changed here when swapping between localStorage-sessionStorage
If this get's executed on the server side then it will break hence the check.
R/W operations will work as long as they are on pages where they are triggered 
after rendering. Have to disable server side rendering otherwise.
*/
const storage = 'localStorage';

function saveUserInfoToStorage(user, tokens){
    switch(storage){
        case 'localStorage':
            window.localStorage.setItem('user', JSON.stringify(user));
            window.localStorage.setItem('tokens', JSON.stringify(tokens));
            break;

        case 'sessionStorage':
            window.sessionStorage.setItem('user', JSON.stringify(user));
            window.sessionStorage.setItem('tokens', JSON.stringify(tokens));
            break;
    }

    return
}

function readUserInfoFromStorage( ){
    let tokens;
    let user; 
    switch(storage){
        case 'localStorage':
            tokens = JSON.parse(window.localStorage.getItem('tokens'));
            user = JSON.parse(window.localStorage.getItem('user'));
            return {user: user, tokens: tokens};

        case 'sessionStorage':
            tokens = JSON.parse(window.sessionStorage.getItem('tokens'));
            user = JSON.parse(window.sessionStorage.getItem('user'));
            return {user: user, tokens: tokens};
    }
}

function deleteUserInfoFromStorage( ){
    switch(storage){
        case 'localStorage':
            window.localStorage.removeItem('tokens');
            window.localStorage.removeItem('user');
            break;
        case 'sessionStorage':
            window.sessionStorage.removeItem('tokens');
            window.sessionStorage.removeItem('user');
            break;
    }

    return 
}

class User {
    constructor(user, tokens){
        this.user = user;
        this.tokens = tokens;
    }

    static async login(email, password){
        const body = {
            email: email,
            password: password,
        };
        
        const res = await fetch(
            be.auth.login,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }
        );
        return res;
    }

    static async logout(refreshToken){
        const body = {
            refreshToken: refreshToken,
        };

        const res = await fetch(
            be.auth.logout,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }
        );

        return res;
    }

    static async register(name, email, password){
        const body = {
            name: name,
            email: email,
            password: password,
        };
        
        const res = await fetch(
            be.auth.register,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }
        );

        return res;
    }

    static async contact(email, message, messageTitle, name){
        const body = {
            email: email,
            message: message,
            messageTitle: messageTitle,
            name: name,
        };
        
        const res = await fetch(
            be.auth.contact,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }
        );

        return res;
    }

    static async getResetPasswordEmail(email){
        const body = {
            email: email,
        };
        
        const res = await fetch(
            be.auth.forgotPassword,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }
        );

        return res;
    }

    static async resetPassword(password, token){
        const body = {
            password: password,
        };
        
        const res = await fetch(
            be.auth.resetPassword.replace("tokenValue", token),
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }
        );

        return res;
    }

    static async verifyEmail(token){
        const res = await fetch(
            be.auth.verifyEmail.replace("tokenValue", token),
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
            }
        );

        return res;
    }

    async refreshToken(){
        // const {user, tokens } = readUserInfoFromStorage();
        const body = {
            "refreshToken": this.tokens.refresh.token,
        };
        try{
            const res = await fetch(
                be.auth.refresh,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify(body),
                }
            );
            if (res.status === 200){
                const tokens = await res.json();
                this.tokens = tokens;
                saveUserInfoToStorage(this.user, this.tokens);
            }
        }catch(err){
            console.log("unexpected errors.");
        }
    }
    async getUserInfo(){
        const res = await fetch(
            be.users.getUser.replace("userId", this.user.id),
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.tokens.access.token,
                },
            }
        );
        return res;
    }

    async updateUserInfo(body){
        const accessEndTime = new Date(this.tokens.access.expires);
        if (Date.now() > accessEndTime.getTime()){
            await this.refreshToken();
        }
        const res = await fetch(
            be.users.patchUser.replace("userId", this.user.id),
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.tokens.access.token,
                },
                body: JSON.stringify(body),
            }
        );
        return res;
    }

    async getUserOrders(){
        const accessEndTime = new Date(this.tokens.access.expires);
        if (Date.now() > accessEndTime.getTime()){
            await this.refreshToken();
        }
       const res = await fetch(
           be.orders.getOrders.replace("userId", this.user.id),
           {
               method: 'GET',
               headers: {
                   'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.tokens.access.token,
                },
            }
       );
       return res;
    }

    async getUserOrder(orderId){
        const accessEndTime = new Date(this.tokens.access.expires);
        if (Date.now() > accessEndTime.getTime()){
            await this.refreshToken();
        }
       const res = await fetch(
           be.orders.getOrder.replace("userId", this.user.id).replace("orderId", orderId),
           {
               method: 'GET',
               headers: {
                   'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.tokens.access.token,
                },
            }
       );
       return res;
    }

    async updateUserOrder(orderId, orderBody){
        const accessEndTime = new Date(this.tokens.access.expires);
        if (Date.now() > accessEndTime.getTime()){
            await this.refreshToken();
        }
       const res = await fetch(
           be.orders.patchOrder.replace("userId", this.user.id).replace("orderId", orderId),
           {
               method: 'PATCH',
               headers: {
                   'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.tokens.access.token,
                },
                body: JSON.stringify(orderBody),
            }
       );
       return res;
    }

    async createUserOrder(orderBody){
        const accessEndTime = new Date(this.tokens.access.expires);
        if (Date.now() > accessEndTime.getTime()){
            await this.refreshToken();
        }
       const res = await fetch(
           be.orders.postOrder.replace("userId", this.user.id),
           {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.tokens.access.token,
                },
                body: JSON.stringify(orderBody),
            }
       );
       return res;
    }

    async findOrderMatches(orderId){
        const accessEndTime = new Date(this.tokens.access.expires);
        if (Date.now() > accessEndTime.getTime()){
            await this.refreshToken();
        }
       const res = await fetch(
           be.orders.matches.replace("userId", this.user.id).replace("orderId", orderId),
           {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.tokens.access.token,
                },
            }
       );
       return res;
    }
}

export {saveUserInfoToStorage, readUserInfoFromStorage, deleteUserInfoFromStorage};
export default User;