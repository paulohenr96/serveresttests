import { sleep } from "k6";
import { UserService } from "../../../services/usuarioService.js";
import { htmlReport } from "../../../utils/report.js";
import { optionsConfig } from '../../../utils/testConfig.js';
const testType = __ENV.TEST_TYPE || 'outro';



// Relatório na pasta apropriada
export function handleSummary(data) {
  return {
    [`reports/${testType}/usuarios_get_sucesso.html`]: htmlReport(data,{title: "BUSCA USUARIO : "+testType}),
  };
}


const userService= new UserService();
export const options = optionsConfig;


export default function () {
  userService.getUsuarios();
  sleep(1);
}

