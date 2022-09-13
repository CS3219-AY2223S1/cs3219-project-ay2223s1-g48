import { createUser, checkUserName, updateUser, checkUserAccount, deleteUser } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    try {
        const exists = await checkUserName(username);
        if(!exists) {
            const newUser = await createUser({username, password});
            newUser.save();
            return true;
        } else {
            const err = new Error('ERROR: UserName already exists');
            console.log(err.message);
            throw err;
        }
    } catch (err) {
        console.log('ERROR: Could not create new user');
        return { err };
    }
}

export async function ormPatchUser(username, password, newPassword) {
    try {
        const match = await checkUserAccount(username, password);
        if(match) {
            const updatedUser = await updateUser(username, password ,newPassword);
            updatedUser.save();
            return true;
        } else {
            const err = new Error('ERROR: Account does not exist/username and/or password is incorrect');
            console.log(err.message);
            throw err;
        }
    } catch (err) {
        console.log('ERROR: could not update password');
        return { err };
    }
}

export async function ormDeleteUser(username, password) {
    try {
        const match = await checkUserAccount(username, password)
        if(match) {
            await deleteUser(username, password);
            return true;
        } else {
            const err = new Error('ERROR: Account does not exist/username and/or password is incorrect');
            console.log(err.message);
            throw err;
        }
    } catch (err) {
        console.log('ERROR: could not delete User');
        return { err }
    }
}
