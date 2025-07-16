import QRCode from "react-qr-code";

const QRCodeGenerator = ({ value }) => {
  return (
    <div className="ml-4">
      <QRCode value={value} size={128} />
    </div>
  );
};

export default QRCodeGenerator;
