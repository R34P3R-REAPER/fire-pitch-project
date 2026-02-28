import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- SECRETARIAT ARCHIVE (ADMIN) ---
const KenfibaArchive = ({ onBack }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://kenfiba-backend.onrender.com/api/admin/archives')
      .then(res => { setLogs(res.data); setLoading(false); })
      .catch(err => { console.error("Access Denied", err); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen bg-[#000d1a] text-white p-8 font-mono">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end border-b border-white/10 pb-8 mb-8">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">KENFIBA <span className="text-red-600">Registry</span></h1>
            <p className="text-green-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Society No. 21578 // Official Correspondence</p>
          </div>
          <button onClick={onBack} className="text-[10px] font-black border border-white/20 px-6 py-2 hover:bg-white hover:text-black transition">Close Archive</button>
        </div>
        {loading ? <p className="animate-pulse">Accessing Secretariat Records...</p> : (
          <div className="overflow-x-auto bg-white/5 rounded-xl border border-white/10">
            <table className="w-full text-left">
              <thead className="text-[10px] uppercase text-gray-500 border-b border-white/10">
                <tr><th className="p-6">Registry Date</th><th className="p-6">Tracking ID</th><th className="p-6">Official Name</th><th className="p-6">Status</th></tr>
              </thead>
              <tbody className="text-sm">
                {logs.map(log => (
                  <tr key={log._id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="p-6 text-gray-400">{new Date(log.createdAt).toLocaleDateString()}</td>
                    <td className="p-6 text-red-500 font-bold">{log.trackingId}</td>
                    <td className="p-6 uppercase">{log.name}</td>
                    <td className="p-6"><span className="text-green-500 text-[9px] font-black border border-green-500/30 px-3 py-1 rounded-full">VERIFIED</span></td>
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

// --- MAIN APPLICATION ---
function App() {
  const [view, setView] = useState('landing');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [activeTab, setActiveTab] = useState('Vision');
  const [form, setForm] = useState({ name: "", office: "", email: "", details: "" });

  const handleInquiry = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://kenfiba-backend.onrender.com/api/inquiry", form);
      setTrackingId(res.data.trackingId);
      setIsSubmitted(true);
    } catch (err) { alert("Secretariat connection offline."); }
  };

  if (view === 'admin') return <KenfibaArchive onBack={() => setView('landing')} />;

  return (
    <div className="min-h-screen bg-white text-[#001A33] font-sans selection:bg-red-600 selection:text-white">
      
      {/* LEGAL STATUS BAR */}
      <div className="bg-[#000d1a] py-2 px-6 flex justify-center border-b border-red-600 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap text-[9px] font-black text-white/60 tracking-[0.4em] uppercase">
          <span>Registered Society No. 21578</span>
          <span>•</span>
          <span>Societies Act Section 10</span>
          <span>•</span>
          <span>Established July 15, 2002</span>
          <span>•</span>
          <span>Official Professional Voice of Kenya Fire Brigades</span>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="h-24 sticky top-0 bg-white/90 backdrop-blur-xl border-b border-gray-100 z-50 px-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-black flex flex-col p-1 rounded-lg shadow-xl">
            <div className="flex-1 bg-black"></div><div className="flex-1 bg-red-600"></div><div className="flex-1 bg-green-700"></div>
          </div>
          <div>
            <span className="font-black text-3xl tracking-tighter uppercase italic block leading-none">KEN<span className="text-red-600">FIBA</span></span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">National Fire Brigades Assoc.</span>
          </div>
        </div>
        <div className="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-widest text-gray-400">
          <a href="#mandate" className="hover:text-red-600 transition">Our Mandate</a>
          <a href="#objectives" className="hover:text-red-600 transition">Strategic Objectives</a>
          <a href="#contact" className="hover:text-red-600 transition">Secretariat</a>
        </div>
        <button onClick={() => setView('admin')} className="bg-[#000d1a] text-white px-8 py-3 rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-red-600 transition shadow-lg">Registry Access</button>
      </nav>

      {/* HERO SECTION */}
      <header className="relative py-32 px-10 bg-slate-50 overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-600/5 border border-red-600/10 text-red-600 font-black text-[9px] uppercase tracking-[0.3em] mb-8">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
              Established 2002 by Fire Officers Countrywide
            </div>
            <h1 className="text-7xl lg:text-[110px] font-black leading-[0.85] mb-10 tracking-tighter uppercase italic">
              Legacy <br /> <span className="text-red-600">Safety</span> <br /> <span className="text-slate-300">Expertise.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg mb-12 leading-relaxed font-medium italic border-l-4 border-green-600 pl-6">
              "Support the firemen; the next life they save might be yours."
            </p>
            <div className="flex flex-col sm:flex-row gap-8">
              <a href="#contact" className="bg-red-600 text-white text-center px-12 py-6 rounded-2xl font-black uppercase tracking-widest shadow-2xl hover:-translate-y-1 transition-all">Submit Correspondence</a>
              <div className="flex flex-col justify-center border-l border-gray-200 pl-8">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">HQ Location</span>
                <span className="font-bold text-sm">Tom Mboya St, Nairobi</span>
              </div>
            </div>
          </div>
          <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border-[16px] border-white group">
            <img src="https://images.unsplash.com/photo-1516533075015-a3838414c3ca?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="KENFIBA Operations" />
          </div>
        </div>
      </header>

      {/* MANDATE SECTION (MISSION/VISION FROM DOCS) */}
      <section id="mandate" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4">
              <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-none mb-10 text-outline text-transparent">Official <br/><span className="text-[#001A33]">Mandate</span></h2>
              <div className="flex flex-col gap-4">
                {['Vision', 'Mission', 'Motto'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left p-6 rounded-2xl border-2 font-black uppercase text-xs tracking-widest transition-all ${activeTab === tab ? 'border-red-600 bg-red-50 text-red-600' : 'border-gray-100 text-gray-400'}`}>
                    {tab} Statement
                  </button>
                ))}
              </div>
            </div>
            <div className="lg:col-span-8 bg-slate-50 p-16 rounded-[4rem] border border-gray-100 shadow-inner">
               {activeTab === 'Vision' && <div className="animate-in fade-in"><h3 className="text-4xl font-black italic mb-8 uppercase text-red-600">Making Kenya Society Safer</h3><p className="text-xl text-gray-600 leading-relaxed font-bold italic">"To provide the professional voice and leadership role in improving the well-being of local communities in all fire service matters."</p></div>}
               {activeTab === 'Mission' && <div className="animate-in fade-in"><h3 className="text-4xl font-black italic mb-8 uppercase text-red-600">Life & Property Protection</h3><p className="text-xl text-gray-600 leading-relaxed font-bold italic">"To reduce deaths, injuries, and damages of property caused by fire and other related hazards."</p></div>}
               {activeTab === 'Motto' && <div className="animate-in fade-in"><h3 className="text-4xl font-black italic mb-8 uppercase text-red-600">The Next Life</h3><p className="text-3xl text-gray-900 font-black italic leading-tight">"Support the firemen; the next life they save might be yours."</p></div>}
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIC OBJECTIVES SECTION */}
      <section id="objectives" className="py-40 bg-[#001A33] text-white rounded-[5rem] mx-6">
        <div className="max-w-7xl mx-auto px-16">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-12">Strategic <br/><span className="text-red-600">Objectives</span></h2>
              <div className="space-y-12">
                {[
                  { h: "Professional Standards", p: "Continuously improve standards and help attain high levels of expertise and effectiveness by developing knowledge, skills, and understanding to ensure competence." },
                  { h: "Policy Partnership", p: "Develop policies affecting members and their employing authorities (Councils) to influence public policy opinion in Kenyan and International communities." },
                  { h: "Disaster Preparedness", p: "Reducing loss of life, injury, and property damage after both natural fire attacks and those caused by terrorist attacks." }
                ].map(item => (
                  <div key={item.h} className="group border-l-4 border-white/10 pl-8 hover:border-red-600 transition-all">
                    <h4 className="text-xl font-black uppercase italic mb-3 group-hover:text-red-600 transition">{item.h}</h4>
                    <p className="text-gray-400 font-medium leading-relaxed">{item.p}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10 backdrop-blur-3xl">
               <div className="mb-10 text-center">
                 <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em] mb-4 text-center">Association Aim</p>
                 <p className="text-2xl font-bold italic">"To continue acting as the professional voice of Kenya Fire Brigades."</p>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="p-8 bg-white/5 rounded-3xl text-center"><span className="block text-3xl font-black text-red-600">21578</span><span className="text-[9px] font-black uppercase text-gray-500 tracking-widest">Reg No.</span></div>
                 <div className="p-8 bg-white/5 rounded-3xl text-center"><span className="block text-3xl font-black text-green-500">2002</span><span className="text-[9px] font-black uppercase text-gray-500 tracking-widest">Founded</span></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECRETARIAT CONTACT (INFO FROM DOCS) */}
      <section id="contact" className="py-40 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-10 text-center">
          <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-6">Secretariat <span className="text-red-600 underline">Registry</span></h2>
          <p className="text-gray-500 mb-20 font-medium">Official Inquiry portal for County Councils, Officers, and International Stakeholders.</p>
          
          {!isSubmitted ? (
            <form onSubmit={handleInquiry} className="grid gap-6 text-left">
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Officer Name" className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-gray-200 outline-none focus:border-red-600 transition font-bold" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                <input type="text" placeholder="County / Jurisdiction" className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-gray-200 outline-none focus:border-red-600 transition font-bold" value={form.office} onChange={e => setForm({...form, office: e.target.value})} required />
              </div>
              <input type="email" placeholder="Official Email Address" className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-gray-200 outline-none focus:border-red-600 transition font-bold" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              <textarea rows="4" placeholder="Briefing Details for Secretariat..." className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-gray-200 outline-none focus:border-red-600 transition font-bold resize-none" value={form.details} onChange={e => setForm({...form, details: e.target.value})} required></textarea>
              <button type="submit" className="w-full bg-[#001A33] text-white py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 transition shadow-xl">Submit to Archive</button>
            </form>
          ) : (
            <div className="bg-green-50 p-16 rounded-[4rem] border border-green-100 animate-in zoom-in-95">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-8 text-3xl font-black">✓</div>
              <h3 className="text-3xl font-black text-green-900 uppercase italic mb-2 tracking-tighter">Inquiry Logged</h3>
              <p className="text-green-700 font-mono mb-8 font-black text-lg tracking-widest uppercase">Registry ID: {trackingId}</p>
              <button onClick={() => setIsSubmitted(false)} className="text-[10px] font-black uppercase tracking-widest text-green-600 underline">File New Entry</button>
            </div>
          )}
        </div>
      </section>

      {/* OFFICIAL FOOTER */}
      <footer className="bg-slate-50 py-24 border-t border-gray-200 px-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className="text-center lg:text-left">
            <span className="font-black text-3xl tracking-tighter uppercase italic text-[#001A33]">KEN<span className="text-red-600">FIBA</span></span>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em] mt-3 italic">Professional Voice of Kenya Fire Brigades</p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-widest text-gray-500">
             <div className="text-center lg:text-left"><span className="block text-[#001A33] mb-1">Office</span>Tom Mboya Street, Fire HQ</div>
             <div className="text-center lg:text-left"><span className="block text-[#001A33] mb-1">Registration</span>Society No. 21578</div>
             <div className="text-center lg:text-left"><span className="block text-[#001A33] mb-1">Contact</span>0721-981017 | kenfiba@yahoo.com</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;