import { group, sleep } from 'k6';
import { htmlReport } from "../../../utils/report.js";
import { optionsConfig } from '../../../utils/testConfig.js';

import { ProductService } from '../../../services/productService.js';
import { UserService } from '../../../services/usuarioService.js';
import { LoginService } from '../../../services/loginService.js';


//O relatório vai ser salvo na pasta referente ao tipo de teste

const testType = __ENV.TEST_TYPE || 'outro';

export function handleSummary(data) {
  return {
    [`reports/${testType}/produtos_post_sucesso.html`]:
      htmlReport(data, { title: "CADASTRA PRODUTO : " + testType }),
  };
}


export const options = optionsConfig;


const productService = new ProductService();
const userService = new UserService();
const loginService=new LoginService();

export function setup() {
  const user= userService.cadastraUsuario();
 
  return { user }
}

export default function (data) {
  let user=data.user;
  let token;
  group("Efetuar login ", function () { 
     token = loginService.realizarLogin(user.email,user.password);

  })



  sleep(1);
  group("Cadastrando produto ", function () {

    productService.cadastrarProduto(token);
  })

}


export function teardown(data) {
  let user=data.user;
  let token = loginService.realizarLogin(user.email,user.password);


  const produtosCadastrados=productService.getProdutos();
  
  produtosCadastrados
    .forEach(p => productService.deletarProduto(token,p._id));
 
  userService.deletarUsuario(user._id);
}
