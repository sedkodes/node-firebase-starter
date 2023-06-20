import { firestore } from "firebase-admin"
import { User, DatabaseUrls } from '../types/types';

// Provides intellisense via Type Inference
// https://medium.com/swlh/using-firestore-with-typescript-65bd2a602945
const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as T
})
const dataPoint = <T>(collectionPath: string) => firestore().collection(collectionPath).withConverter(converter<T>())


const db = {
  users: dataPoint<User>(DatabaseUrls.USERS)
}

export { db }
export default db