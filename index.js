
const fs = require('fs');
const path = require('path');

const folderPath = process.argv[2];

// Mappatura dei mesi
const mapMonth = {
  gen: '01', feb: '02', mar: '03', apr: '04', mag: '05', giu: '06',
  lug: '07', ago: '08', set: '09', ott: '10', nov: '11', dic: '12',
};

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(`Impossibile leggere la directory: ${err}`);
    return;
  }

  files.forEach(file => {
    const match = file.match(/^prova_(\d+)_(\d{2})([a-z]{3})(\d{4})\.pdf$/);

    if (match) {
      const [, number, day, monthText, year] = match;
      const month = mapMonth[monthText];
      if (!month) {
        console.warn(`Mese non valido trovato in: ${file}`);
        return;
      }

     
      const newName = `${year}-${month}-${day} - nome del file.pdf`;


      const oldPath = path.join(folderPath, file);
      const newPath = path.join(folderPath, newName);

      // Rinomina
      fs.rename(oldPath, newPath, err => {
        if (err) {
          console.error(`Errore durante la rinomina di ${file}: ${err}`);
          return;
        }
        console.log(`${file} è stato rinominato in ${newName}`);
      });
    } else {
      console.log(`Il file ${file} non corrisponde , e non verrà rinominato.`);
    }
  });
});



