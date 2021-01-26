import got from "got";
import accessEnv from "#root/helpers/accessEnv";

const USERS_SERVICE_URI = accessEnv("USERS_SERVICE_URI");

export default class UsersService {
    
    static async createUser({ email, password }) {
        console.log("UsersService createUser e:" + email + " p:" + password);
        const body = await got.post(USERS_SERVICE_URI + "/users", {
            json: { email, password }
        }).json();
        return body;
    }

    static async fetchUser({ userId }) {
        const body = await got.get(USERS_SERVICE_URI + "/users/" + userId).json();

        console.log("UsersService fetchUser body:" + body.email);
        return body;
    }

    static async createUserSession({ email, password }) {
        console.log("UsersService createUserSession e:" + email + " p:" + password);
        const body = await got.post(USERS_SERVICE_URI + "/sessions", {
            json: { email, password }
        }).json();
        return body;
    }

    static async fetchUserSession({ sessionId }) {
        const body = await got.get(USERS_SERVICE_URI + "/sessions/" + sessionId).json().catch(e => {
            console.log("catch fetchUserSession body: " + e.response.body);
        });

        console.log("UsersService fetchUserSession body:" + body.sessionId);
        return body;
    }

    static async deleteUserSession({ sessionId }) {
        await got.delete(USERS_SERVICE_URI + "/sessions/" + sessionId).json().catch(e => {
            console.log("catch deleteUserSession body: " + e.response.body);
        });

    }
}