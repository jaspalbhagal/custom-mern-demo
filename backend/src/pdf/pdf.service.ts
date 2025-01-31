import * as PDFDocument from 'pdfkit';

import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfService {
  generateUserReport(user: any, activities: any[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const buffers: Buffer[] = [];

      doc.on('data', (chunk) => buffers.push(chunk));

      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });

      doc.on('error', (err) => {
        console.error('Error creating PDF:', err);
        reject(err);
      });

      doc.fontSize(18).text(`User Report: ${user.name}`, { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Name: ${user.name}`);
      doc.text(`Email: ${user.email}`);
      doc.text(`Role: ${user.role}`);
      doc.text(`Total Logins: ${user.logins}`);
      doc.text(`Total PDF Downloads: ${user.pdfDownloads}`);
      doc.moveDown();

      doc.text('Activity Logs:');
      activities.forEach((activity, index) => {
        doc.text(`${index + 1}. ${activity.timestamp} - ${activity.action}`);
      });

      doc.end();
    });
  }
}
