import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generateQuotationPDF(cartItems) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;
  const rowHeight = 40;
  const fontSize = 11;

  let y = pageHeight - margin;

  // Create first page
  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  const drawText = (text, x, y, options = {}) => {
    page.drawText(text, {
      x,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
      ...options,
    });
  };

  // Title
  drawText('True Iron Gym Equipments - Quotation', margin, y, { size: 18 });
  y -= 30;

  // Table column widths
  const colWidths = [40, 310, 60, 80];
  const colTitles = ['Sl. No', 'Product Name (SKU)', 'Qty', 'Price'];

  const drawTableHeader = () => {
    let x = margin;
    for (let i = 0; i < colTitles.length; i++) {
      page.drawRectangle({
        x,
        y: y - rowHeight,
        width: colWidths[i],
        height: rowHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });
      drawText(colTitles[i], x + 5, y - 15, { size: fontSize });
      x += colWidths[i];
    }
    y -= rowHeight;
  };

  const wrapText = (text, maxWidth) => {
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';
    for (const word of words) {
      const width = font.widthOfTextAtSize(currentLine + ' ' + word, fontSize);
      if (width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine += (currentLine ? ' ' : '') + word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  };

  drawTableHeader();

  let totalPrice = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const quantity = item.quantity || 1;
    const price = item.price || 0;
    const total = price * quantity;
    totalPrice += total;

    const productText = `${item.name} (${item.sku})`;
    const wrappedName = wrapText(productText, colWidths[1] - 10);
    const cellHeight = Math.max(wrappedName.length * 14, rowHeight);

    // New page if needed
    if (y - cellHeight < 60) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
      drawTableHeader();
    }

    // Draw table cells with borders
    let x = margin;
    for (let j = 0; j < colWidths.length; j++) {
      page.drawRectangle({
        x,
        y: y - cellHeight,
        width: colWidths[j],
        height: cellHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });
      x += colWidths[j];
    }

    // Draw row content
    drawText(`${i + 1}`, margin + 5, y - 15);

    wrappedName.forEach((line, idx) => {
      drawText(line, margin + colWidths[0] + 5, y - 15 - idx * 14);
    });

    drawText(`${quantity}`, margin + colWidths[0] + colWidths[1] + 5, y - 15);
    drawText(`Rs. ${total}`, margin + colWidths[0] + colWidths[1] + colWidths[2] + 5, y - 15);

    y -= cellHeight;
  }

  // Summary Page
  const summaryPage = pdfDoc.addPage([pageWidth, pageHeight]);
  summaryPage.drawText('Total Quotation Price', {
    x: margin,
    y: pageHeight - 100,
    size: 16,
    font,
  });

  summaryPage.drawText(`Grand Total: Rs. ${totalPrice}`, {
    x: margin,
    y: pageHeight - 130,
    size: 14,
    font,
    color: rgb(0.2, 0.4, 0.1),
  });

  // Download
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'TrueIronGym_Quotation.pdf';
  link.click();
}
