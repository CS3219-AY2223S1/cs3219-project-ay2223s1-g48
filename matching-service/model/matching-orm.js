import { createMatch, checkEmpty, popLatest } from "./repository.js";

// separate orm functions from repository
export async function ormCreateMatch(username, difficulty) {
  try {
    const newMatch = await createMatch(username, difficulty);
    return true;
  } catch (err) {
    console.log("ERROR: Could not create new match");
    return { err };
  }
}

export async function ormCheckEmpty() {
  return await checkEmpty();
}

export async function ormPopLatest() {
  return await popLatest();
}
