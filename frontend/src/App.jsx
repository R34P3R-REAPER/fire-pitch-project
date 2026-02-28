import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- SECRETARIAT REGISTRY (MODERN MODAL/VIEW) ---
const RegistryDashboard = ({ onBack }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://kenfiba-backend.onrender.com/api/admin/archives')
      .then(res => { setLogs(res.data); setLoading(false); })
      .catch(err => { console.error("Database connection failed", err); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-[#1a1a1a] p-10 animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto bg-white shadow-sm border border-gray-200 rounded-sm">
        <div className="p-8 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">KENFIBA Official Registry</h1>
            <p className="text-xs text-gray-500 mt-1">Society No. 21578 | Established July 2002 </p>
          </div>
          <button onClick={onBack} className="bg-[#0067b8] text-white px-6 py-2 text-sm font-semibold hover:bg-[#005da6] transition">Close Dashboard</button>
        </div>
        <div className="p-0">
          {loading ? <div className="p-10 text-center text-sm">Synchronizing with Secretariat Database...</div> : (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 font-semibold">Logged Date</th>
                  <th className="p-4 font-semibold">Inquiry ID</th>
                  <th className="p-4 font-semibold">Origin Office</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 text-gray-600">{new Date(log.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 font-bold text-[#0067b8]">{log.trackingId}</td>
                    <td className="p-4 font-medium uppercase">{log.office}</td>
                    <td className="p-4"><span className="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-1 uppercase">Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MAIN APPLICATION ---
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
    } catch (err) { alert("Connectivity Error: Secretariat database unreachable."); }
  };

  if (view === 'admin') return <RegistryDashboard onBack={() => setView('landing')} />;

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-sans">
      
      {/* MICROSOFT-STYLE NAV BAR */}
      <nav className="h-[54px] border-b border-gray-200 px-4 md:px-10 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-50">
        <div className="flex items-center gap-6 h-full">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
              <div className="bg-[#f25022]"></div><div className="bg-[#7fba00]"></div>
              <div className="bg-[#00a4ef]"></div><div className="bg-[#ffb900]"></div>
            </div>
            <span className="font-semibold text-lg tracking-tight hidden md:block">KENFIBA</span>
          </div>
          <div className="hidden md:flex gap-6 text-[13px] h-full items-center">
            <a href="#about" className="hover:border-b-2 border-black h-full flex items-center px-1">About</a>
            <a href="#objectives" className="hover:border-b-2 border-black h-full flex items-center px-1">Objectives</a>
            <a href="#contact" className="hover:border-b-2 border-black h-full flex items-center px-1">Secretariat</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={() => setView('admin')} className="text-[13px] hover:underline underline-offset-4">Sign in</button>
           <a href="#contact" className="bg-[#0067b8] text-white px-4 py-1.5 text-[13px] font-semibold hover:bg-[#005da6] transition shadow-sm">Contact Registry</a>
        </div>
      </nav>

      {/* HERO BLADE (MICROSOFT 365 STYLE) */}
      <header className="relative py-20 px-6 md:px-16 bg-[#f2f2f2] border-b border-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Leading Professional Standards for Kenya Fire Brigades.
            </h1>
            <p className="text-lg text-gray-700 font-normal max-w-lg leading-snug">
              Kenya National Fire Brigades Association (KENFIBA) is the professional voice dedicated to community safety and hazard reduction since 2002.
            </p>
            <div className="flex gap-4">
              <a href="#about" className="bg-[#0067b8] text-white px-8 py-2.5 font-semibold hover:bg-[#005da6] transition shadow-sm">Learn more</a>
              <a href="#contact" className="text-[#0067b8] font-semibold flex items-center gap-2 hover:underline">Register an inquiry &gt;</a>
            </div>
          </div>
          <div className="md:w-1/2 rounded-sm overflow-hidden shadow-xl">
             <img src="https://images.unsplash.com/photo-1516533075015-a3838414c3ca?auto=format&fit=crop&q=80&w=1200" className="w-full h-auto" alt="KENFIBA Operations" />
          </div>
        </div>
      </header>

      {/* MANDATE GRID (SURFACE STYLE) */}
      <section id="about" className="py-24 px-6 md:px-16 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-16 tracking-tight">Our Professional Mandate</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { title: "Vision", text: "Making Kenya society safer through leadership in fire service matters.", link: "About Vision" },
            { title: "Mission", text: "To reduce deaths, injuries, and property damage caused by fire hazards.", link: "About Mission" },
            { title: "Motto", text: "'Support the firemen; the next life they save might be yours'.", link: "Learn more" }
          ].map((card) => (
            <div key={card.title} className="text-left group cursor-pointer">
              <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed italic">"{card.text}"</p>
              <span className="text-[#0067b8] text-sm font-semibold group-hover:underline">{card.link} &gt;</span>
            </div>
          ))}
        </div>
      </section>

      {/* OBJECTIVES BLADE (AZURE STYLE) */}
      <section id="objectives" className="py-20 bg-[#f2f2f2]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold tracking-tight">Association Objectives</h2>
            <div className="space-y-6">
               <div className="border-l-4 border-[#0067b8] pl-6 py-2">
                  <h4 className="font-semibold mb-1">Professional Standards</h4>
                  <p className="text-sm text-gray-600">Continuously improving expertise and knowledge to ensure member competence.</p>
               </div>
               <div className="border-l-4 border-gray-300 pl-6 py-2 hover:border-[#0067b8] transition">
                  <h4 className="font-semibold mb-1">Policy Advocacy</h4>
                  <p className="text-sm text-gray-600">Developing policies and working with stakeholders to influence public policy.</p>
               </div>
               <div className="border-l-4 border-gray-300 pl-6 py-2 hover:border-[#0067b8] transition">
                  <h4 className="font-semibold mb-1">Disaster Mitigation</h4>
                  <p className="text-sm text-gray-600">Strategies to reduce loss from natural fires and terrorist fire attacks.</p>
               </div>
            </div>
          </div>
          <div className="bg-white p-10 shadow-sm border border-gray-200">
             <span className="text-[11px] font-bold text-[#0067b8] uppercase tracking-widest block mb-4">Official Accreditation</span>
             <p className="text-lg font-normal mb-8 leading-snug tracking-tight">
               Registered under Section 10 of the Societies Act, No. 21578.
             </p>
             <div className="flex gap-10">
                <div><p className="text-2xl font-semibold">2002</p><p className="text-[11px] text-gray-500 uppercase">Established</p></div>
                <div><p className="text-2xl font-semibold">HQ</p><p className="text-[11px] text-gray-500 uppercase text-nowrap">Tom Mboya Street </p></div>
             </div>
          </div>
        </div>
      </section>

      {/* CONTACT (MODERN FORM) */}
      <section id="contact" className="py-24 px-6 md:px-16 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4 tracking-tight">Contact the Secretariat</h2>
        <p className="text-sm text-gray-600 mb-12">Submit official inquiries regarding professional standards or association membership.</p>
        
        {!isSubmitted ? (
          <form onSubmit={handleInquiry} className="text-left space-y-4">
             <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" className="w-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#0067b8]" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                <input type="text" placeholder="Office / County" className="w-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#0067b8]" value={form.office} onChange={e => setForm({...form, office: e.target.value})} required />
             </div>
             <input type="email" placeholder="Official Email" className="w-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#0067b8]" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
             <textarea rows="4" placeholder="Inquiry Details" className="w-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#0067b8] resize-none" value={form.details} onChange={e => setForm({...form, details: e.target.value})} required></textarea>
             <button type="submit" className="bg-[#0067b8] text-white px-10 py-2.5 text-sm font-semibold hover:bg-[#005da6] transition shadow-sm">Submit Registration</button>
          </form>
        ) : (
          <div className="bg-gray-50 p-12 border border-gray-200 animate-in zoom-in-95">
             <h3 className="text-xl font-semibold mb-2">Inquiry Successfully Logged</h3>
             <p className="text-xs text-gray-500 mb-6">Tracking ID: <span className="font-bold text-black">{trackingId}</span></p>
             <button onClick={() => setIsSubmitted(false)} className="text-[#0067b8] text-sm font-semibold hover:underline">New Inquiry &gt;</button>
          </div>
        )}
      </section>

      {/* FOOTER (MICROSOFT STYLE) */}
      <footer className="bg-[#f2f2f2] pt-12 pb-6 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div><h4 className="font-semibold text-xs text-gray-600 mb-4">Registration</h4><p className="text-xs text-gray-500 leading-relaxed">Society No. 21578 [cite: 1]<br/>Sheria House Registered </p></div>
          <div><h4 className="font-semibold text-xs text-gray-600 mb-4">Headquarters</h4><p className="text-xs text-gray-500 leading-relaxed">Tom Mboya Street<br/>Fire & Ambulance HQ </p></div>
          <div><h4 className="font-semibold text-xs text-gray-600 mb-4">Contact</h4><p className="text-xs text-gray-500 leading-relaxed">kenfiba@yahoo.com<br/>0721-981017 </p></div>
          <div><h4 className="font-semibold text-xs text-gray-600 mb-4">Mailing</h4><p className="text-xs text-gray-500 leading-relaxed">P.O. Box 10104-00400<br/>Nairobi, Kenya </p></div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-gray-300 pt-6">
           <p className="text-[11px] text-gray-600">© 2026 Kenya National Fire Brigades Association. All rights reserved.</p>
           <div className="flex gap-6 text-[11px] text-gray-600 mt-4 md:mt-0">
              <span className="hover:underline cursor-pointer">Privacy & Cookies</span>
              <span className="hover:underline cursor-pointer">Terms of use</span>
              <span className="hover:underline cursor-pointer">Contact Us</span>
           </div>
        </div>
      </footer>
    </div>
  );
}

export default App;