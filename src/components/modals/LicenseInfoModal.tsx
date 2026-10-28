import React from 'react';
import { useMusic } from '../../context/MusicContext';
import { ShieldCheck, X, FileCheck, CheckCircle2 } from 'lucide-react';

export const LicenseInfoModal: React.FC = () => {
  const { isLicenseModalOpen, setIsLicenseModalOpen, lang } = useMusic();

  if (!isLicenseModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#120a22] border border-purple-600/40 rounded-2xl p-5 shadow-2xl text-white max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-800/40">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <h2 className="text-base sm:text-lg font-black font-display text-white">
                {lang === 'hi' ? 'म्यूजिक इंडिया - लाइसेंस व कॉपीराइट नीति' : 'Music Licensing & Compliance'}
              </h2>
              <span className="text-[11px] text-purple-300">
                {lang === 'hi' ? 'पारदर्शिता एवं कानूनी सुरक्षा' : 'Transparency & Legal Compliance'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsLicenseModalOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white bg-purple-950/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs text-slate-200 leading-relaxed">
          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-600/30 flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block mb-0.5">
                {lang === 'hi' ? 'रॉयल्टी-फ्री और अनुमत ऑडियो' : 'Authorized & Royalty-Free Audio'}
              </span>
              <p className="text-slate-300 text-[11px]">
                {lang === 'hi'
                  ? 'इस प्रोटोटाइप में स्ट्रीम किए जा रहे सभी ऑडियो ट्रैक्स ओपन ऑडियो इनिशिएटिव और क्रिएटिव कॉमन्स (CC-BY 4.0) के तहत अधिकृत हैं। कोई भी गाना बिना अनुमति के कॉपीराइट का उल्लंघन नहीं करता।'
                  : 'All audio tracks included in this application prototype are licensed under Creative Commons (CC-BY 4.0) and royalty-free open media distribution.'}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-amber-300">
              {lang === 'hi' ? 'कैटलॉग और डेटा पारदर्शिता' : 'Catalog & Data Transparency'}
            </h3>
            <ul className="space-y-1.5 text-slate-300 list-disc pl-4">
              <li>
                <strong>गीत और कलाकार शीर्षक:</strong> प्रत्येक गीत के मूल शीर्षक, गायक, एल्बम और लाइसेंस का नाम प्लेयर और कैटलॉग में स्पष्ट रूप से प्रदर्शित होता है।
              </li>
              <li>
                <strong>एल्बम कलाकृति (Artwork):</strong> सभी एल्बम कवर्स और ग्राफिक्स ओरिजिनल हाई-रिज़ॉल्यूशन डिजिटल आर्टवर्क हैं।
              </li>
              <li>
                <strong>कमर्शियल डिप्लॉयमेंट:</strong> जब आप इसे भारत में लाखों उपयोगकर्ताओं के लिए लॉन्च करेंगे, तो भारतीय कॉपीराइट अधिनियम (Indian Copyright Act 1957) के अंतर्गत IPRS तथा संबंधित लेबल से लाइसेंस एग्रीमेंट हस्ताक्षरित किया जाना अनिवार्य है।
              </li>
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-[#0c0618] border border-purple-900/40">
            <span className="text-[11px] font-bold text-purple-300 block mb-1">
              संपर्क एवं डीएमसीए नोटिस:
            </span>
            <p className="text-[11px] text-slate-400">
              कॉपीराइट संबंधी किसी भी प्रश्न अथवा लाइसेंस साझेदारी के लिए: legal@musicindia.in पर संपर्क करें।
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-purple-800/40 flex justify-end">
          <button
            onClick={() => setIsLicenseModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-purple-800 hover:bg-purple-700 text-white font-bold text-xs"
          >
            {lang === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
