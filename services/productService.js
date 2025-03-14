import { DataGenerator } from "../data/dynamic/dataGenerator.js";
import { BaseChecks } from "../support/base/baseChecks.js";
import { ENDPOINTS, MENSAGENS, URL_API } from "../utils/constantes.js";
import { BaseRest } from "./baseRest.js";
import { atualizaMetricas } from "../utils/testConfig.js";

import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';


const baseChecks = new BaseChecks();
const baseRest = new BaseRest(URL_API);

export class ProductService {


    cadastrarProduto(token,produto=DataGenerator.produto()) {

        const headers = {
            'Authorization': token
        }
        
        const response = baseRest.post(ENDPOINTS.PRODUTOS, produto, headers);
        
        baseChecks.checkStatusCode(response, 201);
        baseChecks.checkMessage(response, MENSAGENS.PRODUTOS_POST_SUCESSO);
        baseChecks.checkField(response, '_id');
       
        if (response.status !== 201){
            console.log(response);
        }

        atualizaMetricas(response);
        produto._id = response.json()._id;

        return produto;
    }



    deletarProduto(token, id) {
        const headers = {
            'Authorization': token
        }


        const response = baseRest.delete(`${ENDPOINTS.PRODUTOS}/${id}`, headers);
        atualizaMetricas(response);
        baseChecks.checkStatusCode(response, 200);
        baseChecks.checkMessage(response, MENSAGENS.PRODUTOS_DELETE_SUCESSO);
    
    }


    editarProduto(produto, token) {
        const headers = { 'Authorization': token }
        produto.nome = faker.commerce.productName();
        const id = produto._id;
        delete produto._id;
        const response = baseRest.put(ENDPOINTS.PRODUTOS + "/" + id, produto, headers);
        atualizaMetricas(response)
        baseChecks.checkStatusCode(response, 200);
        baseChecks.checkMessage(response, MENSAGENS.PRODUTOS_PUT_SUCESSO);
    }

    

    getProdutos() {
        let response =baseRest.get(ENDPOINTS.PRODUTOS);
        
        atualizaMetricas(response)

        baseChecks.checkStatusCode(response,200);
        baseChecks.checkField(response,'quantidade');
        baseChecks.checkField(response,'produtos');

        return response.json().produtos;
    }


}