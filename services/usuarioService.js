import {  sleep } from "k6";
import { DataGenerator } from "../data/dynamic/dataGenerator.js";
import { BaseChecks } from "../support/base/baseChecks.js";
import { ENDPOINTS, MENSAGENS, URL_API } from "../utils/constantes.js";
import { BaseRest } from "./baseRest.js";
import { atualizaMetricas } from "../utils/testConfig.js";



const baseChecks = new BaseChecks();
const baseRest = new BaseRest(URL_API);

export class UserService {


    cadastraUsuario(user=DataGenerator.usuario()) {


        const response = baseRest.post(ENDPOINTS.USUARIOS, user)

        baseChecks.checkStatusCode(response, 201);
        baseChecks.checkMessage(response, MENSAGENS.USUARIOS_POST_SUCESSO);
        baseChecks.checkField(response, '_id');

        atualizaMetricas(response);

        user._id = response.json()._id;
        
        return (user);


    }


    deletarUsuario(id) {





        const response = baseRest.delete(`${ENDPOINTS.USUARIOS}/${id}`);

        atualizaMetricas(response);

        baseChecks.checkMessage(response, MENSAGENS.USUARIOS_DELETE_SUCESSO)
        baseChecks.checkStatusCode(response, 200)

    }





    getUsuarios() {


        let response = baseRest.get(ENDPOINTS.USUARIOS);

        atualizaMetricas(response)



        baseChecks.checkStatusCode(response, 200);
        sleep(1);

        return response.json().usuarios;




    }

}