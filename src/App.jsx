import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  BookOpen, 
  Users, 
  Zap, 
  Search, 
  Award, 
  Mail, 
  Phone, 
  Linkedin, 
  ChevronRight, 
  MessageSquare, 
  Target, 
  Cpu, 
  BarChart4, 
  Filter,
  Briefcase,
  GraduationCap,
  Download,
  Send,
  Sparkles,
  CheckCircle2,
  Calendar,
  Lightbulb,
  FileText
} from 'lucide-react';

// Configuración de Datos y Tema
const THEME = {
  navy: 'bg-[#001f3f]',
  navyText: 'text-[#001f3f]',
  slate: 'bg-slate-600',
  slateText: 'text-slate-600',
  accent: 'bg-blue-600',
  accentText: 'text-blue-600',
  light: 'bg-gray-50',
};

const EXPERIENCE = [
  {
    company: "Instituto Tecnológico Universitario Cordillera",
    role: "Business Partner de Marketing",
    period: "Oct 2024 - Presente",
    description: "Lidero el área de marketing del Tecnológico Universitario Cordillera con enfoque estratégico, creativo y comercial. Dirijo campañas orientadas a la captación de estudiantes para carreras de tercer nivel y maestrías, diseño la planificación anual de marketing y gestiono el rendimiento del equipo y los proveedores clave.",
    impact: [
      "+40% de generación de leads en campañas para programas de tercer nivel y maestrías.",
      "Diseño de guiones y campañas creativas con contenido persuasivo, generando engagement real en múltiples canales.",
      "Optimización de procesos internos que redujeron en 25% los tiempos de ejecución de campañas y acciones tácticas.",
      "Organización de eventos (ferias, webinars, activaciones) que superaron las expectativas de los stakeholders."
      "Mejora en la satisfacción y desempeño del equipo mediante una redistribución estratégica de funciones y liderazgo colaborativo."
    ],
    skills: ["Estrategia de Marketing", "Gestión de Presupuestos", "CRM", "Análisis de Datos", "Gestión y Liderazgo", "Gestión de proyectos", "Innovación y creatividad"]
  },
  {
    company: "LAE Educación Internacional Ecuador",
    role: "Marketing Specialist",
    period: "Mar 2024 - Sep 2024",
    description: "Gestión de marketing digital y pauta publicitaria. Implementación de CRM y flujos automatizados.",
    impact: [
      "Optimización de ROI en pauta digital.",
      "Automatización de comunicaciones aumentando la eficiencia operativa."
    ],
    skills: ["Marketing Digital", "Automatización", "ROI", "Social Media"]
  },
  {
    company: "GlobalAuditors",
    role: "Auditor Informático",
    period: "Abr 2018 - Presente",
    description: "Evaluación de sistemas de control interno basado en ISO 27001 para entidades como CNT y EPMTPQ.",
    impact: [
      "Garantía de integridad y seguridad de la información en infraestructuras críticas.",
      "Alineación con normas de control interno de la Contraloría General del Estado."
    ],
    skills: ["ISO 27001", "Ciberseguridad", "Auditoría", "Control Interno"]
  },
  {
    company: "Universidad Técnica Particular de Loja (UTPL)",
    role: "Coordinador Regional de Marketing / Coordinador Centro Apoyo",
    period: "Feb 2019 - Sep 2023",
    description: "Liderazgo regional para captación y retención de estudiantes. Manejo de presupuestos significativos.",
    impact: [
      "Centro #1 en atención al estudiante.",
      "Mitigación de quejas en un 90%.",
      "Cumplimiento de meta al 30% sobre el periodo anterior."
    ],
    skills: ["Gestión Regional", "Liderazgo de Equipos", "Presupuestos", "Relaciones Públicas"]
  },
  {
    company: "EDES Business School",
    role: "Docente Escuela de Negocios",
    period: "Jul 2021 - Dic 2022",
    description: "Mentoría en marketing digital y liderazgo para emprendedores sostenibles.",
    impact: ["Desarrollo de talento ejecutivo en áreas digitales."],
    skills: ["Docencia", "Mentoría", "Liderazgo"]
  },
  {
    company: "Flavors Academy",
    role: "CEO",
    period: "Abr 2015 - Dic 2022",
    description: "Creación y ejecución de estrategias de capacitación a medida a nivel nacional e internacional.",
    impact: ["Potenciación de perfiles profesionales mediante educación continua."],
    skills: ["Dirección General", "Estrategia", "Innovación"]
  },
  {
    company: "Flavors Academy",
    role: "CEO",
    period: "Abr 2015 - Dic 2022",
    description: "Creación y ejecución de estrategias de capacitación a medida a nivel nacional e internacional.",
    impact: ["Potenciación de perfiles profesionales mediante educación continua."],
    skills: ["Dirección General", "Estrategia", "Innovación"]
  }
];

const SKILLS_DASHBOARD = [
  { name: "Marketing Educativo & Estratégico", value: 98, icon: <Target className="w-5 h-5" /> },
  { name: "Gestión de Procesos & Auditoría", value: 95, icon: <ShieldCheck className="w-5 h-5" /> },
  { name: "Liderazgo de Equipos de Alto Rendimiento", value: 92, icon: <Users className="w-5 h-5" /> },
  { name: "Metodologías Ágiles (Scrum/Lean)", value: 90, icon: <Zap className="w-5 h-5" /> },
  { name: "Comunicación & Branding Digital", value: 94, icon: <Sparkles className="w-5 h-5" /> },
  { name: "Análisis de Datos & Rentabilidad", value: 88, icon: <BarChart4 className="w-5 h-5" /> }
];

const EDUCATION = [
  { title: "Magister en Gerencia de Sistemas y TI", school: "Universidad de las Américas", status: "Graduado" },
  { title: "Ingeniero de Sistemas en Telecomunicaciones", school: "Universidad Internacional SEK", status: "Graduado" },
  { title: "Licenciado en Comunicación", school: "UTPL", status: "Egresado (Elaboración de Tesis)" }
];

const CERTIFICATIONS = [
  "AI for Business (CR Certicorp)",
  "Digital Marketing Expert (CR Certicorp)",
  "Scrum Product Owner (Certiprof)",
  "Lean Six Sigma Black Belt (Certiprof)",
  "Google Ads Search Certification",
  "Microsoft Certified Educator",
  "Business Intelligence Foundation"
];

const API_KEY = ""; // La clave se proporciona en el entorno de ejecución

// Función de ayuda para llamadas a Gemini con backoff exponencial
async function callGemini(prompt, systemInstruction = "", isJson = false) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`;
  
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
    generationConfig: isJson ? { responseMimeType: "application/json" } : undefined
  };

  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text;
      }
    } catch (e) {
      // Reintento
    }
    await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
  }
  return null;
}

export default function App() {
  const [filterType, setFilterType] = useState('all');
  
  // Estados para herramientas IA
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: 'Hola, soy el Analista de Rentabilidad de Juanjo. ¿Quieres saber cómo sus estrategias pueden impactar en tu retorno de inversión o mejorar tus procesos educativos?' }
  ]);
  
  const [jdText, setJdText] = useState('');
  const [fittingResult, setFittingResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Nuevas herramientas
  const [companyName, setCompanyName] = useState('');
  const [valueProp, setValueProp] = useState('');
  const [isGeneratingProp, setIsGeneratingProp] = useState(false);

  const [marketingChallenge, setMarketingChallenge] = useState('');
  const [strategySolution, setStrategySolution] = useState('');
  const [isSolving, setIsSolving] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleChat = async () => {
    if (!chatMessage.trim()) return;
    const userMsg = chatMessage;
    setChatMessage('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);

    const response = await callGemini(
      `Responde a: "${userMsg}"`,
      "Eres un analista experto en el perfil de Juan José Enríquez Segovia. Usa sus datos: +40% leads, -25% tiempos, experto en marketing educativo y auditoría ISO 27001. Sé profesional y ejecutivo."
    );
    
    setChatHistory(prev => [...prev, { role: 'ai', text: response || "Error de conexión." }]);
  };

  const handleFittingSimulation = async () => {
    if (!jdText.trim()) return;
    setIsAnalyzing(true);
    const response = await callGemini(
      `Analiza el encaje de Juan José para esta vacante: "${jdText}". Devuelve JSON con score (0-100), pros (lista), cons (lista) y conclusion.`,
      "",
      true
    );
    if (response) setFittingResult(JSON.parse(response));
    setIsAnalyzing(false);
  };

  const handleValueProp = async () => {
    if (!companyName.trim()) return;
    setIsGeneratingProp(true);
    const response = await callGemini(
      `Genera una propuesta de valor única para la empresa "${companyName}" de parte de Juan José Enríquez. Resalta su perfil de Ing. de Sistemas + Comunicador + Experto en Marketing. Explica por qué es el candidato ideal para esa empresa específica.`,
      "Escribe en tono persuasivo, elegante y corporativo."
    );
    setValueProp(response);
    setIsGeneratingProp(false);
  };

  const handleStrategyConsultant = async () => {
    if (!marketingChallenge.trim()) return;
    setIsSolving(true);
    const response = await callGemini(
      `Plantea una solución estratégica de 3 pasos al siguiente reto: "${marketingChallenge}". Usa la metodología de Juan José: optimización de procesos, enfoque en leads y liderazgo ágil.`,
      "Responde como un consultor senior de marketing."
    );
    setStrategySolution(response);
    setIsSolving(false);
  };

  return (
    <div className={`min-h-screen ${THEME.light} font-['Montserrat'] text-gray-800`}>
      {/* Navegación */}
      <nav className={`fixed top-0 w-full z-50 ${THEME.navy} text-white shadow-xl backdrop-blur-md bg-opacity-95`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight font-['Poppins']">JUAN JOSÉ ENRÍQUEZ SEGOVIA</h1>
            <span className="text-xs text-blue-300 uppercase tracking-widest font-semibold">Senior Strategist & Educator</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium uppercase">
            <a href="#dashboard" className="hover:text-blue-300 transition-colors">Dashboard</a>
            <a href="#experience" className="hover:text-blue-300 transition-colors">Experiencia</a>
            <a href="#ai-tools" className="hover:text-blue-300 transition-colors">AI Tools</a>
            <a href="mailto:manager@juanjoenriquez.com" className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-all">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`pt-44 pb-32 ${THEME.navy} text-white relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500 bg-opacity-20 border border-blue-400 border-opacity-30 px-3 py-1 rounded-full text-blue-300 text-xs font-bold mb-6">
              <Sparkles className="w-4 h-4" /> ESTRATEGIA BASADA EN DATOS
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-['Poppins'] leading-tight mb-8">
              ¿Tu marketing digital genera <span className="text-blue-400">clientes</span> o solo <span className="text-slate-400">likes</span>?
            </h2>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-xl">
              Transformo la complejidad técnica en eficiencia operativa. Experto en convertir instituciones educativas en líderes de mercado mediante procesos optimizados y liderazgo de alto impacto.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => document.getElementById('ai-tools').scrollIntoView({behavior:'smooth'})} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 transition-all transform hover:-translate-y-1">
                Herramientas IA ✨ <Target className="w-5 h-5" />
              </button>
              <button onClick={() => document.getElementById('experience').scrollIntoView({behavior:'smooth'})} className="bg-white bg-opacity-10 hover:bg-opacity-20 border border-white border-opacity-20 px-8 py-4 rounded-lg font-bold transition-all">
                Ver Trayectoria
              </button>
            </div>
          </div>
          <div className="hidden md:flex justify-end">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl">JJ</div>
                  <div>
                    <h4 className="font-bold">Perfil Multi-Facético</h4>
                    <p className="text-sm text-gray-400">Ing. Sistemas | Mag. TI | Lic. Comunicación</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Growth en Leads (Cordillera)</span>
                    <span className="text-green-400 font-bold">+40%</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 w-[90%] h-full"></div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Eficiencia en Procesos</span>
                    <span className="text-green-400 font-bold">+25%</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 w-[85%] h-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard de Habilidades */}
      <section id="dashboard" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold font-['Poppins'] mb-4">Panel de Competencias Estratégicas</h3>
            <p className="text-gray-500 max-w-2xl mx-auto">Visualización del dominio de habilidades clave enfocadas en la rentabilidad y el liderazgo institucional.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {SKILLS_DASHBOARD.map((skill, idx) => (
              <div key={idx} className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-all border-b-4 border-b-blue-600">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white rounded-lg text-blue-600 shadow-sm">
                    {skill.icon}
                  </div>
                  <h4 className="font-bold text-gray-700">{skill.name}</h4>
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <span className="text-xs font-semibold inline-block text-blue-600">{skill.value}%</span>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                    <div style={{ width: `${skill.value}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI TOOLS SECTION - EXPANDED */}
      <section id="ai-tools" className="py-24 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-600 bg-opacity-20 text-blue-400 px-4 py-1 rounded-full text-xs font-bold mb-4">
              <Cpu className="w-4 h-4" /> POWERED BY GEMINI LLM
            </div>
            <h3 className="text-3xl font-bold font-['Poppins']">Centro de Consultoría Inteligente</h3>
            <p className="text-slate-400 mt-2">Prueba mi capacidad estratégica en tiempo real antes de la entrevista.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Analista de Rentabilidad */}
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-600 rounded-xl">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">✨ Analista de Rentabilidad ✨</h4>
                  <p className="text-sm text-slate-400">Conversa con mi perfil enfocado en resultados.</p>
                </div>
              </div>
              <div className="flex-grow bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden flex flex-col shadow-xl min-h-[400px]">
                <div className="p-6 h-[320px] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-600">
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-700 border border-slate-600'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <div className="p-4 bg-slate-900 border-t border-slate-700 flex gap-3">
                  <input 
                    type="text" 
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleChat()}
                    placeholder="Pregunta sobre mi impacto en ventas..." 
                    className="flex-grow bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                  <button onClick={handleChat} className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-all">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Generador de Propuesta de Valor */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-600 rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">✨ Propuesta de Valor Personalizada ✨</h4>
                  <p className="text-sm text-slate-400">Dime tu empresa y crearé un pitch a medida.</p>
                </div>
              </div>
              <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl min-h-[400px] flex flex-col">
                <input 
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Nombre de la empresa / Universidad..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm mb-4 focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <button 
                  onClick={handleValueProp}
                  disabled={isGeneratingProp || !companyName}
                  className="w-full py-4 rounded-xl bg-purple-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-purple-700 disabled:opacity-50 transition-all"
                >
                  {isGeneratingProp ? <Sparkles className="animate-spin" /> : 'Generar Pitch ✨'}
                </button>
                <div className="mt-6 p-6 bg-purple-50 rounded-xl border border-purple-100 flex-grow italic text-sm text-gray-700 leading-relaxed overflow-y-auto max-h-[150px]">
                  {valueProp || "Aquí aparecerá un argumento de contratación único basado en las necesidades de tu empresa."}
                </div>
              </div>
            </div>

            {/* Simulador de Encaje */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-cyan-600 rounded-xl">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">✨ Simulador de Encaje ✨</h4>
                  <p className="text-sm text-slate-400">Pega el Job Description para ver mi afinidad.</p>
                </div>
              </div>
              <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl min-h-[400px] flex flex-col">
                <textarea 
                  rows="4"
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Requisitos del puesto..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm mb-4 focus:ring-2 focus:ring-cyan-500 outline-none resize-none"
                />
                <button 
                  onClick={handleFittingSimulation}
                  disabled={isAnalyzing || !jdText}
                  className="w-full py-4 rounded-xl bg-cyan-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-cyan-700 disabled:opacity-50 transition-all"
                >
                  {isAnalyzing ? 'Calculando...' : 'Calcular Match ✨'}
                </button>
                {fittingResult && (
                  <div className="mt-4 p-4 bg-cyan-50 rounded-xl border border-cyan-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-cyan-900">Score: {fittingResult.score}%</span>
                    </div>
                    <p className="text-xs text-gray-600">{fittingResult.conclusion}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Consultor de Estrategia Flash */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-600 rounded-xl">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">✨ Consultor de Estrategia Flash ✨</h4>
                  <p className="text-sm text-slate-400">Plantea un problema de marketing y te doy mi solución.</p>
                </div>
              </div>
              <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl min-h-[400px] flex flex-col">
                <textarea 
                  rows="4"
                  value={marketingChallenge}
                  onChange={(e) => setMarketingChallenge(e.target.value)}
                  placeholder="Ej: La captación de alumnos en postgrados ha bajado un 10%..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm mb-4 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                />
                <button 
                  onClick={handleStrategyConsultant}
                  disabled={isSolving || !marketingChallenge}
                  className="w-full py-4 rounded-xl bg-orange-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-orange-700 disabled:opacity-50 transition-all"
                >
                  {isSolving ? 'Diseñando Estrategia...' : 'Obtener Solución ✨'}
                </button>
                <div className="mt-6 p-6 bg-orange-50 rounded-xl border border-orange-100 flex-grow text-sm text-gray-700 overflow-y-auto max-h-[150px]">
                  {strategySolution || "Plantea un reto y recibirás un plan de acción de 3 pasos basado en mi experiencia real."}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Experiencia */}
      <section id="experience" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h3 className="text-3xl font-bold font-['Poppins'] mb-4">Trayectoria Profesional</h3>
              <p className="text-gray-500">Filtrar para una revisión detallada por contexto.</p>
            </div>
            <div className="flex bg-white p-1 rounded-lg shadow-sm border border-gray-200">
              {['all', 'marketing', 'management'].map(t => (
                <button 
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${filterType === t ? 'bg-[#001f3f] text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  {t === 'all' ? 'Todos' : t === 'marketing' ? 'Marketing' : 'Gestión'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-8">
            {EXPERIENCE.filter(exp => {
                if (filterType === 'marketing') return exp.role.toLowerCase().includes('marketing');
                if (filterType === 'management') return exp.role.toLowerCase().includes('auditor') || exp.role.toLowerCase().includes('coordinador');
                return true;
            }).map((exp, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4">
                    <div className="text-blue-600 font-bold text-sm mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {exp.period}
                    </div>
                    <h4 className="text-xl font-bold text-[#001f3f] mb-1">{exp.company}</h4>
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">{exp.role}</span>
                  </div>
                  <div className="md:w-3/4 border-l border-gray-100 md:pl-8">
                    <p className="text-gray-600 mb-6 leading-relaxed">{exp.description}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-bold uppercase text-gray-400 mb-2">Impacto</h5>
                        {exp.impact.map((imp, i) => (
                          <div key={i} className="flex gap-2 text-sm text-gray-700 mb-1">
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> {imp}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${THEME.navy} text-white py-12 border-t border-slate-800`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h4 className="text-xl font-bold mb-2">Juan José Enríquez Segovia</h4>
            <p className="text-gray-400 text-sm">Inspirando Éxito y Crecimiento mediante Innovación y Liderazgo.</p>
          </div>
          <div className="flex gap-6">
            <a href="https://bit.ly/42LeHua" target="_blank" className="hover:text-blue-400"><Linkedin /></a>
            <a href="mailto:manager@juanjoenriquez.com" className="hover:text-blue-400"><Mail /></a>
            <a href="tel:+593983838078" className="hover:text-blue-400"><Phone /></a>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-2">© 2025 | Corporate Excellence Dashboard</p>
            <button onClick={() => window.print()} className="text-xs bg-slate-800 px-4 py-2 rounded-md hover:bg-slate-700">
              Descargar PDF
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
