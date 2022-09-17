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
  await Match.create({
    username: uname,
    difficulty: diff,
  });

  // const matches = await Match.findAll();
  // console.log("All matches:", JSON.stringify(matches, null, 2));
}

export async function checkEmpty() {
  const match = await Match.findOne();

  //console.log(match);

  if (!match) {
    //console.log(true);
    return true;
  } else {
    //console.log(false);
    return false;
  }
}

// relies on timestamp
export async function popLatest() {
  const match = await Match.findOne({
    where: {}, // empty to return all entries
    order: [["createdAt", "DESC"]],
  });

  const curr_username = match.username;

  match.destroy();

  return curr_username; // to be socket id?
}
