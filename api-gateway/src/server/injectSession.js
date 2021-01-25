import UsersService from "#root/adapters/UsersService";

const injectSession = async (req, res, next) => {
    if (req.cookies.userSessionId) {
        console.log(" injectSession req.cookies.userSessionId " + req.cookies.userSessionId)
        try {
            const userSession = await UsersService.fetchUserSession({
                sessionId: req.cookies.userSessionId
            });
            res.locals.userSession = userSession;
        } catch (e) {
            return next(e);
        }
    }

    return next();
};

export default injectSession;