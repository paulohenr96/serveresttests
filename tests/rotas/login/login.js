import { sleep } from 'k6';
import { htmlReport } from "../../../utils/report.js";
import { optionsConfig } from '../../../utils/testConfig.js';
import { UserService } from '../../../services/usuarioService.js';
import { LoginService } from '../../../services/loginService.js';





//O relatório vai ser salvo na pasta referente ao tipo de teste

const testType = __ENV.TEST_TYPE || 'outro';

export function handleSummary(data) {
  return {
    [`reports/${testType}/login.html`]: 
    htmlReport(data,
      {title: "SER-132 : "+testType}),
  };
}





export const options = optionsConfig;



const userService=new UserService();
const loginService=new LoginService();

export function setup (){  
  const user = userService.cadastraUsuario();


  return {user};

}

export default function (data) {
  const user=data.user;
  loginService.realizarLogin(user.email,user.password);
  sleep(1);
}
export function teardown(data){
  const user=data.user;
  userService.deletarUsuario(user._id);
}

