import { group, sleep } from "k6";
import { DataGenerator } from "../data/dynamic/dataGenerator.js";
import { BaseChecks } from "../support/base/baseChecks.js";
import { ENDPOINTS, MENSAGENS, URL_API } from "../utils/constantes.js";
import { BaseRest } from "./baseRest.js";
import { atualizaMetricas } from "../utils/testConfig.js";



const baseChecks = new BaseChecks();
const baseRest = new BaseRest(URL_API);

export class LoginService {


    realizarLogin(email, password) {

        const user = { email, password }

        const response = baseRest.post(ENDPOINTS.LOGIN, user)

        atualizaMetricas(response)
        baseChecks.checkField(response, 'authorization');
        baseChecks.checkMessage(response, MENSAGENS.LOGIN_SUCESSO);
        baseChecks.checkStatusCode(response, 200);


        return response.json().authorization;


    }




}