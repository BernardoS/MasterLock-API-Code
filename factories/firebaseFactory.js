import dotenv from 'dotenv';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get, remove } from "firebase/database";


export default class FirebaseFactory{

    constructor(){

        dotenv.config();

        const firebaseConfig = {
            apiKey: process.env.API_KEY,
            authDomain: process.env.AUTH_DOMAIN,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
            messagingSenderId: process.env.MESSAGING_SENDER_ID,
            appId: process.env.APP_ID,
            measurementId: process.env.MEASUREMENT_ID
        };
        
        this.firebaseApp = initializeApp(firebaseConfig);
        
        this.database = getDatabase(this.firebaseApp);
    }

    async writeData(route, obj) { 
        await set(ref(this.database, route), obj ).then(()=>{
            console.log("Sucesso ao gravar dados");
        }).catch((error)=>{
            console.log("Erro ao gravar dados: "+error);
        });
    }

    async getData(route){

        let data = null; 

        await get(child(ref(this.database), route))
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
        await remove(ref(this.database, route)).then(()=>{
            console.log("Sucesso ao excluir dados");
        }).catch((error)=>{
            console.log("Erro ao excluir dados: "+error);
        });
    }

}



