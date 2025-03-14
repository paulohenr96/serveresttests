import faker from '../../utils/faker.min.js';
import { stringAleatorio } from '../../utils/geradorAleatorio.js';


export class DataGenerator {
    static produto(){
        const prod = {
            nome: faker.internet.password(),
            preco: 1+ Math.abs((faker.commerce.price())), 
            descricao: faker.lorem.sentence(), 

            quantidade: Math.floor(Math.random() * 100) + 1,
        };
        return prod; 
    }
    
    static usuario() {
        return {
            nome: faker.name.findName(), 
            email:  faker.internet.password()+"@email.com", 
            password: "teste", 
            administrador: "true"
        };
    }
}
