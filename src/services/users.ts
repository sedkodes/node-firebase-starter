import { User } from "../types/types"
import db from "../utils/db";

// They already exist at this point in Firebase Auth, need to create
// record in Firebase Database in order to add business logic
export async function createUser(req, res, next){

    // Get user info
    const userId = req.user.user_id

    let user: User = {
        id: userId,
        name: req.body.name,
        email: req.user.email,
        roles: []
    }

    // Set the document ID to their authentication system UID
    await db.users.doc(userId).create(user)
    
    // Send OK
    res.json({ result: `ok` });
}

export async function getUser(req, res, next){    
    let user: User = await getUserByUserId(req.user.user_id)
    if (!user) {
        res.status(500).send("Error finding user.")
        return
    }

    res.json(user)
}

// Get all users in the system.
export async function getAllusers(): Promise<User[]> {
    
    const usersRefSnapshot = await db.users.get()
    if (!usersRefSnapshot) {
        console.info('No users found.');
        return [];
    }  

    let users: User[] = []
    usersRefSnapshot.forEach(doc => {
        // Typescript workaround
        const user: any = {
            id: undefined,
            name: undefined,
            email: undefined,
            ...doc.data(),
        }
        users.push(user)
    });

    return users;
}

export async function getUserByUserId(userId: string): Promise<User> {
    let userDoc = await db.users.doc(userId).get()

    if (!userDoc.exists) {
        console.error('No such document!');
        return null
    }

    return userDoc.data()
}

// Only updates fields that are provided
export async function patchUser(userId: string, userObject: any) {
    await db.users.doc(userId).update(userObject) 
}