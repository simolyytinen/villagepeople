import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = lasku => {
  const doc = new jsPDF();

  const tableColumn = ["Lasku ID", "Varaus ID", "Summa", "Alv", "Laskutuspvm", "Maksuehto"];

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

 
  const erapaiva = "10pv netto"
  
  const ticketData = [
    lasku.lasku_id,
    lasku.varaus_id,
    lasku.summa,
    lasku.alv,
    date,
    erapaiva,
  ];

  
  


  // startY is basically margin-top
  doc.autoTable(tableColumn, [ ticketData ], { startY: 25 });

  // ticket title. and margin-top + margin-left
  doc.text("Lasku", 14, 15);
  doc.setFontSize(12);
  doc.text("Varauksen tekijän tulee olla 18 vuotta täyttänyt tai muulla tavalla oikeustoimikelpoinen henkilö.", 14, 60);
  doc.text("Varaus sitoo vierasta, kun hän on lähettänyt varausilmoituksen.", 14, 70);
  doc.text("Varaus sitoo omistajaa, kun varausjärjestelmä on vahvistanut vieraan varauksen kirjallisesti.", 14, 80);
  doc.text("Mikäli vieras ei noudata maksuehtoja, omistajalla on oikeus katsoa varaus peruuntuneeksi.", 14, 90);
  doc.text("Village People Oy - Elämyksiä ja majoitusta jo vuodesta 2022!", 50, 270);

  doc.save(`Lasku_${lasku.lasku_id}.pdf`);
};

export default generatePDF;