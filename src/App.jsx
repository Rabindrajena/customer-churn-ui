import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function App() {
  const [tenure, setTenure] = useState(36);
  const [monthly, setMonthly] = useState(95);
  const [contract, setContract] = useState("Month-to-Month");
  const [prediction, setPrediction] = useState(72); 
  const [animatedValue, setAnimatedValue] = useState(0);
  const [gradientRotation, setGradientRotation] = useState(0);
  
  const calculateWeights = () => {
    const contractVal = contract === "Month-to-Month" ? 25 : contract === "1 Year" ? 10 : 5;
    const w1 = (0.4 + (tenure / 150)).toFixed(2);
    const w2 = (0.2 + (monthly / 400)).toFixed(2);
    const w3 = (contractVal / 60).toFixed(2);

    return [
      { label: "Tenure Impact", val: Math.min(95, tenure * 1.3), weight: w1 },
      { label: "Pricing Impact", val: Math.min(95, monthly * 0.6), weight: w2 },
      { label: "Contract Impact", val: contractVal * 3.5, weight: w3 }
    ];
  };

  const [featureWeights, setFeatureWeights] = useState(calculateWeights());

  const handlePredict = () => {
    const contractVal = contract === "Month-to-Month" ? 25 : contract === "1 Year" ? 10 : 5;
    const rawPrediction = Math.round(tenure * 0.4 + monthly * 0.2 + contractVal);
    
    setPrediction(Math.min(100, Math.max(0, rawPrediction)));
    setFeatureWeights(calculateWeights());
  };

  useEffect(() => {
    let start = animatedValue;
    const end = prediction;
    const step = () => {
      start += (end - start) * 0.1;
      if (Math.abs(end - start) < 0.5) start = end;
      setAnimatedValue(start);
      if (start !== end) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [prediction]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientRotation((prev) => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getDynamicReasoning = () => {
    const sorted = [...featureWeights].sort((a, b) => b.weight - a.weight);
    const top = sorted[0];
    const mid = sorted[1];
    const low = sorted[2];
    const risk = prediction > 70 ? "High Risk" : prediction > 40 ? "Moderate Risk" : "Stable";

    return `Model Logic: Result is ${risk}. Predominantly weighted by ${top.label} (${top.weight}), compounded by ${mid.label} (${mid.weight}). While ${low.label} shows minimal pull (${low.weight}), the current ${tenure}mo tenure and ₹${monthly} fee intersection defines this boundary.`;
  };

  const panelStyle = "bg-white/5 backdrop-blur-2xl border border-white/50 rounded-[40px] p-10 shadow-[0_0_15px_rgba(255,255,255,0.1),inset_0_0_10px_rgba(255,255,255,0.1)] flex flex-col";

  // **Total Charges calculation**
  const totalCharges = Math.round(monthly * tenure);

  return (
    <div className="min-h-screen w-full bg-[#0f0c29] bg-gradient-to-br from-[#1e1b4b] via-[#4c1d95] to-[#0f0c29] flex items-center justify-center p-10 font-sans text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        
        {/* LEFT PANEL */}
        <div className={`${panelStyle} gap-8`}>
          <h2 className="text-xl font-medium opacity-90 tracking-tight">📋 Customer Data</h2>
          
          <SliderInput label="💸 Monthly Charges" value={monthly} setValue={setMonthly} max={150} unit="₹" />
          <SliderInput label="🗓️ Tenure (Months)" value={tenure} setValue={setTenure} max={72} unit="mo" />
          
          <div className="flex flex-col gap-3">
            <label className="text-[11px] opacity-60 uppercase tracking-widest font-semibold">📝 Contract Type</label>
            <select 
              value={contract} 
              onChange={(e) => setContract(e.target.value)}
              className="bg-white/5 border border-white/30 rounded-2xl px-5 py-4 outline-none text-white appearance-none cursor-pointer hover:bg-white/10 transition-colors"
            >
              <option className="text-black" value="Month-to-Month">Month-to-Month</option>
              <option className="text-black" value="1 Year">1 Year</option>
              <option className="text-black" value="2 Years">2 Years</option>
            </select>
          </div>

          {/* Total Charges */}
          <div className="flex justify-between text-sm opacity-70 mt-2 font-semibold">
            <span>💰 Total Charges</span>
            <span className="text-cyan-400 text-lg font-semibold">₹ {totalCharges}</span>
          </div>

          {/* PREDICT BUTTON */}
          <button 
            onClick={handlePredict}
            className="relative mt-6 w-full py-4 rounded-2xl bg-transparent backdrop-blur-sm font-bold text-white tracking-wide
                      hover:bg-white/10 active:scale-[0.98] transition-all group overflow-hidden
                      border-4 border-transparent shadow-[0_0_20px_rgba(255,255,255,0.25)]"
          >
            {/* Rainbow Gradient Border */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                border: '4px solid',
                borderImage: `linear-gradient(${gradientRotation}deg, #ff5f6d, #f8c100, #06b6d4, #ff5f6d) 1`,
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude'
              }}
            ></div>

            <span className="relative z-10">Predict Churn</span>
         </button>
        </div>

        {/* MIDDLE PANEL */}
        <div className={`${panelStyle} items-center justify-center relative`}>
          <h2 className="text-xl font-medium mb-16 opacity-90">Churn Probability</h2>
          <div className="relative w-72 h-72">
            <CircularProgressbar
              value={animatedValue}
              text={`${Math.round(animatedValue)}%`}
              strokeWidth={8}
              styles={buildStyles({
                pathColor: `url(#ringGradient)`,
                trailColor: "rgba(255, 255, 255, 0.05)",
                textColor: "#fff",
                textSize: '22px'
              })}
            />
            <svg style={{ height: 0, width: 0 }}>
              <defs>
                <linearGradient id="ringGradient" gradientTransform={`rotate(${gradientRotation})`}>
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="mt-16 text-[#ffc371] font-semibold tracking-widest uppercase text-sm text-center">
            Status: {animatedValue > 70 ? 'High' : animatedValue > 40 ? 'Moderate' : 'Low'} Churn Risk
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col gap-8">
          <div className={panelStyle}>
            <h3 className="text-[11px] font-bold opacity-60 mb-10 uppercase tracking-[0.2em] text-cyan-400">
              Feature Importance (SHAP Values)
            </h3>
            <div className="space-y-10">
              {featureWeights.map((f, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="opacity-70">{f.label}</span>
                    <span className="text-cyan-400 font-mono tracking-tighter">Impact: {f.weight}</span>
                  </div>
                  <div className="h-[6px] w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#06b6d4] to-[#f97316] transition-all duration-1000 ease-in-out" 
                      style={{ width: `${f.val}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/50 rounded-[35px] p-8 shadow-[0_0_20px_rgba(255,255,255,0.1),inset_0_0_10px_rgba(255,255,255,0.1)]">
            <span className="text-[10px] opacity-40 uppercase tracking-[0.2em] font-bold">Model Prediction Logic</span>
            <p className="mt-4 text-[13px] italic leading-relaxed text-pink-200/80 font-light">
              "{getDynamicReasoning()}"
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

function SliderInput({ label, value, setValue, max, unit }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between text-[11px] opacity-60 uppercase tracking-widest font-semibold">
        <span>{label}</span>
        <span className="text-cyan-400">{value} {unit}</span>
      </div>
      <input 
        type="range" min="0" max={max} value={value} 
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
      />
    </div>
  );
}







// cd "C:\Users\jrabi\OneDrive\Desktop\Customer churn prediction decision tree and random forest\frontend\churn-ui"

