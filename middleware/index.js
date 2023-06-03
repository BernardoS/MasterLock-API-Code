
import FirebaseAdminFactory from '../factories/firebaseAdminFactory.js';

const firebaseAdminFactory = new FirebaseAdminFactory();

class Middleware{
    async decodeToken(req,res,next){
        const token  = req.headers.authorization.split(' ')[1];

        try {
            const decodeValue = await firebaseAdminFactory.auth().verifyIdToken(token);

            console.log(decodeValue);

            if(decodeValue){
                return next();
            }

            return res.json({message:"Não autorizado!"})
        } catch (error) {
            return res.json({message:"Erro:"+error});
        }

      
    }
}

export default new Middleware();