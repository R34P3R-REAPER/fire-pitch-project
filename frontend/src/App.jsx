import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- SUB-COMPONENT: ADMIN DASHBOARD (Terminal Style) ---
const AdminDashboard = ({ onBack }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://fire-pitch-backend.onrender.com/api/admin/inquiries')
      .then(res => {
        setLogs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Access Denied", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end border-b border-white/10 pb-8 mb-8">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">
              Secretariat <span className="text-kenya-red">Registry</span>
            </h1>
            <p className="text-kenya-green text-[10px] font-black uppercase tracking-[0.4em] mt-2">
              Security Level: Alpha-Direct // Republic of Kenya
            </p>
          </div>
          <button onClick={onBack} className="text-[10px] font-black uppercase tracking-widest border border-white/20 px-6 py-2 hover:bg-white hover:text-black transition">
            Exit Terminal
          </button>
        </div>

        {loading ? (
          <div className="animate-pulse text-gray-500">Decrypting Registry...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/5">
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Tracking ID</th>
                  <th className="p-4">Official</th>
                  <th className="p-4">Jurisdiction</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {logs.map((log) => (
                  <tr key={log._id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="p-4 text-gray-500">{new Date(log.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 font-bold text-kenya-red">{log.trackingId}</td>
                    <td className="p-4 font-medium">{log.name}</td>
                    <td className="p-4 opacity-80">{log.office}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-kenya-green/10 text-kenya-green text-[9px] font-black rounded-full uppercase">
                        {log.status || 'Verified'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN COMPONENT: APP ---
function App() {
  const [view, setView] = useState('landing'); 
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('Phase 1');
  const [timeLeft, setTimeLeft] = useState({ days: 45, hours: 12, mins: 30, secs: 59 });
  
  const [nameState, setNameState] = useState("");
  const [officeState, setOfficeState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [detailsState, setDetailsState] = useState("");
  const [trackingId, setTrackingId] = useState("");

  const handleStrategicInquiry = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://fire-pitch-backend.onrender.com/api/inquiry", {
        name: nameState, office: officeState, email: emailState, details: detailsState
      });
      if (response.status === 201 || response.status === 200) {
        setTrackingId(response.data.trackingId || "VFM-" + Math.floor(Math.random() * 1000));
        setIsSubmitted(true);
      }
    } catch (error) {
      alert("Command Center unreachable. Check connection.");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => ({ ...prev, secs: prev.secs > 0 ? prev.secs - 1 : 59 }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (view === 'admin') return <AdminDashboard onBack={() => setView('landing')} />;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans selection:bg-kenya-red selection:text-white scroll-smooth">
      {/* --- TOP TACTICAL ALERT BAR --- */}
      <div className="bg-kenya-red py-2 px-6 flex justify-center items-center gap-8 overflow-hidden whitespace-nowrap border-b border-black/10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 animate-marquee">
            <span className="text-[9px] font-black text-white uppercase tracking-[.4em]">System Status: Operational</span>
            <span className="w-1 h-1 bg-white rounded-full"></span>
            <span className="text-[9px] font-black text-white uppercase tracking-[.4em]">Council Review: In Progress</span>
            <span className="w-1 h-1 bg-white rounded-full"></span>
          </div>
        ))}
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="fixed w-full z-50 top-10 md:top-8 bg-[#001A33]/90 backdrop-blur-xl border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-black flex flex-col p-1 rounded-sm shadow-xl border border-white/20">
              <div className="flex-1 bg-black"></div>
              <div className="flex-1 bg-kenya-red"></div>
              <div className="flex-1 bg-kenya-green"></div>
            </div>
            <div>
              <span className="font-black text-2xl tracking-tighter uppercase italic block leading-none">VFM <span className="text-kenya-red">TASKFORCE</span></span>
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Republic of Kenya</span>
            </div>
          </div>
          <div className="hidden lg:flex gap-10 font-bold text-[10px] uppercase tracking-[0.25em] text-gray-400">
            <a href="#mission" className="hover:text-kenya-red transition-all">Mission</a>
            <a href="#proposal" className="hover:text-kenya-red transition-all">Proposal</a>
            <a href="#roadmap" className="hover:text-kenya-red transition-all">Roadmap</a>
            <a href="#contact" className="hover:text-kenya-red transition-all">Inquiry</a>
          </div>
          <button onClick={() => setView('admin')} className="bg-white text-black px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-kenya-red hover:text-white transition-all">
            Secure Login
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative bg-[#001A33] pt-48 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div className="animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-black text-[9px] uppercase tracking-[0.4em] mb-10">
              <span className="w-2 h-2 bg-kenya-red rounded-full animate-pulse shadow-[0_0_10px_#ff0000]"></span>
              Strategic Directive 2026-B
            </div>
            <h1 className="text-7xl lg:text-9xl font-black text-white leading-[0.8] mb-10 tracking-tighter uppercase italic">
              Legacy <br /> <span className="text-kenya-red">Valour.</span> <br /> 
              <span className="opacity-40">Safety.</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-lg mb-12 leading-relaxed font-medium border-l-4 border-kenya-green pl-8">
              Transforming Kenya's emergency response landscape through the institutionalized mentorship of veteran commanders.
            </p>
            <div className="flex gap-6">
              <a href="#proposal" className="bg-kenya-red text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest shadow-2xl hover:-translate-y-2 transition-all">
                The Full Proposal
              </a>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Enrollment</span>
                <span className="text-white font-mono text-xl font-black">47 / 47 COUNTIES</span>
              </div>
            </div>
          </div>
          <div className="relative group aspect-square rounded-[4rem] overflow-hidden border-[20px] border-white/5 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1516533075015-a3838414c3ca?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Command" />
          </div>
        </div>
      </header>

      {/* --- MISSION SECTION --- */}
      <section id="mission" className="py-32 bg-[#F1F5F9] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
             <div>
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 italic">The Strategic Mandate</h2>
                <p className="text-2xl text-gray-700 leading-snug font-medium mb-10 italic">
                  "To leverage the expertise of retired fire commanders to create a world-class emergency response standard across Kenya."
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div><p className="text-4xl font-black text-kenya-red">12,000+</p><p className="text-[10px] font-bold uppercase text-gray-500">Personnel Trained</p></div>
                  <div><p className="text-4xl font-black text-kenya-green">100%</p><p className="text-[10px] font-bold uppercase text-gray-500">County Coverage</p></div>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="h-64 bg-kenya-red rounded-3xl p-8 flex flex-col justify-end text-white font-black uppercase tracking-widest">Veteran Mentorship</div>
                <div className="h-64 bg-black rounded-3xl p-8 flex flex-col justify-end text-white font-black uppercase tracking-widest">Unified Command</div>
             </div>
          </div>
        </div>
      </section>

      {/* --- ROADMAP SECTION --- */}
      <section id="roadmap" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-16 text-center">Execution <span className="text-kenya-red">Roadmap</span></h2>
           <div className="grid md:grid-cols-3 gap-8">
              {['Phase 1: Audit', 'Phase 2: Deployment', 'Phase 3: Integration'].map((phase, i) => (
                <div key={i} className={`p-10 rounded-[3rem] border-2 ${activeTab.includes(phase.split(':')[0]) ? 'border-kenya-red bg-slate-50' : 'border-slate-100'}`}>
                   <span className="text-kenya-red font-black text-[10px] uppercase">Stage 0{i+1}</span>
                   <h3 className="text-xl font-black uppercase italic mt-2 mb-4">{phase}</h3>
                   <p className="text-gray-500 text-sm font-medium">Strategic standardization of equipment and protocols nationwide.</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-32 bg-[#001A33] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-12 lg:p-20 rounded-[3rem] shadow-2xl">
            {!isSubmitted ? (
              <form onSubmit={handleStrategicInquiry} className="max-w-3xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-kenya-red outline-none font-bold" value={nameState} onChange={(e) => setNameState(e.target.value)} required />
                  <input type="text" placeholder="Office / County" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-kenya-red outline-none font-bold" value={officeState} onChange={(e) => setOfficeState(e.target.value)} required />
                </div>
                <input type="email" placeholder="Official Email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-kenya-red outline-none font-bold" value={emailState} onChange={(e) => setEmailState(e.target.value)} required />
                <textarea rows="4" placeholder="Strategic Inquiry Details..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-kenya-red outline-none font-bold resize-none" value={detailsState} onChange={(e) => setDetailsState(e.target.value)} required></textarea>
                <button type="submit" className="w-full bg-white text-black font-black uppercase py-6 rounded-2xl hover:bg-kenya-red hover:text-white transition-all shadow-xl">Submit to Secretariat</button>
              </form>
            ) : (
              <div className="text-center py-20 animate-in zoom-in-95">
                <h3 className="text-4xl font-black text-white uppercase italic mb-4">Inquiry Logged</h3>
                <p className="text-kenya-red font-mono text-2xl tracking-widest">{trackingId}</p>
                <button onClick={() => setIsSubmitted(false)} className="mt-8 text-gray-500 font-bold uppercase text-[10px] tracking-widest underline">New Inquiry</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-white py-16 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.5em]">&copy; 2026 Republic of Kenya • Ministry of Interior</p>
      </footer>
    </div>
  );
}

export default App;