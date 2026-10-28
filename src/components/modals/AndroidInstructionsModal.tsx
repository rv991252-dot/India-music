import React, { useState } from 'react';
import { useMusic } from '../../context/MusicContext';
import { X, Smartphone, Terminal, Copy, Check, ShieldAlert, Cpu, DownloadCloud, Sparkles } from 'lucide-react';

export const AndroidInstructionsModal: React.FC = () => {
  const { isInstructionsOpen, setIsInstructionsOpen, lang, showToast } = useMusic();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isInstructionsOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    showToast(lang === 'hi' ? 'कमांड कॉपी हो गई!' : 'Command copied!');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const capacitorCommands = `npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Music India" "com.musicindia.app" --web-dir dist
npm run build
npx cap add android
npx cap copy
npx cap open android`;

  const twaCommands = `npm install -g @bubblewrap/cli
bubblewrap init --manifest https://your-domain.com/manifest.json
bubblewrap build`;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#120a22] border border-amber-500/40 rounded-2xl p-5 shadow-2xl text-white max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-800/40">
          <div className="flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-base sm:text-lg font-black font-display text-white">
                {lang === 'hi' ? 'एंड्रॉइड निर्देश व APK तैयार करने की गाइड' : 'Android Testing & APK Build Guide'}
              </h2>
              <span className="text-[11px] text-purple-300">
                {lang === 'hi' ? 'Music India - संपूर्ण तकनीकी विवरण' : 'Technical instructions & APK deployment'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsInstructionsOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white bg-purple-950/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-5 text-xs text-slate-200">
          {/* Section 1: Android Phone Testing */}
          <div className="p-4 rounded-xl bg-[#0c0618] border border-purple-800/40 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-amber-400/20 flex items-center justify-center text-xs">
                १
              </span>
              <span>
                {lang === 'hi' ? 'एंड्रॉइड फोन पर तुरंत लाइव टेस्ट कैसे करें?' : 'Instant Android Device Testing (PWA)'}
              </span>
            </div>
            <p className="leading-relaxed text-slate-300">
              {lang === 'hi' ? (
                <>
                  १. अपने एंड्रॉइड स्मार्टफोन में <strong>Google Chrome</strong> ब्राउज़र खोलें।
                  <br />
                  २. इस ऐप के URL को खोलें और ऊपर दायें कोने में <strong>तीन डॉट्स (⋮)</strong> पर टैप करें।
                  <br />
                  ३. <strong>"Install app"</strong> या <strong>"Add to Home screen" (होम स्क्रीन में जोड़ें)</strong> चुनें।
                  <br />
                  ४. यह आपके फोन पर बिल्कुल नेटिव एंड्रॉइड ऐप की तरह इंस्टॉल हो जाएगा जिसमें <strong>बैकग्राउंड प्लेबैक</strong> और <strong>लॉक-स्क्रीन मीडिया कंट्रोल्स</strong> चालू रहेंगे!
                </>
              ) : (
                <>
                  1. Open this app URL inside Google Chrome on your Android mobile device.
                  <br />
                  2. Tap the three dots (⋮) menu in Chrome.
                  <br />
                  3. Select <strong>"Install app"</strong> or <strong>"Add to Home Screen"</strong>.
                  <br />
                  4. The app launches standalone with notification controls and background playback!
                </>
              )}
            </p>
          </div>

          {/* Section 2: Building Native Android APK */}
          <div className="p-4 rounded-xl bg-[#0c0618] border border-purple-800/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-amber-400/20 flex items-center justify-center text-xs">
                  २
                </span>
                <span>
                  {lang === 'hi' ? 'एंड्रॉइड APK फाइल बनाने के चरण (Capacitor Method)' : 'Build Android APK via Capacitor'}
                </span>
              </div>
              <button
                onClick={() => handleCopy(capacitorCommands, 'cap')}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-purple-900/60 hover:bg-purple-800 text-amber-300 font-semibold text-[11px]"
              >
                {copiedKey === 'cap' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'cap' ? 'कॉपी हो गया' : 'कमांड कॉपी करें'}</span>
              </button>
            </div>

            <pre className="p-3 rounded-lg bg-[#07030e] border border-purple-900/60 font-mono text-[11px] text-amber-200 overflow-x-auto">
              {capacitorCommands}
            </pre>

            <p className="leading-relaxed text-slate-300">
              {lang === 'hi' ? (
                <>
                  • <strong>Android Studio</strong> खुलने के बाद, ऊपर मेनू से <strong>Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong> पर क्लिक करें।
                  <br />
                  • कुछ ही मिनटों में आपकी <code>app-debug.apk</code> या <code>app-release.apk</code> फाइल तैयार हो जाएगी जिसे आप किसी भी एंड्रॉइड फोन में इंस्टॉल कर सकते हैं।
                </>
              ) : (
                <>
                  • In Android Studio, go to <strong>Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong>.
                  <br />
                  • Your production signed <code>app-release.apk</code> will be ready to install on Android phones.
                </>
              )}
            </p>
          </div>

          {/* Section 3: Music Licensing & API Integration Guide */}
          <div className="p-4 rounded-xl bg-[#0c0618] border border-purple-800/40 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-amber-400/20 flex items-center justify-center text-xs">
                ३
              </span>
              <span>
                {lang === 'hi' ? 'म्यूजिक स्ट्रीमिंग API और लाइसेंसिंग गाइड' : 'Licensed Music APIs Architecture'}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-600/30 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-200">
                {lang === 'hi'
                  ? 'महत्वपूर्ण नियम: कभी भी बिना अनुमति कॉपीराइट बॉलीवुड गानों को गैर-कानूनी तरीके से स्ट्रीम न करें। म्यूजिक इंडस्ट्री में कानूनी अनुमति (IPRS / PPL लाइसेंस) या ओपन एपीआई की आवश्यकता होती है।'
                  : 'Important: Never stream copyrighted Bollywood songs without mechanical and digital performance rights licenses (IPRS/PPL). Always use authorized endpoints.'}
              </p>
            </div>

            <div className="space-y-1.5 text-slate-300">
              <p>
                <strong>१. फ्री व रॉयल्टी-मुक्त कैटलॉग:</strong> Jamendo Developer API (५ लाख+ गाने मुफ्त व लीगल), Free Music Archive (FMA API), Audiomack API.
              </p>
              <p>
                <strong>२. व्यावसायिक कमर्शियल स्ट्रीमिंग:</strong> यदि आप बड़े लेबल (T-Series, Zee Music, Yash Raj, Sony Music India) का संगीत स्ट्रीम करना चाहते हैं, तो <strong>IPRS (The Indian Performing Right Society)</strong> और <strong>PPL India</strong> से डिजिटल स्ट्रीमिंग लाइसेंस प्राप्त करें।
              </p>
              <p>
                <strong>३. ऑडियो CDN होस्टिंग:</strong> अपने स्वतंत्र अधिकृत गानों की MP3/FLAC फाइल्स को Cloudflare R2 या AWS S3 पर रखें और Cloudflare CDN के माध्यम से स्ट्रीम करें (बैंडविड्थ लागत लगभग ₹० से ₹२ प्रति GB होती है)।
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-purple-800/40 flex justify-end">
          <button
            onClick={() => setIsInstructionsOpen(false)}
            className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs"
          >
            {lang === 'hi' ? 'समझ गया' : 'Got it'}
          </button>
        </div>
      </div>
    </div>
  );
};
