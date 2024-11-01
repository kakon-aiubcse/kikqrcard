// components/QRCodeGenerator.js

import QRCode from "qrcode.react";

const QRCodeGenerator = ({ value }) => {
  return (
    <div className="ml-4">
      <QRCode value={value} size={128} />
    </div>
  );
};

export default QRCodeGenerator;
