import { useEffect, useState } from 'react';
import getMakes from '../Services/fetchMakes';

interface brand {
  makeName: string,
  makeIconPath: string
}

const Makes = () => {

    const [brands, setBrands] = useState([]);

    useEffect(() => {
      const fetchStyles = async () => {
        try {
          const data = await getMakes();
          setBrands(data);
        } catch (error) {
          console.error("Failed to fetch brands:", error);
        }
      };
      fetchStyles();
    }, []);

        // Grouping logic
    const groupedBrands = brands.reduce((acc: Record<string, brand[]>, brand: brand) => {
        const firstLetter = brand.makeName[0].toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(brand);
        return acc;
    }, {});

    // Sort the letters alphabetically
    const sortedLetters = Object.keys(groupedBrands).sort();

  return (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <h2 className="text-2xl font-bold text-black mb-8">Browse by Brand</h2>
    
    <div className="space-y-8">
      {sortedLetters.map((letter) => (
        <div key={letter} className="flex flex-col md:flex-row border-t border-gray-700 pt-6">
          {/* Letter Sidebar */}
          <div className="w-12 text-3xl font-black text-blue-500 mb-4 md:mb-0">
            {letter}
          </div>

          {/* Brands Grid for this Letter */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {groupedBrands[letter].map((brand: brand, index: number) => (
              <div 
                key={brand.makeName || index} 
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-gray-600 transition-all cursor-pointer group"
              >
                <div className="w-15 h-15 bg-white rounded-lg p-1.5 flex items-center justify-center overflow-hidden">
                  <img
                    src={brand.makeIconPath}
                    alt={brand.makeName}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="text-black-200 text-sm font-semibold">
                  {brand.makeName}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default Makes;