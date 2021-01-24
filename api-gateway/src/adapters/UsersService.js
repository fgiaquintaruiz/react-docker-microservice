import got from "got";

const USERS_SERVICE_URI = "http://users-service:7101";

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


}