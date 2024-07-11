import axios from 'axios';
import fs from 'fs'

const minWait = 20; // 20 seconds
const maxWait = 30; // 30 seconds
const randomWait = Math.floor(Math.random() * (maxWait - minWait + 1)) + minWait;

readCnpjsFromFile("cnpjs.csv");
async function readCnpjsFromFile(filename) {
    try {
      const data = await fs.promises.readFile(filename, 'utf8');
      const cnpjs = data.split('\n').map(line => line.trim()); // Split lines and trim whitespace
     
      //console.log(cnpjs); // Output the list of CNPJs
      processCnpjs(cnpjs)

    } catch (err) {
      console.error('Error reading file:', err);
    }
  }

async function processCnpjs(cnpjs) {
    for (let i = 0; i < cnpjs.length; i++) {
        //console.log( 'teste cnpj[i] >>>' + cnpjs[i]);
        
        let cnpj = limparCNPJ(cnpjs[i]); // precisa colocar o await na frente do cnpj pois é um object promise.
        //console.log( 'teste cnpj >>>' + await cnpj);
        
        console.log('Wait for', randomWait, 'seconds');
        await new Promise((resolve) => setTimeout(resolve, randomWait * 1000));
        
        console.log('excecutando //searchCNPJ(cnpj);');
        searchCNPJ( await cnpj);
    }
}

async function limparCNPJ(cnpj) {
    cnpj = await cnpj.replace(/[-.\/]/g, '');
    console.log(`CNPJ ${cnpj} apos remover caracteres indesiderados.\n`);
    return cnpj
}

async function searchCNPJ(cnpj) {
    const url = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`;
    axios.get(url)
    .then(response => {
        console.log('STATUS',response.status);
        //getspecificData(response.data);
        saveIntxt(response.data, 'result_cnpjs.csv');

    })
    .catch(error => {
        console.error('ERROR' , error);
    })
}

async function getspecificData(cnpjdata) {
    const filteredData = {
        situacao_cadastral: cnpjdata.descricao_situacao_cadastral,
        cnpj: cnpjdata.cnpj,
        nome_fantasia: cnpjdata.nome_fantasia,
        razao_social: cnpjdata.razao_social,
        //podem ser telefones dos contadores
        tel1: cnpjdata.ddd_telefone_1,
        tel2: cnpjdata.ddd_telefone_2,
        porte: cnpjdata.porte,
        quadro_societario: cnpjdata.qsa

    }

    console.log(filteredData);

}

async function saveIntxt(response, filename) {
    
    let dataList = []
    
    dataList.push(response)
    dataList = JSON.stringify(dataList)

    fs.writeFile(filename, dataList, (err) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(`Arquivo ${filename} criado com sucesso!`)
    })
}