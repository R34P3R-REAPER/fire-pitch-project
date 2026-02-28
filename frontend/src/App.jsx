import React, { useState, useEffect,view} from 'react';

function App() {
  // --- STATE MANAGEMENT ---
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('Phase 1');
  const [timeLeft, setTimeLeft] = useState({ days: 45, hours: 12, mins: 30, secs: 59 });
  
  // New: Form State
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
  
  if (response.status === 201) {
    alert("VFM Taskforce: Inquiry Received!");
  }
} catch (error) {
  console.error("Transmission Error:", error);
}
      const result = await response.json();

      if (result.success) {
        setTrackingId(result.trackingId);
        setIsSubmitted(true);
        console.log("Mission Success: Inquiry stored in database.");
      }
    } catch (error) {
      console.error("Database Link Severed:", error);
      alert("Connection to Command Center failed. Ensure your Backend server is running on Port 5000.");
    }
  };

  // --- LOGIC: HIGH-PRECISION COUNTDOWN ---
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
  className="hidden sm:block bg-white text-black px-8 py-3 rounded-full ..."
>
  Secure Login
</button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative bg-[#001A33] pt-48 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        
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
              Transforming Kenya's emergency response landscape through the institutionalized mentorship of veteran commanders. A unified framework for all 47 counties.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="#proposal" className="bg-kenya-red text-white text-center px-12 py-6 rounded-2xl font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(239,68,68,0.3)] hover:-translate-y-2 transition-all">
                The Full Proposal
              </a>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Current Enrollment</span>
                <span className="text-white font-mono text-xl font-black">47 / 47 COUNTIES</span>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-10 bg-kenya-red/20 blur-[120px] rounded-full group-hover:bg-kenya-red/30 transition-all"></div>
            <div className="relative aspect-square rounded-[4rem] overflow-hidden border-[20px] border-white/5 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1516533075015-a3838414c3ca?q=80&w=1000&auto=format&fit=crop" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" alt="Command" />
            </div>
          </div>
        </div>
      </header>

      {/* --- STRATEGIC ROADMAP --- */}
      <section id="roadmap" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none mb-8">
                Execution <br /> <span className="text-kenya-red">Roadmap</span>
              </h2>
              <p className="text-gray-500 font-medium mb-10">Our phased approach ensures zero downtime in emergency services during the transition to the 2026 Unified Standards.</p>
              <div className="space-y-4">
                {['Phase 1', 'Phase 2', 'Phase 3'].map((phase) => (
                  <button 
                    key={phase}
                    onClick={() => setActiveTab(phase)}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all font-black uppercase tracking-widest text-xs ${activeTab === phase ? 'border-kenya-red bg-slate-50 text-kenya-red' : 'border-gray-100 text-gray-400 hover:border-gray-300'}`}
                  >
                    {phase}: {phase === 'Phase 1' ? 'Institutional Audit' : phase === 'Phase 2' ? 'Mentor Deployment' : 'Full Integration'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-8 bg-slate-50 rounded-[3rem] p-12 border border-slate-200">
               {activeTab === 'Phase 1' && (
                 <div className="animate-in fade-in duration-500">
                    <span className="text-kenya-red font-black text-[10px] uppercase tracking-widest">Quarter 1-2</span>
                    <h3 className="text-3xl font-black uppercase italic mt-4 mb-6">Nationwide Capability Audit</h3>
                    <ul className="space-y-6">
                      {[
                        "Standardization of equipment inventories across all 47 counties.",
                        "Identification of the first 250 veteran mentors for the Council.",
                        "Gap analysis of response times in sub-county stations."
                      ].map((item, i) => (
                        <li key={i} className="flex gap-4 items-start">
                          <div className="w-6 h-6 rounded-full bg-kenya-red text-white flex-shrink-0 flex items-center justify-center text-[10px] font-bold">{i+1}</div>
                          <p className="text-gray-600 leading-relaxed font-medium">{item}</p>
                        </li>
                      ))}
                    </ul>
                 </div>
               )}
               {activeTab === 'Phase 2' && (
                 <div className="animate-in fade-in duration-500">
                    <span className="text-kenya-red font-black text-[10px] uppercase tracking-widest">Quarter 3-4</span>
                    <h3 className="text-3xl font-black uppercase italic mt-4 mb-6">The Mentorship Rollout</h3>
                    <p className="text-gray-600 mb-6">Deploying vetted commanders to regional hubs to oversee tactical training and standard operating procedure (SOP) compliance.</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      </section>

      {/* --- MISSION SECTION --- */}
      <section id="mission" className="py-32 bg-[#F1F5F9] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
             <div className="relative">
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-1 bg-kenya-red h-64"></div>
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 italic">The Strategic Mandate</h2>
                <p className="text-2xl text-gray-700 leading-snug font-medium mb-10 italic">
                  "To leverage the unparalleled expertise of retired fire commanders to create a uniform, world-class emergency response standard across all 47 counties."
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-4xl font-black text-kenya-red mb-1">12,000+</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Active Personnel Trained</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-kenya-green mb-1">100%</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">County Coverage</p>
                  </div>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-48 bg-white rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col justify-end">
                    <p className="text-xs font-black uppercase tracking-widest">Standardized</p>
                    <p className="font-bold text-gray-400">Tactics</p>
                  </div>
                  <div className="h-64 bg-kenya-red rounded-3xl shadow-xl p-8 flex flex-col justify-end text-white">
                    <p className="text-xs font-black uppercase tracking-widest">Veteran</p>
                    <p className="font-bold">Mentorship</p>
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="h-64 bg-black rounded-3xl shadow-xl p-8 flex flex-col justify-end text-white">
                    <p className="text-xs font-black uppercase tracking-widest">Unified</p>
                    <p className="font-bold">Command</p>
                  </div>
                  <div className="h-48 bg-white rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col justify-end">
                    <p className="text-xs font-black uppercase tracking-widest">Modern</p>
                    <p className="font-bold text-gray-400">Equipment</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- PROPOSAL SECTION --- */}
      <section id="proposal" className="py-32 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#001A33] rounded-[4rem] p-12 lg:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent"></div>
            <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none mb-8">
                  The National <br /> Fire Defense <span className="text-kenya-red">Framework</span>
                </h2>
                <p className="text-gray-400 text-lg mb-10 leading-relaxed font-medium">
                  This 242-page directive establishes the new operational blueprint for urban and wilderness fire suppression. It includes the "Veteran Mentor Payroll" and "47-Hub Deployment Strategy."
                </p>
                <div className="space-y-6 mb-12">
                  {['Command Council Structure', 'Equipment Standardization SOPs', 'Regional Training Syllabi'].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-kenya-green shadow-[0_0_10px_#10b981]"></div>
                      <span className="text-xs font-black uppercase tracking-widest">{item}</span>
                    </div>
                  ))}
                </div>
                <a 
                  href="/vfm-executive-summary-2026.pdf" 
                  download 
                  className="group inline-flex items-center gap-6 bg-white text-black px-12 py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-kenya-red hover:text-white transition-all shadow-2xl"
                >
                  Download Summary
                  <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                </a>
              </div>
              <div className="relative aspect-[3/4] bg-white rounded-2xl shadow-2xl p-16 flex flex-col justify-between group cursor-default">
                 <div className="absolute top-8 left-8">
                    <div className="w-12 h-1 bg-kenya-red mb-2"></div>
                    <p className="text-black text-[10px] font-black uppercase tracking-[0.3em]">Official Copy 2026</p>
                 </div>
                 <div className="space-y-4">
                    <div className="h-4 w-full bg-slate-100 rounded"></div>
                    <div className="h-4 w-full bg-slate-100 rounded"></div>
                    <div className="h-4 w-3/4 bg-slate-100 rounded"></div>
                 </div>
                 <div className="pt-10 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-slate-400 font-black text-[9px] uppercase tracking-widest tracking-tighter italic">VFM Secretariate</span>
                    <div className="w-12 h-12 rounded-full border-4 border-slate-50 flex items-center justify-center font-black text-slate-200">K</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT THE COMMAND COUNCIL (UPDATED) --- */}
      <section id="contact" className="py-32 bg-[#001A33] relative overflow-hidden scroll-mt-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-kenya-red/10 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white mb-8 leading-none">
                Request a <span className="text-kenya-red">Strategic</span> <br /> Briefing
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-12 font-medium">
                Direct access for County Governors, Fire Chiefs, and Ministry Officials. Our Secretariat ensures that every inquiry from a jurisdiction is logged and addressed by the Command Council within one business day.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-kenya-red transition-all">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-1">Official Correspondence</p>
                    <p className="text-white font-bold text-lg">hq@vfm-taskforce.go.ke</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-12 rounded-[3rem] shadow-2xl min-h-[600px] flex flex-col justify-center">
              {!isSubmitted ? (
                <form onSubmit={handleStrategicInquiry} className="space-y-6 animate-in fade-in duration-700">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Hon. Maina" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-kenya-red transition font-bold"
                        value={nameState}
                        onChange={(e) => setNameState(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Office/County</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Nairobi" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-kenya-red transition font-bold"
                        value={officeState}
                        onChange={(e) => setOfficeState(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Official Email</label>
                    <input 
                      type="email" 
                      placeholder="official@jurisdiction.go.ke" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-kenya-red transition font-bold"
                      value={emailState}
                      onChange={(e) => setEmailState(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Inquiry Details</label>
                    <textarea 
                      rows="5" 
                      placeholder="Strategic requirements..." 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-kenya-red transition resize-none font-bold"
                      value={detailsState}
                      onChange={(e) => setDetailsState(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-white text-black font-black uppercase tracking-widest py-6 rounded-2xl hover:bg-kenya-red hover:text-white transition-all shadow-xl active:scale-95"
                  >
                    Submit to Secretariat
                  </button>
                </form>
              ) : (
                <div className="text-center space-y-8 animate-in zoom-in-95 duration-500">
                  <div className="w-24 h-24 bg-kenya-green/20 border-2 border-kenya-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-kenya-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">Inquiry Logged</h3>
                  <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Tracking Number</p>
                    <p className="text-kenya-red font-mono font-bold text-2xl tracking-widest italic uppercase">{trackingId}</p>
                  </div>
                  <button 
                    onClick={() => {
                        setIsSubmitted(false);
                        setNameState("");
                        setOfficeState("");
                        setEmailState("");
                        setDetailsState("");
                    }} 
                    className="text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-white transition"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- LIVE STATS TICKER --- */}
      <section className="bg-black py-12 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-12">
           <div className="flex gap-12">
              <div className="text-center">
                 <p className="text-4xl font-black text-white italic">{timeLeft.days}d</p>
                 <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Next Deployment</p>
              </div>
              <div className="text-center">
                 <p className="text-4xl font-black text-white italic">{timeLeft.hours}h</p>
                 <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">To Briefing</p>
              </div>
              <div className="text-center">
                 <p className="text-4xl font-black text-white italic">{timeLeft.mins}m</p>
                 <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Until Review</p>
              </div>
           </div>
           <div className="h-px lg:h-12 w-full lg:w-px bg-white/10"></div>
           <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-[.4em]">Operational Security Level</span>
              <div className="flex gap-1">
                 {[1,2,3,4,5].map(i => <div key={i} className={`w-4 h-2 rounded-sm ${i < 5 ? 'bg-kenya-green' : 'bg-gray-800'}`}></div>)}
              </div>
           </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 opacity-30 grayscale">
            <div className="w-8 h-8 bg-black"></div>
            <span className="font-black text-lg tracking-tighter uppercase italic">VFM Taskforce</span>
          </div>
          <div className="text-gray-400 text-[10px] font-black uppercase tracking-[0.5em] text-center">
            &copy; 2026 Republic of Kenya • Ministry of Interior • Veteran Mentorship Initiative
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
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