import {QrScanner} from '@yudiel/react-qr-scanner';

export default function QRCodeScanner({ onScanSuccess }:{onScanSuccess:(result:string)=> void}) {
    return (
        <QrScanner
            onDecode={(result) => onScanSuccess(result)}
            onError={(error) => console.log(error?.message)}
        />
    )
}