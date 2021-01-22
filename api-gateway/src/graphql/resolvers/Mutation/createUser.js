import UsersService from "#root/adapters/UsersService";

const createUserResolver = async (obj, { email, password }) => {
    console.log("resolver em: " + email + " pass: " + password);
    return await UsersService.createUser({ email, password });
};

export default createUserResolver;