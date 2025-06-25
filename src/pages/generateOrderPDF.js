import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generateOrderPDF(cartItems, clientInfo) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;
  const fontSize = 11;
  const headerHeight = 30;

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

  // Draw logo
  try {
    const logoUrl = 'https://trueiron.shop/static/media/logo.1e18293906268e6ff6e1.png';
    const logoBytes = await fetch(logoUrl).then(res => res.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(logoBytes);
    const logoDims = logoImage.scaleToFit(60, 50);
    page.drawImage(logoImage, {
      x: margin,
      y: y - logoDims.height,
      width: logoDims.width,
      height: logoDims.height,
    });
    drawText('True Iron Gym Equipments', margin + logoDims.width + 10, y - 20, {
      size: 18,
    });
  } catch (err) {
    drawText('True Iron Gym Equipments', margin, y - 30, { size: 18 });
  }

  y -= 70;
  drawText('18, NSE Bose Nagar, Puthapedu, Porur, Chennai-116', margin, y);
  drawText('30, Loha Market Main Rd, New Seelampur, Delhi, 110053', margin, y - 15);
  drawText('Phone: +91 63857 06756', margin, y - 30);
  drawText('GST No:', margin, y - 45);

  y -= 70;
  drawText('Client Details:', margin, y);
  y -= 15;

  const rowHeightClient = 20;
  const labelWidth = 60;
  const valueWidth = pageWidth - margin * 2 - labelWidth;

  const drawClientRow = (label, value, rowY) => {
    page.drawRectangle({
      x: margin,
      y: rowY - rowHeightClient,
      width: labelWidth,
      height: rowHeightClient,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });
    drawText(label, margin + 5, rowY - 14);

    page.drawRectangle({
      x: margin + labelWidth,
      y: rowY - rowHeightClient,
      width: valueWidth,
      height: rowHeightClient,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });
    drawText(value, margin + labelWidth + 5, rowY - 14);
  };

  drawClientRow('Name:', clientInfo.name || '', y);
  y -= rowHeightClient;
  drawClientRow('Phone:', clientInfo.phone || '', y);
  y -= rowHeightClient;
  drawClientRow('Address:', clientInfo.address || '', y);
  y -= 40;

  const colWidths = [40, 230, 60, 120];
  const colTitles = ['Sl. No', 'Product Name (SKU)', 'Qty', 'Image'];

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

  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const quantity = item.quantity || 1;
    const productText = `${item.name} (${item.sku})`;
    const wrappedName = wrapText(productText, colWidths[1] - 10);
    const textHeight = wrappedName.length * 14;

    const imageHeight = 80;
    const rowHeight = Math.max(textHeight + 20, imageHeight + 10);

    if (y - rowHeight < 60) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
      drawTableHeader();
    }

    let x = margin;
    for (let j = 0; j < colWidths.length; j++) {
      page.drawRectangle({
        x,
        y: y - rowHeight,
        width: colWidths[j],
        height: rowHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });
      x += colWidths[j];
    }

    drawText(`${i + 1}`, margin + 5, y - 20);
    wrappedName.forEach((line, idx) => {
      drawText(line, margin + colWidths[0] + 5, y - 20 - idx * 14);
    });
    drawText(`${quantity}`, margin + colWidths[0] + colWidths[1] + 5, y - 20);

    // Draw image
    if (item.image) {
      try {
        let imageBytes, image;
        if (item.image.startsWith('data:image')) {
          const base64 = item.image.split(',')[1];
          imageBytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
          image = item.image.includes('jpeg') || item.image.includes('jpg')
            ? await pdfDoc.embedJpg(imageBytes)
            : await pdfDoc.embedPng(imageBytes);
        } else {
          const response = await fetch(item.image);
          imageBytes = await response.arrayBuffer();
          image = item.image.endsWith('.jpg') || item.image.endsWith('.jpeg')
            ? await pdfDoc.embedJpg(imageBytes)
            : await pdfDoc.embedPng(imageBytes);
        }
        const imageDims = image.scaleToFit(100, 80);
        page.drawImage(image, {
          x: margin + colWidths[0] + colWidths[1] + colWidths[2] + 5,
          y: y - imageDims.height - 5,
          width: imageDims.width,
          height: imageDims.height,
        });
      } catch (err) {
        drawText('Image Load Error', margin + colWidths[0] + colWidths[1] + colWidths[2] + 5, y - 20);
      }
    } else {
      drawText('No Image', margin + colWidths[0] + colWidths[1] + colWidths[2] + 5, y - 20);
    }

    y -= rowHeight;
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'TrueIronGym_Order.pdf';
  link.click();
}
