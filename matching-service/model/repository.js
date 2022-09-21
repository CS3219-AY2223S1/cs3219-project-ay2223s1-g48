import { Sequelize } from "sequelize";

// connection with the database
const sequelize = new Sequelize("sqlite::memory:");

export default sequelize;
