import { group, sleep } from 'k6';
import { htmlReport } from "../../../utils/report.js";
import { optionsConfig } from '../../../utils/testConfig.js';
import { ProductService } from '../../../services/productService.js';
import { UserService } from '../../../services/usuarioService.js';
import { LoginService } from '../../../services/loginService.js';

const testType = __ENV.TEST_TYPE || 'outro';

export function handleSummary(data) {

  return {
    [`reports/${testType}/produtos_delete_sucesso.html`]: htmlReport(data, { title: "DELETA PRODUTO : " + testType, enableColors: true }),




  };
}




const productService = new ProductService();
const userService=new UserService();
const loginService=new LoginService();
export const options = optionsConfig;


export function setup() {

  const userLogado= userService.cadastraUsuario();
  const token = loginService.realizarLogin(userLogado.email, userLogado.password);

  const id=userLogado._id;
  return {token,id };

}



export default function (data) {
  let prod;
  group("Cadastrando o produto ", function () {
    prod = productService.cadastrarProduto(data.token)

  })
  sleep(1);
  group("Removendo produto ", function () {
    productService.deletarProduto(data.token, prod._id);

  })

}

export function teardown(data) {


  userService.deletarUsuario(data.id);
  
}
