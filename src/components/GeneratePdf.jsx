import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import ImageUpload from './ImageUpload';
import TextStyleConfig from './TextStyleConfig';

const GeneratePdf = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [fontSize, setFontSize] = useState("12");
  const [fontColor, setFontColor] = useState("#000");
  const [image,setImage] = useState(null);


  const generatePDF = () => {
    const doc = new jsPDF();

    const customStyle = {
        fontSize: parseInt(fontSize),
        color: fontColor,
        bold: isBold,

    };

    doc.setFontSize(parseInt(customStyle.fontSize));
    doc.setTextColor(customStyle.color);
    doc.setFont("helvetica", customStyle.bold ? "bold" : "normal");


    doc.text(`Título: ${title}`, 10, 20);
    doc.text(`Descrição: ${description}`, 10, 30);
    image ? doc.addImage(image,'JPEG',40,40,100,175) : {}

    // Salva o PDF
    doc.save("documento.pdf");
  };

  return (
    <div className="container">
        <label className="label">
            Título:
        <input
          type="text"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </label>

        <label className="label">
            Descrição:
        <input
          type="text"
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </label>

        <TextStyleConfig  fontColor={fontColor} fontSize={fontSize} isBold={isBold}
        setFontColor={setFontColor} setFontSize={setFontSize} setIsBold={setIsBold} />
        <ImageUpload setImage={setImage} />

        <button className="button" onClick={generatePDF}>
            Gerar PDF
        </button>
    </div>
  );
};

export default GeneratePdf;