//lib imports
import firebaseAdmin from 'firebase-admin';
import { ref, set, child, get, remove } from "firebase/database";
import { createRequire } from 'module';

//local imports
const require = createRequire(import.meta.url);
const credentials = require("../masterlockAccountServiceKey.json");


export default class FirebaseAdminFactory{
    constructor(){
        try {
            if(firebaseAdmin.apps.length == 0){
                this.admin =  firebaseAdmin.initializeApp({
                    credential: firebaseAdmin.credential.cert(credentials),
                    databaseURL: "DATABASE_URL"
                });
                this.database = this.admin.database();
            }   
        } catch (error) {
            console.log(error);
        }
       
    }

    async cadastrarUsuario(user, password){
        console.log(user);
        const informacoesRegistroUsuario = await firebaseAdmin.auth().createUser({
            email: user.Email,
            password: password,
            emailVerified:false,
            disabled:false
        })

        return informacoesRegistroUsuario;
    }

    async writeData(route, obj) { 
        await set(ref(firebaseAdmin.database(), route), obj ).then(()=>{
            console.log("Sucesso ao gravar dados");
        }).catch((error)=>{
            console.log("Erro ao gravar dados: "+error);
        });
    }

    async getData(route){

        let data = null; 

        await get(child(ref(firebaseAdmin.database()), route))
        .then(async (snapshot) => {
            if (snapshot.exists()) {
                data = await snapshot.exportVal();
            } else {
                console.log("Dados indisponíveis");
            }
        }).catch((error) => {
            console.error(error);
        });

        return data
    }

    async deleteData(route){
        await remove(ref(firebaseAdmin.database(), route)).then(()=>{
            console.log("Sucesso ao excluir dados");
        }).catch((error)=>{
            console.log("Erro ao excluir dados: "+error);
        });
    }

}







