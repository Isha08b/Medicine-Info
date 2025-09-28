import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { QrCode, Camera, Upload, Zap, Shield, Clock, Sparkles } from 'lucide-react';
import { getAllDrugs } from '../data/drugsDatabase';

const ScanPage: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [qrResult, setQrResult] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const drugs = getAllDrugs();

  // --- CAMERA LOGIC (UNCHANGED) ---
  const startCamera = async () => {
    try {
      setIsScanning(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    setIsScanning(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleManualInput = () => {
    if (qrResult.trim()) {
      // Simulate QR code scan result - navigate to drug info
      const drugId = qrResult.toLowerCase().replace(/\s+/g, '-');
      navigate(`/drug/${drugId}`);
    }
  };

  const simulateScan = (drugName: string) => {
    setQrResult(drugName);
    const drugId = drugName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/drug/${drugId}`);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);
  // ----------------------------------

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-lime-50/30 py-12 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-lime-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-lime-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-lime-400 rounded-full blur-xl opacity-30"></div>
            <div className="relative bg-gradient-to-br from-lime-500 to-lime-600 p-6 rounded-3xl shadow-2xl">
              <QrCode className="h-16 w-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Scan Medicine QR Code
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Point your camera at the QR code on your medicine package to get detailed information, usage instructions, 
            and related educational content instantly.
          </p>

          {/* Quick Stats */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="flex items-center space-x-2 text-lime-600">
              <Zap className="h-5 w-5" />
              <span className="font-semibold">Instant Results</span>
            </div>
            <div className="flex items-center space-x-2 text-lime-600">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">100% Secure</span>
            </div>
            <div className="flex items-center space-x-2 text-lime-600">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">24/7 Available</span>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-lime-100">
          {/* Camera Section */}
          <div className="p-10">
            <div className="bg-gradient-to-br from-lime-50 to-lime-100/50 rounded-2xl p-10 mb-8 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-lime-200/30 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-lime-300/20 rounded-full blur-xl"></div>
              
              {isScanning ? (
                <div className="aspect-square max-w-md mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-lime-200">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 border-2 border-lime-400 rounded-2xl animate-pulse"></div>
                </div>
              ) : (
                <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-lime-100 to-lime-200/50 rounded-2xl flex items-center justify-center border-3 border-dashed border-lime-300 hover:border-lime-400 transition-all duration-500 group cursor-pointer hover:scale-105">
                  <div className="text-center">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-lime-400 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                      <div className="relative bg-white rounded-full p-8 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <Camera className="h-20 w-20 text-lime-600 mx-auto" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-lime-800 mb-3">Ready to Scan</h3>
                    <p className="text-lime-600 text-lg mb-6">Camera preview will appear here</p>
                    
                    <div className="flex justify-center items-center space-x-2 mb-4">
                      <Sparkles className="h-5 w-5 text-lime-500 animate-pulse" />
                      <span className="text-lime-600 font-medium">Powered by AI Technology</span>
                      <Sparkles className="h-5 w-5 text-lime-500 animate-pulse" />
                    </div>
                    
                    <div className="flex justify-center space-x-2">
                      <div className="w-3 h-3 bg-lime-400 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-lime-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-3 h-3 bg-lime-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {!isScanning ? (
                <button
                  onClick={startCamera}
                  className="group bg-gradient-to-r from-lime-500 to-lime-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:from-lime-600 hover:to-lime-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl shadow-lime-200 hover:shadow-2xl hover:scale-105"
                >
                  <Camera className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Start Camera</span>
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-xl shadow-red-200 hover:shadow-2xl hover:scale-105"
                >
                  Stop Camera
                </button>
              )}
            </div>
          </div>

          {/* Manual Input Section */}
          <div className="border-t border-lime-100 p-10 bg-gradient-to-r from-lime-50/50 to-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Or Enter Medicine Name Manually
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="text"
                value={qrResult}
                onChange={(e) => setQrResult(e.target.value)}
                placeholder="Enter medicine name..."
                className="flex-1 px-6 py-4 border-2 border-lime-200 rounded-xl focus:ring-4 focus:ring-lime-200 focus:border-lime-500 transition-all duration-300 text-lg"
              />
              <button
                onClick={handleManualInput}
                disabled={!qrResult.trim()}
                className="bg-gradient-to-r from-lime-500 to-lime-600 text-white px-8 py-4 rounded-xl font-bold hover:from-lime-600 hover:to-lime-700 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100"
              >
                <Upload className="h-6 w-6" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Demo Medicines */}
          <div className="border-t border-lime-100 p-10 bg-gradient-to-r from-white to-lime-50/30">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Try Demo Medicines
            </h3>
            
            <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {drugs.slice(0, 8).map((drug) => (
                <button
                  key={drug.id}
                  onClick={() => simulateScan(drug.name)}
                  className="group bg-white border-2 border-lime-200 text-lime-700 px-4 py-3 rounded-xl font-semibold hover:bg-lime-50 hover:border-lime-300 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
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
                className="inline-flex items-center space-x-2 text-lime-600 hover:text-lime-700 font-semibold hover:underline transition-all duration-300"
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