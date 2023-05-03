import { CronJobItem, CronjobType, DatabaseUrls, User } from "./types"
import * as users from "./users"
import * as admin from 'firebase-admin';
import { dateObjectToYYYYMMDD } from "./helpers";

// Start Cronjob 
exports.createCronjob = async (req, res, next) => {
    console.info(`Cronjob ${req.body.type} started!`)
    var date = req.body.date ? req.body.date : dateObjectToYYYYMMDD(new Date())
    console.info(req.body.date ? `'date' supplied, using '${req.body.date}'` : `'date' not supplied, using today's date: ${new Date()}`)

    // Switch on job type
    if (req.body.type == CronjobType.EXECUTE_DEPOSITS) {
        executeWeeklyRoundupDeposit(date, req, res)
        res.json({ result: `ok` });
        return
    }
    
    console.info(`Given 'type' ${req.body.type} not supported`)
    res.status(400).send(`given 'type' not supported.`)
    return
}

// Execute deposits for all users, moving fundings from their banks to their individual Alpaca wallets
//
// Idempotent function, ie can be run infinite times without state change due to status checks
async function executeWeeklyRoundupDeposit(date, req, res) {

    // Get all OPEN scheduled deposits for a date
    let depositRefs = admin.firestore()
        .collection(DatabaseUrls.CRONJOBS)
        .doc(DatabaseUrls.CRONJOBS_DEPOSITS)
        .collection(date)

    // Get All users
    const depositSnapshots = await depositRefs.get()
    if (depositSnapshots.empty) {
        console.info('No deposits found.');
        return
    }

    // Execute each deposit for each user
    depositSnapshots.forEach(async (doc) => {
        
        let deposit: CronJobItem = {
            status: doc.data().status,
            userId: doc.data().userId,
            amount: doc.data().amount
        }

        // Get user ID
        const user: User = await users.getUserByUserId(deposit.userId)

        // Business Logic
        console.log(user)
    })

    console.info(`Cronjob ${req.body.type} finished!`)
    return
}
