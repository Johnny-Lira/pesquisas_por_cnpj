import fs from 'fs';

const filePath = './result_cnpjs.csv'

function readCnpjsFromFile(filename) {
    try {
      const data = fs.readFileSync(filename, 'utf8');
      const cnpjs = data.split('\n').map(line => line.trim());
      
      processCnpjs(cnpjs);

    } catch (err) {
      console.error('Error reading file:', err);
    }
  }

  function processCnpjs(cnpjs) {
    
    const filePath = './resultados_cnpjs_inativos/cnpjs_inativos.csv';
    
    for (let i = 0; i < cnpjs.length; i++) {
        
        let line = JSON.parse(cnpjs[i]);
        let cnpj = line.cnpj
        let descricao_situacao_cadastral = line.descricao_situacao_cadastral
        let writeLineInFile = `${cnpj};${descricao_situacao_cadastral}\n`;
        fs.appendFileSync(filePath, writeLineInFile);

        console.log(`Salvo no arquivo ${filePath} \n`);
    }
  }


  function main() {
    readCnpjsFromFile(filePath);
  }
  
  main()