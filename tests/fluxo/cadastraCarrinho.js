import {  group, sleep } from 'k6';
import { htmlReport } from "../../utils/report.js";
import {  optionsConfig } from '../../utils/testConfig.js';
import { UserService } from '../../services/usuarioService.js';
import { ProductService } from '../../services/productService.js';
import { LoginService } from '../../services/loginService.js';
import { CarrinhoService } from '../../services/carrinhoService.js';


//O relatório vai ser salvo na pasta referente ao tipo de teste

const testType = __ENV.TEST_TYPE || 'outro';

export function handleSummary(data) {
  return {
    [`reports/${testType}/cadastra_carrinho.html`]:
      htmlReport(data, { title: "CADASTRA CARRINHO: " + testType }),
  };
}

export const options = optionsConfig;

const loginService=new LoginService();
const userService = new UserService();
const productService = new ProductService();
const carrinhoService=new CarrinhoService();

export function setup(){

  

  let user = userService.cadastraUsuario();

  return {user}
}

export default function (data) {
  let user;
  group("Cadastrar usuário",function(){

    user=userService.cadastraUsuario();
  })

  let token;
  group ("Logar com o usuário ",function(){

    token= loginService.realizarLogin(user.email, user.password);
  })

  let prodA,prodB;
  group("Cadastrar dois produtos",function(){

    prodA = productService.cadastrarProduto(token);
    prodB = productService.cadastrarProduto(token);

  })
   

  


  group("Cadastrar  carrinho",function(){
    const arrProducts = [
      {
        idProduto: prodA._id,
        quantidade: 1
      },
      {
        idProduto: prodB._id,
        quantidade: 3
      }
    ]
    const carrinho = ({
      produtos: arrProducts
    });
    carrinhoService.cadastrarCarrinho(token, carrinho);
  })
  
  sleep(1);
  group("Cancelar compra ",function(){
    carrinhoService.cancelarCompra(token);
  })
  sleep(1);


}
export function teardown(data){
  let user=data.user;

  let token = loginService.realizarLogin(user.email,user.password);
  sleep(1);
  



  let produtosCadastrados=productService.getProdutos();
  sleep(1);
  
  produtosCadastrados
    .forEach(p=> productService
        .deletarProduto(token,p._id));

  userService
    .getUsuarios()
    .forEach(u=>userService
      .deletarUsuario(u._id))
  


}





