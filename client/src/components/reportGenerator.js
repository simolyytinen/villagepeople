import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";;


const generatePDF = (lasku, asiakas, majoitus, palvelut) => {

  console.log("PDF", asiakas);
  console.log("PDF", majoitus);
  console.log("PDF", palvelut);
  console.log("PDF", lasku);
  let kohta = 80;

  const doc = new jsPDF();

  const MajoitusOtsikot = ["Lasku ID", "Varaus ID", "", "Summa", "Alv"];

  // startY is basically margin-top
  //doc.autoTable(MajoitusOtsikot, [ palvelut ], { startY: 25 });

  // ticket title. and margin-top + margin-left
  doc.text("Lasku", 14, 15);
  doc.setFontSize(10);
  doc.text("Laskun numero: " + lasku.lasku_id, 14, 20);
  doc.setFontSize(12);
  doc.text("Asiakas:", 14, 30);
  doc.setFontSize(10);
  doc.text(asiakas[0].etunimi + " " + asiakas[0].sukunimi, 14, 35);
  doc.text(asiakas[0].email, 14, 39);
  doc.text("puh. " + asiakas[0].puhelinnro, 14, 43);
  doc.setFontSize(12);
  doc.text("Majoitus-varaus:", 14, 60)
  doc.setFontSize(10);
  doc.text(majoitus[0].mokkinimi + ", Alku: " + moment(majoitus[0].varattu_alkupvm).format("DD.MM.YYYY") + " Loppu: " + moment(majoitus[0].varattu_loppupvm).format("DD.MM.YYYY") + ", Hinta: " + majoitus[0].hinta + " €", 14, 65);
  doc.setFontSize(12);
  doc.text("Palvelut", 14, 75)
  doc.setFontSize(10);
  
  for(let i=0; i<palvelut.length; i++) {
    kohta = kohta + i*5;
    doc.text(palvelut[i].nimi + " lkm: " + palvelut[i].lkm + "kpl, Yksikköhinta: " + palvelut[i].yksikkohinta + " € , Kokonaishinta: " + palvelut[i].kokonaishinta + " €", 14, kohta);
  }

  doc.setFontSize(12);
  doc.text("Laskun kokonaissumma: " + lasku.summa + " €", 14, kohta+15);
  doc.text("Verollinen hinta ( Alv: " + lasku.alv + " % ): " + (lasku.summa * (1+lasku.alv/100)) + " €", 14, kohta+21);
  doc.text("Laskutuspäivämäärä: " + moment(lasku.laskutuspvm).format("DD.MM.YYYY"), 14, kohta+35);
  doc.text("Eräpäivä: " + moment(lasku.erapaiva).format("DD.MM.YYYY"), 14, kohta+41);

  doc.text("Varauksen tekijän tulee olla 18 vuotta täyttänyt tai muulla tavalla oikeustoimikelpoinen henkilö.", 14, 220);
  doc.text("Varaus sitoo vierasta, kun hän on lähettänyt varausilmoituksen.", 14, 230);
  doc.text("Varaus sitoo omistajaa, kun varausjärjestelmä on vahvistanut vieraan varauksen kirjallisesti.", 14, 240);
  doc.text("Mikäli vieras ei noudata maksuehtoja, omistajalla on oikeus katsoa varaus peruuntuneeksi.", 14, 250);
  doc.text("Village People Oy - Elämyksiä ja majoitusta jo vuodesta 2022!", 50, 270);

  doc.save(`Lasku_${lasku.lasku_id}.pdf`);
};

export default generatePDF;