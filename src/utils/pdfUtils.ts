import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// Generate a simple hash of the document content
export async function generateDocumentHash(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Create a PDF with signature
export async function createSignedPDF(
  documentContent: string, 
  signatureName: string, 
  signatureDate: string
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  
  const { height } = page.getSize();
  const fontSize = 12;
  const margin = 50;
  
  // Add document content
  const lines = documentContent.split('\n');
  let yPosition = height - margin;
  
  lines.forEach(line => {
    if (yPosition < margin + 100) return; // Leave space for signature
    page.drawText(line, {
      x: margin,
      y: yPosition,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });
    yPosition -= fontSize + 5;
  });
  
  // Add signature section
  const signatureY = 150;
  
  page.drawText('Signature:', {
    x: margin,
    y: signatureY,
    size: 10,
    font: font,
    color: rgb(0, 0, 0),
  });
  
  page.drawText(signatureName, {
    x: margin + 70,
    y: signatureY,
    size: 16,
    font: italicFont,
    color: rgb(0, 0, 0.8),
  });
  
  page.drawText(`Date: ${signatureDate}`, {
    x: margin,
    y: signatureY - 25,
    size: 10,
    font: font,
    color: rgb(0, 0, 0),
  });
  
  page.drawText('This document has been electronically signed', {
    x: margin,
    y: signatureY - 45,
    size: 8,
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });
  
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
