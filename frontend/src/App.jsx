import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // --- STATE MANAGEMENT ---
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('Phase 1');
  const [view, setView] = useState('landing'); 
  const [timeLeft, setTimeLeft] = useState({ days: 45, hours: 12, mins: 30, secs: 59 });
  
  const [nameState, setNameState] = useState("");
  const [officeState, setOfficeState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [detailsState, setDetailsState] = useState("");
  const [trackingId, setTrackingId] = useState("");

  // --- LOGIC: BACKEND INTEGRATION ---
  const handleStrategicInquiry = async (e) => {
    e.preventDefault();
    const inquiryData = {
      name: nameState,
      office: officeState,
      email: emailState,
      details: detailsState
    };

    try {
      const response = await axios.post("https://fire-pitch-backend.onrender.com/api/inquiry", inquiryData);
      if (response.status === 201 || response.status === 200) {
        setTrackingId(response.data.trackingId || "VFM-" + Math.floor(Math.random() * 1000));
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Link Error:", error);
      alert("Command Center unreachable.");
    }
  };

  // --- LOGIC: COUNTDOWN ---
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
            <div className="w-10 h-10 bg-black flex flex-col p-1 rounded-sm shadow-xl border border-white/20 group-hover:scale-110 transition-transform">
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
            <a href="#mission" className="hover:text-kenya-red transition-all hover:tracking-[0.4em]">Mission</a>
            <a href="#proposal" className="hover:text-kenya-red transition-all hover:tracking-[0.4em]">Proposal</a>
            <a href="#roadmap" className="hover:text-kenya-red transition-all hover:tracking-[0.4em]">Roadmap</a>
            <a href="#contact" className="hover:text-kenya-red transition-all hover:tracking-[0.4em]">Inquiry</a>
          </div>

          <button 
            onClick={() => setView('admin')}
            className="hidden sm:block bg-white text-black px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-kenya-red hover:text-white transition-all"
          >
            Secure Login
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative bg-[#001A33] pt-48 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div className="animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-black text-[9px] uppercase tracking-[0.4em] mb-10">
              <span className="w-2 h-2 bg-kenya-red rounded-full animate-pulse"></span>
              Strategic Directive 2026-B
            </div>
            <h1 className="text-7xl lg:text-9xl font-black text-white leading-[0.8] mb-10 tracking-tighter uppercase italic">
              Legacy <br /> <span className="text-kenya-red">Valour.</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-lg mb-12 border-l-4 border-kenya-green pl-8">
              Transforming Kenya's emergency response landscape through veteran mentorship.
            </p>
            <div className="flex gap-6">
              <a href="#proposal" className="bg-kenya-red text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:-translate-y-2 transition-all">
                The Proposal
              </a>
            </div>
          </div>
          <div className="relative aspect-square rounded-[4rem] overflow-hidden border-[20px] border-white/5">
             <img src="https://images.unsplash.com/photo-1516533075015-a3838414c3ca?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="Command" />
          </div>
        </div>
      </header>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-32 bg-[#001A33] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-12 rounded-[3rem]">
            {!isSubmitted ? (
              <form onSubmit={handleStrategicInquiry} className="space-y-6">
                <input type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white" value={nameState} onChange={(e) => setNameState(e.target.value)} required />
                <input type="text" placeholder="Office" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white" value={officeState} onChange={(e) => setOfficeState(e.target.value)} required />
                <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white" value={emailState} onChange={(e) => setEmailState(e.target.value)} required />
                <textarea rows="4" placeholder="Details" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white" value={detailsState} onChange={(e) => setDetailsState(e.target.value)} required></textarea>
                <button type="submit" className="w-full bg-white text-black font-black uppercase py-6 rounded-2xl hover:bg-kenya-red hover:text-white transition-all">Submit</button>
              </form>
            ) : (
              <div className="text-center py-20 text-white">
                <h3 className="text-4xl font-black uppercase italic mb-4">Inquiry Logged</h3>
                <p className="text-kenya-red font-mono text-2xl tracking-widest">{trackingId}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 text-[10px] font-black uppercase tracking-[0.5em]">
          &copy; 2026 Republic of Kenya • Ministry of Interior
        </div>
      </footer>
    </div>
  );
}


const AdminDashboard = ({ onBack }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/inquiries')
      .then(res => res.json())
      .then(data => {
        setLogs(data);
        setLoading(false);
      })
      .catch(err => console.error("Access Denied", err));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end border-b border-white/10 pb-8 mb-8">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">
              Secretariat <span className="text-kenya-red">Registry</span>
            </h1>
            <p className="text-kenya-green text-[10px] font-black uppercase tracking-[0.4em] mt-2">
              Security Level: Alpha-Direct
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
                  <th className="p-4">ID</th>
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
                    <td className="p-4">{log.name}</td>
                    <td className="p-4">{log.office}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-kenya-green/10 text-kenya-green text-[9px] font-black rounded-full uppercase">
                        {log.status}
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
export default App;