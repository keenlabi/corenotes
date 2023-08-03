import { useState } from 'react'
// import Quagga from "@ericblade/quagga2"
import QrReader from "react-qr-scanner";
import "./barcodescanner.module.css"

export default function BarcodeScanner() {
//   width, height, onDetected
// }:{ width:number, height: number, onDetected:(result:any)=> void}) {

    // console.log(width, height)

    // function _onDetected (result:any) {
    //   onDetected(result)
    // }

    // useEffect(()=> {
    //   Quagga.init({
    //     inputStream: {
    //       type: 'LiveStream',
    //       constraints: {
    //         width: width,
    //         height: height,
    //         facingMode: 'environment',
    //       },
    //       //   area: { // defines rectangle of the detection/localization area
    //       //     top: "10%",    // top offset
    //       //     right: "10%",  // right offset
    //       //     left: "10%",   // left offset
    //       //     bottom: "10%"  // bottom offset
    //       //   },
    //     },
    //     locator: {
    //         halfSample: true,
    //         patchSize: "large", // x-small, small, medium, large, x-large
    //         debug: {
    //             showCanvas: true,
    //             showPatches: false,
    //             showFoundPatches: false,
    //             showSkeleton: false,
    //             showLabels: false,
    //             showPatchLabels: false,
    //             showRemainingPatchLabels: false,
    //             boxFromPatches: {
    //                 showTransformed: true,
    //                 showTransformedBox: true,
    //                 showBB: true
    //           }
    //         }
    //     },
    //     numOfWorkers: 4,
    //     decoder: {
    //         readers: ['code_128_reader'],
    //         debug: {
    //             drawBoundingBox: true,
    //             showFrequency: true,
    //             drawScanline: true,
    //             showPattern: true
    //         },
    //     },
    //     locate: true,
    //   }, function(err) {
    //     if (err) {
    //       return console.log(err)
    //     }
    //     Quagga.start()
    //   })

    //   return(()=> {
    //       Quagga.offDetected(_onDetected)
    //   })
    // })

    // Quagga.onDetected(_onDetected)

    // return <div id="interactive" className="viewport dimensions" />

    const [delay, setDelay] = useState(100)
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
          //style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
        <p>{result}</p>
      </div>
    );
}
