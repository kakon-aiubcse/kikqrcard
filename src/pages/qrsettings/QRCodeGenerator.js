import QRCode from "react-qr-code";

const QRCodeGenerator = ({ value }) => {
  if (!value || typeof value !== "string") {
    return <p className="ml-4 text-red-500">Invalid QR code value</p>;
  }

  return (
    <div className="ml-4">
      <QRCode value={value} size={128} />
    </div>
  );
};

export default QRCodeGenerator;
