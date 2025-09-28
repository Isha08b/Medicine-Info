import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { QrCode, Camera, Upload, Zap, Shield, Clock, XCircle, ArrowLeft } from 'lucide-react';
import { getAllDrugs } from '../data/drugsDatabase';

const ScanPage: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const drugs = getAllDrugs();
  const handleVideoReady = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.error("Video Playback Error:", e));
      setIsLoading(false);
    }
  };

  const startCamera = async () => {
    setCameraError(null);
    setIsLoading(true); 
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;      }
      setIsScanning(true);
    } catch (error: any) {
      console.error('Error accessing camera:', error);
      let errorMessage = 'Could not start camera. Please ensure permissions are granted.';
      if (error.name === 'NotAllowedError') {
        errorMessage = 'Camera access denied. Please check your browser settings.';
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'No camera found on this device.';
      }
      setCameraError(errorMessage);
      setIsScanning(false);
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    setIsScanning(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleSearch = (input: string) => {
    if (input.trim()) {
      stopCamera();
      const drugId = input.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      navigate(`/drug/${drugId}`);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleSearch(manualInput);
  }

  const simulateScan = (drugName: string) => {
    stopCamera();
    setManualInput(drugName);
    handleSearch(drugName);
  };
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-olive-50 py-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-olive-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-olive-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
            to="/"
            className="inline-flex items-center space-x-2 text-olive-600 hover:text-olive-700 group bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-olive-100 mb-8"
        >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Home</span>
        </Link>

        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-olive-400 rounded-full blur-xl opacity-30"></div>
            <div className="relative bg-gradient-to-br from-olive-500 to-olive-600 p-6 rounded-3xl shadow-2xl">
              <QrCode className="h-16 w-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Scan & Identify Medicine
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Point your camera at the **Data Matrix (QR Code)** on your medicine for instant details, usage, and safety warnings.
          </p>

          <div className="flex justify-center flex-wrap gap-x-8 gap-y-4">
            <div className="flex items-center space-x-2 text-olive-600">
              <Zap className="h-5 w-5" />
              <span className="font-semibold">Instant Results</span>
            </div>
            <div className="flex items-center space-x-2 text-olive-600">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">Verify Authenticity</span>
            </div>
            <div className="flex items-center space-x-2 text-olive-600">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">Check Expiry</span>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-olive-100">
          <div className="p-10">
            <div className="bg-gradient-to-br from-olive-50 to-olive-100/50 rounded-2xl p-10 mb-8 relative overflow-hidden">
              
              {isScanning ? (
                <div className="aspect-square max-w-md mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-olive-400 relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted 
                    className="w-full h-full object-cover"
                    onLoadedMetadata={handleVideoReady}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-full h-1 bg-red-400 animate-scan-line-v2 shadow-red-500"></div>
                  </div>
                </div>
              ) : (
                <div 
                    onClick={isLoading ? undefined : startCamera}
                    className={`aspect-square max-w-md mx-auto rounded-2xl flex items-center justify-center border-4 border-dashed transition-all duration-500 group cursor-pointer ${
                        isLoading ? 'bg-olive-100/50 border-olive-300 animate-pulse' :
                        cameraError ? 'bg-red-50 border-red-300 hover:border-red-400' :
                        'bg-gradient-to-br from-olive-100 to-olive-200/50 border-olive-300 hover:border-olive-500 hover:scale-[1.01]'
                    }`}
                >
                  <div className="text-center p-4">
                    {cameraError ? (
                        <div className="text-red-600">
                            <XCircle className="h-12 w-12 mx-auto mb-3" />
                            <h3 className="text-xl font-bold mb-2">Error: Camera Failed</h3>
                            <p className="text-sm">{cameraError}</p>
                        </div>
                    ) : isLoading ? (
                        <div className="text-olive-700">
                            <span className="animate-spin inline-block border-4 border-olive-500 border-t-transparent rounded-full h-10 w-10 mb-3"></span>
                            <h3 className="text-xl font-bold">Starting Camera...</h3>
                        </div>
                    ) : (
                        <>
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-olive-400 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                                <div className="relative bg-white rounded-full p-6 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                                    <Camera className="h-16 w-16 text-olive-600 mx-auto" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-olive-800 mb-2">Tap to Start Scan</h3>
                            <p className="text-olive-600 text-lg">Align the QR code within the frame.</p>
                        </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isScanning ? (
                <button
                  onClick={startCamera}
                  disabled={isLoading}
                  className="group bg-gradient-to-r from-olive-500 to-olive-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:from-olive-600 hover:to-olive-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl shadow-olive-200 disabled:from-gray-400 disabled:to-gray-500"
                >
                  <Camera className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>{isLoading ? 'Loading...' : 'Start Live Scan'}</span>
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-xl shadow-red-200"
                >
                  Stop Camera
                </button>
              )}
            </div>
          </div>
          
          <form onSubmit={handleManualSubmit} className="border-t border-olive-100 p-10 bg-gradient-to-r from-olive-50/50 to-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Or Enter Medicine Name Manually
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Enter medicine name (e.g., Paracetamol)"
                className="flex-1 px-6 py-4 border-2 border-olive-200 rounded-xl focus:ring-4 focus:ring-olive-200 focus:border-olive-500 transition-all duration-300 text-lg"
              />
              <button
                type="submit"
                disabled={!manualInput.trim()}
                className="bg-gradient-to-r from-olive-500 to-olive-600 text-white px-8 py-4 rounded-xl font-bold hover:from-olive-600 hover:to-olive-700 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:hover:scale-100"
              >
                <Upload className="h-6 w-6" />
                <span>Search</span>
              </button>
            </div>
          </form>

          <div className="border-t border-olive-100 p-10 bg-gradient-to-r from-white to-olive-50/30">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
              Quick Demo: Try These Medicines
            </h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {drugs.slice(0, 4).map((drug) => (
                <button
                  key={drug.id}
                  onClick={() => simulateScan(drug.name)}
                  className="group bg-white border-2 border-olive-200 text-olive-700 px-4 py-3 rounded-xl font-semibold hover:bg-olive-50 hover:border-olive-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03] flex flex-col items-center space-y-2"
                >
                  <span className="text-3xl">💊</span>
                  <span className="text-md font-bold">{drug.name}</span>
                  <span className='text-xs text-gray-500'>{drug.dosage}</span>
                </button>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link
                to="/qr-codes"
                className="inline-flex items-center space-x-2 text-olive-600 hover:text-olive-700 font-semibold hover:underline transition-all duration-300"
              >
                <QrCode className="h-5 w-5" />
                <span>Browse All Medicines ({drugs.length})</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scan-line-v2 {
            0% { transform: translateY(0); opacity: 0.1; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100%); opacity: 0.1; }
        }
        .animate-scan-line-v2 {
            animation: scan-line-v2 2.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default ScanPage;