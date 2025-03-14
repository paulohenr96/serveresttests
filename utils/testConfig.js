import { Counter, Rate, Trend } from "k6/metrics";

const testType = __ENV.TEST_TYPE || 'default';
let optionsConfig;
switch (testType) {
  case 'smoke':
    optionsConfig = {
      vus: 10,
      duration: '20s',
      teardownTimeout: '10m', 
    };
    break;
  case 'average':
    optionsConfig = {
      stages: [
        { duration: '1m', target: 400 },
      ],
      teardownTimeout: '10m', 
    };
    break;
  case 'stress':
    optionsConfig = {
      stages: [
        { duration: '2m', target: 600 },
      ],
      teardownTimeout: '10m', 
    };
    break;
  case 'soak':
    optionsConfig = {
      stages: [
        { duration: '1m', target: 50 },
        { duration: '5m', target: 50 },
        { duration: '10s', target: 0 },
      ],
      teardownTimeout: '10m', 
    };
    break;
  case 'spike':
    optionsConfig = {
      stages: [
        { duration: '10s', target: 100 },
        { duration: '30s', target: 300 },
        { duration: '10s', target: 0 },
        { duration: '10s', target: 100 },
        { duration: '30', target: 200 },
        { duration: '10s', target: 0 },
      ],
      teardownTimeout: '10m', 
    };
    break;
  default:
    optionsConfig = {
      vus: 1,
      duration: '30s',
      teardownTimeout: '10m', 
    };
}

export { optionsConfig };

// Métricas utilizadas em todos os testes
export let GetDuration = new Trend('Duracaoda_Req');
export let GetFailRate = new Rate('Taxa_de_Erro');
export let GetSuccessRate = new Rate('Taxa_de_Sucesso');
export let GetReqs = new Counter('Numero_de_Req');
export let TimeOuts = new Rate('Timeouts');

// Esta função é chamada quando quer atualizar as métricas de uma response
export function atualizaMetricas(response) {
  GetDuration.add(response.timings.duration);
  GetReqs.add(1);
  GetFailRate.add(response.status == 0 || response.status > 399);
  GetSuccessRate.add(response.status != 0 && response.status < 399);
  TimeOuts.add(response.status === 408);
}