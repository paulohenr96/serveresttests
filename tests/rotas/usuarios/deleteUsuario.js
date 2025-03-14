import { htmlReport } from "../../../utils/report.js";
import { optionsConfig } from '../../../utils/testConfig.js';
import { UserService } from '../../../services/usuarioService.js';
import { sleep } from "k6";
const testType = __ENV.TEST_TYPE || 'outro';



const userService=new UserService();
// Relatório
export function handleSummary(data) {

  return {
    [`reports/${testType}/usuarios_delete_sucesso.html`]: htmlReport(data, { title: "DELETA USUARIO : " + testType }),
  };
}


export const options = optionsConfig;



export default function () {

  const user=userService.cadastraUsuario();
    
  const id = user._id;
  
  
  userService.deletarUsuario(id)
  sleep(1);
}

