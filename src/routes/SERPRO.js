const express = require('express');
const router = express.Router();
var request = require('request');

const PDFDocument = require('pdfkit-table')
const fs = require('fs')

router.get('/prueba', async (req,res) => {
  console.log('entre a probar')
 
  var options = {
    'method': 'GET',
    'url': 'https://gateway.apiserpro.serpro.gov.br/datavalid-demonstracao/v3/status',

  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
})


router.get('/', async (req,res) => {
    console.log('entre a la ruta')
    // var request = require('request');
    // var options = {
    //   'method': 'POST',
    //   'url': 'https://gateway.apiserpro.serpro.gov.br/token',
    //   'headers': {
    //     'Authorization': 'Basic ZGphUjIxUEdvWXAxaXlLMm4yQUNPSDlSRWRVYjpPYlJzQUpXT0w0ZnYyVHAyN0QxdmQ4ZkIzT3RlCg',
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   form: {
    //     'grant_type': 'client_credentials'
    //   }
    // };
    // request(options, function (error, response) {
    //   if (error) throw new Error(error);
    //   console.log(response.body);
    // });

  
      const doc = new PDFDocument({ margin: 30, size: 'A4' })
      // const doc = new PDFDocument({bufferPage:true})
     
      const stream = res.writeHead(200,{
        'Content-Type':'application/pdf',
        'Content-Disposition':'attachment;filename=hola.pdf'
      })

      doc.on('data',(data)=>{stream.write(data)})
      doc.on('end',()=>{stream.end()})



      const table2 = {
        title: "Title",
        subtitle: "Subtitle",
        headers: [
          { label: "Name", property: 'name', width: 40, renderer: null },
          { label: "Description", property: 'description', width: 40, renderer: null }, 
          { label: "Price 1", property: 'price1', width: 40, renderer: null }, 
          { label: "Price 2", property: 'price2', width: 40, renderer: null }, 
          { label: "Price 3", property: 'price3', width: 40, renderer: null }, 
          { label: "Price 4", property: 'price4', width: 40, 
            renderer: (value, indexColumn, indexRow, row, rectRow, rectCell) => { return `U$ ${Number(value).toFixed(2)}` } 
          },
        ],
        // complex data
        datas: [
          { 
            name: 'Name 1', 
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis ante in laoreet egestas. ', 
            price1: '$1', 
            price3: '$ 3', 
            price2: '$2', 
            price4: '4', 
          },
          { 
            options: { fontSize: 10, separation: true},
            name: 'bold:Name 2', 
            description: 'bold:Lorem ipsum dolor.', 
            price1: 'bold:$1', 
            price3: { 
              label: 'PRICE $3', options: { fontSize: 12 } 
            }, 
            price2: '$2', 
            price4: '4', 
          },
          // {...},
        ],
        // simeple data
        rows: [
          [
            "Apple",
            "Nullam ut facilisis mi. Nunc dignissim ex ac vulputate facilisis.",
            "$ 105,99",
            "$ 105,99",
            "$ 105,99",
            "105.99",
          ],
          // [...],
        ],
      };
      // the magic
      doc.table(table2, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font("Helvetica").fontSize(8);
          indexColumn === 0 && doc.addBackground(rectRow, 'blue', 0.15);
        },
      });
      // done!

      const table = {
        title: "Title",
        subtitle: "Subtitle",
        headers: [ "Country", "Conversion rate", "Trend" ],
        rows: [
          [ "Switzerland", "12%", "+1.12%" ],
          [ "France", "67%", "-0.98%" ],
          [ "England", "33%", "+4.44%" ],
        ],
      };

      doc.table(table, { 
        width: 300,
      });

     doc.text('hola',300,100)

    //  doc.image('./src/images/1.jpg', 0, 15, {width: 300})
    //  .text('Proportional to width', 0, 0);

     doc.image('./src/images/1.jpg', 320, 145, {width: 200, height: 100})
     .text('Stretch', 320, 130);

     doc.pipe(fs.createWriteStream('factura.pdf'))
     
    doc.end()
    
});

module.exports = router;