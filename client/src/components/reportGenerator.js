import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = lasku => {
  const doc = new jsPDF();

  const tableColumn = ["Lasku ID", "Varaus ID", "Summa", "Alv"];
  
  const ticketData = [
    lasku.lasku_id,
    lasku.varaus_id,
    lasku.summa,
    lasku.alv,
  ];


  // startY is basically margin-top
  doc.autoTable(tableColumn, [ ticketData ], { startY: 20 });

  // ticket title. and margin-top + margin-left
  doc.text("Hieno lasku peedeeäf", 14, 15);

  doc.save(`Lasku_${lasku.lasku_id}.pdf`);
};

export default generatePDF;