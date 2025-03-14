import { check } from "k6";


export class BaseChecks {
    checkStatusCode(response, expectedStatus = 200){
        
        check(response,{
            [` status code ${expectedStatus} check `]:(r) => r.status===expectedStatus,
        })
    }

    checkMessage(response, expectedMessage){
       
        
        check(response,{
            [` message '${expectedMessage}'  `]:(r) => 
                r.json().message===expectedMessage,
        })
    }

    checkField(response,expectedField){
       
        check(response,{
            [` have field '${expectedField}'`]:(r)=> 
                r.json()[expectedField] !== undefined

        })
    }

}