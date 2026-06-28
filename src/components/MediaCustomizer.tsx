import React, { useState } from 'react';
import { Sliders, X, Upload, FileVideo, FileImage, Sparkles, Check } from 'lucide-react';
import { CustomMedia } from '../types';

interface MediaCustomizerProps {
  media: CustomMedia;
  onChange: (media: CustomMedia) => void;
}

export default function MediaCustomizer({ media, onChange }: MediaCustomizerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'instructions'>('upload');

  const handleFileChange = (key: keyof CustomMedia, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onChange({
        ...media,
        [key]: url,
      });
    }
  };

  const handleReset = () => {
    onChange({
      profilePicUrl: null,
      campVideoUrl: null,
      banner1Url: null,
      banner2Url: null,
      facebookBannerUrl: null,
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans max-w-sm sm:max-w-md w-full px-4">
      {/* Floating Button */}
      {!isOpen && (
        <button
          id="customizer-toggle-btn"
          onClick={() => setIsOpen(true)}
          className="ml-auto flex items-center gap-2 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded border border-slate-800 shadow-sm hover:bg-slate-850 transition-colors cursor-pointer"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Customize Media</span>
          <span className="flex h-1.5 w-1.5 relative">
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-saffron-500"></span>
          </span>
        </button>
      )}

      {/* Customizer Panel */}
      {isOpen && (
        <div 
          id="customizer-panel"
          className="bg-white rounded-lg border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="bg-slate-50 text-slate-900 px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-slate-500" />
              <div>
                <h3 className="font-semibold text-xs tracking-tight uppercase font-mono text-slate-800">Preview Media Manager</h3>
                <p className="text-[10px] text-slate-400 font-light">Load your photos & video dynamically</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-100 text-[11px]">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-2 font-medium text-center border-b transition-colors ${
                activeTab === 'upload'
                  ? 'border-slate-800 text-slate-900 bg-slate-50/50'
                  : 'border-transparent text-slate-400 hover:text-slate-700 hover:bg-slate-50/50'
              }`}
            >
              Upload Local Files
            </button>
            <button
              onClick={() => setActiveTab('instructions')}
              className={`flex-1 py-2 font-medium text-center border-b transition-colors ${
                activeTab === 'instructions'
                  ? 'border-slate-800 text-slate-900 bg-slate-50/50'
                  : 'border-transparent text-slate-400 hover:text-slate-700 hover:bg-slate-50/50'
              }`}
            >
              Developer Instructions
            </button>
          </div>

          {/* Panel Content */}
          <div className="p-5 overflow-y-auto space-y-4 max-h-[45vh]">
            {activeTab === 'upload' ? (
              <>
                <div className="bg-slate-50 p-3 rounded border border-slate-100 text-[11px] text-slate-500 space-y-1">
                  <p className="font-semibold flex items-center gap-1 text-slate-700">
                    <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
                    How to view your files here:
                  </p>
                  <p className="font-light">Upload the images and videos you took at the camp. They will instantly update the page preview without refreshing.</p>
                </div>

                {/* 1. Campaign Banner */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-600 flex items-center justify-between font-mono">
                    <span>1. BJP CAMPAIGN BANNER</span>
                    {media.facebookBannerUrl ? (
                      <span className="text-[10px] text-emerald-600 flex items-center gap-0.5 font-medium">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-light">Image file</span>
                    )}
                  </label>
                  <div className="relative border border-dashed border-slate-200 hover:border-slate-400 rounded p-2.5 bg-white transition-colors cursor-pointer text-center group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange('facebookBannerUrl', e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                      <FileImage className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-light">{media.facebookBannerUrl ? 'Change Campaign Banner' : 'Upload BJP Facebook Banner'}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Candidate Portrait */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-600 flex items-center justify-between font-mono">
                    <span>2. SRI VIJAY OJHA PHOTO</span>
                    {media.profilePicUrl ? (
                      <span className="text-[10px] text-emerald-600 flex items-center gap-0.5 font-medium">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-light font-sans">Square Portrait (1:1)</span>
                    )}
                  </label>
                  <div className="relative border border-dashed border-slate-200 hover:border-slate-400 rounded p-2.5 bg-white transition-colors cursor-pointer text-center group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange('profilePicUrl', e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                      <FileImage className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-light">{media.profilePicUrl ? 'Change Profile Picture' : 'Upload Candidate Portrait'}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Camp Video */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-600 flex items-center justify-between font-mono">
                    <span>3. CAMP PRESENCE VIDEO</span>
                    {media.campVideoUrl ? (
                      <span className="text-[10px] text-emerald-600 flex items-center gap-0.5 font-medium">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-light">MP4 / Video file</span>
                    )}
                  </label>
                  <div className="relative border border-dashed border-slate-200 hover:border-slate-400 rounded p-2.5 bg-white transition-colors cursor-pointer text-center group">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileChange('campVideoUrl', e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                      <FileVideo className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-light">{media.campVideoUrl ? 'Change Video' : 'Upload Video of Speech/Presence'}</span>
                    </div>
                  </div>
                </div>

                {/* 4. Banner Images */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-600 block font-mono">
                      4. CAMP POSTER 1
                    </label>
                    <div className="relative border border-dashed border-slate-200 hover:border-slate-400 rounded p-2 bg-white transition-colors cursor-pointer text-center group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange('banner1Url', e)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <span className="text-[10px] text-slate-500 block truncate font-light">
                        {media.banner1Url ? 'Update Poster 1' : 'Upload Poster 1'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-600 block font-mono">
                      5. CAMP POSTER 2
                    </label>
                    <div className="relative border border-dashed border-slate-200 hover:border-slate-400 rounded p-2 bg-white transition-colors cursor-pointer text-center group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange('banner2Url', e)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <span className="text-[10px] text-slate-500 block truncate font-light">
                        {media.banner2Url ? 'Update Poster 2' : 'Upload Poster 2'}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-3 text-xs text-slate-600 leading-relaxed font-light">
                <p className="font-semibold text-slate-800 text-sm font-sans">Deployment & Bundling Guide</p>
                <p>The local file uploads in this panel exist temporarily in the browser's memory using local blob URLs. When you close or refresh this tab, they reset to high-quality default design templates.</p>
                
                <div className="bg-slate-50 p-3 rounded space-y-2 border border-slate-100 font-light">
                  <p className="font-semibold text-slate-700 font-sans">To bundle them permanently in your code:</p>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-600">
                    <li>Create a <code className="bg-slate-200/50 px-1 py-0.5 rounded text-slate-800 font-mono">public</code> folder at your root directory if not present.</li>
                    <li>Save your files inside it with the following names:
                      <ul className="list-disc list-inside pl-4 mt-1 font-mono text-[11px] text-slate-700 space-y-0.5">
                        <li>Candidate Photo: <code className="bg-slate-200/50 px-0.5 rounded">profile.jpg</code></li>
                        <li>Camp Video: <code className="bg-slate-200/50 px-0.5 rounded">camp_video.mp4</code></li>
                        <li>Banner 1 Poster: <code className="bg-slate-200/50 px-0.5 rounded">banner1.jpg</code></li>
                        <li>Banner 2 Poster: <code className="bg-slate-200/50 px-0.5 rounded">banner2.jpg</code></li>
                      </ul>
                    </li>
                    <li>The code is pre-configured to look for these files automatically as production fallbacks!</li>
                  </ol>
                </div>
              </div>
            )}
          </div>

          {/* Footer controls */}
          <div className="bg-slate-50 px-5 py-4 border-t border-slate-100 flex gap-3 text-xs">
            <button
              onClick={handleReset}
              className="flex-1 border border-slate-200 text-slate-600 rounded py-2 font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Reset to Defaults
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-slate-900 text-white rounded py-2 font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Close Panel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
