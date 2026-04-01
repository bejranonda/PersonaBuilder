import { Facebook, Twitter, Linkedin, Instagram, FileText, Sparkles } from 'lucide-react';

// --- Dynamic Question Flow (Based on 6-Dimension Conceptual Framework) ---

export const QUESTION_FLOW = {
  clone: {
    start: 'worldview',
    // 1. โลกทัศน์ (Worldview)
    worldview: {
      question: '[มิติที่ 1: โลกทัศน์ - Worldview] เลนส์หลักที่คุณใช้มองโลกและปัญหาต่างๆ คือแบบไหน?',
      options: [
        { label: 'Systems Thinker: มองทุกอย่างเชื่อมโยงกันเป็นระบบ หา Root Cause เสมอ', nextId: 'perception_system' },
        { label: 'Pragmatist: เน้นผลลัพธ์ อะไรเวิร์คทำเลย ไม่ยึดติดทฤษฎี เน้นลงมือทำ', nextId: 'perception_pragmatic' },
        { label: 'Critical/Skeptical: ตั้งคำถาม จับผิด หาช่องโหว่ ประเมินความเสี่ยงไว้ก่อน', nextId: 'perception_critical' },
        { label: 'Optimist/Creator: โฟกัสที่โอกาส ความเป็นไปได้ใหม่ๆ และไอเดียสร้างสรรค์', nextId: 'perception_creative' }
      ]
    },
    // 2. มุมมอง (Perception) - Branching based on Worldview
    perception_system: {
      question: '[มิติที่ 2: มุมมอง - Perception] ในฐานะคนที่มองภาพรวม เวลาเจอข้อมูลมหาศาล คุณจัดระเบียบมันอย่างไร?',
      options: [
        { label: 'จัดหมวดหมู่ (Categorize) และสร้าง Framework/Model ขึ้นมาครอบ', nextId: 'agency' },
        { label: 'พยายามมองหา Pattern หรือความผิดปกติ (Anomalies) ที่คนอื่นมองไม่เห็น', nextId: 'agency' }
      ]
    },
    perception_pragmatic: {
      question: '[มิติที่ 2: มุมมอง - Perception] เพื่อให้ได้ผลลัพธ์ที่ไว คุณมักจะเลือกมองข้ามสิ่งใด?',
      options: [
        { label: 'มองข้ามรายละเอียดปลีกย่อย (Micro-details) เอาแค่กฎ 80/20 พอ', nextId: 'agency' },
        { label: 'มองข้ามอารมณ์ความรู้สึก เน้นที่ข้อเท็จจริง (Facts) และการกระทำ (Action) ล้วนๆ', nextId: 'agency' }
      ]
    },
    perception_critical: {
      question: '[มิติที่ 2: มุมมอง - Perception] สิ่งแรกที่คุณมักจะมองเห็น เมื่อมีคนเสนอไอเดียใหม่คืออะไร?',
      options: [
        { label: 'ความเสี่ยง (Risks), ผลกระทบแฝง (Side-effects) และ Worst-case scenario', nextId: 'agency' },
        { label: 'ความไม่สมเหตุสมผลของตรรกะ (Logical Fallacies) และอคติ (Bias)', nextId: 'agency' }
      ]
    },
    perception_creative: {
      question: '[มิติที่ 2: มุมมอง - Perception] คุณมักจะเชื่อมโยงข้อมูลใหม่ๆ เข้ากับอะไรเพื่อให้เกิดไอเดีย?',
      options: [
        { label: 'เชื่อมกับศาสตร์อื่นๆ ที่ดูไม่น่าจะเกี่ยวข้องกันเลย (Cross-disciplinary)', nextId: 'agency' },
        { label: 'เชื่อมกับประสบการณ์ส่วนตัว หรือร้อยเรียงเป็นเรื่องเล่า (Storytelling)', nextId: 'agency' }
      ]
    },
    // 3. ตัวตน/การตัดสินใจ (Agency)
    agency: {
      question: '[มิติที่ 3: ตัวตน - Agency] เมื่อถึงจุดที่ต้อง "ตัดสินใจสร้างผลงาน" คุณพึ่งพาสิ่งใดมากที่สุด?',
      options: [
        { label: 'พึ่งพาข้อมูลสนับสนุน (Decision Support Data) ทุกอย่างต้องมี Evidence ชัดเจน', nextId: 'taste' },
        { label: 'พึ่งพาสัญชาตญาณ ประสบการณ์ และความเชี่ยวชาญส่วนตัว (Gut-feeling & Expertise)', nextId: 'taste' },
        { label: 'พึ่งพาเสียงตอบรับ (Feedback) ถามผู้คนหรือเน้น User-centric เป็นแกนหลัก', nextId: 'taste' },
        { label: 'พึ่งพาการทดลอง (Trial & Error) ทำไปก่อน ผิดก็แก้ให้ไว', nextId: 'taste' }
      ]
    },
    // 4. รสนิยม (Taste)
    taste: {
      question: '[มิติที่ 4: รสนิยม - Taste] รสนิยม (Style Agents) ของผลงานที่คุณภูมิใจนำเสนอ มักมีลักษณะแบบไหน?',
      options: [
        { label: 'Minimalist: เรียบง่าย กระชับ ตัดน้ำทิ้งหมด (Concise & Clean)', nextId: 'persuasion_minimal' },
        { label: 'Academic/Elegant: สละสลวย ศัพท์แสงดูแพง มีความเป็นมืออาชีพสูง (Formal & Rich)', nextId: 'persuasion_academic' },
        { label: 'Casual/Relatable: เป็นกันเอง ติดดิน เหมือนคุยกับเพื่อน (Friendly & Accessible)', nextId: 'persuasion_casual' },
        { label: 'Provocative/Bold: ดุดัน กระแทกใจ ท้าทายความคิดเดิมๆ (Aggressive & Edgy)', nextId: 'persuasion_bold' }
      ]
    },
    // 5. การเชิญชวน (Persuasion) - Branching based on Taste
    persuasion_minimal: {
      question: '[มิติที่ 5: การเชิญชวน - Persuasion] ในความเรียบง่ายนั้น คุณโน้มน้าวใจคนด้วยอะไร?',
      options: [
        { label: 'ด้วย Data และตัวเลขเน้นๆ ให้ข้อมูลเล่าเรื่องของมันเอง', nextId: 'capability' },
        { label: 'ด้วย Logic ที่คมคาย เป็นเหตุเป็นผลแบบ Step-by-step', nextId: 'capability' }
      ]
    },
    persuasion_academic: {
      question: '[มิติที่ 5: การเชิญชวน - Persuasion] นอกจากการใช้ภาษาที่สวยงาม คุณสร้างความน่าเชื่อถือเพื่อโน้มน้าวใจด้วยอะไร?',
      options: [
        { label: 'อ้างอิงแหล่งที่มา ทฤษฎี หรืออิงผู้เชี่ยวชาญระดับโลก (Authority)', nextId: 'capability' },
        { label: 'แจกแจงข้อดี-ข้อเสียครบทุกมิติอย่างเป็นกลาง (Comprehensive Analysis)', nextId: 'capability' }
      ]
    },
    persuasion_casual: {
      question: '[มิติที่ 5: การเชิญชวน - Persuasion] คุณดึงดูดความสนใจและโน้มน้าวผู้คนด้วยวิธีไหน?',
      options: [
        { label: 'ใช้อารมณ์ขัน (Humor), มุกตลก หรือสแลง เพื่อให้คนเปิดใจ', nextId: 'capability' },
        { label: 'แสดงความเห็นอกเห็นใจ (Empathy) ให้เขารู้สึกว่าเราเป็นพวกเดียวกัน', nextId: 'capability' }
      ]
    },
    persuasion_bold: {
      question: '[มิติที่ 5: การเชิญชวน - Persuasion] การกระแทกใจของคุณ มักใช้วิธีไหนในการเปลี่ยนความคิดคน?',
      options: [
        { label: 'ชี้ให้เห็นถึงความเจ็บปวด (Pain points) หรือหายนะหากไม่เปลี่ยนแปลง', nextId: 'capability' },
        { label: 'หักล้างความเชื่อเดิมๆ (Debunking Myths) อย่างตรงไปตรงมา ไม่ไว้หน้า', nextId: 'capability' }
      ]
    },
    // 6. ความสามารถ/กรอบ (Capability / Guardrails)
    capability: {
      question: '[มิติที่ 6: ขอบเขต - Guardrails] ข้อห้ามเด็ดขาด (Protocol) ในการทำงานของคุณคืออะไร?',
      options: [
        { label: 'ห้าม Hallucinate: ถือความถูกต้องเป็นที่สิ้นสุด ไม่รู้ต้องบอกว่าไม่รู้ ห้ามเดา', nextId: 'END' },
        { label: 'ห้ามยืดเยื้อ: ต้องตอบให้ตรงประเด็นที่สุด ไม่อารัมภบท', nextId: 'END' },
        { label: 'ห้ามลำเอียง (No Bias): ต้องเป็นกลางทางอารมณ์และมุมมองอย่างถึงที่สุด', nextId: 'END' },
        { label: 'ห้ามใช้แพทเทิร์นเดิมซ้ำๆ: ต้องมีความคิดสร้างสรรค์และมุมมองใหม่ในทุกๆ ครั้ง', nextId: 'END' }
      ]
    }
  },
  agent: {
    start: 'a_worldview',
    a_worldview: {
      question: '[มิติที่ 1: โลกทัศน์ - Worldview] คุณต้องการให้ AI Agent ตัวนี้มี "จุดยืนในการมองโลก" อย่างไร?',
      options: [
        { label: 'Systems Thinker: มองเห็นความเชื่อมโยงของระบบ นิเวศน์ และโครงสร้าง', nextId: 'a_perception_system' },
        { label: 'Pragmatist: โฟกัสที่วิธีการแก้ปัญหาแบบลงมือทำได้จริง ทันที', nextId: 'a_perception_pragmatic' },
        { label: 'Analyst/Critic: เน้นตรวจสอบ วิเคราะห์ ค้นหาข้อผิดพลาดและช่องโหว่', nextId: 'a_perception_critical' },
        { label: 'Visionary: มองข้ามข้อจำกัดปัจจุบัน พุ่งเป้าสู่ความเป็นไปได้ในอนาคต', nextId: 'a_perception_creative' }
      ]
    },
    a_perception_system: {
      question: '[มิติที่ 2: มุมมอง - Perception] Agent ตัวนี้ควรประมวลผลข้อมูลที่ซับซ้อนอย่างไร?',
      options: [
        { label: 'จำแนกข้อมูลเป็นหมวดหมู่ (Taxonomy) และสร้างกรอบความคิด (Framework)', nextId: 'a_agency' },
        { label: 'ค้นหาความสัมพันธ์เชิงเหตุและผล (Cause & Effect) ที่ซ่อนอยู่ใต้พรม', nextId: 'a_agency' }
      ]
    },
    a_perception_pragmatic: {
      question: '[มิติที่ 2: มุมมอง - Perception] เพื่อความรวดเร็วและเด็ดขาด Agent ควร "เพิกเฉย" ต่อสิ่งใด?',
      options: [
        { label: 'เพิกเฉยต่อทฤษฎีที่จับต้องไม่ได้ โฟกัสเฉพาะ Actionable items', nextId: 'a_agency' },
        { label: 'เพิกเฉยต่อความสุภาพเกินความจำเป็น (No fluff) โฟกัสความกระชับ', nextId: 'a_agency' }
      ]
    },
    a_perception_critical: {
      question: '[มิติที่ 2: มุมมอง - Perception] หน้าที่หลักในการคัดกรองข้อมูลของ Agent คืออะไร?',
      options: [
        { label: 'ประเมินความเสี่ยง (Risk Assessment) และชี้เป้า Worst-case scenario', nextId: 'a_agency' },
        { label: 'ตรวจสอบความถูกต้องของ Logic (Fact-checking & Logic Audit)', nextId: 'a_agency' }
      ]
    },
    a_perception_creative: {
      question: '[มิติที่ 2: มุมมอง - Perception] Agent ควรใช้วิธีใดในการสร้างสรรค์มุมมองใหม่ๆ?',
      options: [
        { label: 'ใช้การเปรียบเทียบ (Analogies) ข้ามอุตสาหกรรม/สายงาน', nextId: 'a_agency' },
        { label: 'Brainstorm ไอเดียแบบไร้กรอบ (Divergent thinking) เสนอทางเลือกแหวกแนว', nextId: 'a_agency' }
      ]
    },
    a_agency: {
      question: '[มิติที่ 3: ตัวตน - Agency] ระดับความอิสระในการตัดสินใจ (Agency) ของ AI คือระดับไหน?',
      options: [
        { label: 'รอคำสั่งและทำตามอย่างเคร่งครัด (Strict Executor) ห้ามคิดเอง', nextId: 'a_taste' },
        { label: 'วิเคราะห์และเสนอทางเลือก (Decision Support) ให้มนุษย์เป็นคนเคาะสุดท้าย', nextId: 'a_taste' },
        { label: 'คิดเอง ตัดสินใจล่วงหน้า และวางแผนดำเนินการให้เลย (Autonomous Proactive Agent)', nextId: 'a_taste' }
      ]
    },
    a_taste: {
      question: '[มิติที่ 4: รสนิยม - Taste] สไตล์หรือรสนิยมของผลลัพธ์ (Output Taste) ควรเป็นรูปแบบไหน?',
      options: [
        { label: 'Technical & Precise: ภาษาเทคนิค เป๊ะทุกตัวอักษร เหมือนเอกสารวิศวกร', nextId: 'a_persuasion_tech' },
        { label: 'Corporate & Professional: ภาษาสุภาพ เป็นทางการ เหมาะกับการส่งเมลองค์กร', nextId: 'a_persuasion_corp' },
        { label: 'Conversational & Engaging: สนทนาไหลลื่น เป็นธรรมชาติ เหมือนคุยกับโค้ช', nextId: 'a_persuasion_conv' },
        { label: 'Creative & Poetic: ใช้ภาษาเชิงศิลป์ สละสลวย กระตุ้นแรงบันดาลใจ', nextId: 'a_persuasion_creative' }
      ]
    },
    a_persuasion_tech: {
      question: '[มิติที่ 5: การเชิญชวน - Persuasion] ในการนำเสนอเชิงเทคนิค ควรใช้อะไรเป็นหลักฐานมัดใจ?',
      options: [
        { label: 'Code snippets, Data tables, และโครงสร้างขั้นตอน (Flow) ที่ชัดเจน', nextId: 'a_capability' },
        { label: 'อ้างอิง Documentation, API references หรือ Standard practices', nextId: 'a_capability' }
      ]
    },
    a_persuasion_corp: {
      question: '[มิติที่ 5: การเชิญชวน - Persuasion] ภาษาแบบองค์กรควรเน้นน้ำหนักการโน้มน้าวไปที่เรื่องใด?',
      options: [
        { label: 'การลดความเสี่ยง (Risk Mitigation), ผลตอบแทน (ROI) และความคุ้มค่า', nextId: 'a_capability' },
        { label: 'ความสอดคล้องกับเป้าหมายองค์กร (Strategic Alignment) และ Compliance', nextId: 'a_capability' }
      ]
    },
    a_persuasion_conv: {
      question: '[มิติที่ 5: การเชิญชวน - Persuasion] เพื่อให้การสนทนาดึงดูด Agent ควรมีพฤติกรรมอย่างไร?',
      options: [
        { label: 'มักจะตั้งคำถามกลับ (Socratic method) เพื่อกระตุ้นให้ผู้ใช้คิดต่อ', nextId: 'a_capability' },
        { label: 'ใช้ความเห็นอกเห็นใจ (Empathy) และรับฟังความต้องการของผู้ใช้อย่างลึกซึ้ง', nextId: 'a_capability' }
      ]
    },
    a_persuasion_creative: {
      question: '[มิติที่ 5: การเชิญชวน - Persuasion] งานเขียนเชิงศิลป์หรือครีเอทีฟควรโน้มน้าวด้วยสิ่งใด?',
      options: [
        { label: 'การสร้างภาพในหัว (Vivid Imagery) และอุปมาอุปไมย (Metaphors)', nextId: 'a_capability' },
        { label: 'จังหวะของการเล่าเรื่อง (Pacing/Rhythm) และการขยี้อารมณ์', nextId: 'a_capability' }
      ]
    },
    a_capability: {
      question: '[มิติที่ 6: ขอบเขต - Guardrails] โปรโตคอลควบคุม (Guardrails) ระดับสูงสุดที่ Agent ห้ามฝ่าฝืน?',
      options: [
        { label: 'Safe & Compliant: ปฏิเสธทุกคำขอที่สุ่มเสี่ยง ละเมิด หรือไม่ปลอดภัยอย่างเด็ดขาด', nextId: 'END' },
        { label: 'Strict Fact-Bound: ห้ามคาดเดา ต้องอ้างอิงจาก Source data ที่ให้ไปเท่านั้น', nextId: 'END' },
        { label: 'Role-Bound: ห้ามตอบคำถามหรือแสดงความเห็นนอกเหนือจากบทบาทที่กำหนด', nextId: 'END' },
        { label: 'Format Strict: ต้องตอบกลับตาม Format ที่กำหนดเป๊ะๆ (เช่น ห้ามมี text อื่นนอกจาก JSON)', nextId: 'END' }
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
  { id: 'other', name: 'อื่นๆ (ระบุเอง)', icon: Sparkles }
];
