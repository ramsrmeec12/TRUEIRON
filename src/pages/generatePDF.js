import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generateQuotationPDF(cartItems) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;
  const rowHeight = 100; // Row height for product rows
  const headerHeight = 30; // Height for table headers
  const fontSize = 11;

  let y = pageHeight - margin;
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

  try {
    const logoUrl = 'https://trueiron.shop/assets/weblogo.jpg';
    const logoBytes = await fetch(logoUrl).then((res) => res.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(logoBytes);
    const logoDims = logoImage.scaleToFit(100, 50);
    page.drawImage(logoImage, {
      x: margin,
      y: y - logoDims.height,
      width: logoDims.width,
      height: logoDims.height,
    });
  } catch (err) {
    drawText('True Iron Gym Equipments', margin, y, { size: 18 });
  }

  drawText('Phone: +91-63857 06576', margin, y - 60, { size: 11 });
  drawText('GST No: ', margin, y - 75, { size: 11 });
  drawText('Quotation', pageWidth - margin - 100, y - 60, { size: 16 });
  y -= 90;

  // Table Columns: Sl. No | Image | Name | Qty | Price
  const colWidths = [40, 80, 230, 60, 80];
  const colTitles = ['Sl. No', 'Image', 'Product Name (SKU)', 'Qty', 'Price'];

  const drawTableHeader = () => {
    let x = margin;
    for (let i = 0; i < colTitles.length; i++) {
      page.drawRectangle({
        x,
        y: y - headerHeight,
        width: colWidths[i],
        height: headerHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });
      drawText(colTitles[i], x + 5, y - 18);
      x += colWidths[i];
    }
    y -= headerHeight;
  };

  const wrapText = (text, maxWidth) => {
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';
    for (const word of words) {
      const width = font.widthOfTextAtSize(currentLine + (currentLine ? ' ' : '') + word, fontSize);
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
    const wrappedName = wrapText(productText, colWidths[2] - 10);
    const textHeight = wrappedName.length * 14;
    const actualRowHeight = Math.max(textHeight + 20, rowHeight);

    if (y - actualRowHeight < 60) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
      drawTableHeader();
    }

    // Draw cell borders
    let x = margin;
    for (let j = 0; j < colWidths.length; j++) {
      page.drawRectangle({
        x,
        y: y - actualRowHeight,
        width: colWidths[j],
        height: actualRowHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });
      x += colWidths[j];
    }

    // Sl. No
    drawText(`${i + 1}`, margin + 5, y - 20);

    // Image
    try {
      const imageBytes = await fetch(item.image).then((res) => res.arrayBuffer());
      const ext = item.image.split('.').pop().toLowerCase();
      const embeddedImage =
        ext === 'png' ? await pdfDoc.embedPng(imageBytes) : await pdfDoc.embedJpg(imageBytes);

      const imageDims = embeddedImage.scaleToFit(colWidths[1] - 10, actualRowHeight - 20);
      page.drawImage(embeddedImage, {
        x: margin + colWidths[0] + 5,
        y: y - imageDims.height - 10,
        width: imageDims.width,
        height: imageDims.height,
      });
    } catch (err) {
      drawText('Image error', margin + colWidths[0] + 5, y - 20);
    }

    // Name + SKU
    wrappedName.forEach((line, idx) => {
      drawText(line, margin + colWidths[0] + colWidths[1] + 5, y - 20 - idx * 14);
    });

    // Qty & Price
    drawText(`${quantity}`, margin + colWidths[0] + colWidths[1] + colWidths[2] + 5, y - 20);
    drawText(`Rs. ${total}`, margin + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 5, y - 20);

    y -= actualRowHeight;
  }

  // Add Grand Total Row
  const totalRowHeight = 30;
  if (y - totalRowHeight < 60) {
    page = pdfDoc.addPage([pageWidth, pageHeight]);
    y = pageHeight - margin;
    drawTableHeader();
  }

  // Draw cell borders for total row
  let x = margin;
  for (let j = 0; j < colWidths.length; j++) {
    page.drawRectangle({
      x,
      y: y - totalRowHeight,
      width: colWidths[j],
      height: totalRowHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });
    x += colWidths[j];
  }

  // Merge first four columns for "Grand Total" label
  const totalLabelX = margin + 5;
  const totalLabelWidth = colWidths.slice(0, 4).reduce((a, b) => a + b, 0) - 10;
  page.drawText('Grand Total', {
    x: totalLabelX,
    y: y - 20,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  // Total Price in the last column
  drawText(`Rs. ${totalPrice}`, margin + colWidths.slice(0, 4).reduce((a, b) => a + b, 0) + 5, y - 20);

  y -= totalRowHeight;

  // Existing single line note
  drawText(
    'Please refer to terms and conditions on our website: https://trueiron.shop/terms',
    margin,
    y - 20,
    {
      size: 10,
      font,
      color: rgb(0.4, 0.4, 0.4),
    }
  );

  // --- NEW SEPARATE PAGE for Terms and Conditions ---
  const termsPage = pdfDoc.addPage([pageWidth, pageHeight]);
  let ty = pageHeight - margin;
  const termsFontSize = 10;
  const termsLineHeight = 14;
  const maxWidth = pageWidth - 2 * margin;
  const termsFont = font; // reuse Helvetica

  const termsText = [
    'Terms and Conditions:',
    '',
    '1. GST 18% extra. Full payment in advance. Transportation charges apply.',
    '2. Orders cannot be canceled or refunded once placed.',
    '3. Delivery period for imported equipments is 15 days or depends on stock availability',
    '4. Delivery period for indian stations is 6-10 weeks or extra',
    '5. Prices valid for 10 days. One-year warranty for manufacturing defects.',
    '6. Shipping timelines provided at payment; Courier delays not our responsibility.',
    '7. No returns or refunds except in exceptional cases (customer bears return shipping).',
    '8. Use equipment safely; we are not liable for misuse.',
    '9. Your data is private and not shared with third parties.',
    '10. Content is for personal use only; no copying or redistribution allowed.',
    '11. Use stabilizers with cardio machines to maintain warranty.',
    '12. Product info is indicative and may change without notice.',
    '13. Governed by Indian law; disputes resolved in Indian courts.',
    '14. For queries, contact us via WhatsApp.',
  ];

  // Function to wrap text for terms page (same as before)
  function wrapTextTerms(text, maxWidth) {
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';
    for (const word of words) {
      const width = termsFont.widthOfTextAtSize(currentLine + (currentLine ? ' ' : '') + word, termsFontSize);
      if (width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine += (currentLine ? ' ' : '') + word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }


  for (let line of termsText) {
    if (ty - termsLineHeight < margin) {
      ty = pageHeight - margin;
      const newTermsPage = pdfDoc.addPage([pageWidth, pageHeight]);
      termsPage = newTermsPage; // move pointer
    }
    const wrappedLines = wrapTextTerms(line, maxWidth);
    for (const wrappedLine of wrappedLines) {
      if (ty - termsLineHeight < margin) {
        ty = pageHeight - margin;
        const newTermsPage = pdfDoc.addPage([pageWidth, pageHeight]);
        termsPage = newTermsPage;
      }
      termsPage.drawText(wrappedLine, {
        x: margin,
        y: ty - termsLineHeight,
        size: termsFontSize,
        font: termsFont,
        color: rgb(0.3, 0.3, 0.3),
      });
      ty -= termsLineHeight;
    }
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'TrueIronGym_Quotation.pdf';
  link.click();
}
