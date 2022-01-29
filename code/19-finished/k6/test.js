import http from 'k6/http'
import { check, sleep } from 'k6'
import { parseHTML } from 'k6/html'


export let options = {

    vus: 10,
    duration: '20s',
 
    // stages: [
    //     {duration: '15s', target: 50},
    //     {duration: '10s', target: 50},
    //     {duration: '5s', target: 0}
    // ],

    thresholds: {  
        
        // 80% of requests must finish within 3s
        // 100% of requests must finish within 6s
        //http_req_duration: ["p(80) < 3000", "p(100) < 6000"],

        // 100% of requests must finish within 3 ms
        http_req_duration: ["avg<2"]      
    },
}


export default function(){

    const res = http.get('http://react-app-react-demo.apps-crc.testing/');
    //const res = http.get('http://localhost:3000/'); 
    
    check(res, {'status 200': r => r.status == 200});

    const doc = parseHTML(res.body); // equivalent to res.html()
    const pageTitle = doc.find('head title').text();
    check(pageTitle, {'Title equals "Pets"': p => p == "Pets"});
    
    sleep(1);
}





// options = {
//     thresholds: {
//       // 80% of requests must finish within 3s
//       // 100% of requests must finish within 6s
//       http_req_duration: ["p(80) < 3000", "p(100) < 6000"],
  
//       // The error rate must be lower than 1%
//       http_req_failed: ["rate<0.01"],
//     },