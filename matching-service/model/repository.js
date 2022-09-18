import { Sequelize, Model, DataTypes } from "sequelize";

// connection with the database
const sequelize = new Sequelize("sqlite::memory:");

// create model for pending match, with attributes like difficulty
const Match = sequelize.define("Match", {
  username: DataTypes.STRING,
  difficulty: DataTypes.STRING,
  socketID: DataTypes.CHAR(20),
});

Match.sync().then(() => {
  console.log("New table Match created");
});

export async function createMatch(uname, diff, sid) {
  await Match.create({
    username: uname,
    difficulty: diff,
    socketID: sid,
  });

  // const matches = await Match.findAll();
  // console.log("All matches:", JSON.stringify(matches, null, 2));
}

export async function checkExists() {
  const match = await Match.findOne();
  //console.log(match);
  if (match === null) {
    //console.log(true);
    return false;
  } else {
    //console.log(false);
    return true;
  }
}

export async function checkDifficultyExists(diff) {
  const match = await Match.findOne({
    where: { difficulty: diff },
  });
  if (match === null) {
    return false;
  } else {
    return true;
  }
}

// relies on timestamp
export async function popLatest() {
  const match = await Match.findOne({
    where: {}, // empty to return all entries
    order: [["createdAt", "ASC"]],
  });

  const curr_username = match.username;
  const curr_difficulty = match.difficulty;
  const curr_socketID = match.socketID;

  match.destroy();

  return curr_socketID;
}

export async function popLatestDifficulty(diff) {
  const match = await Match.findOne({
    where: { difficulty: diff },
    order: [["createdAt", "ASC"]],
  });

  const curr_username = match.username;
  const curr_difficulty = match.difficulty;
  const curr_socketID = match.socketID;

  match.destroy();

  return curr_socketID;
}
