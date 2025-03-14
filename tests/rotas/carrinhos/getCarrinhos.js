import {   sleep } from 'k6';
import { htmlReport } from "../../../utils/report.js";
import {  optionsConfig } from '../../../utils/testConfig.js';
import { CarrinhoService } from '../../../services/carrinhoService.js';


//O relatório vai ser salvo na pasta referente ao tipo de teste

const testType = __ENV.TEST_TYPE || 'outro';

export function handleSummary(data) {
  return {
    [`reports/${testType}/getCarrinhos.html`]:
      htmlReport(data, { title: "BUSCA CARRINHO : " + testType }),
  };
}


const carrinhoService=new CarrinhoService();



export const options = optionsConfig;
export function setup(){
  
}
export default function () {
  sleep(1);
  carrinhoService.buscarCarrinho();

}




