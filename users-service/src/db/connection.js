import { Sequelize} from "sequelize";

import accessEnv from "#root/helpers/accessEnv";

const DB_URI = accessEnv("DB_URI");
const DB_NAME = accessEnv("DB_NAME");

const FULL_DB_URI = DB_URI + "/" + DB_NAME;

const sequelize = new Sequelize(FULL_DB_URI, {
    dialectOptions: {
        charset: "utf8",
        multiplestatements: true
    },
    logging: true
});

export default sequelize;