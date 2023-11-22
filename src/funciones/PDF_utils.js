import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs/promises';

export async function generarPDF_Base64(cliente, factura, detallesVenta) {
    try {
        // Cargar la plantilla PDF existente
        const plantillaPdf = await fs.readFile('./plantilla_factura_venta.pdf');
        const pdfDoc = await PDFDocument.load(plantillaPdf);
        // Obtener la primera página
        const [pagina] = pdfDoc.getPages(); 
        
        const helveticaFont = await pdfDoc.embedFont('Helvetica');
        // Agregar texto a la página
        pagina.drawText(cliente.nombre, {
          x: 70,
          y: 232.3,
          size: 14,
          color: rgb(0, 0, 0), // Color negro,
          font: helveticaFont,
          size: 8
        });
    
        pagina.drawText(cliente.id, {
            x: 291,
            y: 232.3,
            size: 14,
            color: rgb(0, 0, 0), // Color negro,
            font: helveticaFont,
            size: 8
        });
    
        pagina.drawText(cliente.telefono, {
            x: 394,
            y: 232.3,
            size: 14,
            color: rgb(0, 0, 0), // Color negro,
            font: helveticaFont,
            size: 8
        });
    
        pagina.drawText(factura.fecha.getFullYear().toString()+"/"+factura.fecha.getMonth().toString()+"/"+factura.fecha.getDay().toString(), {
            x: 400,
            y: 271.5,
            size: 14,
            color: rgb(0, 0, 0), // Color negro,
            font: helveticaFont,
            size: 8
        });
    
        pagina.drawText(factura.id.toString(), {
            x: 415,
            y: 293.5,
            size: 14,
            color: rgb(0, 0, 0), // Color negro,
            font: helveticaFont,
            size: 8
        });
        
        let ejey = 188
  
        detallesVenta.forEach(detalleVenta => {
          if (detalleVenta.idVenta == factura.idVenta){
              pagina.drawText(detalleVenta.cantidad.toString(),{
                  x: 35,
                  y: ejey,
                  size: 14,
                  color: rgb(0, 0, 0), // Color negro,
                  font: helveticaFont,
                  size: 8
              })
      
              productos.forEach(producto => {
                  if(producto.id == detalleVenta.idProducto){
                      pagina.drawText(producto.nombre,{
                          x: 85,
                          y: ejey,
                          size: 14,
                          color: rgb(0, 0, 0), // Color negro,
                          font: helveticaFont,
                          size: 8
                      })
                  }
              });
      
              pagina.drawText(detalleVenta.subtotal.toString(),{
                  x: 405,
                  y: ejey,
                  size: 14,
                  color: rgb(0, 0, 0), // Color negro,
                  font: helveticaFont,
                  size: 8
              })
      
              ejey -= 14;
          }
        });
  
        // Retorna el PDF en formato Base64
        const pdfBase64 = await pdfDoc.saveAsBase64();
        return pdfBase64;
    } catch (error) {
      console.error('Error al crear el documento:', error);
    }
  }