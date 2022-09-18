import {
  createMatch,
  checkExists,
  popLatest,
  checkDifficultyExists,
  popLatestDifficulty,
} from "./repository.js";

// separate orm functions from repository
export async function ormCreateMatch(username, difficulty, socketID) {
  try {
    const newMatch = await createMatch(username, difficulty, socketID);
    return true;
  } catch (err) {
    console.log("ERROR: Could not create new match");
    return { err };
  }
}

export async function ormCheckExists() {
  return await checkExists();
}

export async function ormCheckDifficultyExists(difficulty) {
  return await checkDifficultyExists(difficulty);
}

export async function ormPopLatest() {
  return await popLatest();
}

export async function ormPopLatestDifficulty(difficulty) {
  return await popLatestDifficulty(difficulty);
}
