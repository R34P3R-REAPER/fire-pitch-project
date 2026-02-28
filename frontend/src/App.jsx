import React, { useState } from 'react';
import axios from 'axios';

// --- THE SECRETARIAT ARCHIVE (ADMIN) ---
const SecretariatArchive = ({ onBack }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    axios.get('https://kenfiba-backend.onrender.com/api/admin/archives')
      .then(res => { setLogs(res.data); setLoading(false); })
      .catch(err => { console.error("Database connection failed", err); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f2f1] p-10 font-serif">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl border-t-[12px] border-red-700">
        <div className="p-10 border-b border-gray-200">
          <h1 className="text-4xl font-black text-[#1a1a1a] uppercase tracking-tighter">National Secretariat Registry</h1>
          <p className="text-sm text-gray-500 mt-2 font-sans tracking-widest uppercase font-bold italic">
            Certificate No. 21578 | Established 15th July 2002 | Sheria House, Nairobi
          </p>
        </div>
        <div className="p-8">
          {loading ? <p className="text-center py-24 font-sans italic text-gray-400">Authenticating with Registrar of Societies...</p> : (
            <table className="w-full text-left font-sans text-sm border-collapse">
              <thead className="bg-gray-100 text-gray-600 uppercase text-[10px] tracking-[0.2em] font-black border-b border-gray-300">
                <tr><th className="p-5">Registry Date</th><th className="p-5">Ref ID</th><th className="p-5">Jurisdiction / Office</th><th className="p-5">Status</th></tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log._id} className="border-b border-gray-100 hover:bg-red-50 transition-colors">
                    <td className="p-5 font-medium">{new Date(log.createdAt).toLocaleDateString()}</td>
                    <td className="p-5 font-mono font-bold text-red-700">{log.trackingId}</td>
                    <td className="p-5 uppercase font-bold text-gray-700">{log.office}</td>
                    <td className="p-5"><span className="bg-green-100 text-green-800 px-3 py-1 text-[10px] font-black tracking-tighter rounded">VERIFIED RECORD</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="p-8 bg-gray-50 flex justify-between items-center">
            <span className="text-[10px] text-gray-400 uppercase font-sans">Official Correspondence Archive • Republic of Kenya</span>
            <button onClick={onBack} className="bg-[#1a1a1a] text-white px-10 py-3 font-black uppercase text-xs tracking-widest hover:bg-red-700 transition">Close Secure Session</button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PORTAL ---
function App() {
  const [view, setView] = useState('landing');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [form, setForm] = useState({ name: "", office: "", email: "", details: "" });

  const handleInquiry = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://kenfiba-backend.onrender.com/api/inquiry", form);
      setTrackingId(res.data.trackingId);
      setIsSubmitted(true);
    } catch (err) { alert("Registry Database Offline. Please use official telephone lines."); }
  };

  if (view === 'admin') return <SecretariatArchive onBack={() => setView('landing')} />;

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-serif leading-relaxed selection:bg-red-700 selection:text-white">
      
      {/* SOVEREIGN UTILITY BAR */}
      <div className="bg-[#1a1a1a] py-2 px-6 md:px-16 flex justify-between items-center text-[10px] text-white/70 font-sans font-bold tracking-[0.2em] uppercase">
        <div className="flex gap-8">
          <span className="flex items-center gap-2">Republic of Kenya</span>
          <span className="hidden md:inline border-l border-white/20 pl-8 text-red-500">Societies Act (Cap 108) • Reg No. 21578</span>
        </div>
        <div className="flex gap-6">
          <button onClick={() => setView('admin')} className="hover:text-white transition">Secretariat Login</button>
          <span className="hidden lg:inline text-white/30">|</span>
          <span className="hidden lg:inline">Est. July 15, 2002</span>
        </div>
      </div>

      {/* NATIONAL NAVIGATION */}
      <nav className="border-b border-gray-200 px-6 md:px-16 h-28 flex items-center justify-between bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="w-16 h-16 border-4 border-red-700 flex flex-col p-1 shadow-sm">
            <div className="flex-1 bg-black"></div><div className="flex-1 bg-red-700"></div><div className="flex-1 bg-green-700"></div>
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter leading-none italic">KENFIBA</h1>
            <p className="text-[9px] font-sans font-black text-gray-500 uppercase tracking-[0.4em] mt-2">National Fire Brigades Association</p>
          </div>
        </div>
        <div className="hidden lg:flex gap-12 font-sans text-[11px] font-black uppercase tracking-[0.2em]">
          <a href="#about" className="hover:text-red-700 transition underline-offset-8 hover:underline decoration-2">The Charter</a>
          <a href="#objectives" className="hover:text-red-700 transition underline-offset-8 hover:underline decoration-2">Strategic Pillars</a>
          <a href="#registry" className="bg-[#1a1a1a] text-white px-8 py-3 hover:bg-red-700 transition shadow-lg">Inquire Today</a>
        </div>
      </nav>

      {/* HERO: EXECUTIVE PRESENTATION */}
      <header className="py-24 px-6 md:px-16 bg-[#fafafa] border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-3/5">
            <div className="bg-red-700 h-1.5 w-24 mb-10"></div>
            <h2 className="text-7xl font-black tracking-tighter leading-[0.9] mb-10 italic">
              Safeguarding <br/>The <span className="text-red-700 underline decoration-8 underline-offset-4">Nation.</span>
            </h2>
            <p className="text-2xl text-gray-700 mb-14 max-w-2xl font-light leading-snug">
              "Support the firemen; the next life they save might be yours." — Established in 2002 by fire officers countrywide to protect the socio-economic well-being of all Kenyan communities.
            </p>
            <div className="flex flex-wrap gap-8 items-center">
              <a href="#registry" className="bg-red-700 text-white px-12 py-5 font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-xl">Official Correspondence</a>
              <div className="text-left font-sans border-l-2 border-gray-200 pl-8">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">HQ Address</p>
                <p className="text-sm font-bold">Tom Mboya St, Nairobi</p>
              </div>
            </div>
          </div>
          <div className="lg:w-2/5 relative">
             <div className="absolute -inset-4 border-2 border-red-700/20 translate-x-8 translate-y-8"></div>
             <img src="https://images.unsplash.com/photo-1516533075015-a3838414c3ca?q=80&w=1200&auto=format&fit=crop" className="relative shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" alt="Professional Readiness" />
          </div>
        </div>
      </header>

      {/* THE CHARTER (EXACT INFO FROM DOCUMENTS) */}
      <section id="about" className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div className="sticky top-40">
            <h3 className="text-5xl font-black italic tracking-tighter mb-8 leading-tight text-red-700">The 2002 <br/>Charter.</h3>
            <p className="text-gray-500 font-sans text-xs uppercase tracking-[0.4em] font-bold">Sheria House Registration No. 21578</p>
            <div className="mt-12 p-8 bg-gray-50 border-l-4 border-red-700 italic text-gray-600">
               "To act as the professional voice of Kenya Fire Brigades, supporting members to fulfill leadership roles in fire service matters."
            </div>
          </div>
          <div className="space-y-20">
            <div>
              <h4 className="text-[11px] font-sans font-black uppercase text-red-700 tracking-[0.3em] mb-4">The National Vision</h4>
              <p className="text-3xl font-bold italic leading-tight text-[#1a1a1a]">"Making Kenya society safer through considered professional utilization of Fire Service Resources."</p>
            </div>
            <div>
              <h4 className="text-[11px] font-sans font-black uppercase text-red-700 tracking-[0.3em] mb-4">The Strategic Mission</h4>
              <p className="text-3xl font-bold italic leading-tight text-[#1a1a1a]">"To reduce deaths, injuries, and damages of property caused by fire and other related hazards across all local communities."</p>
            </div>
            <div>
              <h4 className="text-[11px] font-sans font-black uppercase text-red-700 tracking-[0.3em] mb-4">The Security Mandate</h4>
              <p className="text-3xl font-bold italic leading-tight text-[#1a1a1a]">"Reducing loss after fire attacks—both naturally caused and those resulting from terrorist attacks."</p>
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIC OBJECTIVES (GRID SYSTEM) */}
      <section id="objectives" className="py-24 bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
           <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <h3 className="text-5xl font-black italic tracking-tighter leading-none">Association <br/><span className="text-red-600 underline">Objectives.</span></h3>
              <p className="text-gray-400 font-sans text-xs uppercase tracking-widest max-w-sm">Working with Stakeholders and employing authorities (Councils) to influence public policy.</p>
           </div>
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 font-sans">
              {[
                { h: "Public Policy", p: "Influencing public policy opinion in Kenyan, African, and International communities." },
                { h: "Professional Standards", p: "Improving expertise and skills to ensure member competence and operational effectiveness." },
                { h: "Service Networks", p: "Providing appropriate networks to facilitate professional methods of working." },
                { h: "Social Well-being", p: "Improving the social and environmental well-being of all Kenyan communities." }
              ].map((obj, i) => (
                <div key={i} className="p-10 border border-white/10 hover:border-red-600 transition-all bg-white/5">
                  <h5 className="font-black uppercase text-[10px] tracking-widest text-red-600 mb-6 underline">Pillar {i+1}</h5>
                  <h6 className="text-lg font-bold mb-4 italic">{obj.h}</h6>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">{obj.p}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* LEADERSHIP & OFFICE BEARERS */}
      <section className="py-32 bg-white max-w-7xl mx-auto px-6 md:px-16 text-center">
         <h3 className="text-4xl font-black italic mb-16 tracking-tighter">The National Executive Council</h3>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-sans text-[11px] font-black uppercase tracking-widest">
            <div className="p-8 border border-gray-100">National Chairman</div>
            <div className="p-8 border border-gray-100">National Secretary-General</div>
            <div className="p-8 border border-gray-100">National Treasurer</div>
            <div className="p-8 border border-gray-100">National Organizing Secretary</div>
         </div>
         <p className="mt-12 text-gray-400 text-xs italic">Duly registered at Sheria House, Nairobi under Section 10 of the Societies Act.</p>
      </section>

      {/* REGISTRY INTAKE PORTAL */}
      <section id="registry" className="py-32 bg-[#fafafa] border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6 md:px-16">
          <div className="text-center mb-20">
            <h3 className="text-4xl font-black italic mb-2 tracking-tighter uppercase">Secretary-General Registry</h3>
            <p className="font-sans text-[10px] text-gray-400 font-black uppercase tracking-[0.4em]">Official Communication Intake</p>
          </div>
          
          {!isSubmitted ? (
            <form onSubmit={handleInquiry} className="space-y-12 font-sans bg-white p-12 shadow-2xl border border-gray-100">
               <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-3"><label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Full Name / Rank</label><input type="text" className="w-full bg-gray-50 py-4 px-4 outline-none border-b-2 border-gray-200 focus:border-red-700 transition-all font-serif italic" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
                  <div className="space-y-3"><label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Origin Office / County</label><input type="text" className="w-full bg-gray-50 py-4 px-4 outline-none border-b-2 border-gray-200 focus:border-red-700 transition-all font-serif italic" value={form.office} onChange={e => setForm({...form, office: e.target.value})} required /></div>
               </div>
               <div className="space-y-3"><label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Official Email Address</label><input type="email" className="w-full bg-gray-50 py-4 px-4 outline-none border-b-2 border-gray-200 focus:border-red-700 transition-all font-serif italic" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>
               <div className="space-y-3"><label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Official Briefing / Statement</label><textarea rows="5" className="w-full bg-gray-50 py-4 px-4 outline-none border-b-2 border-gray-200 focus:border-red-700 transition-all font-serif italic resize-none" value={form.details} onChange={e => setForm({...form, details: e.target.value})} required></textarea></div>
               <button type="submit" className="w-full bg-red-700 text-white py-8 font-black uppercase text-[11px] tracking-[0.5em] hover:bg-black transition-all shadow-2xl">Submit to Secretariat Archive</button>
            </form>
          ) : (
            <div className="bg-white p-20 border-t-8 border-green-600 text-center shadow-2xl animate-in zoom-in-95">
               <div className="inline-block bg-green-100 text-green-800 px-6 py-1 text-[10px] font-black uppercase tracking-widest mb-6 underline">Submission Certified</div>
               <h3 className="text-3xl font-black italic mb-4">Registry Log Finalized</h3>
               <p className="text-sm font-sans text-gray-400 mb-10 leading-relaxed">Verification Reference: <span className="text-black font-bold font-mono tracking-tighter">{trackingId}</span>.<br/>Your inquiry has been queued for the National Secretary-General.</p>
               <button onClick={() => setIsSubmitted(false)} className="text-red-700 font-black uppercase text-[10px] tracking-widest hover:underline decoration-2">Record New Statement</button>
            </div>
          )}
        </div>
      </section>

      {/* COMPREHENSIVE OFFICIAL FOOTER */}
      <footer className="bg-[#1a1a1a] py-24 px-6 md:px-16 border-t-[16px] border-red-700 text-white/40 font-sans text-[11px] tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="max-w-sm space-y-6">
            <h5 className="text-white font-black text-3xl italic tracking-tighter leading-none">KENFIBA</h5>
            <p className="leading-relaxed font-light italic">"Support the firemen; the next life they save might be yours."</p>
            <p className="font-bold text-white uppercase tracking-widest underline underline-offset-4">Registry No. 21578</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-16 uppercase font-black text-[10px] tracking-[0.2em] border-l border-white/10 pl-12">
            <div className="space-y-4 text-white/80"><h6>Headquarters</h6>Tom Mboya Street<br/>Fire & Ambulance HQ<br/>Nairobi, Kenya</div>
            <div className="space-y-4 text-white/80"><h6>Mailing Address</h6>P.O Box 10104-00400<br/>Nairobi, Kenya</div>
            <div className="space-y-4 text-white/80"><h6>Contact Terminal</h6>254-020-2371263<br/>0721-981017<br/>kenfiba@yahoo.com</div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase font-black tracking-[0.4em]">
          <span>© 2026 Kenya National Fire Brigades Association</span>
          <div className="flex gap-8 mt-6 md:mt-0 italic text-white/20">
             <span>Sovereignty</span><span>Stability</span><span>Safety</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;