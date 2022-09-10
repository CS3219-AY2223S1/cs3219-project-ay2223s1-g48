import { Sequelize, Model, DataTypes } from "sequelize";

// connection with the database
const sequelize = new Sequelize("sqlite::memory:");

// create model for pending match, with attributes like difficulty
const Match = sequelize.define("Match", {
  username: DataTypes.STRING,
  difficulty: DataTypes.STRING,
});

Match.sync().then(() => {
  console.log("New table Match created");
});

export async function createMatch(uname, diff) {
  Match.create({
    username: uname,
    difficulty: diff,
  });

  // const matches = await Match.findAll();
  // console.log("All matches:", JSON.stringify(matches, null, 2));
}
