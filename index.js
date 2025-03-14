import GetUsuarios from "./scenarios/Get-Usuarios.js";
import GetProdutos from "./scenarios/Get-Produtos.js";
import Login from "./scenarios/Login.js";

import {group,sleep} from "k6";

export const options = {
    stages: [
      { duration: '10s', target: 100 }, // Ramp-up para 300 VUs em 10 segundos
      { duration: '10s', target: 100 },  // Mantém 300 VUs por 1 minuto
      { duration: '5s', target: 0 },   // Ramp-down para 0 VUs em 10 segundos
    ],
    thresholds: {
      http_req_duration: ['p(99)<1500'], // 99% das requisições devem ter duração < 1.5s
    },
  };

export default function (){

    

    group ('GETUSUARIOS -',()=>{
        GetUsuarios();
    });

    sleep(5);

    group ('GETPRODUTOS -',()=>{
      GetProdutos();
  });

  sleep(5);

  group ('LOGIN -',()=>{
    Login();
});

sleep(1);

}