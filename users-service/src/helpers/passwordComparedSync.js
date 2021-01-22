import bcrypt from "bcryptjs";

const passwordComparedSync = async (passwordToTest, passwordHash) => {
    return bcrypt.compare(passwordToTest, passwordHash);
}

export default passwordComparedSync;