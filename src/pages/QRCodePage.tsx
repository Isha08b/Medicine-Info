import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';
import { ArrowLeft, Download, QrCode, Pill, Search, Filter, Grid2x2 as Grid, List, Eye, Share2, Sparkles } from 'lucide-react';
import { getAllDrugs, DrugInfo } from '../data/drugsDatabase';

const QRCodePage: React.FC = () => {
  const [drugs] = useState<DrugInfo[]>(getAllDrugs());
  const [qrCodes, setQrCodes] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  const categories = ['All', ...Array.from(new Set(drugs.map(drug => drug.category)))];

  const filteredDrugs = drugs.filter(drug => {
    const matchesSearch = drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drug.genericName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || drug.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const generateQRCodes = async () => {
      const codes: { [key: string]: string } = {};
      
      for (const drug of drugs) {
        try {
          const qrData = JSON.stringify({
  drugId: drug.id
});
const qrCodeDataURL = await QRCode.toDataURL(`${window.location.origin}/drug/${drug.id}`, {
  width: 200,
  margin: 2,
  color: {
    dark: '#000000',
    light: '#FFFFFF'
  }
});
          
          codes[drug.id] = qrCodeDataURL;
        } catch (error) {
          console.error(`Error generating QR code for ${drug.name}:`, error);
        }
      }
      
      setQrCodes(codes);
      setLoading(false);
    };

    generateQRCodes();
  }, [drugs]);

  const downloadQRCode = (drugId: string, drugName: string) => {
    const qrCodeDataURL = qrCodes[drugId];
    if (qrCodeDataURL) {
      const link = document.createElement('a');
      link.href = qrCodeDataURL;
      link.download = `${drugName.replace(/\s+/g, '_')}_QR_Code.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const shareQRCode = async (drugId: string, drugName: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${drugName} QR Code`,
          text: `QR Code for ${drugName} medicine information`,
          url: `${window.location.origin}/drug/${drugId}`
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/drug/${drugId}`);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-primary-400 rounded-full blur-2xl opacity-40 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-8 shadow-2xl">
              <QrCode className="h-16 w-16 text-primary-600 animate-spin" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Generating QR Codes</h2>
          <p className="text-primary-600">Creating QR codes for all medicines...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50/30 py-8 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-3 text-primary-600 hover:text-primary-700 group bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-2 transition-transform duration-300" />
            <span className="font-semibold">Back to Home</span>
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100 text-primary-600 hover:text-primary-700"
            >
              {viewMode === 'grid' ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
              <span className="font-medium">{viewMode === 'grid' ? 'List View' : 'Grid View'}</span>
            </button>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-primary-400 rounded-full blur-2xl opacity-30"></div>
            <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 p-6 rounded-3xl shadow-2xl">
              <QrCode className="h-16 w-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
            Medicine QR Codes
          </h1>
          
          <p className="text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Scan any QR code below to get detailed information about medicines, including dosage, side effects, 
            and educational videos.
          </p>

          <div className="flex items-center justify-center space-x-6 text-primary-600">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span className="font-semibold">{drugs.length} Medicines Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span className="font-semibold">Instant Information</span>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-10 border border-primary-100">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-primary-400" />
                <input
                  type="text"
                  placeholder="Search medicines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 w-full px-6 py-4 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-300 text-lg font-medium"
                />
              </div>
            </div>
            
            <div className="lg:w-64">
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-primary-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-12 w-full px-6 py-4 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-300 text-lg font-medium appearance-none bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* QR Codes Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDrugs.map((drug) => (
              <div key={drug.id} className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-primary-100 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-primary-400 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <div className="relative bg-white p-4 rounded-2xl shadow-lg border-2 border-primary-100">
                      {qrCodes[drug.id] ? (
                        <img
                          src={qrCodes[drug.id]}
                          alt={`QR Code for ${drug.name}`}
                          className="w-32 h-32 mx-auto"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-primary-100 rounded-xl flex items-center justify-center">
                          <QrCode className="h-16 w-16 text-primary-400" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-primary-900 mb-2">{drug.name}</h3>
                    <p className="text-primary-600 font-semibold mb-1">{drug.genericName}</p>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                        {drug.category}
                      </span>
                    </div>
                    <p className="text-primary-600 text-sm">{drug.strength} • {drug.form}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => downloadQRCode(drug.id, drug.name)}
                      className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                    
                    <button
                      onClick={() => shareQRCode(drug.id, drug.name)}
                      className="bg-white border-2 border-primary-200 text-primary-600 px-4 py-3 rounded-xl font-semibold hover:bg-primary-50 hover:border-primary-300 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredDrugs.map((drug) => (
              <div key={drug.id} className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-primary-100 hover:shadow-3xl transition-all duration-500">
                <div className="flex items-center space-x-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary-400 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <div className="relative bg-white p-4 rounded-2xl shadow-lg border-2 border-primary-100">
                      {qrCodes[drug.id] ? (
                        <img
                          src={qrCodes[drug.id]}
                          alt={`QR Code for ${drug.name}`}
                          className="w-24 h-24"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-primary-100 rounded-xl flex items-center justify-center">
                          <QrCode className="h-12 w-12 text-primary-400" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-primary-900 mb-2">{drug.name}</h3>
                        <p className="text-primary-600 font-semibold mb-2">{drug.genericName}</p>
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                            {drug.category}
                          </span>
                          <span className="text-primary-600">{drug.strength} • {drug.form}</span>
                        </div>
                        <p className="text-primary-600 leading-relaxed">{drug.description.substring(0, 150)}...</p>
                      </div>
                      
                      <div className="flex space-x-2 ml-6">
                        <button
                          onClick={() => downloadQRCode(drug.id, drug.name)}
                          className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </button>
                        
                        <button
                          onClick={() => shareQRCode(drug.id, drug.name)}
                          className="bg-white border-2 border-primary-200 text-primary-600 px-4 py-3 rounded-xl font-semibold hover:bg-primary-50 hover:border-primary-300 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredDrugs.length === 0 && (
          <div className="text-center py-16">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-primary-400 rounded-full blur-2xl opacity-20"></div>
              <div className="relative bg-white rounded-full p-8 shadow-2xl">
                <Pill className="h-16 w-16 text-primary-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-primary-900 mb-4">No medicines found</h3>
            <p className="text-primary-600">Try adjusting your search terms or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodePage;