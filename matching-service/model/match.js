import { DataTypes } from "sequelize";
import sequelize from "./repository.js";

// create model for pending match, with attributes like difficulty
const Match = sequelize.define("Match", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: DataTypes.STRING,
  difficulty: DataTypes.STRING,
  socketID: DataTypes.CHAR(20),
});

export default Match;
