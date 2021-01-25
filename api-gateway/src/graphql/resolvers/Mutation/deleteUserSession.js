import UsersService from "#root/adapters/UsersService";

const deleteUserResolver = async (obj, { sessionId }, context) => {
    console.log("resolver sessionId: " + sessionId);
    await UsersService.deleteUserSession({ sessionId });

    const result = context.res.clearCookie("userSessionId");
    console.log("resultado borrado cookie: " + result);
    return true;
};

export default deleteUserResolver;