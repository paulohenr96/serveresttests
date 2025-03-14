import { sleep } from 'k6';
import { htmlReport } from "../../../utils/report.js";
import { optionsConfig } from '../../../utils/testConfig.js';
import { ProductService } from '../../../services/productService.js';
const testType = __ENV.TEST_TYPE || 'outro';



// Relatório
export function handleSummary(data) {

  return {
    [`reports/${testType}/produtos_get_sucesso.html`]: htmlReport(data, { title: "BUSCA PRODUTO : " + testType }),
  };
}


const productService = new ProductService();


export const options = optionsConfig;

export default function () {
  productService.getProdutos();
  sleep(1);
}

