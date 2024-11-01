import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";

export default function QRCodeGenerator() {
  return (
    <div>
      {/* Use either QRCodeCanvas or QRCodeSVG here */}
      <QRCodeCanvas
        value="https://www.reddit.com/user/kakonaiubcse/"
        size={188}
      />
    </div>
  );
}
