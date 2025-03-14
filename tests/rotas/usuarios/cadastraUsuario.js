import {  sleep } from 'k6';
import { htmlReport } from "../../../utils/report.js";
import {  optionsConfig } from '../../../utils/testConfig.js';
import { UserService } from '../../../services/usuarioService.js';



const testType = __ENV.TEST_TYPE || 'outro';

export function handleSummary(data) {
    return {
        [`reports/${testType}/usuario_post_sucesso.html`]:
            htmlReport(data, { title: "CADASTRA USUARIO : " + testType }),
    };
}

const userService=new UserService();
export const options = optionsConfig;



export default function () {

    userService.cadastraUsuario();
    sleep(1);

}

export function teardown(){
    const listaUsuarios=userService.getUsuarios();

    listaUsuarios.forEach(u=>{
        userService.deletarUsuario(u._id);
    })
}




