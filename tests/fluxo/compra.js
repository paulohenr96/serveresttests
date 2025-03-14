import {  group, sleep } from 'k6';
import { htmlReport } from "../../utils/report.js";
import {  optionsConfig } from '../../utils/testConfig.js';
import { ProductService } from '../../services/productService.js';
import { UserService } from '../../services/usuarioService.js';
import { BaseChecks } from '../../support/base/baseChecks.js';
import { LoginService } from '../../services/loginService.js';
import { CarrinhoService } from '../../services/carrinhoService.js';


//O relatório vai ser salvo na pasta referente ao tipo de teste

const testType = __ENV.TEST_TYPE || 'outro';

export function handleSummary(data) {
  return {
    [`reports/${testType}/compra.html`]:
      htmlReport(data, { title: "COMPRA : " + testType }),
  };
}

const productService= new ProductService();
const userService=new UserService();
const loginService=new LoginService();
const carrinhoService=new CarrinhoService();

const baseChecks = new BaseChecks();


export const options = optionsConfig;
export function setup(){
  const user=userService.cadastraUsuario();

  return {user}
}
export default function (data) {
  
  
  let user;
  group ("Cadastrando usuário ",function(){
    
    user = userService.cadastraUsuario();
  })
  sleep(1);
  
  let token;
  group ("Login com usuário novo ",function(){

    token = loginService.realizarLogin(user.email, user.password);
  })
  sleep(1);


  let prodA;  
  group ("Cadastra produto novo",function(){
    prodA=productService.cadastrarProduto(token);
  })

  sleep(1);

 


  group("Cadastrando carrinho",function(){
    const arrProducts = [
      {
        idProduto: prodA._id,
        quantidade: 1
      }
    ]
    const carrinho = ({
      produtos: arrProducts
    });
    carrinhoService.cadastrarCarrinho(token, carrinho);
  })
  sleep(1);

  group("Concluindo compra ",function(){

    carrinhoService.concluirCompra(token);
  })
  sleep(1);

 
}

export function teardown(data){
    let user=data.user;

    let token = loginService.realizarLogin(user.email,user.password);


    let produtosCadastrados=productService.getProdutos();
    
    produtosCadastrados
      .forEach(p=> productService.deletarProduto(token,p._id))

    userService.getUsuarios().forEach(u=>userService.deletarUsuario(u._id));

}




