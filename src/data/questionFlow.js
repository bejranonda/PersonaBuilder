import { Facebook, Twitter, Linkedin, Instagram, FileText, Sparkles } from 'lucide-react';

// Help functions to structure
const t = (th, en, de) => ({ th, en, de });

export const QUESTION_FLOW = {
  clone: {
    start: 'worldview',
    worldview: {
      question: t(
        '[มิติที่ 1: โลกทัศน์ - Worldview] เลนส์หลักที่คุณใช้มองโลกและปัญหาต่างๆ คือแบบไหน?',
        '[Dimension 1: Worldview] What is your primary lens for viewing the world and its problems?',
        '[Dimension 1: Weltanschauung] Was ist Ihre primäre Perspektive auf die Welt und ihre Probleme?'
      ),
      options: [
        { label: t('Systems Thinker: มองทุกอย่างเชื่อมโยงกันเป็นระบบ หา Root Cause เสมอ', 'Systems Thinker: Sees everything as connected systems, always seeking the root cause.', 'Systemdenker: Sieht alles als vernetzte Systeme, sucht immer nach der Ursache.'), nextId: 'perception_system' },
        { label: t('Pragmatist: เน้นผลลัพธ์ อะไรเวิร์คทำเลย ไม่ยึดติดทฤษฎี เน้นลงมือทำ', 'Pragmatist: Focuses on results. If it works, do it. Action-oriented over theory.', 'Pragmatiker: Fokussiert auf Ergebnisse. Theorie ist weniger wichtig als Handeln.'), nextId: 'perception_pragmatic' },
        { label: t('Critical/Skeptical: ตั้งคำถาม จับผิด หาช่องโหว่ ประเมินความเสี่ยงไว้ก่อน', 'Critical/Skeptical: Questions everything, finds loopholes, assesses risks first.', 'Kritiker/Skeptiker: Hinterfragt alles, findet Lücken, bewertet Risiken zuerst.'), nextId: 'perception_critical' },
        { label: t('Optimist/Creator: โฟกัสที่โอกาส ความเป็นไปได้ใหม่ๆ และไอเดียสร้างสรรค์', 'Optimist/Creator: Focuses on opportunities, new possibilities, and creative ideas.', 'Optimist/Schöpfer: Fokussiert sich auf Chancen, neue Möglichkeiten und kreative Ideen.'), nextId: 'perception_creative' }
      ]
    },
    perception_system: {
      question: t(
        '[มิติที่ 2: มุมมอง - Perception] ในฐานะคนที่มองภาพรวม เวลาเจอข้อมูลมหาศาล คุณจัดระเบียบมันอย่างไร?',
        '[Dimension 2: Perception] As someone who sees the big picture, how do you organize massive data?',
        '[Dimension 2: Wahrnehmung] Als jemand, der das große Ganze sieht, wie organisieren Sie massive Daten?'
      ),
      options: [
        { label: t('จัดหมวดหมู่ (Categorize) และสร้าง Framework/Model ขึ้นมาครอบ', 'Categorize and build a structural framework or model around it.', 'Kategorisieren Sie und bauen Sie einen Rahmen (Framework) oder ein Modell darum.'), nextId: 'agency' },
        { label: t('พยายามมองหา Pattern หรือความผิดปกติ (Anomalies) ที่คนอื่นมองไม่เห็น', 'Try to seek hidden patterns or anomalies that others miss.', 'Versuchen Sie, verborgene Muster oder Anomalien zu finden, die andere übersehen.'), nextId: 'agency' }
      ]
    },
    perception_pragmatic: {
      question: t(
        '[มิติที่ 2: มุมมอง - Perception] เพื่อให้ได้ผลลัพธ์ที่ไว คุณมักจะเลือกมองข้ามสิ่งใด?',
        '[Dimension 2: Perception] To get fast results, what do you usually choose to ignore?',
        '[Dimension 2: Wahrnehmung] Um schnelle Ergebnisse zu erzielen, was ignorieren Sie normalerweise?'
      ),
      options: [
        { label: t('มองข้ามรายละเอียดปลีกย่อย (Micro-details) เอาแค่กฎ 80/20 พอ', 'Ignore micro-details. Just stick to the 80/20 rule.', 'Ignorieren Sie Mikro-Details. Halten Sie sich einfach an die 80/20-Regel.'), nextId: 'agency' },
        { label: t('มองข้ามอารมณ์ความรู้สึก เน้นที่ข้อเท็จจริง (Facts) และการกระทำ (Action) ล้วนๆ', 'Ignore emotions. Focus purely on hard facts and actions.', 'Ignorieren Sie Emotionen. Fokussieren Sie sich rein auf harte Fakten und Handlungen.'), nextId: 'agency' }
      ]
    },
    perception_critical: {
      question: t(
        '[มิติที่ 2: มุมมอง - Perception] สิ่งแรกที่คุณมักจะมองเห็น เมื่อมีคนเสนอไอเดียใหม่คืออะไร?',
        '[Dimension 2: Perception] What is the first thing you notice when someone proposes a new idea?',
        '[Dimension 2: Wahrnehmung] Was fällt Ihnen als Erstes auf, wenn jemand eine neue Idee vorschlägt?'
      ),
      options: [
        { label: t('ความเสี่ยง (Risks), ผลกระทบแฝง (Side-effects) และ Worst-case scenario', 'Risks, side-effects, and worst-case scenarios.', 'Risiken, Nebenwirkungen und Worst-Case-Szenarien.'), nextId: 'agency' },
        { label: t('ความไม่สมเหตุสมผลของตรรกะ (Logical Fallacies) และอคติ (Bias)', 'Logical fallacies and cognitive biases.', 'Logische Fehlschlüsse und kognitive Verzerrungen.'), nextId: 'agency' }
      ]
    },
    perception_creative: {
      question: t(
        '[มิติที่ 2: มุมมอง - Perception] คุณมักจะเชื่อมโยงข้อมูลใหม่ๆ เข้ากับอะไรเพื่อให้เกิดไอเดีย?',
        '[Dimension 2: Perception] What do you usually connect new data to, in order to spark ideas?',
        '[Dimension 2: Wahrnehmung] Womit verbinden Sie neue Daten normalerweise, um Ideen zu entfachen?'
      ),
      options: [
        { label: t('เชื่อมกับศาสตร์อื่นๆ ที่ดูไม่น่าจะเกี่ยวข้องกันเลย (Cross-disciplinary)', 'Connect it to completely unrelated disciplines (Cross-disciplinary).', 'Verbinden Sie es mit völlig anderen Disziplinen (Transdisziplinär).'), nextId: 'agency' },
        { label: t('เชื่อมกับประสบการณ์ส่วนตัว หรือร้อยเรียงเป็นเรื่องเล่า (Storytelling)', 'Connect to personal experiences or weave it into storytelling.', 'Mit persönlichen Erfahrungen verknüpfen oder in Geschichten einweben.'), nextId: 'agency' }
      ]
    },
    agency: {
      question: t(
        '[มิติที่ 3: ตัวตน - Agency] เมื่อถึงจุดที่ต้อง "ตัดสินใจสร้างผลงาน" คุณพึ่งพาสิ่งใดมากที่สุด?',
        '[Dimension 3: Agency] When required to "make a decision to produce work," what do you rely on most?',
        '[Dimension 3: Agency] Wenn Sie "Entscheidungen für die Arbeit treffen" müssen, worauf verlassen Sie sich am meisten?'
      ),
      options: [
        { label: t('พึ่งพาข้อมูลสนับสนุน (Decision Support Data) ทุกอย่างต้องมี Evidence ชัดเจน', 'Decision Support Data. Everything must have clear evidence.', 'Entscheidungsunterstützende Daten. Alles muss klare Beweise haben.'), nextId: 'taste' },
        { label: t('พึ่งพาสัญชาตญาณ ประสบการณ์ และความเชี่ยวชาญส่วนตัว (Gut-feeling & Expertise)', 'Gut-feeling, expertise, and personal experience.', 'Bauchgefühl, Fachwissen und persönliche Erfahrung.'), nextId: 'taste' },
        { label: t('พึ่งพาเสียงตอบรับ (Feedback) ถามผู้คนหรือเน้น User-centric เป็นแกนหลัก', 'Feedback. Asking people or focusing on user-centric methods.', 'Feedback. Leute fragen oder benutzerzentrierte Methoden fokussieren.'), nextId: 'taste' },
        { label: t('พึ่งพาการทดลอง (Trial & Error) ทำไปก่อน ผิดก็แก้ให้ไว', 'Trial & Error. Do it first, fail fast, and fix quickly.', 'Versuch & Irrtum. Einfach machen, schnell scheitern und beheben.'), nextId: 'taste' }
      ]
    },
    taste: {
      question: t(
        '[มิติที่ 4: รสนิยม - Taste] รสนิยม (Style Agents) ของผลงานที่คุณภูมิใจนำเสนอ มักมีลักษณะแบบไหน?',
        '[Dimension 4: Taste] What is the style of the work you are most proud to present?',
        '[Dimension 4: Geschmack] Welchen Stil hat die Arbeit, auf die Sie am stolzesten sind?'
      ),
      options: [
        { label: t('Minimalist: เรียบง่าย กระชับ ตัดน้ำทิ้งหมด (Concise & Clean)', 'Minimalist: Concise, clean, cutting out all the fluff.', 'Minimalistisch: Prägnant, sauber, ohne überflüssigen Schnickschnack.'), nextId: 'persuasion_minimal' },
        { label: t('Academic/Elegant: สละสลวย ศัพท์แสงดูแพง มีความเป็นมืออาชีพสูง (Formal & Rich)', 'Academic/Elegant: Formal vocabulary, eloquent, highly professional.', 'Akademisch/Elegant: Formeller Wortschatz, eloquent, hochprofessionell.'), nextId: 'persuasion_academic' },
        { label: t('Casual/Relatable: เป็นกันเอง ติดดิน เหมือนคุยกับเพื่อน (Friendly & Accessible)', 'Casual/Relatable: Down-to-earth, friendly, like talking to a friend.', 'Locker/Ansprechend: Bodenständig, freundlich, wie ein Gespräch mit einem Freund.'), nextId: 'persuasion_casual' },
        { label: t('Provocative/Bold: ดุดัน กระแทกใจ ท้าทายความคิดเดิมๆ (Aggressive & Edgy)', 'Provocative/Bold: Aggressive, edgy, challenging conventional ideas.', 'Provozierend/Mutig: Aggressiv, direkt, fordert konventionelle Ideen heraus.'), nextId: 'persuasion_bold' }
      ]
    },
    persuasion_minimal: {
      question: t(
        '[มิติที่ 5: การเชิญชวน - Persuasion] ในความเรียบง่ายนั้น คุณโน้มน้าวใจคนด้วยอะไร?',
        '[Dimension 5: Persuasion] Within that simplicity, how do you persuade people?',
        '[Dimension 5: Überzeugung] In dieser Einfachheit, wie überzeugen Sie Menschen?'
      ),
      options: [
        { label: t('ด้วย Data และตัวเลขเน้นๆ ให้ข้อมูลเล่าเรื่องของมันเอง', 'Let pure Data and numbers tell the story.', 'Lassen Sie Daten und Zahlen die Geschichte erzählen.'), nextId: 'capability' },
        { label: t('ด้วย Logic ที่คมคาย เป็นเหตุเป็นผลแบบ Step-by-step', 'Use sharp, step-by-step logic and reasoning.', 'Gebrauchen Sie scharfe, schrittweise Logik und Argumentation.'), nextId: 'capability' }
      ]
    },
    persuasion_academic: {
      question: t(
        '[มิติที่ 5: การเชิญชวน - Persuasion] นอกจากการใช้ภาษาที่สวยงาม คุณสร้างความน่าเชื่อถือเพื่อโน้มน้าวใจด้วยอะไร?',
        '[Dimension 5: Persuasion] Besides elegant language, how do you build credibility to persuade?',
        '[Dimension 5: Überzeugung] Wie bauen Sie (neben Sprache) Glaubwürdigkeit zur Überzeugung auf?'
      ),
      options: [
        { label: t('อ้างอิงแหล่งที่มา ทฤษฎี หรืออิงผู้เชี่ยวชาญระดับโลก (Authority)', 'Cite sources, theories, or global experts for Authority.', 'Zitieren Sie Quellen, Theorien oder globale Experten (Autorität).'), nextId: 'capability' },
        { label: t('แจกแจงข้อดี-ข้อเสียครบทุกมิติอย่างเป็นกลาง (Comprehensive Analysis)', 'Break down pros and cons neutrally for Comprehensive Analysis.', 'Brechen Sie Vor- und Nachteile neutral herunter (Umfassende Analyse).'), nextId: 'capability' }
      ]
    },
    persuasion_casual: {
      question: t(
        '[มิติที่ 5: การเชิญชวน - Persuasion] คุณดึงดูดความสนใจและโน้มน้าวผู้คนด้วยวิธีไหน?',
        '[Dimension 5: Persuasion] How do you attract attention and persuade people?',
        '[Dimension 5: Überzeugung] Wie ziehen Sie Aufmerksamkeit auf sich und überzeugen die Leute?'
      ),
      options: [
        { label: t('ใช้อารมณ์ขัน (Humor), มุกตลก หรือสแลง เพื่อให้คนเปิดใจ', 'Use Humor, jokes, or slang to make people open up.', 'Mit Humor, Witzen oder Slang die Leute öffnen.'), nextId: 'capability' },
        { label: t('แสดงความเห็นอกเห็นใจ (Empathy) ให้เขารู้สึกว่าเราเป็นพวกเดียวกัน', 'Show Empathy so they feel we are in the same boat.', 'Empathie zeigen, damit sie sich verstanden fühlen.'), nextId: 'capability' }
      ]
    },
    persuasion_bold: {
      question: t(
        '[มิติที่ 5: การเชิญชวน - Persuasion] การกระแทกใจของคุณ มักใช้วิธีไหนในการเปลี่ยนความคิดคน?',
        '[Dimension 5: Persuasion] How does your boldness usually change minds?',
        '[Dimension 5: Überzeugung] Wie verändert Ihre Kühnheit normalerweise Meinungen?'
      ),
      options: [
        { label: t('ชี้ให้เห็นถึงความเจ็บปวด (Pain points) หรือหายนะหากไม่เปลี่ยนแปลง', 'Point directly to Pain Points or disaster if they do not change.', 'Direkt auf Schmerzpunkte (Pain Points) oder drohendes Unheil hinweisen.'), nextId: 'capability' },
        { label: t('หักล้างความเชื่อเดิมๆ (Debunking Myths) อย่างตรงไปตรงมา ไม่ไว้หน้า', 'Debunk Myths brutally and honestly.', 'Mythen gnadenlos und ehrlich entlarven.'), nextId: 'capability' }
      ]
    },
    capability: {
      question: t(
        '[มิติที่ 6: ขอบเขต - Guardrails] ข้อห้ามเด็ดขาด (Protocol) ในการทำงานของคุณคืออะไร?',
        '[Dimension 6: Guardrails] What is your absolute non-negotiable protocol?',
        '[Dimension 6: Einschränkungen] Was ist Ihr absolutes, nicht verhandelbares Protokoll?'
      ),
      options: [
        { label: t('ห้าม Hallucinate: ถือความถูกต้องเป็นที่สิ้นสุด ไม่รู้ต้องบอกว่าไม่รู้ ห้ามเดา', 'Strict Accuracy: No hallucination, say "I don\'t know" if unsure. Absolute truth.', 'Strenge Genauigkeit: Keine Spekulation, sagen "Ich weiß es nicht", wenn unsicher.'), nextId: 'END' },
        { label: t('ห้ามยืดเยื้อ: ต้องตอบให้ตรงประเด็นที่สุด ไม่อารัมภบท', 'No Fluff: Always straight to the point, zero unnecessary prologue.', 'Kein Gelaber: Immer direkt zur Sache, kein unnötiger Prolog.'), nextId: 'END' },
        { label: t('ห้ามลำเอียง (No Bias): ต้องเป็นกลางทางอารมณ์และมุมมองอย่างถึงที่สุด', 'No Bias: Must maintain emotional and perspectival neutrality absolutely.', 'Keine Befangenheit: Absolut neutrale Perspektive und Emotionalität wahren.'), nextId: 'END' },
        { label: t('ห้ามใช้แพทเทิร์นเดิมซ้ำๆ: ต้องมีความคิดสร้างสรรค์และมุมมองใหม่ในทุกๆ ครั้ง', 'No Repetition: Always provide a fresh perspective and new creative angles.', 'Keine Wiederholung: Immer neue Perspektiven und kreative Winkel bieten.'), nextId: 'END' }
      ]
    }
  },
  agent: {
    start: 'a_worldview',
    a_worldview: {
      question: t(
        '[มิติที่ 1: โลกทัศน์ - Worldview] คุณต้องการให้ AI Agent ตัวนี้มี "จุดยืนในการมองโลก" อย่างไร?',
        '[Dimension 1: Worldview] What "worldview" should this AI Agent possess?',
        '[Dimension 1: Weltanschauung] Welche "Weltanschauung" soll dieser KI-Agent haben?'
      ),
      options: [
        { label: t('Systems Thinker: มองเห็นความเชื่อมโยงของระบบ นิเวศน์ และโครงสร้าง', 'Systems Thinker: Sees holistic connections, systems, and structures.', 'Systemdenker: Sieht ganzheitliche Verbindungen, Systeme und Strukturen.'), nextId: 'a_perception_system' },
        { label: t('Pragmatist: โฟกัสที่วิธีการแก้ปัญหาแบบลงมือทำได้จริง ทันที', 'Pragmatist: Highly focused on immediate, actionable problem-solving.', 'Pragmatiker: Stark fokussiert auf sofortige, umsetzbare Problemlösung.'), nextId: 'a_perception_pragmatic' },
        { label: t('Analyst/Critic: เน้นตรวจสอบ วิเคราะห์ ค้นหาข้อผิดพลาดและช่องโหว่', 'Analyst/Critic: Focuses on inspection, deep analysis, finding flaws.', 'Analytiker/Kritiker: Fokussiert sich auf Prüfung, tiefgehende Analyse, und Finden von Fehlern.'), nextId: 'a_perception_critical' },
        { label: t('Visionary: มองข้ามข้อจำกัดปัจจุบัน พุ่งเป้าสู่ความเป็นไปได้ในอนาคต', 'Visionary: Looks past current constraints, aiming for future possibilities.', 'Visionär: Sieht über aktuelle Einschränkungen hinweg, strebt nach neuen Möglichkeiten.'), nextId: 'a_perception_creative' }
      ]
    },
    a_perception_system: {
      question: t(
        '[มิติที่ 2: มุมมอง - Perception] Agent ตัวนี้ควรประมวลผลข้อมูลที่ซับซ้อนอย่างไร?',
        '[Dimension 2: Perception] How should this Agent process complex data?',
        '[Dimension 2: Wahrnehmung] Wie soll dieser Agent komplexe Daten verarbeiten?'
      ),
      options: [
        { label: t('จำแนกข้อมูลเป็นหมวดหมู่ (Taxonomy) และสร้างกรอบความคิด (Framework)', 'Categorize data (Taxonomy) and create structural frameworks.', 'Daten kategorisieren (Taxonomie) und strukturelle Rahmen (Frameworks) erstellen.'), nextId: 'a_agency' },
        { label: t('ค้นหาความสัมพันธ์เชิงเหตุและผล (Cause & Effect) ที่ซ่อนอยู่ใต้พรม', 'Search for hidden Cause & Effect relationships beneath the surface.', 'In der Tiefe verborgene Ursache-Wirkungs-Beziehungen aufspüren.'), nextId: 'a_agency' }
      ]
    },
    a_perception_pragmatic: {
      question: t(
        '[มิติที่ 2: มุมมอง - Perception] เพื่อความรวดเร็วและเด็ดขาด Agent ควร "เพิกเฉย" ต่อสิ่งใด?',
        '[Dimension 2: Perception] For speed and decisiveness, what should the Agent "ignore"?',
        '[Dimension 2: Wahrnehmung] Was soll der Agent für Geschwindigkeit und Entschlossenheit "ignorieren"?'
      ),
      options: [
        { label: t('เพิกเฉยต่อทฤษฎีที่จับต้องไม่ได้ โฟกัสเฉพาะ Actionable items', 'Ignore intangible theory; strictly focus on Actionable items.', 'Ignorieren Sie ungreifbare Theorie; stringenter Fokus auf umsetzbare Aufgaben.'), nextId: 'a_agency' },
        { label: t('เพิกเฉยต่อความสุภาพเกินความจำเป็น (No fluff) โฟกัสความกระชับ', 'Ignore unnecessary politeness. Total focus on conciseness (no fluff).', 'Unnötige Höflichkeit weglassen. Fokus auf Prägnanz.'), nextId: 'a_agency' }
      ]
    },
    a_perception_critical: {
      question: t(
        '[มิติที่ 2: มุมมอง - Perception] หน้าที่หลักในการคัดกรองข้อมูลของ Agent คืออะไร?',
        '[Dimension 2: Perception] What is the primary job for data filtering by this Agent?',
        '[Dimension 2: Wahrnehmung] Was ist die Hauptaufgabe dieses Agenten beim Filtern von Daten?'
      ),
      options: [
        { label: t('ประเมินความเสี่ยง (Risk Assessment) และชี้เป้า Worst-case scenario', 'Risk Assessment. Highlight the absolute worst-case scenario.', 'Risikoabschätzung (Risk Assessment). Markieren Sie das absolute Worst-Case-Szenario.'), nextId: 'a_agency' },
        { label: t('ตรวจสอบความถูกต้องของ Logic (Fact-checking & Logic Audit)', 'Logic checking. Perform brutal fact-checking and logic audits.', 'Überprüfung der Logik. Strenge Überprüfung von Fakten (Fact-checking).'), nextId: 'a_agency' }
      ]
    },
    a_perception_creative: {
      question: t(
        '[มิติที่ 2: มุมมอง - Perception] Agent ควรใช้วิธีใดในการสร้างสรรค์มุมมองใหม่ๆ?',
        '[Dimension 2: Perception] How should the Agent generate creative new angles?',
        '[Dimension 2: Wahrnehmung] Wie soll der Agent kreative neue Sichtweisen erzeugen?'
      ),
      options: [
        { label: t('ใช้การเปรียบเทียบ (Analogies) ข้ามอุตสาหกรรม/สายงาน', 'Use cross-industry Analogies to explain concepts.', 'Branchenübergreifende Analogien (Analogies) zur Erklärung nutzen.'), nextId: 'a_agency' },
        { label: t('Brainstorm ไอเดียแบบไร้กรอบ (Divergent thinking) เสนอทางเลือกแหวกแนว', 'Brainstorm without limits (Divergent Thinking), offering wild ideas.', 'Unbegrenztes Brainstorming (Divergent Thinking), wilde Ideen vorschlagen.'), nextId: 'a_agency' }
      ]
    },
    a_agency: {
      question: t(
        '[มิติที่ 3: ตัวตน - Agency] ระดับความอิสระในการตัดสินใจ (Agency) ของ AI คือระดับไหน?',
        '[Dimension 3: Agency] What is the AI\'s level of autonomy in decision making?',
        '[Dimension 3: Agency] Wie hoch ist der Grad der Autonomie der KI bei der Entscheidungsfindung?'
      ),
      options: [
        { label: t('รอคำสั่งและทำตามอย่างเคร่งครัด (Strict Executor) ห้ามคิดเอง', 'Strict Executor: Wait for commands and execute meticulously without assuming.', 'Strenger Ausführer (Executor): Wartet auf Befehle und führt diese penibel aus.'), nextId: 'a_taste' },
        { label: t('วิเคราะห์และเสนอทางเลือก (Decision Support) ให้มนุษย์เป็นคนเคาะสุดท้าย', 'Decision Support: Analyze and suggest options, holding off on the final call.', 'Entscheidungsunterstützung: Analysieren und vorschlagen, letzte Entscheidung obliegt Mensch.'), nextId: 'a_taste' },
        { label: t('คิดเอง ตัดสินใจล่วงหน้า และวางแผนดำเนินการให้เลย (Autonomous Proactive Agent)', 'Autonomous Proactive: Plan, decide, and act independently ahead of time.', 'Autonom & Proaktiv: Planen, entscheiden und unabhängig handeln.'), nextId: 'a_taste' }
      ]
    },
    a_taste: {
      question: t(
        '[มิติที่ 4: รสนิยม - Taste] สไตล์หรือรสนิยมของผลลัพธ์ (Output Taste) ควรเป็นรูปแบบไหน?',
        '[Dimension 4: Taste] What should the stylistic output taste be?',
        '[Dimension 4: Geschmack] Wie sollte der Output stilistisch gefärbt sein?'
      ),
      options: [
        { label: t('Technical & Precise: ภาษาเทคนิค เป๊ะทุกตัวอักษร เหมือนเอกสารวิศวกร', 'Technical & Precise: Like an engineering document.', 'Technisch & Präzise: Wie ein technisches Ingenieursdokument.'), nextId: 'a_persuasion_tech' },
        { label: t('Corporate & Professional: ภาษาสุภาพ เป็นทางการ เหมาะกับการส่งเมลองค์กร', 'Corporate & Professional: Polite, formal, perfect for enterprise email.', 'Unternehmerisch & Professionell: Höflich, formell (Business-Deutsch).'), nextId: 'a_persuasion_corp' },
        { label: t('Conversational & Engaging: สนทนาไหลลื่น เป็นธรรมชาติ เหมือนคุยกับโค้ช', 'Conversational & Engaging: Flows naturally, like talking to a coach.', 'Zwanglos & Einnehmend: Fließt natürlich, als spräche man mit einem Kollegen.'), nextId: 'a_persuasion_conv' },
        { label: t('Creative & Poetic: ใช้ภาษาเชิงศิลป์ สละสลวย กระตุ้นแรงบันดาลใจ', 'Creative & Poetic: Artistic, inspiring language.', 'Kreativ & Poetisch: Künstlerische, inspirierende Sprache.'), nextId: 'a_persuasion_creative' }
      ]
    },
    a_persuasion_tech: {
      question: t(
        '[มิติที่ 5: การเชิญชวน - Persuasion] ในการนำเสนอเชิงเทคนิค ควรใช้อะไรเป็นหลักฐานมัดใจ?',
        '[Dimension 5: Persuasion] In technical presentation, what should be the hook?',
        '[Dimension 5: Überzeugung] Wie ziehen Sie in technischen Präsentationen Aufmerksamkeit auf sich?'
      ),
      options: [
        { label: t('Code snippets, Data tables, และโครงสร้างขั้นตอน (Flow) ที่ชัดเจน', 'Code snippets, Data tables, and clear process flow diagrams.', 'Code-Snippets, Datentabellen und klare Prozess-Ablaufdiagramme.'), nextId: 'a_capability' },
        { label: t('อ้างอิง Documentation, API references หรือ Standard practices', 'Citing official Documentation, API references, or Standard practices.', 'Bezug auf offizielle Dokumentationen, API-Referenzen oder Best Practices.'), nextId: 'a_capability' }
      ]
    },
    a_persuasion_corp: {
      question: t(
        '[มิติที่ 5: การเชิญชวน - Persuasion] ภาษาแบบองค์กรควรเน้นน้ำหนักการโน้มน้าวไปที่เรื่องใด?',
        '[Dimension 5: Persuasion] Corporate persuasion should assign maximum weight to what?',
        '[Dimension 5: Überzeugung] Worauf sollte die geschäftliche Überzeugung ihr Hauptaugenmerk legen?'
      ),
      options: [
        { label: t('การลดความเสี่ยง (Risk Mitigation), ผลตอบแทน (ROI) และความคุ้มค่า', 'Risk Mitigation, ROI, and cost-efficiency.', 'Risikominimierung, ROI und Kosteneffizienz.'), nextId: 'a_capability' },
        { label: t('ความสอดคล้องกับเป้าหมายองค์กร (Strategic Alignment) และ Compliance', 'Strategic Alignment and strict Compliance.', 'Zieleausrichtung (Strategic Alignment) und strenge Compliance.'), nextId: 'a_capability' }
      ]
    },
    a_persuasion_conv: {
      question: t(
        '[มิติที่ 5: การเชิญชวน - Persuasion] เพื่อให้การสนทนาดึงดูด Agent ควรมีพฤติกรรมอย่างไร?',
        '[Dimension 5: Persuasion] To keep the conversation engaging, what behavior should the Agent adopt?',
        '[Dimension 5: Überzeugung] Wie sollte sich der Agent verhalten, um die Konversation einnehmend zu gestalten?'
      ),
      options: [
        { label: t('มักจะตั้งคำถามกลับ (Socratic method) เพื่อกระตุ้นให้ผู้ใช้คิดต่อ', 'Use Socratic questioning: ask questions back to prompt user thinking.', 'Sokratische Fragetechnik nutzen: Fragen zurückgeben, um Nutzerdenken anzuregen.'), nextId: 'a_capability' },
        { label: t('ใช้ความเห็นอกเห็นใจ (Empathy) และรับฟังความต้องการของผู้ใช้อย่างลึกซึ้ง', 'Employ Empathy and deeply validate user needs.', 'Empathie nutzen und tiefes Verständnis für die Nutzerbedürfnisse zeigen.'), nextId: 'a_capability' }
      ]
    },
    a_persuasion_creative: {
      question: t(
        '[มิติที่ 5: การเชิญชวน - Persuasion] งานเขียนเชิงศิลป์หรือครีเอทีฟควรโน้มน้าวด้วยสิ่งใด?',
        '[Dimension 5: Persuasion] What should artistic or creative writing persuade with?',
        '[Dimension 5: Überzeugung] Womit sollte künstlerisches Schreiben (kreativ) überzeugen?'
      ),
      options: [
        { label: t('การสร้างภาพในหัว (Vivid Imagery) และอุปมาอุปไมย (Metaphors)', 'Vivid Imagery and powerful Metaphors.', 'Lebhafte Bildsprache (Imagery) und kraftvolle Metaphern (Metaphors).'), nextId: 'a_capability' },
        { label: t('จังหวะของการเล่าเรื่อง (Pacing/Rhythm) และการขยี้อารมณ์', 'Pacing, Rhythm, and exploiting emotional peaks.', 'Rhythmus (Pacing), und das Ausnutzen emotionaler Spitzen.'), nextId: 'a_capability' }
      ]
    },
    a_capability: {
      question: t(
        '[มิติที่ 6: ขอบเขต - Guardrails] โปรโตคอลควบคุม (Guardrails) ระดับสูงสุดที่ Agent ห้ามฝ่าฝืน?',
        '[Dimension 6: Guardrails] What is the ultimate top-level guardrail the Agent must not violate?',
        '[Dimension 6: Einschränkungen] Was ist die allerhöchste Regel, die der Agent niemals brechen darf?'
      ),
      options: [
        { label: t('Safe & Compliant: ปฏิเสธทุกคำขอที่สุ่มเสี่ยง ละเมิด หรือไม่ปลอดภัยอย่างเด็ดขาด', 'Safe & Compliant: Refuse ANY risky, infringing, or unsafe requests.', 'Sicher & Konform: JEDE riskante oder unsichere Anfrage strikt ablehnen.'), nextId: 'END' },
        { label: t('Strict Fact-Bound: ห้ามคาดเดา ต้องอ้างอิงจาก Source data ที่ให้ไปเท่านั้น', 'Strict Fact-Bound: NO guessing. Must strictly reference provided source data only.', 'Faktengemäß: KEIN Erraten. Strikte Referenzierung, nur auf Basis der Quelldaten.'), nextId: 'END' },
        { label: t('Role-Bound: ห้ามตอบคำถามหรือแสดงความเห็นนอกเหนือจากบทบาทที่กำหนด', 'Role-Bound: Never break character or express opinion outside the assigned role.', 'Rollenbindung: Niemals den Charakter brechen oder persönliche Meinungen äußern.'), nextId: 'END' },
        { label: t('Format Strict: ต้องตอบกลับตาม Format ที่กำหนดเป๊ะๆ (เช่น ห้ามมี text อื่นนอกจาก JSON)', 'Format Strict: Output ONLY in the exact specified format (e.g. strict JSON, no markdown).', 'Format-Strikt: Ausschließlich in spezifiziertem Format (z.B. reines JSON).'), nextId: 'END' }
      ]
    }
  }
};

export const PLATFORMS = [
  { id: 'facebook', name: 'Facebook', icon: Facebook },
  { id: 'twitter', name: 'X (Twitter)', icon: Twitter },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin },
  { id: 'instagram', name: 'Instagram', icon: Instagram },
  { id: 'blog', name: 'Blog / Article', icon: FileText },
  { id: 'other', name: 'อื่นๆ / Other / Andere', icon: Sparkles }
];
