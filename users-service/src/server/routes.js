import { User } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";
import hashPassword from "#root/helpers/hashPassword";
import passwordComparedSync from "#root/helpers/passwordComparedSync";
import { addHours } from "date-fns";
import { UserSession } from "#root/db/models";

const USER_SESSION_EXPIRY_HOURS = 1;

const setupRoutes = app => {

    app.post("/sessions", async (req, res, next) => {
        if (!req.body.email || !req.body.password) {
            return next(new Error("Invalid body sessions!"))
        }
        try {
            const user = await User.findOne({
                attributes: {},
                where: {
                    email: req.body.email
                }                
            });

            if (!user) return next(Error("Invalid email!"))

            console.log("pass: " + req.body.password + " hash:" + user.passwordHash);

            const validatePassword = await passwordComparedSync(req.body.password, user.passwordHash);
            if (!validatePassword){
                return next(Error("Incorrect password!"))
            }            

            const expiresAt = addHours(new Date(), USER_SESSION_EXPIRY_HOURS);
            const sessionToken = generateUUID();

            const userSession = await UserSession.create({
                expiresAt,
                id: sessionToken,
                userId: user.id
            })

            return res.json(userSession);
        } catch (e) {
            return next(e);
        }
    });

    app.post("/users", async (req, res, next) => {
        if (!req.body.email || !req.body.password) {
            return next(new Error("Invalid body!"))
        }
        try {
            const passwordHash = await hashPassword(req.body.password);
            console.log("password hash: " + passwordHash);

            const newUser = await User.create({
                email: req.body.email,
                id: generateUUID(),
                passwordHash: passwordHash
            });

            return res.json(newUser);
        } catch (e) {
            return next(e);
        }
    });
}

export default setupRoutes;