import { BaseChecks } from "../support/base/baseChecks.js";
import { ENDPOINTS, MENSAGENS, URL_API } from "../utils/constantes.js";
import { BaseRest } from "./baseRest.js";
import { atualizaMetricas } from "../utils/testConfig.js";



const baseChecks = new BaseChecks();
const baseRest = new BaseRest(URL_API);

export class CarrinhoService {


    cadastrarCarrinho(token, carrinho) {

        const headers = { "authorization": token };
        const response = baseRest.post(ENDPOINTS.CARRINHOS, carrinho, headers)

        baseChecks.checkStatusCode(response, 201);
        baseChecks.checkMessage(response, MENSAGENS.CARRINHO_CADASTRADO);
        atualizaMetricas(response);




    }

    buscarCarrinho() {
        baseRest.get(ENDPOINTS.CARRINHOS)

    }
    cancelarCompra(token) {
        const headers = { "authorization": token };
        baseRest.delete(`${ENDPOINTS.CARRINHOS}/cancelar-compra`, headers)

    }
    concluirCompra(token) {



        const headers = { "authorization": token };


        const response = baseRest.delete(`${ENDPOINTS.CARRINHOS}/concluir-compra`, headers);

        atualizaMetricas(response);
        baseChecks.checkStatusCode(response, 200);
        baseChecks.checkMessage(response, MENSAGENS.CARRINHO_EXCLUIDO);
    }

}