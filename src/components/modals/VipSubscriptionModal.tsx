import React, { useState } from 'react';
import { useMusic } from '../../context/MusicContext';
import {
  Crown,
  Check,
  X,
  ShieldCheck,
  Zap,
  Sparkles,
  Copy,
  ExternalLink,
  QrCode,
  Smartphone,
  ArrowLeft,
  CheckCircle2,
  Wallet,
} from 'lucide-react';

export const VipSubscriptionModal: React.FC = () => {
  const {
    isVipModalOpen,
    setIsVipModalOpen,
    upiConfig,
    confirmSubscriptionPayment,
    lang,
    user,
    showToast,
  } = useMusic();

  const [selectedPlanId, setSelectedPlanId] = useState<'individual' | 'student' | 'family'>('individual');
  const [checkoutStep, setCheckoutStep] = useState<'plan_select' | 'upi_payment' | 'success'>('plan_select');
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isVipModalOpen) return null;

  const plans = [
    {
      id: 'student' as const,
      nameHi: 'स्टूडेंट स्पेशल (छात्र)',
      nameEn: 'Student VIP',
      amount: 49,
      price: '₹49',
      periodHi: 'प्रति माह',
      periodEn: 'per month',
      descriptionHi: 'कॉलेज और स्कूल छात्रों के लिए 50% छूट',
      descriptionEn: '50% discount for college & school students',
      badge: 'बचत 50%',
    },
    {
      id: 'individual' as const,
      nameHi: 'इंडिविजुअल (व्यक्तिगत)',
      nameEn: 'Individual VIP',
      amount: 99,
      price: '₹99',
      periodHi: 'प्रति माह',
      periodEn: 'per month',
      descriptionHi: '1 खाते के लिए असीमित हाई-क्वालिटी संगीत',
      descriptionEn: 'Unlimited high-fidelity music for 1 account',
      badge: 'सबसे लोकप्रिय',
    },
    {
      id: 'family' as const,
      nameHi: 'फैमिली पैक (परिवार)',
      nameEn: 'Family VIP',
      amount: 149,
      price: '₹149',
      periodHi: 'प्रति माह',
      periodEn: 'per month',
      descriptionHi: 'परिवार के 6 सदस्यों के लिए अलग-अलग प्रोफाइल',
      descriptionEn: 'Up to 6 family profiles with individual likes',
      badge: 'सर्वश्रेष्ठ मूल्य',
    },
  ];

  const currentPlan = plans.find((p) => p.id === selectedPlanId) || plans[1];
  const targetUpiId = upiConfig.upiId || '6398028792@pthdfc';
  const payeeName = upiConfig.payeeName || 'Music India';

  // Standard NPCI UPI URI Scheme
  const upiUrl = `upi://pay?pa=${encodeURIComponent(targetUpiId)}&pn=${encodeURIComponent(payeeName)}&am=${currentPlan.amount}&cu=INR&tn=${encodeURIComponent(`MusicIndia VIP ${currentPlan.id}`)}`;

  // Direct app intents
  const phonePeUrl = `phonepe://pay?pa=${encodeURIComponent(targetUpiId)}&pn=${encodeURIComponent(payeeName)}&am=${currentPlan.amount}&cu=INR&tn=${encodeURIComponent(`MusicIndia VIP ${currentPlan.id}`)}`;
  const gpayUrl = `gpay://upi/pay?pa=${encodeURIComponent(targetUpiId)}&pn=${encodeURIComponent(payeeName)}&am=${currentPlan.amount}&cu=INR&tn=${encodeURIComponent(`MusicIndia VIP ${currentPlan.id}`)}`;
  const paytmUrl = `paytmmp://pay?pa=${encodeURIComponent(targetUpiId)}&pn=${encodeURIComponent(payeeName)}&am=${currentPlan.amount}&cu=INR&tn=${encodeURIComponent(`MusicIndia VIP ${currentPlan.id}`)}`;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(upiUrl)}`;

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText(targetUpiId);
    setCopiedUpi(true);
    showToast(lang === 'hi' ? `UPI ID कॉपी हो गई: ${targetUpiId}` : `UPI ID copied: ${targetUpiId}`);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleAutofillDemoUtr = () => {
    const randomUtr = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    setUtrNumber(randomUtr);
  };

  const handleVerifyPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber.trim() || utrNumber.trim().length < 8) {
      showToast(lang === 'hi' ? 'कृपया सही 12-अंकों का UPI UTR/संदर्भ संख्या दर्ज करें' : 'Please enter valid UPI Reference / UTR Number');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      confirmSubscriptionPayment(currentPlan.id, currentPlan.nameHi, currentPlan.amount, utrNumber.trim());
      setCheckoutStep('success');
    }, 1200);
  };

  const handleClose = () => {
    setIsVipModalOpen(false);
    setCheckoutStep('plan_select');
    setUtrNumber('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#130b24] border border-amber-500/40 rounded-2xl p-5 shadow-2xl text-white max-h-[92vh] flex flex-col overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-purple-950/60 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: Plan Selection */}
        {checkoutStep === 'plan_select' && (
          <div className="space-y-4">
            {/* Header Icon */}
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 mx-auto mb-2 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <div className="w-full h-full bg-[#110822] rounded-full flex items-center justify-center">
                  <Crown className="w-7 h-7 text-amber-400 fill-amber-400" />
                </div>
              </div>
              <h2 className="text-xl font-black font-display bg-gradient-to-r from-amber-300 via-amber-200 to-white bg-clip-text text-transparent">
                Music India VIP
              </h2>
              <p className="text-xs text-purple-300 mt-0.5">
                {lang === 'hi' ? 'सीधे UPI द्वारा भुगतान करें और VIP सक्रिय करें' : 'Pay via UPI directly & activate VIP'}
              </p>
            </div>

            {/* Plan Cards */}
            <div className="space-y-2">
              {plans.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-purple-950/80 border-amber-400 shadow-md shadow-amber-500/10'
                        : 'bg-[#180f2d] border-purple-900/40 hover:border-purple-700/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          {lang === 'hi' ? plan.nameHi : plan.nameEn}
                        </span>
                        {plan.badge && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/40">
                            {plan.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-300 block mt-0.5">
                        {lang === 'hi' ? plan.descriptionHi : plan.descriptionEn}
                      </span>
                    </div>

                    <div className="text-right shrink-0 ml-2">
                      <span className="text-base font-black text-amber-300 font-display">
                        {plan.price}
                      </span>
                      <span className="text-[10px] text-slate-400 block -mt-1">
                        {lang === 'hi' ? plan.periodHi : plan.periodEn}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Feature List */}
            <div className="p-3 rounded-xl bg-[#0c0618] border border-purple-900/30 space-y-1.5">
              <span className="text-[11px] font-bold text-amber-400 block mb-1">
                {lang === 'hi' ? 'वीआईपी सदस्य सुविधाएं:' : 'VIP Member Benefits:'}
              </span>
              {[
                lang === 'hi' ? '100% विज्ञापन-मुक्त निर्बाध संगीत' : '100% Ad-Free uninterrupted music',
                lang === 'hi' ? '320 kbps अल्ट्रा लॉसलेस HD ऑडियो' : '320 kbps Ultra Lossless HD Audio',
                lang === 'hi' ? 'असीमित ऑफलाइन गाने डाउनलोड करें' : 'Unlimited offline song downloads',
                lang === 'hi' ? 'बैकग्राउंड प्ले और एंड्रॉइड लॉक-स्क्रीन नियंत्रण' : 'Background play & Android lock-screen controls',
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Advance to UPI Checkout */}
            <button
              onClick={() => setCheckoutStep('upi_payment')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-400/30 active:scale-95 transition-all"
            >
              <Wallet className="w-4 h-4 fill-slate-950" />
              <span>
                {lang === 'hi'
                  ? `UPI से ₹${currentPlan.amount} का भुगतान करें`
                  : `Pay ₹${currentPlan.amount} via UPI`}
              </span>
            </button>
          </div>
        )}

        {/* STEP 2: Live UPI Payment with User Account (6398028792@pthdfc) */}
        {checkoutStep === 'upi_payment' && (
          <div className="space-y-4">
            <button
              onClick={() => setCheckoutStep('plan_select')}
              className="text-xs text-purple-300 hover:text-white flex items-center gap-1 mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'प्लान बदलें' : 'Back to plans'}</span>
            </button>

            {/* Amount & Beneficiary Card */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-950/80 via-[#190f30] to-[#120824] border border-amber-500/50 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-purple-300 font-semibold block">
                    {lang === 'hi' ? 'भुगतान राशि (Amount to Pay)' : 'Amount to Pay'}
                  </span>
                  <span className="text-2xl font-black text-amber-300 font-display">
                    ₹{currentPlan.amount}
                  </span>
                  <span className="text-[11px] text-slate-300 block">
                    {currentPlan.nameHi}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40">
                    {lang === 'hi' ? 'डायरेक्ट खाता' : 'Direct Account'}
                  </span>
                </div>
              </div>

              {/* UPI ID Copy Box */}
              <div className="mt-3 pt-3 border-t border-purple-800/40 flex items-center justify-between gap-2 bg-[#0b0517] p-2.5 rounded-lg border border-purple-900/50">
                <div className="min-w-0">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">
                    {lang === 'hi' ? 'खाता UPI आईडी (Receiver UPI ID):' : 'Receiver UPI ID:'}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-amber-300 font-mono select-all block truncate">
                    {targetUpiId}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="px-2.5 py-1.5 rounded-md bg-purple-900/80 hover:bg-purple-800 text-amber-300 font-semibold text-xs flex items-center gap-1 shrink-0 active:scale-95 transition-all"
                  title="UPI ID कॉपी करें"
                >
                  {copiedUpi ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">{lang === 'hi' ? 'कॉपी हुआ' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === 'hi' ? 'कॉपी करें' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Android UPI App Links */}
            <div>
              <span className="text-xs font-bold text-slate-200 block mb-2 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'hi' ? 'UPI ऐप से सीधे भुगतान करें:' : 'Pay directly via UPI App:'}</span>
              </span>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={phonePeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#0f0820] hover:bg-purple-900/40 border border-purple-800/50 flex items-center justify-center gap-2 text-xs font-bold text-white transition-all active:scale-95"
                >
                  <div className="w-5 h-5 rounded-full bg-[#5f259f] flex items-center justify-center text-[10px] font-black text-white">
                    पे
                  </div>
                  <span>PhonePe</span>
                </a>

                <a
                  href={gpayUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#0f0820] hover:bg-purple-900/40 border border-purple-800/50 flex items-center justify-center gap-2 text-xs font-bold text-white transition-all active:scale-95"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-black text-white">
                    G
                  </div>
                  <span>Google Pay</span>
                </a>

                <a
                  href={paytmUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#0f0820] hover:bg-purple-900/40 border border-purple-800/50 flex items-center justify-center gap-2 text-xs font-bold text-white transition-all active:scale-95"
                >
                  <div className="w-5 h-5 rounded-full bg-[#002e6e] flex items-center justify-center text-[9px] font-black text-white">
                    Pay
                  </div>
                  <span>Paytm</span>
                </a>

                <a
                  href={upiUrl}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-purple-900/30 border border-amber-500/40 flex items-center justify-center gap-2 text-xs font-bold text-amber-300 transition-all active:scale-95"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'अन्य UPI ऐप' : 'Any UPI App'}</span>
                </a>
              </div>
            </div>

            {/* Scan QR Code Box */}
            <div className="p-3 rounded-xl bg-[#0c0618] border border-purple-900/40 text-center">
              <span className="text-[11px] font-bold text-slate-300 block mb-2 flex items-center justify-center gap-1">
                <QrCode className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'hi' ? 'या QR कोड स्कैन करके ₹' + currentPlan.amount + ' भेजें:' : 'Or Scan QR Code to Pay:'}</span>
              </span>

              <div className="w-44 h-44 mx-auto p-2 bg-white rounded-xl shadow-lg border-2 border-amber-400/80 flex items-center justify-center">
                <img
                  src={qrImageUrl}
                  alt="UPI QR Code"
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="text-[10px] text-slate-400 mt-2">
                {lang === 'hi'
                  ? 'GPay, PhonePe, Paytm या BHIM से स्कैन करें। राशि सीधे आपके खाते में क्रेडिट होगी।'
                  : 'Scan with any UPI app. Funds will be directly credited to your account.'}
              </p>
            </div>

            {/* UTR / Transaction Reference Form */}
            <form onSubmit={handleVerifyPayment} className="p-3.5 rounded-xl bg-[#170e2d] border border-purple-700/50 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-300 block">
                  {lang === 'hi' ? 'भुगतान के बाद 12-अंकों का UTR नंबर डालें:' : 'Enter 12-digit UPI UTR / Ref No.:'}
                </label>
                <button
                  type="button"
                  onClick={handleAutofillDemoUtr}
                  className="text-[10px] text-purple-300 hover:text-amber-300 underline"
                >
                  {lang === 'hi' ? 'डेमो UTR भरें' : 'Demo Fill'}
                </button>
              </div>

              <input
                type="text"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value.replace(/[^0-9a-zA-Z]/g, ''))}
                placeholder="e.g. 429812984512"
                maxLength={18}
                required
                className="w-full h-10 px-3 bg-[#0a0515] border border-amber-500/50 rounded-lg text-sm font-mono text-center text-white focus:outline-none focus:border-amber-400"
              />

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all disabled:opacity-75"
              >
                {isVerifying ? (
                  <span>{lang === 'hi' ? 'सत्यापित हो रहा है...' : 'Verifying UTR...'}</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{lang === 'hi' ? 'पेमेंट सत्यापित करें व VIP सक्रिय करें' : 'Verify Payment & Activate VIP'}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: Payment Success Celebration */}
        {checkoutStep === 'success' && (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">
                {lang === 'hi' ? 'बधाई हो!' : 'Congratulations!'}
              </span>
              <h2 className="text-xl font-black text-white font-display mt-0.5">
                {lang === 'hi' ? 'भुगतान सफल व सत्यापित!' : 'Payment Verified Successfully!'}
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto leading-relaxed">
                {lang === 'hi'
                  ? `₹${currentPlan.amount} का भुगतान खाता UPI (${targetUpiId}) में रिकॉर्ड हो गया है। आपका Music India VIP तुरंत चालू कर दिया गया है!`
                  : `₹${currentPlan.amount} received at ${targetUpiId}. Your Music India VIP is now active!`}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#0c0618] border border-purple-900/40 text-xs text-left space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'hi' ? 'सदस्यता प्लान:' : 'Plan:'}</span>
                <span className="font-bold text-white">{currentPlan.nameHi}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'hi' ? 'भुगतान खाता:' : 'Receiver UPI:'}</span>
                <span className="font-mono text-amber-300">{targetUpiId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'hi' ? 'UTR संदर्भ संख्या:' : 'UTR Ref:'}</span>
                <span className="font-mono text-emerald-400">{utrNumber || '429812984512'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'hi' ? 'वैधता:' : 'Validity:'}</span>
                <span className="font-bold text-amber-400">31 दिसंबर 2027</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm active:scale-95 transition-all shadow-lg"
            >
              {lang === 'hi' ? 'प्रीमियम संगीत सुनना शुरू करें' : 'Start Streaming VIP Music'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
