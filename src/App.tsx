import React, { useState, useEffect, useRef } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  FileText, 
  Calendar, 
  HeartHandshake, 
  CheckCircle, 
  ChevronRight, 
  Menu, 
  X, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Maximize, 
  Flame, 
  Send,
  Sparkles,
  Info,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VIJAY_OJHA_DATA, BLOOD_DONATION_CAMP_DATA, JORASANKO_DEV_VISION } from './data';
import { CustomMedia, CitizenMessage } from './types';
import StatsGrid from './components/StatsGrid';
import MediaCustomizer from './components/MediaCustomizer';
import ConstituencyMoments from './components/ConstituencyMoments';

export default function App() {
  // Mobile navigation state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Interactive Media state (managed dynamically by MediaCustomizer)
  const [customMedia, setCustomMedia] = useState<CustomMedia>({
    profilePicUrl: null,
    campVideoUrl: null,
    banner1Url: null,
    banner2Url: null,
    facebookBannerUrl: null
  });

  // Citizen connect form state
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formWard, setFormWard] = useState('Ward 23 (Sukia Street)');
  const [formType, setFormType] = useState<'grievance' | 'suggestion' | 'appreciation' | 'other'>('grievance');
  const [formSubject, setFormSubject] = useState('');
  const [formContent, setFormContent] = useState('');
  const [citizenMessages, setCitizenMessages] = useState<CitizenMessage[]>([]);
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);

  // Custom video player states
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Load existing messages and scroll tracker
  useEffect(() => {
    const saved = localStorage.getItem('vijay_ojha_citizen_messages');
    if (saved) {
      try {
        setCitizenMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing citizen messages', e);
      }
    }

    const handleScroll = () => {
      const sections = ['home', 'about', 'stats', 'moments', 'blood-camp', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Submit contact form
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formContent || !formSubject) return;

    const newMessage: CitizenMessage = {
      id: `msg-${Date.now()}`,
      name: formName,
      phone: formPhone,
      email: formEmail,
      ward: formWard,
      messageType: formType,
      subject: formSubject,
      content: formContent,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      status: 'pending'
    };

    const updated = [newMessage, ...citizenMessages];
    setCitizenMessages(updated);
    localStorage.setItem('vijay_ojha_citizen_messages', JSON.stringify(updated));

    // Reset fields
    setFormName('');
    setFormPhone('');
    setFormEmail('');
    setFormSubject('');
    setFormContent('');
    setShowSubmitSuccess(true);

    setTimeout(() => {
      setShowSubmitSuccess(false);
    }, 5000);
  };

  // Delete message (demo utility)
  const handleDeleteMessage = (id: string) => {
    const updated = citizenMessages.filter(msg => msg.id !== id);
    setCitizenMessages(updated);
    localStorage.setItem('vijay_ojha_citizen_messages', JSON.stringify(updated));
  };

  // Video controls
  const togglePlayVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play().catch(err => console.log('Video play error: ', err));
        setIsVideoPlaying(true);
      }
    }
  };

  const toggleMuteVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress || 0);
      setCurrentTime(videoRef.current.currentTime || 0);
    }
  };

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration || 0);
    }
  };

  const handleVideoProgressSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setVideoProgress(parseFloat(e.target.value));
    }
  };

  const handleMaximizeVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  // Scroll smoothly to target element
  const scrollToId = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatVideoTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-saffron-100 selection:text-saffron-700 pb-16">
      
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Lotus Badge and Name */}
          <div className="flex items-center gap-3">
            <div className="bg-saffron-500 p-2 rounded-xl flex items-center justify-center text-white">
              {/* Symbolic lotus representation using CSS */}
              <div className="relative w-6 h-6 flex items-center justify-center">
                <span className="absolute block w-4 h-4 bg-white/20 rounded-full transform -translate-y-1"></span>
                <span className="absolute block w-4 h-4 bg-white/20 rounded-full transform translate-x-1.5 translate-y-0.5"></span>
                <span className="absolute block w-4 h-4 bg-white/20 rounded-full transform -translate-x-1.5 translate-y-0.5"></span>
                <span className="absolute block w-1 h-3 bg-white rounded-full bottom-0"></span>
                <Flame className="w-4 h-4 text-white absolute bottom-0.5" />
              </div>
            </div>
            <div>
              <h1 className="font-display font-bold text-base text-slate-900 leading-none tracking-tight flex items-center gap-1">
                VIJAY OJHA <span className="text-[9px] bg-saffron-600 text-white font-bold px-1 py-0.5 rounded ml-1">BJP</span>
              </h1>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">MLA — JORASANKO (AC 165)</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'Biography' },
              { id: 'stats', label: 'Election Verdict' },
              { id: 'moments', label: 'Moments' },
              { id: 'blood-camp', label: 'Blood Donation Camp' },
              { id: 'contact', label: 'Citizen Connect' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToId(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                  activeSection === tab.id 
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-500 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Action Call */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollToId('contact')}
              className="bg-bjp-green-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-bjp-green-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Grievance Portal</span>
            </button>
          </div>

          {/* Mobile Menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden fixed top-20 w-full z-30"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'Biography' },
                { id: 'stats', label: 'Election Verdict' },
                { id: 'moments', label: 'Moments' },
                { id: 'blood-camp', label: 'Blood Donation Camp' },
                { id: 'contact', label: 'Citizen Connect' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToId(tab.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    activeSection === tab.id
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => scrollToId('contact')}
                  className="w-full bg-bjp-green-600 text-white text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Submit Local Grievance</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Hero Header Image Banner (Facebook cover layout based on image 3) */}
      <section id="home" className="relative font-sans bg-[#0f172a] overflow-hidden">
        
        {/* Banner image or simulated backdrop */}
        {customMedia.facebookBannerUrl ? (
          <div className="w-full h-[240px] md:h-[380px] lg:h-[460px] relative overflow-hidden">
            <img 
              src={customMedia.facebookBannerUrl} 
              alt="Vijay Ojha Campaign Banner" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-black/30"></div>
          </div>
        ) : (
          /* High-Fidelity CSS Mock of his Facebook Cover (Image 3) with clean minimalism style */
          <div className="w-full min-h-[260px] sm:min-h-[340px] md:min-h-[400px] bg-slate-900 flex flex-col justify-between relative overflow-hidden px-6 py-10 md:px-12 md:py-14">
            
            {/* Design Accents - Minimal subtle glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-saffron-500/5 rounded-full blur-3xl"></div>
            
            {/* Simulated Banner Collage Text */}
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full z-10">
              
              {/* Left text */}
              <div className="space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 bg-saffron-500/10 border border-saffron-500/20 text-saffron-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-saffron-400" />
                  <span>Double Engine Sarkar</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display leading-tight tracking-tight">
                  Development. <br />
                  <span className="text-saffron-500">Dignity.</span> Empowerment.
                </h2>
                
                <p className="text-slate-400 text-xs md:text-sm max-w-md leading-relaxed font-light">
                  Working hand-in-hand with the vision of Prime Minister Narendra Modi and national leadership to transform Jorasanko and restore Kolkata's pride.
                </p>
              </div>

              {/* Right panel: Profile card overlay mock */}
              <div className="bg-[#0f172a]/40 border border-slate-800 backdrop-blur-xs rounded-xl p-6 space-y-4 max-w-sm mx-auto md:ml-auto w-full">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-saffron-500 animate-pulse"></span>
                  <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase font-mono">Verified Representative</span>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">Sri Vijay Ojha</p>
                  <p className="text-xs text-saffron-400 font-medium uppercase tracking-wider mt-1">MLA representing Jorasanko, Kolkata</p>
                </div>
                <div className="pt-3 border-t border-slate-850 flex justify-between items-center text-xs">
                  <div className="text-slate-400">
                    <span className="block text-[9px] uppercase tracking-wider font-mono">Constituency</span>
                    <span className="font-semibold text-white">AC No. 165</span>
                  </div>
                  <div className="text-slate-400 text-right">
                    <span className="block text-[9px] uppercase tracking-wider font-mono">Election won</span>
                    <span className="font-semibold text-white">2026 Assembly</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Saffron-Green Accent Strip */}
            <div className="absolute bottom-0 left-0 right-0 h-1 flex">
              <div className="bg-saffron-500 flex-1"></div>
              <div className="bg-white w-2"></div>
              <div className="bg-bjp-green-600 flex-1"></div>
            </div>

          </div>
        )}

      </section>

      {/* 3. Hero Overlapping Profile & Key Highlight Text */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-10 sm:-mt-14">
        <div className="bg-white rounded-xl border border-slate-100 p-6 sm:p-8 md:p-10 shadow-xs">
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Candidate Portrait Photo */}
            <div className="relative shrink-0 mx-auto lg:mx-0">
              <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-xl overflow-hidden border border-slate-100 p-1.5 bg-slate-50 shadow-xs">
                {customMedia.profilePicUrl ? (
                  <img 
                    src={customMedia.profilePicUrl} 
                    alt="Vijay Ojha Portrait" 
                    className="w-full h-full object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  /* Custom beautifully styled fallback avatar */
                  <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center p-3 relative rounded-lg border border-slate-100/50">
                    <User className="w-12 h-12 text-slate-300" />
                    <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-100 mt-2">Sri Vijay Ojha</span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-bjp-green-600 text-white rounded-lg px-2.5 py-1 text-[9px] font-bold tracking-wider flex items-center gap-1 shadow-sm">
                <CheckCircle className="w-3 h-3" />
                <span>MLA ELECTED</span>
              </div>
            </div>

            {/* Biography & Key Facts Panel */}
            <div id="about" className="flex-1 space-y-5">
              
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-saffron-600 uppercase tracking-widest bg-saffron-50 px-2.5 py-0.5 rounded">Political Profile</span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display tracking-tight mt-1">Sri Vijay Ojha</h3>
                <p className="text-xs text-slate-500 font-medium">Member of the West Bengal Legislative Assembly representing Jorasanko</p>
              </div>

              {/* Required highlight text quoted directly from prompt */}
              <div className="bg-slate-50/70 rounded-xl border border-slate-100 p-5 space-y-3">
                <h4 className="text-[9px] font-bold text-saffron-600 uppercase tracking-widest font-mono">Official Representative Statement</h4>
                <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
                  &ldquo;Vijay Ojha is an Indian politician from West Bengal and a member of the Bharatiya Janata Party (BJP).&rdquo;
                </p>
                <div className="text-slate-600 text-xs sm:text-sm space-y-2 font-normal leading-relaxed">
                  <p>
                    Currently, he represents the Jorasanko Assembly constituency in Kolkata. He was elected in the <span className="font-semibold text-slate-800">2026 West Bengal Assembly election</span>, winning the Jorasanko seat in a decisive victory.
                  </p>
                  <p>
                    He secured <span className="font-semibold text-slate-800">52,868 votes (49.48%)</span>, defeating his closest competitor, Vijay Upadhyay of the All India Trinamool Congress, who received 47,071 votes (44.05%). The final margin of victory was <span className="font-semibold text-slate-800">5,797 votes</span>.
                  </p>
                  <p>
                    Jorasanko (Assembly Constituency No. 165) lies in the heart of Kolkata district, and forms a key segment of the <span className="font-semibold text-slate-800">Kolkata Uttar Lok Sabha constituency</span>.
                  </p>
                </div>
              </div>

              {/* Bio summary paragraph */}
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                {VIJAY_OJHA_DATA.bio}
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* 4. Statistics, Results & Personal Affidavit section */}
      <section id="stats" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 scroll-mt-24">
        <div className="space-y-1.5 mb-8 text-center sm:text-left">
          <span className="text-[10px] font-bold text-saffron-600 uppercase tracking-widest">Performance & Affidavit</span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display tracking-tight mt-1">Election Analytics & Disclosures</h2>
          <p className="text-xs text-slate-500 font-light">Official figures, educational records, and assets declared to the Election Commission of India in his 2026 nomination paper.</p>
        </div>
        <StatsGrid data={VIJAY_OJHA_DATA} />
      </section>

      {/* 5. Constituency Focus & Development Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-[#0f172a] rounded-xl text-white p-8 md:p-12 border border-slate-800 relative overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-saffron-500/5 rounded-full blur-2xl"></div>

          <div className="relative z-10 space-y-8">
            <div className="max-w-xl space-y-2">
              <span className="text-[10px] font-bold text-saffron-400 uppercase tracking-widest font-mono">Our Agenda</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight">Jorasanko Development Blueprint</h3>
              <p className="text-xs text-slate-400 font-light">Working systematically across the wards of Kolkata district to restore basic amenities, trade growth, and historical heritage.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {JORASANKO_DEV_VISION.map((item, index) => (
                <div 
                  key={index} 
                  id={`vision-card-${index}`}
                  className="bg-slate-950/40 border border-slate-800 rounded-lg p-5 hover:bg-slate-950/80 transition-colors"
                >
                  <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron-500"></span>
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5.5. Constituency Moments Image Gallery */}
      <ConstituencyMoments />

      {/* 6. Spotlight Section: Blood Donation & Health Checkup Camp */}
      <section id="blood-camp" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 scroll-mt-24">
        
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          
          {/* Header Strip */}
          <div className="bg-rose-50 text-rose-950 px-6 py-6 md:px-10 md:py-6 border-b border-rose-100/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <span className="inline-block text-[9px] uppercase font-bold tracking-wider bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded">
                Social Responsibility Initiative
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-rose-900 tracking-tight">Voluntary Blood Donation & Health Camp</h3>
            </div>
            <div className="bg-white border border-rose-150 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-rose-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-rose-600" />
              <span>{BLOOD_DONATION_CAMP_DATA.date}</span>
            </div>
          </div>

          <div className="p-6 md:p-10 space-y-10">
            
            {/* Split layout: Text details and video player */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              
              {/* Left Column: Camp details (Span 5) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-1.5">
                  <h4 className="text-[9px] font-bold text-rose-600 uppercase tracking-widest font-mono">The "WE ARE THE WORLD" Initiative</h4>
                  <p className="text-base font-semibold text-slate-900 leading-snug">
                    MLA Sri Vijay Ojha Presides over Voluntary Blood Donation and General Health Examination Camp.
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                  On <span className="font-semibold text-slate-800">28th June 2026 (Sunday)</span>, Sri Vijay Ojha joined community volunteers and senior clinicians at the Vidyasagar Park premises on Sukia Street, Kolkata. 
                  He actively participated in the camp, thanking donors, facilitating healthcare kits, and addressing citizens on the vital necessity of voluntary blood donation.
                </p>

                {/* Logistics Info block */}
                <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-100 space-y-2.5 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="font-semibold text-slate-400 w-16 shrink-0 text-right font-mono text-[10px]">LOCATION:</span>
                    <span className="text-slate-700">{BLOOD_DONATION_CAMP_DATA.location}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="font-semibold text-slate-400 w-16 shrink-0 text-right font-mono text-[10px]">TIME:</span>
                    <span className="text-slate-700">{BLOOD_DONATION_CAMP_DATA.time}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="font-semibold text-slate-400 w-16 shrink-0 text-right font-mono text-[10px]">PRESIDED:</span>
                    <span className="text-slate-700">{BLOOD_DONATION_CAMP_DATA.presidedBy}</span>
                  </div>
                </div>

                {/* Supported organization tags */}
                <div className="space-y-2">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Co-sponsored & Supported by:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {BLOOD_DONATION_CAMP_DATA.supportedBy.map((org, index) => (
                      <span 
                        key={index}
                        className="text-[10px] font-medium bg-slate-50 text-slate-600 border border-slate-100 px-2.5 py-1 rounded"
                      >
                        {org}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Custom Video Player (Span 7) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-1">
                  <h4 className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
                    EVENT VIDEO FOOTAGE
                  </h4>
                  <p className="text-xs text-slate-400 font-light">Footage of Sri Vijay Ojha's presence and speech at the Sukia Street Camp.</p>
                </div>

                {/* Elegant Custom Controlled Video Container */}
                <div 
                  id="camp-video-container"
                  className="bg-slate-950 rounded-lg overflow-hidden border border-slate-800 relative group aspect-video flex flex-col justify-end"
                >
                  {/* Actual Video Tag or Mock Player */}
                  {customMedia.campVideoUrl ? (
                    <video
                      ref={videoRef}
                      src={customMedia.campVideoUrl}
                      className="w-full h-full object-contain absolute inset-0"
                      onTimeUpdate={handleVideoTimeUpdate}
                      onLoadedMetadata={handleVideoLoadedMetadata}
                    />
                  ) : (
                    /* High-Fidelity interactive video simulator with a live stock clip fallback to ensure beautiful instant preview */
                    <video
                      ref={videoRef}
                      src="https://assets.mixkit.co/videos/preview/mixkit-blood-donation-and-laboratory-testing-concept-39981-large.mp4"
                      className="w-full h-full object-cover absolute inset-0 opacity-40 hover:opacity-50 transition-opacity"
                      onTimeUpdate={handleVideoTimeUpdate}
                      onLoadedMetadata={handleVideoLoadedMetadata}
                      loop
                      muted={isVideoMuted}
                    />
                  )}

                  {/* Overlays */}
                  {!customMedia.campVideoUrl && !isVideoPlaying && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-950/45 z-10">
                      <div className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer" onClick={togglePlayVideo}>
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                      <p className="text-white font-medium text-xs mt-3.5">Play Camp Video Footage</p>
                      <p className="text-slate-400 text-[10px] mt-1 max-w-xs font-light">Use the Live Media Customizer at the bottom right to drop your actual video file here!</p>
                    </div>
                  )}

                  {/* Custom Controls Panel (Fades in on hover) */}
                  <div className="z-10 bg-gradient-to-t from-slate-950/90 to-transparent p-4 w-full space-y-2 opacity-90 group-hover:opacity-100 transition-opacity">
                    
                    {/* Time Progress Bar */}
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={videoProgress}
                        onChange={handleVideoProgressSeek}
                        className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
                      />
                    </div>

                    <div className="flex items-center justify-between text-white text-xs">
                      
                      {/* Left Controls: Play, Mute, Timings */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={togglePlayVideo}
                          className="hover:text-rose-500 transition-colors p-1 rounded hover:bg-white/10"
                        >
                          {isVideoPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                        </button>

                        <button
                          onClick={toggleMuteVideo}
                          className="hover:text-rose-500 transition-colors p-1 rounded hover:bg-white/10"
                        >
                          {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>

                        <span className="font-mono text-[10px] text-slate-300">
                          {formatVideoTime(currentTime)} / {formatVideoTime(videoDuration)}
                        </span>
                      </div>

                      {/* Right Controls: Badge, Fullscreen */}
                      <div className="flex items-center gap-2">
                        {customMedia.campVideoUrl ? (
                          <span className="text-[9px] bg-emerald-600 font-bold px-2 py-0.5 rounded uppercase">Your Video Loaded</span>
                        ) : (
                          <span className="text-[9px] bg-slate-800 font-bold px-2 py-0.5 rounded text-slate-400">Sample Stream</span>
                        )}
                        <button
                          onClick={handleMaximizeVideo}
                          className="hover:text-rose-500 transition-colors p-1 rounded hover:bg-white/10"
                        >
                          <Maximize className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Event Banners Subsection (Recreating Image 1 and 2 in high quality CSS) */}
            <div className="border-t border-slate-100 pt-8 space-y-5">
              
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">OFFICIAL CAMP BANNERS & SIGNAGE</h4>
                <p className="text-xs text-slate-400 font-light">Recreation of the camp posters. Tap Customize at the bottom to upload your photo files.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Banner 1 Box (from image 1) */}
                <div 
                  id="camp-banner-1"
                  className="bg-white rounded-lg overflow-hidden border border-slate-100 p-1 flex flex-col justify-between hover:border-rose-300 transition-colors h-[280px]"
                >
                  {customMedia.banner1Url ? (
                    <img 
                      src={customMedia.banner1Url} 
                      alt="Camp Banner 1" 
                      className="w-full h-full object-cover rounded-md"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    /* CSS Recreation of Banner 1 (Brick Wall banner - "স্বেচ্ছায় রক্তদান") */
                    <div className="w-full h-full bg-white rounded-md p-4 flex flex-col justify-between border border-rose-500 text-center relative overflow-hidden">
                      {/* Banner corner borders */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-bjp-green-600"></div>
                      
                      <div className="pt-2">
                        <span className="text-[10px] font-bold text-blue-700 tracking-wider block font-sans">WE ARE THE WORLD</span>
                        <span className="text-[9px] text-slate-400 uppercase tracking-wider font-mono">এর নিবেদন ভালোবাসে প্রতিদান</span>
                      </div>

                      <div className="my-1 text-center">
                        <h5 className="text-xl font-bold text-rose-600 tracking-wide font-display">স্বেচ্ছায় রক্তদান</h5>
                        <p className="text-[10px] text-slate-500 font-bold mt-0.5">VOLUNTARY BLOOD DONATION</p>
                      </div>

                      <div className="space-y-1 text-[10px] text-slate-600 font-light">
                        <p className="font-semibold text-slate-800">Date: 28th June 2026 (Sunday), 10:00 AM</p>
                        <p>Supervised by: <span className="font-semibold text-slate-800">Prof. (Dr.) Subir Ganguly</span></p>
                        <p className="text-[9px] bg-slate-50 px-2 py-0.5 rounded inline-block text-slate-400 mt-1 truncate max-w-full">
                          Sponsored by St. Paul's School Alumni - 1980
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Banner 2 Box (from image 2) */}
                <div 
                  id="camp-banner-2"
                  className="bg-white rounded-lg overflow-hidden border border-slate-100 p-1 flex flex-col justify-between hover:border-blue-300 transition-colors h-[280px]"
                >
                  {customMedia.banner2Url ? (
                    <img 
                      src={customMedia.banner2Url} 
                      alt="Camp Banner 2" 
                      className="w-full h-full object-cover rounded-md"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    /* CSS Recreation of Banner 2 (Rotary Banner - "স্বেচ্ছায় রক্তদান ও স্বাস্থ্য পরীক্ষা শিবির") */
                    <div className="w-full h-full bg-white rounded-md p-4 flex flex-col justify-between border border-blue-500 text-center relative overflow-hidden">
                      {/* Banner decoration */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-rose-600"></div>

                      <div className="pt-2">
                        <span className="text-[10px] font-bold text-blue-800 tracking-wider block font-sans">WE ARE THE WORLD</span>
                        <span className="text-[9px] text-slate-400 uppercase tracking-wider font-mono font-light">Rotary Club Collaboration</span>
                      </div>

                      <div className="my-1 text-center">
                        <h5 className="text-base font-bold text-blue-700 font-display">স্বেচ্ছায় রক্তদান ও স্বাস্থ্য পরীক্ষা শিবির</h5>
                        <p className="text-[9px] text-rose-600 font-bold mt-0.5">BLOOD DONATION & HEALTH CHECKUP CAMP</p>
                      </div>

                      <div className="space-y-1 text-[10px] text-slate-600 font-light">
                        <p className="font-semibold text-slate-800">Venue: Sukia Street Vidyasagar Park, Kolkata</p>
                        <p className="text-slate-500">In association with <span className="font-semibold text-blue-700">Rotary Club of Calcutta Renaissance</span></p>
                        <span className="inline-block text-[8px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wide mt-1 font-mono">
                          RI DISTRICT 3291
                        </span>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* 7. Citizen Connect: Local Grievance & Feedback Portal */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 scroll-mt-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Connect Info & Office contacts (Span 5) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-100 p-6 md:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="space-y-1.5 mb-6">
                <span className="text-[10px] font-bold text-bjp-green-600 uppercase tracking-widest bg-bjp-green-50 px-2.5 py-0.5 rounded">MLA Secretariat</span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display tracking-tight mt-1">Reach Jorasanko Secretariat</h3>
                <p className="text-xs text-slate-500">Sri Vijay Ojha maintains an open-door office policy for all residents of Ward 23 and the Kolkata Uttar constituency.</p>
              </div>

              {/* Contacts info list */}
              <div className="space-y-4">
                
                <div className="flex gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="p-2.5 bg-saffron-50 rounded-lg text-saffron-600 h-10 w-10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Office Address</p>
                    <p className="text-xs text-slate-700 font-medium mt-0.5 leading-relaxed">
                      Jorasanko Assembly Constituency Office, Near Sukia Street, Kolkata district, West Bengal, India.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="p-2.5 bg-bjp-green-50 rounded-lg text-bjp-green-600 h-10 w-10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Official Helpline</p>
                    <p className="text-xs text-slate-700 font-medium mt-0.5">+91 33 2244 5599 (Kolkata Office)</p>
                  </div>
                </div>

                <div className="flex gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="p-2.5 bg-slate-100 rounded-lg text-slate-600 h-10 w-10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Secretariat Email</p>
                    <p className="text-xs text-slate-700 font-medium mt-0.5">contact@vijayojhabjp.in</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
              <div className="p-4 bg-slate-50/50 rounded-lg border border-slate-100 text-xs text-slate-500 flex gap-2">
                <Info className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
                <p>This portal allows Jorasanko residents to file civic requests. Submissions are stored locally in the browser memory for demonstration.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Submission Form (Span 7) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-100 p-6 md:p-8">
            <h4 className="text-lg font-bold text-slate-900 mb-4 font-display">Submit a Message or Grievance</h4>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full text-xs border border-slate-200 rounded-lg px-3.5 py-2 bg-white focus:outline-hidden focus:border-saffron-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Contact Number</label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="Enter 10-digit number"
                    className="w-full text-xs border border-slate-200 rounded-lg px-3.5 py-2 bg-white focus:outline-hidden focus:border-saffron-500"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Email Address</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="yourname@domain.com"
                    className="w-full text-xs border border-slate-200 rounded-lg px-3.5 py-2 bg-white focus:outline-hidden focus:border-saffron-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Your Ward / Area *</label>
                  <select
                    value={formWard}
                    onChange={(e) => setFormWard(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-lg px-3.5 py-2 bg-white focus:outline-hidden focus:border-saffron-500"
                  >
                    <option value="Ward 23 (Sukia Street)">Ward 23 (Sukia Street)</option>
                    <option value="Ward 24 (Vidyasagar Park)">Ward 24 (Vidyasagar Park)</option>
                    <option value="Ward 25 (Jorasanko)">Ward 25 (Jorasanko Thakur Bari)</option>
                    <option value="Ward 26 (Kolkata Uttar)">Ward 26 (Kolkata Uttar Area)</option>
                    <option value="Other Jorasanko Ward">Other Ward (AC 165)</option>
                  </select>
                </div>

              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 block">Message Category *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { value: 'grievance', label: 'Local Issue' },
                    { value: 'suggestion', label: 'Development Suggestion' },
                    { value: 'appreciation', label: 'Appreciation' },
                    { value: 'other', label: 'General / Meeting' }
                  ].map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setFormType(cat.value as any)}
                      className={`py-2 px-3 rounded-lg border text-[11px] font-semibold text-center transition-all cursor-pointer ${
                        formType === cat.value
                          ? 'border-saffron-500 bg-saffron-50 text-saffron-600'
                          : 'border-slate-100 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Subject / Topic *</label>
                <input
                  type="text"
                  required
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  placeholder="E.g. Request for clean water facility near Sukia Street"
                  className="w-full text-xs border border-slate-200 rounded-lg px-3.5 py-2 bg-white focus:outline-hidden focus:border-saffron-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Describe Your Issue / Message in detail *</label>
                <textarea
                  required
                  rows={4}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Provide precise details of the grievance or request..."
                  className="w-full text-xs border border-slate-200 rounded-lg px-3.5 py-2 bg-white focus:outline-hidden focus:border-saffron-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-saffron-600 hover:bg-saffron-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs"
              >
                <Send className="w-4 h-4" />
                <span>Submit to MLA Grievance Cell</span>
              </button>

            </form>

            {/* Success alert message */}
            <AnimatePresence>
              {showSubmitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-lg p-4 mt-4 flex items-start gap-3 text-xs"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Grievance Submitted Successfully!</p>
                    <p className="text-emerald-700 mt-1">Thank you. Your request was successfully logged in your browser memory. We have added it to the "Submitted Petitions" register below for visualization.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* Submitted messages tracker (Demo view) */}
        {citizenMessages.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-100 p-6 md:p-8 mt-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-base font-bold text-slate-900 font-display">Submitted Citizen Petitions</h4>
                <p className="text-[11px] text-slate-400">Live monitoring of your inquiries stored in LocalStorage.</p>
              </div>
              <span className="text-[10px] font-bold bg-saffron-50 text-saffron-600 px-3 py-1 rounded">
                {citizenMessages.length} Messages
              </span>
            </div>

            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2">
              {citizenMessages.map((msg) => (
                <div 
                  key={msg.id}
                  className="bg-slate-50/50 border border-slate-100 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start gap-4 transition-colors hover:border-slate-200"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-xs text-slate-800">{msg.name}</span>
                      <span className="text-[10px] bg-slate-200/50 text-slate-600 px-2 py-0.5 rounded font-medium">
                        {msg.ward}
                      </span>
                      <span className={`text-[9px] font-semibold uppercase px-2 py-0.5 rounded ${
                        msg.messageType === 'grievance' ? 'bg-red-50 text-red-600 border border-red-100' :
                        msg.messageType === 'suggestion' ? 'bg-sky-50 text-sky-600 border border-sky-100' :
                        'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      }`}>
                        {msg.messageType}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-700">{msg.subject}</p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{msg.content}</p>
                    </div>

                    <div className="text-[10px] text-slate-400 font-medium">
                      Submitted: {msg.timestamp}
                    </div>
                  </div>

                  <div className="flex sm:flex-col justify-between items-end gap-3 w-full sm:w-auto shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <span className="text-[10px] bg-amber-50 text-amber-700 font-bold border border-amber-100 px-2.5 py-0.5 rounded">
                      Awaiting MLA Review
                    </span>
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2 py-0.5 rounded transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>

      {/* Static Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 py-8 border-t border-slate-100 text-center space-y-2">
        <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
          © 2026 Jorasanko Legislative Assembly Office, West Bengal. All Rights Reserved.
        </p>
        <p className="text-[10px] text-slate-400 font-light">
          Developed in adherence with Electoral Guidelines. This profile showcases the activities, affidavits, and constituency outreach of MLA Sri Vijay Ojha.
        </p>
      </footer>

      {/* Floating Media Preview Manager widget */}
      <MediaCustomizer media={customMedia} onChange={setCustomMedia} />

    </div>
  );
}
