import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, X, ChevronLeft, ChevronRight, Maximize2, Layers } from 'lucide-react';
import { GalleryImage } from '../types';

// High-quality handpicked Unsplash images matching Kolkata / Jorasanko constituency development milestones
const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'moment-1',
    category: 'Infrastructure',
    title: 'Water Safe Filtration Hub',
    description: 'A modern public water filtration and high-capacity cooling kiosk installed near Sukia Street ward clinics, delivering safe, certified drinking water to hundreds of local families daily.',
    url: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=1000&h=750&q=80',
    date: 'May 28, 2026',
    location: 'Ward 23 (Sukia Street), Kolkata'
  },
  {
    id: 'moment-2',
    category: 'Civic',
    title: 'LED Street Lighting Grid',
    description: 'Upgraded modern high-intensity LED luminaire network installed across dark lanes and crowded residential passages in Ward 23 and 24 to enhance public safety and lower civic energy footprints.',
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&h=750&q=80',
    date: 'April 14, 2026',
    location: 'Sukia Street & Vidyasagar Park lanes, Kolkata'
  },
  {
    id: 'moment-3',
    category: 'Infrastructure',
    title: 'Vidyasagar Park Restoration',
    description: 'Newly manicured lawns, refurbished recreational playground installations, child-safe rubber tiles, paved walking paths, and ornamental foliage completed at Sukia Street Vidyasagar Park.',
    url: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=1000&h=750&q=80',
    date: 'March 10, 2026',
    location: 'Ward 24 (Vidyasagar Park), Kolkata'
  },
  {
    id: 'moment-4',
    category: 'Heritage',
    title: 'Traditional Trade Corridor Protection',
    description: 'Facilitating structural reinforcement, aesthetic facade updates, and clean drainage channels along historical commercial shop lanes in Jorasanko to safeguard local trading livelihoods.',
    url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&h=750&q=80',
    date: 'June 02, 2026',
    location: 'Jorasanko Bazaar, Kolkata'
  },
  {
    id: 'moment-5',
    category: 'Health',
    title: 'Voluntary Blood & Health Screening Desk',
    description: 'Community clinical desks organized with specialized doctors presiding over health screening, basic diagnostic tests, and direct volunteer blood collection during social welfare camp.',
    url: 'https://images.unsplash.com/photo-1518084454358-134257a5590c?auto=format&fit=crop&w=1000&h=750&q=80',
    date: 'June 28, 2026',
    location: 'Sukia Street, Jorasanko'
  },
  {
    id: 'moment-6',
    category: 'Civic',
    title: 'Smart Segregated Waste Stations',
    description: 'Introduction of color-coded municipal solid waste disposal bins at critical street corners to encourage organic and recyclable separation, improving Ward sanitation.',
    url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&h=750&q=80',
    date: 'February 18, 2026',
    location: 'Ward 23 (Kolkata Uttar)'
  }
];

type FilterType = 'All' | 'Infrastructure' | 'Health' | 'Heritage' | 'Civic';

export default function ConstituencyMoments() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Filter images based on selected category
  const filteredImages = activeFilter === 'All' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === activeFilter);

  // Get index of selected image to navigate
  const selectedIndex = selectedImage 
    ? GALLERY_IMAGES.findIndex(img => img.id === selectedImage.id) 
    : -1;

  // Handle navigation
  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedImage(GALLERY_IMAGES[selectedIndex - 1]);
    } else {
      setSelectedImage(GALLERY_IMAGES[GALLERY_IMAGES.length - 1]);
    }
  };

  const handleNext = () => {
    if (selectedIndex < GALLERY_IMAGES.length - 1) {
      setSelectedImage(GALLERY_IMAGES[selectedIndex + 1]);
    } else {
      setSelectedImage(GALLERY_IMAGES[0]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, selectedIndex]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Infrastructure':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Health':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Heritage':
        return 'bg-saffron-50 text-saffron-700 border-saffron-100';
      case 'Civic':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <section id="moments" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 scroll-mt-24">
      
      {/* Section Header */}
      <div className="space-y-1.5 mb-8 text-center sm:text-left">
        <span className="text-[10px] font-bold text-saffron-600 uppercase tracking-widest font-mono flex items-center justify-center sm:justify-start gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          Development Gallery
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display tracking-tight mt-1">
          Constituency Moments
        </h2>
        <p className="text-xs text-slate-500 font-light max-w-2xl">
          Visual documentation of development initiatives, infrastructure completions, and civic achievements overseen by Sri Vijay Ojha in the Jorasanko Constituency.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mb-8 border-b border-slate-100 pb-4">
        {(['All', 'Infrastructure', 'Health', 'Heritage', 'Civic'] as FilterType[]).map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-transparent'
              }`}
            >
              {filter} Projects
            </button>
          );
        })}
      </div>

      {/* Grid Layout of photos */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              key={image.id}
              className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:border-slate-200 transition-all flex flex-col group h-full"
            >
              {/* Image Container with hover triggers */}
              <div 
                className="relative aspect-video overflow-hidden bg-slate-900 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2.5 rounded-full bg-white/90 text-slate-800 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
                
                {/* Category Badge absolute */}
                <span className={`absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border shadow-xs ${getCategoryColor(image.category)}`}>
                  {image.category}
                </span>
              </div>

              {/* Text content area */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold text-slate-900 leading-snug group-hover:text-saffron-600 transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-light line-clamp-2">
                    {image.description}
                  </p>
                </div>

                {/* Footer specs */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono border-t border-slate-50 pt-2.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="truncate max-w-[120px]">{image.location.split(',')[0]}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{image.date.split(',')[0]}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No results placeholder */}
      {filteredImages.length === 0 && (
        <div className="text-center py-16 border border-dashed border-slate-200 rounded-xl bg-white/50">
          <p className="text-xs text-slate-400">No moments documented under this category yet.</p>
        </div>
      )}

      {/* Full-screen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white rounded-xl overflow-hidden max-w-4xl w-full shadow-2xl border border-slate-850/50 flex flex-col md:grid md:grid-cols-12 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-slate-900/60 hover:bg-slate-900 text-white p-1.5 rounded-full transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Navigation Left */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-slate-900/60 hover:bg-slate-900 text-white p-2 rounded-full transition-colors cursor-pointer"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Navigation Right */}
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-slate-900/60 hover:bg-slate-900 text-white p-2 rounded-full transition-colors cursor-pointer"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Image Area - 7cols */}
              <div className="md:col-span-7 bg-slate-950 relative flex items-center justify-center aspect-video md:aspect-auto md:h-[480px]">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Details Area - 5cols */}
              <div className="md:col-span-5 p-6 flex flex-col justify-between bg-white h-auto md:h-[480px]">
                <div className="space-y-4">
                  {/* Category & Date Info */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${getCategoryColor(selectedImage.category)}`}>
                      {selectedImage.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {selectedImage.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {selectedImage.title}
                  </h3>

                  {/* Divider */}
                  <div className="h-px bg-slate-100"></div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    {selectedImage.description}
                  </p>
                </div>

                <div className="space-y-4 pt-6">
                  {/* Location spec */}
                  <div className="bg-slate-50 p-3 rounded border border-slate-100 flex items-start gap-2 text-xs">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-700">LOCATION</p>
                      <p className="text-slate-500 text-[11px] font-light mt-0.5">{selectedImage.location}</p>
                    </div>
                  </div>

                  {/* Accessibility Instructions */}
                  <p className="text-[9px] text-slate-400 text-center font-mono">
                    Use Left/Right arrow keys to navigate • Esc to close
                  </p>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
