import axios from 'axios';

let cnpj = '13.592.757/0001-63';
cnpj = await limparCNPJ(cnpj);

const url = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`;

async function limparCNPJ(cnpj) {
    cnpj = await cnpj.replace(/[-.\/]/g, '');
    console.log(`CNPJ ${cnpj} apos remover caracteres indesiderados.\n`);
    return cnpj
}

async function searchCNPJ(cnpj) {
    axios.get(url)
    .then(response => {
        console.log('STATUS',response.status);
        console.log('DATA', response.data);
    })
    .catch(error => {
        console.error('ERROR' ,error);
    })
}

async function getspecificData(cnpjdata) {

}

searchCNPJ(cnpj);