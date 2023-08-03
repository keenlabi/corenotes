import { useState } from 'react'
import QrReader from "react-qr-scanner";
import "./barcodescanner.module.css"

export default function BarcodeScanner() {

    const delay = 100;
    const [result, setResult] = useState("No result")
    
    function handleError(err:any) {
      console.error(err);
    }

    function handleScan(data:any) {
      setResult(data);
    }

    return (
      <div>
        <QrReader
          delay={delay}
          onError={handleError}
          onScan={handleScan}
        />
        <p>{result}</p>
      </div>
    );
}
