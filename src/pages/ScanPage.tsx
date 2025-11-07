import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { QrCode, Camera, Upload, Zap, Shield, Clock } from 'lucide-react';
import { Html5QrcodeScanner } from "html5-qrcode";
import { getAllDrugs } from '../data/drugsDatabase';

const ScanPage: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [qrResult, setQrResult] = useState<string>('');
  const [scanError, setScanError] = useState<string>('');
  const scannerRef = useRef<any>(null);
  const navigate = useNavigate();
  const drugs = getAllDrugs();

  const handleQRCodeResult = (qrData: string) => {
    setScanError('');
    try {
      const parsedData = JSON.parse(qrData);
      if (parsedData.drugId) {
        navigate(`/drug/${parsedData.drugId}`);
        return;
      }
    } catch (e) {
      console.log('Plain text QR code:', qrData);
    }

    if (qrData.includes('/drug/')) {
      const drugIdMatch = qrData.match(/\/drug\/([^\/?#]+)/);
      if (drugIdMatch && drugIdMatch[1]) {
        navigate(`/drug/${drugIdMatch[1]}`);
        return;
      }
    }

    const matchedDrug = drugs.find(drug =>
      drug.name.toLowerCase() === qrData.toLowerCase() ||
      drug.genericName.toLowerCase() === qrData.toLowerCase()
    );

    if (matchedDrug) {
      navigate(`/drug/${matchedDrug.id}`);
    } else {
      setScanError(`QR code or input ("${qrData}") does not match a valid medicine.`);
    }
  };

  const startCamera = () => {
    setIsScanning(true);
    setScanError('');

    // Wait for the element to exist in the DOM
    setTimeout(() => {
      const qrReaderElem = document.getElementById('qr-reader');
      if (!qrReaderElem) {
        console.error("QR Reader element not found yet!");
        setScanError('Failed to find camera element. Please try again.');
        setIsScanning(false);
        return;
      }

      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        false
      );

      scanner.render(
        (decodedText) => {
          console.log('QR Code scanned:', decodedText);
          handleQRCodeResult(decodedText);
          scanner.clear();
          setIsScanning(false);
        },
        (error) => {
          // Ignored minor scanning errors
        }
      );

      scannerRef.current = scanner;
    }, 300); // give React time to render the div
  };

  const stopCamera = () => {
    if (scannerRef.current) {
      scannerRef.current.clear()
        .then(() => console.log("Scanner stopped successfully."))
        .catch((err: any) => console.error("Error stopping scanner:", err));
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const handleManualInput = () => {
    if (qrResult.trim()) {
      handleQRCodeResult(qrResult.trim());
    }
  };

  const simulateScan = (drugName: string) => {
    const matchedDrug = drugs.find(drug => drug.name === drugName);
    if (matchedDrug) {
      navigate(`/drug/${matchedDrug.id}`);
    } else {
      setScanError(`Demo drug "${drugName}" not found in database.`);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-8">
            <div className="bg-primary-600 p-6 rounded-3xl shadow-lg">
              <QrCode className="h-16 w-16 text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Scan Medicine QR Code
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Point your camera at the QR code on your medicine package to get detailed information instantly.
          </p>

          <div className="flex justify-center space-x-8 mb-8">
            <div className="flex items-center space-x-2 text-primary-600">
              <Zap className="h-5 w-5" />
              <span className="font-semibold">Instant Results</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-600">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">100% Secure</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-600">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">24/7 Available</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200">
          <div className="p-10">
            <div className="bg-gray-50 rounded-2xl p-10 mb-8">
              <div className="max-w-md mx-auto">
                {isScanning ? (
                  <div id="qr-reader" className="w-full"></div>
                ) : (
                  <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <div className="mb-6">
                        <div className="bg-white rounded-full p-8 shadow-lg mx-auto w-fit">
                          <Camera className="h-20 w-20 text-primary-600 mx-auto" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">Ready to Scan</h3>
                      <p className="text-gray-600 text-lg mb-6">Camera preview will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {scanError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700 font-medium">{scanError}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {!isScanning ? (
                <button
                  onClick={startCamera}
                  className="bg-primary-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg"
                >
                  <Camera className="h-6 w-6" />
                  <span>Start Camera</span>
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="bg-red-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg"
                >
                  Stop Camera
                </button>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 p-10 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Or Enter Medicine Name Manually
            </h3>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="text"
                value={qrResult}
                onChange={(e) => setQrResult(e.target.value)}
                placeholder="Enter medicine name..."
                className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
              />
              <button
                onClick={handleManualInput}
                disabled={!qrResult.trim()}
                className="bg-primary-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-700 transition-all duration-300 disabled:bg-gray-400 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Upload className="h-6 w-6" />
                <span>Search</span>
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 p-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Try Demo Medicines
            </h3>

            <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {drugs.slice(0, 8).map((drug) => (
                <button
                  key={drug.id}
                  onClick={() => simulateScan(drug.name)}
                  className="bg-white border-2 border-gray-200 text-primary-700 px-4 py-3 rounded-xl font-semibold hover:bg-primary-50 hover:border-primary-300 transition-all duration-300 shadow-md"
                >
                  <span className="flex flex-col items-center space-y-1">
                    <span className="text-2xl">💊</span>
                    <span className="text-sm">{drug.name}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="text-center mt-6">
              <Link
                to="/qr-codes"
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold hover:underline transition-all duration-300"
              >
                <QrCode className="h-5 w-5" />
                <span>View All QR Codes ({drugs.length} medicines)</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanPage;
