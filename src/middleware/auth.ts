import * as admin from 'firebase-admin';


const getAuthToken = (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        req.authToken = req.headers.authorization.split(' ')[1];
    } else {
        req.authToken = null;
    }
    next();
};


export const isAuthenticated = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            // console.log(authToken)

            const userInfo = await admin
                .auth()
                .verifyIdToken(authToken);

            // console.log(userInfo) 
            // {
            //   iss: 'https://securetoken.google.com/bitsave-5783c',
            //   aud: 'bitsave-5783c',
            //   auth_time: 1650735935,
            //   user_id: 'xwybn4SQD4NLz6xuO9LDqdgMO802',
            //   sub: 'xwybn4SQD4NLz6xuO9LDqdgMO802',
            //   iat: 1650735935,
            //   exp: 1650739535,
            //   email: 'test@test.com',
            //   email_verified: false,
            //   firebase: { identities: { email: [Array] }, sign_in_provider: 'password' },
            //   uid: 'xwybn4SQD4NLz6xuO9LDqdgMO802'
            // }

            req.user = userInfo
            
            return next();
        } catch (e) {
            console.error(e)
            return res
                .status(401)
                .send({ error: 'You are not authorized to make this request' });
        }
    });
};


export const isAdminAuthenticated = (req, res, next) => {
    getAuthToken(req, res, async () => {
        const { authToken } = req;
            if (authToken == process.env.SECRET) {
                return next();
            }   

            console.warn("someone is doing funky shit with auth token: ", authToken)

            return res
                .status(401)
                .send({ error: 'You are not authorized to make this request' });
    });
};