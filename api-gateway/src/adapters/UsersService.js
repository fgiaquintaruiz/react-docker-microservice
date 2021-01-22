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

    static async createUserSession({ email, password }) {
        console.log("UsersService createUserSession e:" + email + " p:" + password);
        const body = await got.post(USERS_SERVICE_URI + "/sessions", {
            json: { email, password }
        }).json();
        return body;
    }
}