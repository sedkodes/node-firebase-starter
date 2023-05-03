import { DatabaseUrls, User } from "./types"
import * as admin from 'firebase-admin';

// They already exist at this point in Firebase Auth, need to create
// record in Firebase Database in order to add business logic
exports.createUser = async (req, res, next) => {

    // Get user info
    const userId = req.user.user_id

    let user: User = {
        id: userId,
        name: req.body.name,
        email: req.user.email,
        roles: []
    }

    // Set the document ID to their authentication system UID
    var newTransactionRecord = admin.firestore().collection(DatabaseUrls.USERS).doc(userId)

    try {    
        // Add the new order transaction into Database
        await newTransactionRecord.create(user);
    } catch (e) {
        console.error("Error creating user: ", e)
        res.status(500).send("Error creating user.")
        return
    }
    
    // Send OK
    res.json({ result: `ok` });
}

exports.getUser = async (req, res, next) => {    
    let user: User = await getUserByUserId(req.user.user_id)
    if (!user) {
        res.status(500).send("Error finding user.")
        return
    }

    res.json(user)
}

// Get all users in the system.
export async function getAllusers(): Promise<User[]> {
    
    const usersRefSnapshot = await admin.firestore().collection(DatabaseUrls.USERS).get()
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
    let userDoc = await admin.firestore()
        .collection(DatabaseUrls.USERS)
        .doc(userId)
        .get()

    if (!userDoc.exists) {
        console.error('No such document!');
        return null
    }

    // Typescript workaround
    const user: User = {
        id: undefined,
        name: undefined,
        email: undefined,
        roles: [],
        ...userDoc.data(),
    }

    return user
}

// Only updates fields that are provided
export async function patchUser(userId: string, userObject: any) {
    await admin.firestore()
    .collection(DatabaseUrls.USERS)
    .doc(userId)
    .update(userObject) 
}