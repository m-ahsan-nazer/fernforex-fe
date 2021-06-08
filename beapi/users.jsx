import {be} from "/config/config.js";

/*
Only needs to be changed here when swapping between localStorage-sessionStorage
*/
const storage = sessionStorage;

function saveUserInfoToStorage(user, tokens){
    storage.setItem('user', JSON.stringify(user));
    storage.setItem('tokens', JSON.stringify(tokens));

    return
}

function readUserInfoFromStorage( ){
    const tokens = JSON.parse(storage.getItem('tokens'));
    const user = JSON.parse(storage.getItem('user'));

    return {user: user, tokens: tokens};
}

function deleteUserInfoFromStorage( ){
    storage.removeItem('tokens');
    storage.removeItem('user');

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