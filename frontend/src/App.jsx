import React, { useState } from 'react';
import axios from 'axios';

// --- SECRETARY-GENERAL PORTAL (ADMIN) ---
const SecretariatPortal = ({ onBack }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    axios.get('https://kenfiba-backend.onrender.com/api/admin/archives')
      .then(res => { setLogs(res.data); setLoading(false); })
      .catch(err => { console.error("Access Denied", err); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f2f1] p-10 font-serif">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl border-t-[12px] border-red-700">
        <div className="p-10 border-b border-gray-200">
          <h1 className="text-4xl font-black text-[#1a1a1a] uppercase tracking-tighter">Secretariat Registry Archive</h1>
          <p className="text-sm text-gray-500 mt-2 font-sans tracking-widest uppercase font-bold">Official Records: Society No. 21578 | Established 2002</p>
        </div>
        <div className="p-8">
          {loading ? <p className="text-center py-24 font-sans italic text-gray-400">Authenticating with Sheria House Records...</p> : (
            <table className="w-full text-left font-sans text-sm border-collapse">
              <thead className="bg-gray-100 text-gray-600 uppercase text-[10px] tracking-[0.2em] font-black border-b border-gray-300">
                <tr><th className="p-5">Submission Date</th><th className="p-5">Ref Number</th><th className="p-5">Origin/County</th><th className="p-5">Status</th></tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log._id} className="border-b border-gray-100 hover:bg-red-50 transition-colors">
                    <td className="p-5 font-medium">{new Date(log.createdAt).toLocaleDateString()}</td>
                    <td className="p-5 font-mono font-bold text-red-700">{log.trackingId}</td>
                    <td className="p-5 uppercase font-bold text-gray-700">{log.office}</td>
                    <td className="p-5"><span className="bg-green-100 text-green-800 px-3 py-1 text-[10px] font-black tracking-tighter rounded">VERIFIED</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="p-8 bg-gray-50 flex justify-between items-center">
            <span className="text-[10px] text-gray-400 uppercase font-sans">Restricted Access • National Secretariat Property</span>
            <button onClick={onBack} className="bg-[#1a1a1a] text-white px-10 py-3 font-black uppercase text-xs tracking-widest hover:bg-red-700 transition">Exit Secure Session</button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN NATIONAL PORTAL ---
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
    } catch (err) { alert("Registry Offline: Contact Secretariat via Telephone."); }
  };

  if (view === 'admin') return <SecretariatPortal onBack={() => setView('landing')} />;

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-serif leading-relaxed">
      
      {/* THE SOVEREIGN BAR */}
      <div className="bg-[#1a1a1a] py-2 px-6 md:px-16 flex justify-between items-center text-[10px] text-white/70 font-sans font-bold tracking-[0.2em] uppercase">
        <div className="flex gap-8">
          <span className="flex items-center gap-2">Republic of Kenya</span>
          <span className="hidden md:inline border-l border-white/20 pl-8">Societies Act (Cap 108) Registration No. 21578</span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setView('admin')} className="text-red-500 hover:text-white transition">Admin Portal</button>
        </div>
      </div>

      {/* STATE NAVIGATION */}
      <nav className="border-b border-gray-200 px-6 md:px-16 h-28 flex items-center justify-between bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="w-16 h-16 border-4 border-red-700 flex flex-col p-1">
            <div className="flex-1 bg-black"></div><div className="flex-1 bg-red-700"></div><div className="flex-1 bg-green-700"></div>
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter leading-none italic">KENFIBA</h1>
            <p className="text-[9px] font-sans font-black text-gray-400 uppercase tracking-[0.4em] mt-2">National Fire Brigades Association</p>
          </div>
        </div>
        <div className="hidden lg:flex gap-12 font-sans text-[11px] font-black uppercase tracking-[0.2em]">
          <a href="#charter" className="hover:text-red-700 transition underline-offset-8 hover:underline decoration-2">The Charter</a>
          <a href="#mandate" className="hover:text-red-700 transition underline-offset-8 hover:underline decoration-2">National Mandate</a>
          <a href="#registry" className="bg-[#1a1a1a] text-white px-8 py-3 hover:bg-red-700 transition">Contact Secretariat</a>
        </div>
      </nav>

      {/* HERO SECTION: CABINET PRESENTATION STYLE */}
      <header className="py-24 px-6 md:px-16 bg-[#fafafa] border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-3/5">
            <div className="bg-red-700 h-1.5 w-24 mb-10"></div>
            <h2 className="text-7xl font-black tracking-tighter leading-[0.9] mb-10 italic">
              Safeguarding <br/>the <span className="text-red-700">Republic.</span>
            </h2>
            <p className="text-2xl text-gray-700 mb-14 max-w-2xl font-light leading-snug">
              Kenya National Fire Brigades Association (KENFIBA) is the constitutionally registered lead for fire hazard mitigation and professional standards since 2002.
            </p>
            <div className="flex flex-wrap gap-8 items-center">
              <a href="#registry" className="bg-red-700 text-white px-12 py-5 font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-xl">Inquire Today</a>
              <div className="text-left font-sans border-l-2 border-gray-200 pl-8">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Office of Registry</p>
                <p className="text-sm font-bold">Sheria House, Nairobi</p>
              </div>
            </div>
          </div>
          <div className="lg:w-2/5 relative">
             <div className="absolute -inset-4 border-2 border-red-700/20 translate-x-8 translate-y-8"></div>
             <img src="https://images.unsplash.com/photo-1516533075015-a3838414c3ca?q=80&w=1200&auto=format&fit=crop" className="relative shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" alt="Operational Readiness" />
          </div>
        </div>
      </header>

      {/* THE CHARTER (BASED ON OFFICIAL DOCS) */}
      <section id="charter" className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div className="sticky top-40">
            <h3 className="text-5xl font-black italic tracking-tighter mb-8 leading-tight">Institutional <br/>Memorandum.</h3>
            <p className="text-gray-500 font-sans text-sm uppercase tracking-[0.3em] font-bold">Registration No. 21578</p>
          </div>
          <div className="space-y-16">
            <div className="space-y-6">
              <h4 className="text-2xl font-bold border-b-2 border-red-700 inline-block pb-1">01. National Vision</h4>
              <p className="text-xl italic">"Making Kenya society safer through considered and professional utilization of Fire Service Resources."</p>
            </div>
            <div className="space-y-6">
              <h4 className="text-2xl font-bold border-b-2 border-red-700 inline-block pb-1">02. Strategic Mission</h4>
              <p className="text-xl italic">"To reduce loss of life, personal injury, and damage to property across all local communities in Kenya."</p>
            </div>
            <div className="space-y-6">
              <h4 className="text-2xl font-bold border-b-2 border-red-700 inline-block pb-1">03. Terrorist Response</h4>
              <p className="text-xl italic">"Mitigating damages after fire attacks—both those naturally caused and those resulting from terrorist attacks."</p>
            </div>
          </div>
        </div>
      </section>

      {/* MANDATE GRID: PROFESSIONAL VOICE */}
      <section id="mandate" className="py-24 bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
           <div className="text-center mb-24">
              <h3 className="text-4xl font-bold italic mb-4">Professional Objectives</h3>
              <p className="text-red-500 font-sans text-[10px] uppercase font-black tracking-[0.5em]">The 2002 National Mandate</p>
           </div>
           <div className="grid md:grid-cols-3 gap-16 font-sans">
              <div className="space-y-6 bg-white/5 p-10 border border-white/10">
                <h5 className="font-black uppercase text-xs tracking-widest text-red-500">Public Policy</h5>
                <p className="text-sm text-gray-400 leading-relaxed font-light italic">"Working in partnership with stakeholders and employing authorities (Councils) to influence public policy opinion."</p>
              </div>
              <div className="space-y-6 bg-white/5 p-10 border border-white/10">
                <h5 className="font-black uppercase text-xs tracking-widest text-red-500">Expertise Development</h5>
                <p className="text-sm text-gray-400 leading-relaxed font-light italic">"Continuously improving professional standards and attaining high levels of expertise through knowledge and skills."</p>
              </div>
              <div className="space-y-6 bg-white/5 p-10 border border-white/10">
                <h5 className="font-black uppercase text-xs tracking-widest text-red-500">Service Network</h5>
                <p className="text-sm text-gray-400 leading-relaxed font-light italic">"Providing a range of services for members through appropriate networks to facilitate professional competence."</p>
              </div>
           </div>
        </div>
      </section>

      {/* REGISTRY FORM (GOVERNMENT INTAKE STYLE) */}
      <section id="registry" className="py-32 bg-white max-w-4xl mx-auto px-6 md:px-16">
        <div className="text-center mb-20">
          <h3 className="text-4xl font-black italic mb-2 tracking-tighter">Secretariat Inquiry</h3>
          <p className="font-sans text-[10px] text-gray-400 font-black uppercase tracking-[0.4em]">Official Communication Portal</p>
        </div>
        
        {!isSubmitted ? (
          <form onSubmit={handleInquiry} className="space-y-12 font-sans">
             <div className="grid md:grid-cols-2 gap-12 border-t-2 border-gray-100 pt-10">
                <div className="space-y-3"><label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Full Legal Name</label><input type="text" className="w-full bg-gray-50 py-4 px-4 outline-none border-b-2 border-gray-200 focus:border-red-700 transition-all font-serif italic" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
                <div className="space-y-3"><label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Office / County Branch</label><input type="text" className="w-full bg-gray-50 py-4 px-4 outline-none border-b-2 border-gray-200 focus:border-red-700 transition-all font-serif italic" value={form.office} onChange={e => setForm({...form, office: e.target.value})} required /></div>
             </div>
             <div className="space-y-3"><label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Official Email Address</label><input type="email" className="w-full bg-gray-50 py-4 px-4 outline-none border-b-2 border-gray-200 focus:border-red-700 transition-all font-serif italic" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>
             <div className="space-y-3"><label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Briefing Details / Official Statement</label><textarea rows="5" className="w-full bg-gray-50 py-4 px-4 outline-none border-b-2 border-gray-200 focus:border-red-700 transition-all font-serif italic resize-none" value={form.details} onChange={e => setForm({...form, details: e.target.value})} required></textarea></div>
             <button type="submit" className="w-full bg-[#1a1a1a] text-white py-8 font-black uppercase text-[11px] tracking-[0.5em] hover:bg-red-700 transition-all shadow-2xl">Submit to National Registry</button>
          </form>
        ) : (
          <div className="bg-[#fcfcfc] p-20 border border-gray-200 text-center animate-in zoom-in-95">
             <div className="inline-block bg-green-100 text-green-800 px-6 py-1 text-[10px] font-black uppercase tracking-widest mb-6">Submission Verified</div>
             <h3 className="text-3xl font-black italic mb-4">Registry Log Complete</h3>
             <p className="text-sm font-sans text-gray-400 mb-10">Your reference number for this session is <span className="text-black font-bold font-mono tracking-tighter">{trackingId}</span>.</p>
             <button onClick={() => setIsSubmitted(false)} className="text-red-700 font-black uppercase text-[10px] tracking-widest hover:underline decoration-2">New Inquiry</button>
          </div>
        )}
      </section>

      {/* NATIONAL FOOTER (CABINET STYLE) */}
      <footer className="bg-[#1a1a1a] py-24 px-6 md:px-16 border-t-[16px] border-red-700 text-white/40 font-sans text-[11px] tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="max-w-sm space-y-6">
            <h5 className="text-white font-black text-3xl italic tracking-tighter leading-none">KENFIBA</h5>
            <p className="leading-relaxed font-light">Established July 2002. Registered under the Laws of Kenya, Section 10 of the Societies Act. Acting as the professional voice of Kenya Fire Brigades.</p>
            <div className="flex gap-4">
               <span className="text-red-500 font-black">kenfiba@yahoo.com</span>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-16 uppercase font-black text-[10px] tracking-[0.2em]">
            <div className="space-y-4 text-white/80"><h6>Headquarters</h6>Tom Mboya Street<br/>Fire & Ambulance HQ<br/>Nairobi, Kenya</div>
            <div className="space-y-4 text-white/80"><h6>Mailing</h6>P.O Box 10104-00400<br/>Nairobi, Kenya</div>
            <div className="space-y-4 text-white/80"><h6>Contact Lines</h6>254-020-2371263<br/>0721-981017</div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase font-black tracking-[0.4em]">
          <span>© 2026 Kenya National Fire Brigades Association</span>
          <div className="flex gap-8 mt-6 md:mt-0">
             <span>Sovereignty</span><span>Security</span><span>Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;