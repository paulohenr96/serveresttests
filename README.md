# Teste de Performance da API Serverest
![alt text](image.png)

## Objetivo
* Este projeto tem como objetivo realizar testes na API [Serverest](https://github.com/serverest/serverest)
* Os testes de performance realizados são smoke, average, spike, soak, stress


## Ambiente
* Para rodar este produto é necessário ter [nodejs](https://nodejs.org/en) versão 20.15.0
* Dentro do arquivo utils/constantes.js estão as configurações básicas da api como url,rotas e mensagens esperadas.


## Dependências

* Antes de iniciar os testes é necessário garantir que a dependência [K6](https://k6.io/open-source/) esteja instalada
* Para instalação de dependências tem certeza que você está na pasta 'Testes no k6' e em seguida utilize o seguinte comando no terminal

```
npm install
```



## Realizando os Testes



### Rodando os códigos
* Para realizar os testes é necessário estar na pasta "TESTES NO K6"
* A variável de ambiente "TEST_TYPE" pode ter valores "smoke","soak","spike","average" e "stress".

### Testes
* Os testes individuais podem ser realizados utilizando o seguinte comando de exemplo

```
k6 run tests/rotas/login/login.js --env TEST_TYPE=smoke
```
### Testes com DashBoard

```
K6_WEB_DASHBOARD=true k6 run tests/rotas/login/login.js --env TEST_TYPE=smoke

```



## Scripts disponíveis neste projeto

| Categoria          | Métodos disponíveis               |
|--------------------|-----------------------------------|
| **Usuários**       | POST, DELETE, GET usuário         |
| **Login**          | POST login                        |
| **Carrinhos**      | GET carrinhos                    |
| **Produtos**       | POST, GET, PUT, DELETE produto    |
| **Fluxo**          | Compra                            |


## Relatório e Dashboard

* Os relatórios gerados ficam dentro da pasta "report"
* A dashboard fica dentro da pasta report/dashboards

## Massa de Dados
- A geração de produtos e usuários foi feita utilizando o faker
- A implementação se encontra na pasta "data/dynamic"


## Services
- Para maximizar o reaproveitamento de código foi criado um service para cada rota e eles se encontram dentro da pasta "service"

