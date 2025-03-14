import {  sleep } from 'k6';
import { htmlReport } from "../../../utils/report.js";
import {  optionsConfig } from '../../../utils/testConfig.js';
import { ProductService } from '../../../services/productService.js';
import { UserService } from '../../../services/usuarioService.js';
import { LoginService } from '../../../services/loginService.js';
const testType = __ENV.TEST_TYPE || 'outro';

// Relatório
export function handleSummary(data) {


  return {
    [`reports/${testType}/produtos_put_sucesso.html`]:
      htmlReport(data,

        { title: "EDITA PRODUTO : " + testType }),
  };
}



const productService = new ProductService();
const userService=new UserService();
const loginService=new LoginService();
export const options =
  optionsConfig;


export function setup() {
  const user=userService.cadastraUsuario();
  const token = loginService.realizarLogin(user.email, user.password);
  let prod = productService.cadastrarProduto(token)
  return { prod, token,user };
}





export default function (data) {
  sleep(1);

  productService.editarProduto({ ...data.prod }, data.token);

}

export function teardown(data) {
  const token=data.token;
  const productId=data.prod._id;
  const userId=data.user._id;
  
  productService.deletarProduto(token, productId);
  userService.deletarUsuario(userId);
}

