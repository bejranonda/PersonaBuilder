import { useState, useEffect } from 'react';
import {
  User, Bot, FileText, Download, Plus, Trash2, ArrowRight, ArrowLeft,
  Loader2, CheckCircle2, Sparkles, Copy,
} from 'lucide-react';
import { QUESTION_FLOW, PLATFORMS } from './data/questionFlow';
import { generateContentWithRetry } from './lib/api';

export default function App() {
  const [step, setStep] = useState(1);
  const [personaType, setPersonaType] = useState(null);

  // Questionnaire State
  const [currentQId, setCurrentQId] = useState(null);
  const [qHistory, setQHistory] = useState([]);
  const [answers, setAnswers] = useState({});

  // Samples State
  const [samples, setSamples] = useState([{ id: Date.now(), text: '', source: 'facebook', customSource: '' }]);

  // Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMarkdown, setGeneratedMarkdown] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (step === 2 && !currentQId) {
      setCurrentQId(QUESTION_FLOW[personaType].start);
      setQHistory([]);
    }
  }, [step, personaType]);

  const handleTypeSelect = (type) => {
    setPersonaType(type);
    setAnswers({});
    setCurrentQId(null);
  };

  const handleAnswerSelect = (optionLabel) => {
    setAnswers((prev) => ({ ...prev, [currentQId]: optionLabel }));
  };

  const handleNextQuestion = () => {
    const selectedLabel = answers[currentQId];
    if (!selectedLabel) return;

    const currentQData = QUESTION_FLOW[personaType][currentQId];
    const selectedOption = currentQData.options.find((o) => o.label === selectedLabel);

    if (selectedOption.nextId === 'END') {
      setStep(3);
    } else {
      setQHistory((prev) => [...prev, currentQId]);
      setCurrentQId(selectedOption.nextId);
    }
  };

  const handlePrevQuestion = () => {
    if (qHistory.length === 0) {
      setStep(1);
    } else {
      const newHistory = [...qHistory];
      const prevQId = newHistory.pop();
      setQHistory(newHistory);
      setCurrentQId(prevQId);
    }
  };

  const addSample = () => setSamples((prev) => [...prev, { id: Date.now(), text: '', source: 'facebook', customSource: '' }]);
  const removeSample = (id) => samples.length > 1 && setSamples((prev) => prev.filter((s) => s.id !== id));
  const updateSample = (id, field, value) => setSamples((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    setStep(4);

    try {
      const typeLabel = personaType === 'clone'
        ? 'สร้าง Persona โดยจำลองจากตัวผู้ใช้งาน (Clone)'
        : 'สร้าง AI Agent ขึ้นมาใหม่';

      const pathData = [];
      let iterQId = QUESTION_FLOW[personaType].start;
      while (iterQId && iterQId !== 'END') {
        const qObj = QUESTION_FLOW[personaType][iterQId];
        const ansLabel = answers[iterQId];
        if (!ansLabel) break;

        pathData.push(`${qObj.question}\n-> คำตอบ: ${ansLabel}`);

        const opt = qObj.options.find((o) => o.label === ansLabel);
        iterQId = opt ? opt.nextId : 'END';
      }

      const questionDataStr = pathData.join('\n\n');

      const sampleData = samples
        .filter((s) => s.text.trim() !== '')
        .map((s, i) => {
          const sourceName = s.source === 'other' ? s.customSource : PLATFORMS.find((p) => p.id === s.source)?.name;
          return `--- ตัวอย่างที่ ${i + 1} (จาก: ${sourceName}) ---\n${s.text}\n`;
        })
        .join('\n');

      const prompt = `
        โปรดสร้างเนื้อหาไฟล์ skill.md โดยอ้างอิงจากข้อมูลต่อไปนี้
        
        ประเภท: ${typeLabel}
        
        คุณลักษณะที่ต้องการถูกสกัดมาตามกรอบคิดเชิงลึก 6 มิติ (โปรดใช้ข้อมูลนี้เป็นแกนหลักในการสร้างกฎ):
        ${questionDataStr}
        
        [ตัวอย่างการเขียน/การสื่อสารที่นำมาเป็น Reference]
        ${sampleData || 'ไม่มีตัวอย่างข้อความ (ให้ใช้สไตล์ตามคุณลักษณะที่เลือกใน 6 มิติข้างต้น)'}
        
        โปรดวิเคราะห์ข้อมูลทั้งหมดและสร้าง Prompt Instructions (skill.md) ที่ประกอบด้วยหัวข้อต่อไปนี้อย่างครบถ้วน:
        - # 🤖 Persona: [ตั้งชื่อบทบาทให้เหมาะสม]
        - ## 🌍 Worldview & Perception (โลกทัศน์และมุมมองในการประมวลผลข้อมูล)
        - ## 🧠 Agency & Decision Making (ระดับความมีอิสระและวิธีการคิด/ตัดสินใจ)
        - ## 🎨 Taste & Style (รสนิยมและรูปแบบผลงานที่ผลิตออกไป)
        - ## 🗣️ Persuasion & Communication (กลยุทธ์การสื่อสารเพื่อโน้มน้าวใจ)
        - ## 🛡️ Guardrails & Capabilities (ขอบเขตจำกัดและข้อห้ามเด็ดขาด)
        - ## 📝 Writing Style Examples (วิเคราะห์โครงสร้างภาษาจากตัวอย่างที่ให้มา - ถ้ามี)
      `;

      let result = await generateContentWithRetry(prompt);

      result = result.replace(/^```markdown\n/i, '').replace(/\n```$/i, '');
      setGeneratedMarkdown(result);
    } catch (err) {
      console.error(err);
      setGeneratedMarkdown(
        `# 🤖 Persona: ${personaType === 'clone' ? 'Digital Clone' : 'Custom AI Agent'}\n\n## 🎯 Core Identity\n- AI Profile Generation Failed\n- กรุณาตั้งค่า API Key เพื่อการทำงานที่สมบูรณ์`
      );
      setError('ไม่สามารถเชื่อมต่อกับ AI ได้ ระบบได้สร้างโครงสร้างพื้นฐานให้คุณแทน');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'skill.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setStep(1);
    setPersonaType(null);
    setCurrentQId(null);
    setQHistory([]);
    setAnswers({});
    setSamples([{ id: Date.now(), text: '', source: 'facebook', customSource: '' }]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 pb-20">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-cyan-500 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent hidden sm:block">
              Vibe-Coding Persona Builder
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    step === s
                      ? 'bg-indigo-500 text-white ring-4 ring-indigo-500/20'
                      : step > s
                        ? 'bg-slate-700 text-slate-300'
                        : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-4 sm:w-8 h-1 mx-1 rounded-full transition-all duration-300 ${step > s ? 'bg-slate-700' : 'bg-slate-800'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Step 1: Type Selection */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold text-white tracking-tight">คุณต้องการสร้าง Persona แบบไหน?</h2>
              <p className="text-slate-400 text-lg">
                เลือกลักษณะของ <code className="bg-slate-800 px-2 py-1 rounded-md text-sm text-indigo-300">skill.md</code> ที่ใช้โมเดลวิเคราะห์เชิงลึกแบบ 6 มิติ
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => handleTypeSelect('clone')}
                className={`relative overflow-hidden group p-8 rounded-3xl border-2 transition-all text-left ${
                  personaType === 'clone'
                    ? 'border-indigo-500 bg-indigo-500/10 shadow-xl shadow-indigo-500/10'
                    : 'border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                    personaType === 'clone' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-indigo-400 group-hover:bg-slate-700'
                  }`}
                >
                  <User className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Clone ตัวฉันเอง</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  ถอดรหัสโลกทัศน์ รสนิยม และการตัดสินใจของคุณ เพื่อสร้าง AI ที่คิดและสื่อสารเสมือนเป็นตัวคุณเอง
                </p>
                {personaType === 'clone' && (
                  <div className="absolute top-6 right-6 text-indigo-500 animate-in zoom-in duration-300">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                )}
              </button>

              <button
                onClick={() => handleTypeSelect('agent')}
                className={`relative overflow-hidden group p-8 rounded-3xl border-2 transition-all text-left ${
                  personaType === 'agent'
                    ? 'border-cyan-500 bg-cyan-500/10 shadow-xl shadow-cyan-500/10'
                    : 'border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                    personaType === 'agent' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-cyan-400 group-hover:bg-slate-700'
                  }`}
                >
                  <Bot className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">สร้าง AI Agent</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  ออกแบบตัวตน ระบบการทำงาน และขอบเขตเชิงกลยุทธ์ เพื่อให้ได้ Agent ที่เชี่ยวชาญเฉพาะทาง
                </p>
                {personaType === 'agent' && (
                  <div className="absolute top-6 right-6 text-cyan-500 animate-in zoom-in duration-300">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                )}
              </button>
            </div>

            <div className="flex justify-center pt-10">
              <button
                onClick={() => setStep(2)}
                disabled={!personaType}
                className="flex items-center gap-2 bg-white text-slate-900 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white hover:scale-105 active:scale-95"
              >
                เริ่มสร้าง Persona <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Questions */}
        {step === 2 && currentQId && QUESTION_FLOW[personaType]?.[currentQId] && (
          <div className="max-w-2xl mx-auto flex flex-col min-h-[50vh]">
            <div className="mb-8 flex items-center gap-4 text-sm font-medium text-slate-400">
              <button
                onClick={handlePrevQuestion}
                className="hover:text-white transition-colors flex items-center gap-1 bg-slate-800/50 px-3 py-1.5 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
              </button>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            <div key={currentQId} className="flex-1 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {QUESTION_FLOW[personaType][currentQId].question}
                </h2>
              </div>

              <div className="space-y-4">
                {QUESTION_FLOW[personaType][currentQId].options.map((option, idx) => {
                  const isSelected = answers[currentQId] === option.label;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(option.label)}
                      className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/5'
                          : 'border-slate-800 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-800'
                      }`}
                    >
                      <span className={`text-lg font-medium ${isSelected ? 'text-indigo-300' : 'text-slate-300 group-hover:text-white'}`}>
                        {option.label}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ml-4 ${
                          isSelected ? 'border-indigo-500' : 'border-slate-700'
                        }`}
                      >
                        {isSelected && <div className="w-3 h-3 bg-indigo-500 rounded-full" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-10 flex justify-end">
              <button
                onClick={handleNextQuestion}
                disabled={!answers[currentQId]}
                className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20"
              >
                ถัดไป <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Writing Samples */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 max-w-2xl mx-auto">
            <div className="space-y-3 text-center mb-10">
              <h2 className="text-3xl font-bold text-white">ตัวอย่างการเขียน (References)</h2>
              <p className="text-slate-400">
                เพื่อให้ AI เลียนแบบสไตล์และรสนิยม (Taste) ได้สมจริง โปรดแนบตัวอย่างข้อความ
                <span className="text-indigo-400 block mt-1">(ไม่บังคับ แต่จะทำให้ skill.md แม่นยำขึ้นมาก)</span>
              </p>
            </div>

            <div className="space-y-8">
              {samples.map((sample) => (
                <div
                  key={sample.id}
                  className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6 sm:p-8 rounded-3xl relative group transition-all shadow-xl"
                >
                  {samples.length > 1 && (
                    <button
                      onClick={() => removeSample(sample.id)}
                      className="absolute top-6 right-6 text-slate-500 hover:text-red-400 transition-colors p-2 bg-slate-950 rounded-full"
                      title="ลบตัวอย่างนี้"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}

                  <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-400 mb-3">แหล่งที่มาของข้อความนี้</label>
                    <div className="flex flex-wrap gap-2">
                      {PLATFORMS.map((platform) => {
                        const Icon = platform.icon;
                        const isSelected = sample.source === platform.id;
                        return (
                          <button
                            key={platform.id}
                            onClick={() => updateSample(sample.id, 'source', platform.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                              isSelected
                                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                                : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                            }`}
                          >
                            <Icon className="w-4 h-4" /> {platform.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {sample.source === 'other' && (
                    <div className="mb-6 animate-in fade-in zoom-in duration-300">
                      <input
                        type="text"
                        placeholder="ระบุแหล่งที่มา (เช่น อีเมล, Slack, บทความวิชาการ)"
                        value={sample.customSource}
                        onChange={(e) => updateSample(sample.id, 'customSource', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  )}

                  <div>
                    <textarea
                      placeholder="วางข้อความตัวอย่างที่นี่..."
                      value={sample.text}
                      onChange={(e) => updateSample(sample.id, 'text', e.target.value)}
                      rows={6}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-5 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none placeholder:text-slate-600"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addSample}
              className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-slate-700 text-slate-400 hover:text-indigo-400 hover:border-indigo-500 hover:bg-indigo-500/10 py-5 rounded-3xl transition-all font-bold text-lg mt-6"
            >
              <Plus className="w-6 h-6" /> เพิ่มตัวอย่างข้อความ
            </button>

            <div className="flex justify-between pt-10">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 text-slate-400 hover:text-white px-6 py-4 rounded-2xl font-medium transition-colors"
              >
                <ArrowLeft className="w-5 h-5" /> ย้อนกลับ
              </button>
              <button
                onClick={handleGenerate}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-5 h-5" /> สร้าง skill.md เลย
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Result */}
        {step === 4 && (
          <div className="space-y-8 animate-in zoom-in-95 duration-500">
            {isGenerating ? (
              <div className="py-32 flex flex-col items-center justify-center text-center space-y-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse" />
                  <Loader2 className="w-20 h-20 text-indigo-400 animate-spin relative z-10" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">กำลังสังเคราะห์ข้อมูล 6 มิติ...</h2>
                  <p className="text-slate-400 text-lg">กำลังร้อยเรียง โลกทัศน์ มุมมอง และรสนิยม ลงใน skill.md</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-slate-800">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-bold mb-4 border border-green-500/20">
                      <CheckCircle2 className="w-4 h-4" /> สำเร็จแล้ว
                    </div>
                    <h2 className="text-3xl font-bold text-white">ไฟล์ skill.md ของคุณพร้อมใช้งาน</h2>
                    <p className="text-slate-400 mt-2">นำกฎเชิงลึกนี้ไปใส่ใน Vibe-Coding tools ของคุณเพื่อให้ AI ทำงานได้ดั่งใจ</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleCopy}
                      className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-xl hover:bg-slate-700 transition-colors font-bold"
                    >
                      {copied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                      {copied ? 'คัดลอกแล้ว' : 'คัดลอก'}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20 font-bold"
                    >
                      <Download className="w-5 h-5" />
                      ดาวน์โหลด
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-start gap-3">
                    <div className="mt-0.5">⚠️</div>
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <div className="bg-[#0d1117] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
                  <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center gap-2">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="ml-4 text-sm font-mono text-slate-400 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> skill.md
                    </span>
                  </div>
                  <div className="p-6 sm:p-8 overflow-auto max-h-[60vh] custom-scrollbar">
                    <pre className="text-slate-300 font-mono text-sm sm:text-base whitespace-pre-wrap leading-loose">
                      <code>{generatedMarkdown}</code>
                    </pre>
                  </div>
                </div>

                <div className="flex justify-center pt-8">
                  <button
                    onClick={handleReset}
                    className="text-slate-500 hover:text-white transition-colors font-medium flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> สร้าง Persona ใหม่อีกครั้ง
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
