import UsersService from "#root/adapters/UsersService";

const createUserResolver = async (obj, { email, password }, context) => {
    console.log("resolver em: " + email + " pass: " + password);
    const userSession = await UsersService.createUserSession({ email, password });

    context.res.cookie("userSessionId", userSession.id, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });
    return userSession;
};

export default createUserResolver;