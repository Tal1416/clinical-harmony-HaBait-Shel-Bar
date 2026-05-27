import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

const INITIAL_TEAM = [
  { initials: 'AT', name: 'Dr. Aris Thorne',  role: 'Lead Endocrinologist',  last: "I've reviewed your latest log...",   time: '2m',  online: true,  active: true },
  { initials: 'NS', name: 'Nurse Sarah',       role: 'Care Nurse',             last: 'The medication adjustments are…',     time: '1h',  online: true },
  { initials: 'LC', name: 'Liam Chen',         role: 'Care Coordinator',       last: 'Your appointment next week is confirmed.', time: 'Yesterday', online: false },
  { initials: 'HV', name: 'Dr. Helena Vance',  role: 'Attending Physician',    last: 'Please review the lab panel results.', time: 'Mon', online: false },
  { initials: 'MR', name: 'Maya Rivera, PT',   role: 'Physical Therapist',     last: 'Exercises updated for this week.',   time: 'Sun', online: false }
];

const INITIAL_MESSAGES = [
  { from: 'them', initials: 'AT', text: "Good morning Sarah. I've been reviewing your glucose levels from the last 48 hours. How have you been feeling after the afternoon meals?", at: '09:12 AM' },
  { from: 'me',   text: "Hi Dr. Thorne. I've been feeling a bit more fatigued around 4 PM. I logged the symptoms in the tracker. Sending the report now.", at: '09:15 AM', seen: true },
  { from: 'me',   card: { title: 'Symptom Log Report', range: 'Oct 21 – Oct 23, 2026', metric: 'Avg. Fatigue Level', value: 'Moderate (6/10)', barPct: 60 }, at: '09:16 AM', seen: true }
];

export default function Chat() {
  const [team, setTeam] = useState(INITIAL_TEAM);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(true);
  const chatRef = useRef(null);
  const textRef = useRef(null);

  const active = team.find(t => t.active) || team[0];

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, typing]);

  function send(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const at = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setMessages(m => [...m, { from: 'me', text, at, seen: false }]);
    setInput('');
    if (textRef.current) textRef.current.style.height = 'auto';
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, {
        from: 'them',
        initials: active.initials,
        text: "Thanks Sarah — noted. I'll review the latest log and follow up by end of day.",
        at: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1400);
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(e);
    }
  }

  function selectMember(initials) {
    setTeam(t => t.map(p => ({ ...p, active: p.initials === initials })));
  }

  const filtered = team.filter(p => !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.role.toLowerCase().includes(query.toLowerCase()));

  return (
    <Layout title="Clinical Team Chat" activeTab="team-chat">
      <main className="ml-64 flex flex-col">
        <div className="flex overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>

          {/* Care team list */}
          <section className="w-72 bg-surface-container-low/85 backdrop-blur-md border-r border-outline-variant flex flex-col">
            <div className="p-gutter">
              <h2 className="text-headline-sm font-headline-sm mb-stack-md">Care Team</h2>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-sm">search</span>
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="w-full bg-surface-container-highest border-none rounded-xl py-2 pl-10 pr-3 text-body-sm focus:ring-2 focus:ring-primary"
                  placeholder="Search team..."
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-stack-sm pb-stack-md space-y-1">
              {filtered.map(p => {
                const isActive = p.active;
                return (
                  <button key={p.initials} type="button" onClick={() => selectMember(p.initials)}
                    className={(isActive
                      ? 'w-full p-3 bg-surface-variant rounded-xl flex items-center gap-3 text-left'
                      : 'w-full p-3 hover:bg-surface-container rounded-xl flex items-center gap-3 cursor-pointer transition-colors text-left')}>
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary-container/40 flex items-center justify-center text-primary font-bold">{p.initials}</div>
                      {p.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-status-safe border-2 border-white rounded-full" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline gap-2">
                        <h3 className={`text-body-md truncate ${isActive ? 'font-bold' : ''}`}>{p.name}</h3>
                        <span className="text-xs text-on-surface-variant shrink-0">{p.time}</span>
                      </div>
                      <p className="text-body-sm text-on-surface-variant truncate">{p.last}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="p-gutter border-t border-surface-variant">
              <Link to="/report" className="flex items-center gap-2 text-primary font-bold text-label-caps hover:underline">
                <span className="material-symbols-outlined text-base">description</span> SEND REPORT
              </Link>
            </div>
          </section>

          {/* Chat thread */}
          <section className="flex-1 flex flex-col bg-surface relative min-w-0">
            <div className="p-stack-md sm:p-gutter bg-surface/80 backdrop-blur-md border-b border-surface-variant flex items-center justify-between">
              <div className="flex items-center gap-stack-md min-w-0">
                <div className="w-10 h-10 rounded-full bg-primary-container/40 flex items-center justify-center text-primary font-bold shrink-0">{active.initials}</div>
                <div className="min-w-0">
                  <h2 className="text-headline-sm font-headline-sm truncate">{active.name}</h2>
                  <p className="text-body-sm text-primary flex items-center gap-1">
                    <span className="w-2 h-2 bg-status-safe rounded-full" />
                    <span>{active.online ? 'Online · ' : 'Offline · '}{active.role}</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-surface-variant rounded-full transition"><span className="material-symbols-outlined">call</span></button>
                <button className="p-2 hover:bg-surface-variant rounded-full transition"><span className="material-symbols-outlined">videocam</span></button>
                <button className="p-2 hover:bg-surface-variant rounded-full transition"><span className="material-symbols-outlined">info</span></button>
              </div>
            </div>

            <div ref={chatRef} className="flex-1 overflow-y-auto p-gutter space-y-stack-lg scroll-smooth">
              <div className="flex justify-center">
                <span className="text-label-caps font-label-caps bg-surface-container px-3 py-1 rounded-full text-on-surface-variant">Today</span>
              </div>

              {messages.map((m, i) => {
                if (m.from === 'them') {
                  return (
                    <div key={i} className="flex items-end gap-3 max-w-[80%]">
                      <div className="w-8 h-8 rounded-full bg-primary-container/40 flex items-center justify-center text-primary text-xs font-bold shrink-0">{m.initials}</div>
                      <div>
                        <div className="bg-surface-container-high p-4 rounded-2xl rounded-bl-none clinical-shadow">
                          <p className="text-body-md">{m.text}</p>
                        </div>
                        <p className="text-[10px] text-on-surface-variant mt-1 ml-1">{m.at}</p>
                      </div>
                    </div>
                  );
                }
                if (m.card) {
                  return (
                    <div key={i} className="flex items-end justify-end gap-3 ml-auto max-w-[80%]">
                      <div className="w-full">
                        <div className="bg-surface-container-highest border border-primary/20 p-4 rounded-2xl clinical-shadow card-lift">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-10 h-10 bg-primary-container/30 rounded-xl flex items-center justify-center">
                              <span className="material-symbols-outlined text-primary">assessment</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-body-md">{m.card.title}</h4>
                              <p className="text-body-sm text-on-surface-variant">{m.card.range}</p>
                            </div>
                          </div>
                          <div className="bg-white/60 rounded-lg p-3 space-y-2 mb-4">
                            <div className="flex justify-between text-body-sm">
                              <span>{m.card.metric}</span>
                              <span className="font-bold text-error">{m.card.value}</span>
                            </div>
                            <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                              <div className="bg-error h-full" style={{ width: `${m.card.barPct}%` }} />
                            </div>
                          </div>
                          <Link to="/report" className="block text-center w-full py-2 bg-primary text-on-primary rounded-lg text-body-sm font-bold hover:opacity-90 transition">View Detailed Log</Link>
                        </div>
                        <p className="text-[10px] text-on-surface-variant mt-1 text-right mr-1">{m.at} · Seen</p>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={i} className="flex items-end justify-end gap-3 ml-auto max-w-[80%]">
                    <div className="text-right">
                      <div className="bg-primary text-on-primary p-4 rounded-2xl rounded-br-none clinical-shadow">
                        <p className="text-body-md">{m.text}</p>
                      </div>
                      <div className="flex items-center justify-end gap-1 mt-1 mr-1">
                        <p className="text-[10px] text-on-surface-variant">{m.at}</p>
                        <span className="material-symbols-outlined text-[12px] text-primary" style={m.seen ? { fontVariationSettings: "'FILL' 1" } : undefined}>{m.seen ? 'done_all' : 'done'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {typing && (
                <div className="flex items-end gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-container/40 flex items-center justify-center text-primary text-xs font-bold shrink-0">{active.initials}</div>
                  <div className="bg-surface-container-high px-4 py-3 rounded-2xl rounded-bl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full bounce-dot" style={{ animationDelay: '0s' }} />
                    <span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full bounce-dot" style={{ animationDelay: '.2s' }} />
                    <span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full bounce-dot" style={{ animationDelay: '.4s' }} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-stack-md sm:p-gutter bg-surface border-t border-surface-variant">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Link to="/log" className="inline-flex items-center gap-2 p-2 px-3 hover:bg-primary-container/10 text-primary rounded-xl transition border border-primary/20">
                  <span className="material-symbols-outlined text-sm">share_reviews</span>
                  <span className="text-body-sm font-bold">Share Symptom Log</span>
                </Link>
                <Link to="/report" className="inline-flex items-center gap-2 p-2 px-3 hover:bg-primary-container/10 text-primary rounded-xl transition border border-primary/20">
                  <span className="material-symbols-outlined text-sm">description</span>
                  <span className="text-body-sm font-bold">Send Report</span>
                </Link>
              </div>
              <form onSubmit={send} className="flex items-end gap-3 bg-surface-container-high p-2 rounded-2xl">
                <button type="button" className="p-2 text-on-surface-variant hover:text-primary transition">
                  <span className="material-symbols-outlined">add_circle</span>
                </button>
                <textarea
                  ref={textRef}
                  rows={1}
                  value={input}
                  onChange={e => {
                    setInput(e.target.value);
                    if (textRef.current) {
                      textRef.current.style.height = 'auto';
                      textRef.current.style.height = Math.min(128, textRef.current.scrollHeight) + 'px';
                    }
                  }}
                  onKeyDown={onKeyDown}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-body-md py-2 resize-none max-h-32 placeholder:text-on-surface-variant"
                  placeholder="Type a message safely..."
                />
                <button type="button" className="p-2 text-on-surface-variant hover:text-primary transition">
                  <span className="material-symbols-outlined">mood</span>
                </button>
                <button type="submit" className="bg-primary text-on-primary p-2 rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 duration-150 transition" aria-label="Send">
                  <span className="material-symbols-outlined">send</span>
                </button>
              </form>
              <p className="text-[10px] text-center mt-2 text-on-surface-variant opacity-70 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[12px]">lock</span>
                All clinical communications are end-to-end encrypted and HIPAA compliant.
              </p>
            </div>
          </section>

          {/* Right rail */}
          <aside className="hidden xl:flex w-80 bg-surface-container/85 backdrop-blur-md border-l border-outline-variant p-gutter flex-col gap-stack-lg overflow-y-auto">
            <div>
              <h3 className="text-label-caps font-label-caps text-on-surface-variant mb-stack-md">Primary Provider</h3>
              <div className="text-center bg-white p-stack-lg rounded-2xl clinical-shadow border border-outline-variant/30">
                <div className="w-24 h-24 rounded-full bg-primary-container/40 mx-auto mb-4 flex items-center justify-center text-primary font-bold text-2xl border-4 border-primary/10">{active.initials}</div>
                <h4 className="text-headline-sm font-headline-sm">{active.name}</h4>
                <p className="text-body-sm text-primary mb-4">{active.role}</p>
                <div className="flex justify-center gap-3">
                  <button className="p-2 bg-surface-container rounded-full hover:bg-primary-container/20 transition"><span className="material-symbols-outlined text-primary text-sm">mail</span></button>
                  <button className="p-2 bg-surface-container rounded-full hover:bg-primary-container/20 transition"><span className="material-symbols-outlined text-primary text-sm">phone_enabled</span></button>
                  <button className="p-2 bg-surface-container rounded-full hover:bg-primary-container/20 transition"><span className="material-symbols-outlined text-primary text-sm">calendar_month</span></button>
                </div>
              </div>
            </div>

            <div className="space-y-stack-md">
              <h3 className="text-label-caps font-label-caps text-on-surface-variant">Upcoming Appointment</h3>
              <div className="bg-secondary-container/30 border border-secondary/20 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-secondary">video_chat</span>
                  <span className="text-body-sm font-bold">Virtual Follow-up</span>
                </div>
                <p className="text-headline-sm font-headline-sm">Oct 26, 2026</p>
                <p className="text-body-sm text-on-surface-variant">10:30 AM – 11:00 AM</p>
                <button className="mt-3 text-secondary text-body-sm font-bold flex items-center gap-1 hover:underline">
                  Add to Calendar <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>

            <div className="space-y-stack-md">
              <h3 className="text-label-caps font-label-caps text-on-surface-variant">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-2">
                <button className="flex items-center gap-3 p-3 bg-white rounded-xl border border-outline-variant/30 hover:bg-surface-variant transition group">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">pill</span>
                  <span className="text-body-sm">Refill Request</span>
                </button>
                <Link to="/report" className="flex items-center gap-3 p-3 bg-white rounded-xl border border-outline-variant/30 hover:bg-surface-variant transition group">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">folder_shared</span>
                  <span className="text-body-sm">Clinical Documents</span>
                </Link>
                <button className="flex items-center gap-3 p-3 bg-white rounded-xl border border-outline-variant/30 hover:bg-error-container/40 transition group">
                  <span className="material-symbols-outlined text-error">emergency</span>
                  <span className="text-body-sm text-error font-bold">Emergency Protocol</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </Layout>
  );
}
