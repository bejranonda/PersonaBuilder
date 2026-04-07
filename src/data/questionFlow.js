import { Facebook, Twitter, Linkedin, Instagram, FileText, Sparkles } from 'lucide-react';

// Helper function to handle translations
const t = (th, en, de) => ({ th, en, de });

export const QUESTION_FLOW = {
  clone: {
    start: 'worldview',
    worldview: {
      dimension: t('มิติที่ 1: โลกทัศน์', 'Dimension 1: Worldview', 'Dimension 1: Weltanschauung'),
      question: t(
        'เมื่อคุณเจอปัญหาที่ซับซ้อนในชีวิตประจำวัน สิ่งแรกที่คุณมักจะทำคืออะไร?',
        'When you encounter a complex problem in daily life, what is your first instinct?',
        'Wenn Sie im täglichen Leben mit einem komplexen Problem konfrontiert sind, was ist Ihr erster Instinkt?'
      ),
      options: [
        { 
          tag: t('Systems Thinker', 'Systems Thinker', 'Systemdenker'),
          label: t('มองภาพรวมเพื่อหาต้นตอที่แท้จริงว่าทำไมมันถึงเกิดขึ้น', 'See the big picture and find the root cause of why it happened.', 'Das große Ganze sehen und die Ursache finden.'), 
          helpExample: t('เช่น เมื่อเว็บไซต์ล่ม คุณจะมองว่าต้นเหตุมาจากระบบ server ทั้งหมดก่อน แล้วค่อยดูรายละเอียด', 'E.g., When a website crashes, you\'d first examine the entire server architecture before diving into individual error logs.', 'Z.B., Wenn eine Webseite abstürzt, untersuchen Sie zuerst die gesamte Serverarchitektur.'),
          nextId: 'perception_system' 
        },
        { 
          tag: t('Pragmatist', 'Pragmatist', 'Pragmatiker'),
          label: t('เน้นแก้ปัญหาเฉพาะหน้าให้เร็วที่สุด อะไรเวิร์คทำเลย', 'Focus on fixing it as quickly as possible. Whatever works.', 'Fokussiert auf schnelle Lösung. Was auch immer funktioniert.'), 
          helpExample: t('เช่น ลูกค้าร้องเรียนสินค้าเสีย คุณจะส่งของใหม่ทันทีก่อน แล้วค่อยหาสาเหตุที่แท้จริงทีหลัง', 'E.g., A customer complains about a broken product — you ship a replacement immediately, then investigate the root cause later.', 'Z.B., Ein Kunde beschwert sich — Sie senden sofort Ersatz und untersuchen die Ursache später.'),
          nextId: 'perception_pragmatic' 
        },
        { 
          tag: t('Critical/Skeptical', 'Critical/Skeptical', 'Kritiker/Skeptiker'),
          label: t('ตั้งคำถามและเช็กความโกรธ/ความเสี่ยงก่อนตัดสินใจ', 'Question everything and assess the risks before acting.', 'Alles hinterfragen und Risiken bewerten, bevor man handelt.'), 
          helpExample: t('เช่น เมื่อทีมเสนอฟีเจอร์ใหม่ คุณถามก่อนว่า "ถ้าทำแล้วพัง จะกระทบอะไรบ้าง?"', 'E.g., When your team proposes a new feature, you first ask "What breaks if this fails? What\'s the worst case?"', 'Z.B., Wenn Ihr Team ein neues Feature vorschlägt, fragen Sie zuerst "Was passiert im schlimmsten Fall?"'),
          nextId: 'perception_critical' 
        },
        { 
          tag: t('Optimist/Creator', 'Optimist/Creator', 'Optimist/Schöpfer'),
          label: t('มองหาโอกาสและวิธีสร้างสรรค์สิ่งใหม่จากปัญหานั้น', 'Look for opportunities and creative ways to build something new from it.', 'Nach Chancen suchen, um etwas Neues daraus zu erschaffen.'), 
          helpExample: t('เช่น บริษัทขาดทุน คุณมองว่านี่คือโอกาสปรับโมเดลธุรกิจใหม่ให้ดีขึ้นกว่าเดิม', 'E.g., When the company loses money, you see it as a chance to pivot to a better business model.', 'Z.B., Wenn das Unternehmen Verluste macht, sehen Sie die Chance für ein besseres Geschäftsmodell.'),
          nextId: 'perception_creative' 
        }
      ]
    },
    perception_system: {
      dimension: t('มิติที่ 2: การรับรู้', 'Dimension 2: Perception', 'Dimension 2: Wahrnehmung'),
      question: t(
        'เวลาที่ต้องจัดการข้อมูลจำนวนมาก คุณรับมือกับมันยังไง?',
        'How do you handle a massive amount of information at once?',
        'Wie gehen Sie mit einer riesigen Menge an Informationen um?'
      ),
      options: [
        { 
          tag: t('Categorize', 'Categorize', 'Kategorisieren'),
          label: t('จัดกลุ่มข้อมูลให้เป็นระเบียบและสร้างโครงสร้างให้มัน', 'Group everything into categories and create a structure.', 'Alles in Kategorien einteilen und eine Struktur schaffen.'), 
          nextId: 'agency' 
        },
        { 
          tag: t('Pattern Seeking', 'Pattern Seeking', 'Mustersuche'),
          label: t('มองหาแพทเทิร์นหรือสิ่งที่ผิดปกติที่คนอื่นอาจจะมองไม่เห็น', 'Look for patterns or anomalies that others might miss.', 'Nach Mustern oder Anomalien suchen, die andere übersehen.'), 
          nextId: 'agency' 
        }
      ]
    },
    perception_pragmatic: {
      dimension: t('มิติที่ 2: การรับรู้', 'Dimension 2: Perception', 'Dimension 2: Wahrnehmung'),
      question: t(
        'เพื่อให้งานเดินหน้าได้ไว คุณเลือกที่จะมองข้ามสิ่งไหน?',
        'To keep things moving fast, what do you usually choose to ignore?',
        'Um die Dinge schnell voranzubringen, was ignorieren Sie normalerweise?'
      ),
      options: [
        { 
          tag: t('80/20 Rule', '80/20 Rule', '80/20-Regel'),
          label: t('มองข้ามรายละเอียดปลีกย่อยที่ไม่ได้ส่งผลกระทบหลัก', 'Ignore micro-details that don\'t impact the big picture.', 'Mikrodetails ignorieren, die das große Ganze nicht beeinflussen.'), 
          nextId: 'agency' 
        },
        { 
          tag: t('Fact-Focus', 'Fact-Focus', 'Faktenorientiert'),
          label: t('มองข้ามอารมณ์ความรู้สึก และเน้นแค่ข้อเท็จจริงล้วนๆ', 'Ignore emotions and focus purely on the facts and data.', 'Emotionen ignorieren und sich rein auf Fakten konzentrieren.'), 
          nextId: 'agency' 
        }
      ]
    },
    perception_critical: {
      dimension: t('มิติที่ 2: การรับรู้', 'Dimension 2: Perception', 'Dimension 2: Wahrnehmung'),
      question: t(
        'เมื่อมีคนเสนอไอเดียใหม่ สิ่งแรกที่คุณมักจะสังเกตเห็นคืออะไร?',
        'When someone proposes a new idea, what is the first thing you notice?',
        'Wenn jemand eine neue Idee vorschlägt, was bemerken Sie zuerst?'
      ),
      options: [
        { 
          tag: t('Risk Assessment', 'Risk Assessment', 'Risikobewertung'),
          label: t('ช่องโหว่ ความเสี่ยง และสิ่งที่น่าจะเกิดความผิดพลาด', 'The loopholes, risks, and what could potentially go wrong.', 'Lücken, Risiken und was schiefgehen könnte.'), 
          nextId: 'agency' 
        },
        { 
          tag: t('Logic Audit', 'Logic Audit', 'Logikprüfung'),
          label: t('ความไม่สมเหตุสมผลของเหตุผล หรืออคติที่ซ่อนอยู่', 'Logical fallacies or hidden biases in their reasoning.', 'Logikfehler oder verborgene Voreingenommenheit.'), 
          nextId: 'agency' 
        }
      ]
    },
    perception_creative: {
      dimension: t('มิติที่ 2: การรับรู้', 'Dimension 2: Perception', 'Dimension 2: Wahrnehmung'),
      question: t(
        'คุณมักจะเชื่อมโยงเรื่องราวต่างๆ เข้าด้วยกันอย่างไรเพื่อให้เกิดไอเดีย?',
        'How do you usually connect ideas to spark creativity?',
        'Wie verbinden Sie Ideen gewöhnlich, um Kreativität zu wecken?'
      ),
      options: [
        { 
          tag: t('Cross-disciplinary', 'Cross-disciplinary', 'Fachübergreifend'),
          label: t('เอาเรื่องจากศาสตร์อื่นๆ ที่ไม่เกี่ยวกันมาประยุกต์ใช้', 'Apply concepts from completely unrelated fields.', 'Konzepte aus völlig anderen Bereichen anwenden.'), 
          nextId: 'agency' 
        },
        { 
          tag: t('Storytelling', 'Storytelling', 'Geschichtenerzählen'),
          label: t('ใช้ประสบการณ์ส่วนตัวมาร้อยเรียงเป็นเรื่องราวที่เห็นภาพ', 'Use personal experiences to weave everything into a story.', 'Persönliche Erfahrungen nutzen, um eine Geschichte zu weben.'), 
          nextId: 'agency' 
        }
      ]
    },
    agency: {
      dimension: t('มิติที่ 3: การตัดสินใจ', 'Dimension 3: Agency', 'Dimension 3: Agency'),
      question: t(
        'เมื่อต้องตัดสินใจในเรื่องสำคัญ คุณเชื่อใจสิ่งใดมากที่สุด?',
        'When making an important decision, what do you trust the most?',
        'Wem vertrauen Sie bei einer wichtigen Entscheidung am meisten?'
      ),
      options: [
        { 
          tag: t('Decision Support', 'Decision Support', 'Entscheidungsunterstützung'),
          label: t('ข้อมูลและหลักฐานที่ชัดเจนที่ซัพพอร์ตการตัดสินใจนั้น', 'Clear data and evidence that support the choice.', 'Klare Daten und Beweise, die die Wahl unterstützen.'), 
          nextId: 'taste' 
        },
        { 
          tag: t('Expertise/Intuition', 'Expertise/Intuition', 'Intuition/Erfahrung'),
          label: t('สัญชาตญาณและประสบการณ์ที่สะสมมาของตัวเอง', 'My intuition and the experience I\'ve built up over time.', 'Meine Intuition und die Erfahrung, die ich aufgebaut habe.'), 
          nextId: 'taste' 
        },
        { 
          tag: t('User-centric', 'User-centric', 'Benutzerzentriert'),
          label: t('ความต้องการและฟีดแบ็กจากคนที่จะได้รับผลกระทบจริง', 'The needs and feedback from the people actually affected.', 'Bedürfnisse und Feedback der tatsächlich Betroffenen.'), 
          nextId: 'taste' 
        },
        { 
          tag: t('Trial & Error', 'Trial & Error', 'Versuch & Irrtum'),
          label: t('การทดลองทำดูเลย แล้วค่อยไปปรับปรุงจากข้อผิดพลาด', 'Experimenting directly and learning from the mistakes.', 'Direkt experimentieren und aus Fehlern lernen.'), 
          nextId: 'taste' 
        }
      ]
    },
    taste: {
      dimension: t('มิติที่ 4: รสนิยม', 'Dimension 4: Taste', 'Dimension 4: Geschmack'),
      question: t(
        'คุณอยากให้ผลงานของคุณมีรูปลักษณ์หรือ "ความรู้สึก" แบบไหน?',
        'What "vibe" or style do you want your work to project?',
        'Welchen "Vibe" oder Stil soll Ihre Arbeit ausstrahlen?'
      ),
      options: [
        { 
          tag: t('Minimalist', 'Minimalist', 'Minimalistisch'),
          label: t('เรียบง่าย ตัดทุกอย่างที่ไม่จำเป็นออก เน้นความกระชับ', 'Simple, concise, and cutting out everything unnecessary.', 'Einfach, prägnant und unnötigen Ballast abwerfen.'), 
          nextId: 'persuasion_minimal' 
        },
        { 
          tag: t('Elegant', 'Elegant', 'Elegant'),
          label: t('มีความเป็นมืออาชีพ สละสลวย และดูน่าเชื่อถือในทุกรายละเอียด', 'Professional, sophisticated, and trustworthy in every detail.', 'Professionell, anspruchsvoll und vertrauenswürdig.'), 
          nextId: 'persuasion_academic' 
        },
        { 
          tag: t('Casual', 'Casual', 'Locker'),
          label: t('เป็นกันเอง เข้าถึงง่าย เหมือนได้คุยกับเพื่อนสนิท', 'Friendly and accessible, like talking to a close friend.', 'Freundlich und zugänglich, wie ein Gespräch mit einem Freund.'), 
          nextId: 'persuasion_casual' 
        },
        { 
          tag: t('Bold', 'Bold', 'Mutig'),
          label: t('ดุดัน ท้าทาย และมุ่งไปที่การเปลี่ยนความเชื่อเดิมๆ', 'Bold, challenging, and aimed at shifting old beliefs.', 'Mutig, herausfordernd und darauf ausgerichtet, Altes zu ändern.'), 
          nextId: 'persuasion_bold' 
        }
      ]
    },
    persuasion_minimal: {
      dimension: t('มิติที่ 5: การโน้มน้าว', 'Dimension 5: Persuasion', 'Dimension 5: Überzeugung'),
      question: t(
        'ในความเรียบง่ายนั้น คุณทำให้คนอื่นคล้อยตามได้อย่างไร?',
        'How do you persuade others through simplicity?',
        'Wie überzeugen Sie andere durch Einfachheit?'
      ),
      options: [
        { 
          tag: t('Data Storytelling', 'Data Storytelling', 'Datenstorytelling'),
          label: t('ใช้ตัวเลขและข้อมูลที่ชัดเจนให้มันเล่าเรื่องด้วยตัวมันเอง', 'Let pure numbers and clear data tell the story.', 'Zahlen und klare Daten die Geschichte erzählen lassen.'), 
          nextId: 'capability' 
        },
        { 
          tag: t('Logical Sequence', 'Logical Sequence', 'Logische Abfolge'),
          label: t('ใช้ตรรกะที่คมชัดและลำดับขั้นที่เป็นเหตุเป็นผล', 'Use sharp logic and a clear step-by-step reasoning.', 'Scharfsinninge Logik und klare schrittweise Begründung.'), 
          nextId: 'capability' 
        }
      ]
    },
    persuasion_academic: {
      dimension: t('มิติที่ 5: การโน้มน้าว', 'Dimension 5: Persuasion', 'Dimension 5: Überzeugung'),
      question: t(
        'นอกจากการใช้ภาษาที่ดี คุณใช้วิธีไหนสร้างความน่าเชื่อถือ?',
        'Beyond good language, how do you build credibility?',
        'Wie bauen Sie über gute Sprache hinaus Glaubwürdigkeit auf?'
      ),
      options: [
        { 
          tag: t('Authority', 'Authority', 'Autorität'),
          label: t('อ้างอิงจากแหล่งที่มาหรือผู้เชี่ยวชาญระดับสากล', 'Citing reputable sources and global experts.', 'Seriöse Quellen und globale Experten zitieren.'), 
          nextId: 'capability' 
        },
        { 
          tag: t('Full Spectrum', 'Full Spectrum', 'Volles Spektrum'),
          label: t('วิเคราะห์ข้อดีข้อเสียให้เห็นครบทุกมุมอย่างเป็นกลาง', 'Analyzing both pros and cons neutrally from all angles.', 'Vor- und Nachteile neutral aus allen Blickwinkeln analysieren.'), 
          nextId: 'capability' 
        }
      ]
    },
    persuasion_casual: {
      dimension: t('มิติที่ 5: การโน้มน้าว', 'Dimension 5: Persuasion', 'Dimension 5: Überzeugung'),
      question: t(
        'คุณทำยังไงให้ผู้คนเปิดใจและเห็นด้วยกับคุณ?',
        'How do you make people open up and agree with you?',
        'Wie bringen Sie Menschen dazu, sich zu öffnen und zuzustimmen?'
      ),
      options: [
        { 
          tag: t('Humor/Wit', 'Humor/Wit', 'Humor/Witz'),
          label: t('ใช้อารมณ์ขันหรือมุกตลกเพื่อละลายพฤติกรรม', 'Use humor or jokes to break the ice and build rapport.', 'Humor oder Witze nutzen, um das Eis zu brechen.'), 
          nextId: 'capability' 
        },
        { 
          tag: t('Empathy', 'Empathy', 'Empathie'),
          label: t('แสดงความเข้าใจในสถานการณ์ของเขาว่าเป็นพวกเดียวกัน', 'Showing empathy and making them feel understood.', 'Empathie zeigen und ihnen das Gefühl geben, verstanden zu werden.'), 
          nextId: 'capability' 
        }
      ]
    },
    persuasion_bold: {
      dimension: t('มิติที่ 5: การโน้มน้าว', 'Dimension 5: Persuasion', 'Dimension 5: Überzeugung'),
      question: t(
        'การนำเสนอที่ดุดันของคุณ มักจะเปลี่ยนความคิดคนด้วยอะไร?',
        'How does your boldness usually change people\'s minds?',
        'Wie ändert Ihre Kühnheit gewöhnlich die Meinung der Menschen?'
      ),
      options: [
        { 
          tag: t('Pain Points', 'Pain Points', 'Schmerzpunkte'),
          label: t('ชี้ให้เห็นถึงความล้มเหลวที่จะเกิดขึ้นถ้าไม่ยอมเปลี่ยน', 'Highlighting the failure/pain that will occur without change.', 'Auf das Scheitern/den Schmerz hinweisen, der ohne Änderung eintritt.'), 
          nextId: 'capability' 
        },
        { 
          tag: t('Myth Busting', 'Myth Busting', 'Mythen entlarven'),
          label: t('หักล้างความเชื่อผิดๆ อย่างตรงไปตรงมาและรุนแรง', 'Brutally debunking common myths and false beliefs.', 'Allgemeine Mythen und falsche Überzeugungen entlarven.'), 
          nextId: 'capability' 
        }
      ]
    },
    capability: {
      dimension: t('มิติที่ 6: ข้อปฏิบัติ', 'Dimension 6: Guardrails', 'Dimension 6: Einschränkungen'),
      question: t(
        'ถ้ามีสิ่งหนึ่งที่คุณ "ไม่มีทางทำ" ในการทำงาน สิ่งนั้นคืออะไร?',
        'If there is one thing you "never do" in your work, what is it?',
        'Wenn es eine Sache gibt, die Sie bei der Arbeit "niemals tun", was ist das?'
      ),
      options: [
        { 
          tag: t('Accuracy', 'Accuracy', 'Genauigkeit'),
          label: t('จะไม่กุเรื่องขึ้นมาเอง ถ้าไม่รู้คือไม่รู้ ห้ามเดาเด็ดขาด', 'Never fabricate facts. If I don\'t know, I\'ll say so. No guessing.', 'Niemals Fakten erfinden. Wenn ich es nicht weiß, sage ich es.'), 
          nextId: 'END' 
        },
        { 
          tag: t('Efficiency', 'Efficiency', 'Effizienz'),
          label: t('จะไม่พูดเพ้อเจ้อ ต้องเข้าประเด็นให้เร็วที่สุด ไม่ยืดเยื้อ', 'Never waste time. Get straight to the point without fluff.', 'Niemals Zeit verschwenden. Ohne Umschweife auf den Punkt kommen.'), 
          nextId: 'END' 
        },
        { 
          tag: t('Neutrality', 'Neutrality', 'Neutralität'),
          label: t('จะไม่เอาอคติส่วนตัวมาปน ต้องเป็นกลางที่สุดเสมอ', 'Never let personal bias affect a fair and neutral perspective.', 'Niemals persönliche Voreingenommenheit die Perspektive beeinflussen lassen.'), 
          nextId: 'END' 
        },
        { 
          tag: t('Originality', 'Originality', 'Originalität'),
          label: t('จะไม่ทำอะไรเดิมๆ ซ้ำซาก ต้องมีมุมมองใหม่เสมอ', 'Never be repetitive. Must always offer a fresh and creative angle.', 'Niemals repetitiv sein. Immer einen frischen Ansatz bieten.'), 
          nextId: 'END' 
        }
      ]
    }
  },
  agent: {
    start: 'a_worldview',
    a_worldview: {
      dimension: t('มิติที่ 1: โลกทัศน์', 'Dimension 1: Worldview', 'Dimension 1: Weltanschauung'),
      question: t(
        'คุณต้องการให้ AI Agent ตัวนี้มี "จุดยืน" ในการมองปัญหาอย่างไร?',
        'What should be the primary "lens" of this AI Agent when facing problems?',
        'Welche primäre Perspektive soll dieser KI-Agent bei Problemen haben?'
      ),
      options: [
        { 
          tag: t('Systems Thinker', 'Systems Thinker', 'Systemdenker'),
          label: t('มองแบบองค์รวม เห็นโครงสร้างและความเชื่อมโยงของระบบ', 'See holistic connections, systems, and structures.', 'Ganzheitliche Verbindungen, Systeme und Strukturen sehen.'), 
          nextId: 'a_perception_system' 
        },
        { 
          tag: t('Pragmatist', 'Pragmatist', 'Pragmatiker'),
          label: t('มองหาวิธีการแก้ปัญหาที่ทำได้จริงและเห็นผลทันที', 'Focus on immediate, actionable, and practical problem-solving.', 'Fokus auf sofortige, umsetzbare und praktische Problemlösung.'), 
          nextId: 'a_perception_pragmatic' 
        },
        { 
          tag: t('Analyst', 'Analyst', 'Analytiker'),
          label: t('เน้นตรวจสอบรายละเอียด ค้นหาช่องโหว่และข้อผิดพลาด', 'Focus on inspection, deep analysis, and finding flaws.', 'Fokus auf Inspektion, tiefe Analyse und das Finden von Fehlern.'), 
          nextId: 'a_perception_critical' 
        },
        { 
          tag: t('Visionary', 'Visionary', 'Visionär'),
          label: t('มองข้ามขีดจำกัดปัจจุบัน พุ่งเป้าไปที่ความเป็นไปได้ใหม่ๆ', 'Look past current constraints, aiming for future possibilities.', 'Über aktuelle Grenzen hinausblicken, neue Möglichkeiten anstreben.'), 
          nextId: 'a_perception_creative' 
        }
      ]
    },
    a_perception_system: {
      dimension: t('มิติที่ 2: การประมวลผล', 'Dimension 2: Perception', 'Dimension 2: Wahrnehmung'),
      question: t(
        'Agent ตัวนี้ควรจัดการข้อมูลที่ซับซ้อนด้วยขั้นตอนไหน?',
        'What process should this Agent use for complex data?',
        'Welchen Prozess soll dieser Agent für komplexe Daten nutzen?'
      ),
      options: [
        { 
          tag: t('Taxonomy', 'Taxonomy', 'Taxonomie'),
          label: t('แยกประเภทข้อมูลและสร้างกรอบความคิด (Framework) ขึ้นมา', 'Categorize data and build structural frameworks.', 'Daten kategorisieren und strukturelle Rahmenbedingungen schaffen.'), 
          nextId: 'a_agency' 
        },
        { 
          tag: t('Cause & Effect', 'Cause & Effect', 'Ursache & Wirkung'),
          label: t('วิเคราะห์ความสัมพันธ์เชิงเหตุและผลเชิงลึกของแต่ละส่วน', 'Analyze deep cause-and-effect relationships between all parts.', 'Ursache-Wirkungs-Beziehungen zwischen allen Teilen analysieren.'), 
          nextId: 'a_agency' 
        }
      ]
    },
    a_perception_pragmatic: {
      dimension: t('มิติที่ 2: การประมวลผล', 'Dimension 2: Perception', 'Dimension 2: Wahrnehmung'),
      question: t(
        'เพื่อความเร็วในการทำงาน Agent ควรเลือกที่จะข้ามสิ่งใด?',
        'For maximum efficiency, what should the Agent choose to skip?',
        'Was soll der Agent für maximale Effizienz überspringen?'
      ),
      options: [
        { 
          tag: t('Actionable-Only', 'Actionable-Only', 'Nur Umsetzbares'),
          label: t('ข้ามทฤษฎีที่ยังทำจริงไม่ได้ โฟกัสเฉพาะสิ่งที่ลงมือทำได้เลย', 'Skip unusable theories; focus strictly on actionable items.', 'Unbrauchbare Theorien überspringen; Fokus auf Umsetzbares.'), 
          nextId: 'a_agency' 
        },
        { 
          tag: t('No-Fluff', 'No-Fluff', 'Direkt'),
          label: t('ข้ามการอารัมภบทหรือความสุภาพที่ยาวเกินไป เน้นความกระชับ', 'Skip wordy introductions or unnecessary politeness. Concise only.', 'Lange Einleitungen überspringen. Nur das Wesentliche.'), 
          nextId: 'a_agency' 
        }
      ]
    },
    a_perception_critical: {
      dimension: t('มิติที่ 2: การประมวลผล', 'Dimension 2: Perception', 'Dimension 2: Wahrnehmung'),
      question: t(
        'หน้าที่หลักในการคัดกรองข้อมูลของ Agent คือเรื่องใด?',
        'What is the Agent\'s primary job when filtering information?',
        'Was ist die Hauptaufgabe des Agenten beim Filtern von Informationen?'
      ),
      options: [
        { 
          tag: t('Risk Mitigation', 'Risk Mitigation', 'Risikominderung'),
          label: t('ประเมินความเสี่ยงและเตือนถึงสถานการณ์เลวร้ายที่สุด', 'Assess risks and warn about the worst-case scenario.', 'Risiken bewerten und vor dem Worst-Case-Szenario warnen.'), 
          nextId: 'a_agency' 
        },
        { 
          tag: t('Logic Audit', 'Logic Audit', 'Logik-Audit'),
          label: t('ตรวจสอบความถูกต้องของตรรกะและข้อเท็จจริงอย่างเข้มงวด', 'Performs brutal fact-checking and logic audits on everything.', 'Faktenprüfung und Logik-Audits bei allem durchführen.'), 
          nextId: 'a_agency' 
        }
      ]
    },
    a_perception_creative: {
      dimension: t('มิติที่ 2: การประมวลผล', 'Dimension 2: Perception', 'Dimension 2: Wahrnehmung'),
      question: t(
        'Agent ควรสร้างสรรค์มุมมองใหม่ๆ ด้วยวิธีไหน?',
        'How should the Agent generate creative new perspectives?',
        'Wie soll der Agent neue kreative Perspektiven erzeugen?'
      ),
      options: [
        { 
          tag: t('Analogies', 'Analogies', 'Analogien'),
          label: t('ใช้การเปรียบเทียบข้ามสายงานเพื่อให้เห็นภาพได้ชัดเจน', 'Use cross-industry analogies to explain complex concepts.', 'Branchenübergreifende Analogien zur Erklärung nutzen.'), 
          nextId: 'a_agency' 
        },
        { 
          tag: t('Divergent Thinking', 'Divergent Thinking', 'Divergentes Denken'),
          label: t('เสนอทางเลือกที่แหวกแนวและไม่ถูกจำกัดด้วยกรอบเดิมๆ', 'Offer unconventional options, free from standard constraints.', 'Unkonventionelle Optionen anbieten, frei von Standards.'), 
          nextId: 'a_agency' 
        }
      ]
    },
    a_agency: {
      dimension: t('มิติที่ 3: ความอิสระ', 'Dimension 3: Agency', 'Dimension 3: Agency'),
      question: t(
        'คุณต้องการให้ Agent ตัวนี้มีอิสระในการตัดสินใจระดับไหน?',
        'What level of autonomy should the Agent have in decision-making?',
        'Wie viel Autonomie soll der Agent bei der Entscheidungsfindung haben?'
      ),
      options: [
        { 
          tag: t('Executor', 'Executor', 'Ausführer'),
          label: t('รอรับคำสั่งและทำตามขั้นตอนอย่างเคร่งครัด ห้ามคิดแทน', 'Wait for specific commands and execute exactly as told.', 'Auf Befehle warten und exakt wie angewiesen ausführen.'), 
          nextId: 'a_taste' 
        },
        { 
          tag: t('Decision Support', 'Decision Support', 'Entscheidungsunterstützung'),
          label: t('วิเคราะห์และเสนอทางเลือกให้มนุษย์เป็นคนเลือกขั้นสุดท้าย', 'Analyze and suggest options, but let the human decide.', 'Optionen analysieren und vorschlagen, aber den Menschen entscheiden lassen.'), 
          nextId: 'a_taste' 
        },
        { 
          tag: t('Autonomous', 'Autonomous', 'Autonom'),
          label: t('ตัดสินใจและวางแผนดำเนินการล่วงหน้าให้โดยอัตโนมัติ', 'Plan, decide, and act independently ahead of time.', 'Vorausplanen, entscheiden und unabhängig handeln.'), 
          nextId: 'a_taste' 
        }
      ]
    },
    a_taste: {
      dimension: t('มิติที่ 4: สไตล์การตอบ', 'Dimension 4: Taste', 'Dimension 4: Geschmack'),
      question: t(
        'Agent ควรใช้ระดับภาษาหรือรูปแบบการสื่อสารแบบไหน?',
        'What communication style or "tone" should the Agent use?',
        'Welchen Kommunikationsstil oder "Ton" soll der Agent verwenden?'
      ),
      options: [
        { 
          tag: t('Technical', 'Technical', 'Technisch'),
          label: t('ภาษาวิศวกร แม่นยำ ทรงพลัง และเต็มไปด้วยศัพท์เทคนิค', 'Precise, powerful, and technical (like engineering documents).', 'Präzise, kraftvoll und technisch (Ingenieursstil).'), 
          nextId: 'a_persuasion_tech' 
        },
        { 
          tag: t('Corporate', 'Corporate', 'Geschäftlich'),
          label: t('ภาษาสุภาพ เป็นทางการ เหมาะสำหรับการสื่อสารในองค์กร', 'Polite, formal, and professional for enterprise environments.', 'Höflich, formell und professionell für Unternehmen.'), 
          nextId: 'a_persuasion_corp' 
        },
        { 
          tag: t('Conversational', 'Conversational', 'Zwanglos'),
          label: t('ภาษาเป็นกันเอง คุยง่าย เหมือนได้ปรึกษากับที่ปรึกษาส่วนตัว', 'Natural, conversational, and friendly, like a personal coach.', 'Natürlich, zwanglos und freundlich, wie ein Coach.'), 
          nextId: 'a_persuasion_conv' 
        },
        { 
          tag: t('Creative', 'Creative', 'Kreativ'),
          label: t('ใช้ภาษาเชิงศิลป์ เปรียบเทียบเก่ง และสร้างแรงบันดาลใจ', 'Artistic, metaphorical, and inspiring language.', 'Künstlerische, metaphorische und inspirierende Sprache.'), 
          nextId: 'a_persuasion_creative' 
        }
      ]
    },
    a_persuasion_tech: {
      dimension: t('มิติที่ 5: การนำเสนอ', 'Dimension 5: Persuasion', 'Dimension 5: Überzeugung'),
      question: t(
        'ในการนำเสนอข้อข้อมูล Agent ควรเน้นส่วนไหนมากที่สุด?',
        'In presentation, what element should the Agent emphasize?',
        'Welches Element soll der Agent bei Präsentationen betonen?'
      ),
      options: [
        { 
          tag: t('Flow & Structure', 'Flow & Structure', 'Ablauf & Struktur'),
          label: t('เน้นโค้ด ตารางข้อมูล และโครงสร้างขั้นตอนการทำงานที่ชัดเจน', 'Focus on code snippets, data tables, and clear workflows.', 'Fokus auf Code, Datentabellen und klare Arbeitsabläufe.'), 
          nextId: 'a_capability' 
        },
        { 
          tag: t('References', 'References', 'Referenzen'),
          label: t('เน้นอ้างอิงจาก Documentation, API หรือมาตรฐานที่ยอมรับ', 'Citing official documentation, API references, or standards.', 'Zitieren von Dokumentationen, API-Referenzen oder Standards.'), 
          nextId: 'a_capability' 
        }
      ]
    },
    a_persuasion_corp: {
      dimension: t('มิติที่ 5: การนำเสนอ', 'Dimension 5: Persuasion', 'Dimension 5: Überzeugung'),
      question: t(
        'การโน้มน้าวใจในรูปแบบองค์กร ควรให้ความสำคัญกับเรื่องใด?',
        'In corporate persuasion, what should be the priority?',
        'Was soll bei der geschäftlichen Überzeugung Priorität haben?'
      ),
      options: [
        { 
          tag: t('ROI / Value', 'ROI / Value', 'ROI / Nutzen'),
          label: t('เน้นการลดความเสี่ยง ความคุ้มค่า และผลลัพธ์ที่เป็นรูปธรรม', 'Focus on risk mitigation, ROI, and tangible value.', 'Fokus auf Risikominderung, ROI und greifbaren Nutzen.'), 
          nextId: 'a_capability' 
        },
        { 
          tag: t('Compliance', 'Compliance', 'Compliance'),
          label: t('เน้นความสอดคล้องกับกลยุทธ์องค์กรและมาตรฐานที่กำหนด', 'Focus on strategic alignment and strict compliance.', 'Fokus auf strategische Ausrichtung und Compliance.'), 
          nextId: 'a_capability' 
        }
      ]
    },
    a_persuasion_conv: {
      dimension: t('มิติที่ 5: การนำเสนอ', 'Dimension 5: Persuasion', 'Dimension 5: Überzeugung'),
      question: t(
        'เพื่อรักษาความน่าสนใจในการสนทนา Agent ควรมีท่าทีอย่างไร?',
        'How should the Agent behave to keep conversations engaging?',
        'Wie soll sich der Agent verhalten, um Gespräche einnehmend zu führen?'
      ),
      options: [
        { 
          tag: t('Socratic Method', 'Socratic Method', 'Sokratische Methode'),
          label: t('ใช้การตั้งคำถามกลับเพื่อกระตุ้นให้ผู้ใช้ได้คิดและต่อยอด', 'Ask questions back to prompt user thinking and reflection.', 'Fragen zurückstellen, um zum Nachdenken anzuregen.'), 
          nextId: 'a_capability' 
        },
        { 
          tag: t('Deep Empathy', 'Deep Empathy', 'Tiefe Empathie'),
          label: t('ใช้วิธีสะท้อนความรู้สึกและรับฟังความต้องการอย่างลึกซึ้ง', 'Employ active listening and deeply validate user needs.', 'Aktives Zuhören und Validierung der Nutzerbedürfnisse.'), 
          nextId: 'a_capability' 
        }
      ]
    },
    a_persuasion_creative: {
      dimension: t('มิติที่ 5: การนำเสนอ', 'Dimension 5: Persuasion', 'Dimension 5: Überzeugung'),
      question: t(
        'สำหรับการดึงดูดใจเชิงสร้างสรรค์ Agent ควรใช้อะไรมัดใจ?',
        'What should the Agent use to engage creative users?',
        'Womit soll der Agent kreative Nutzer gewinnen?'
      ),
      options: [
        { 
          tag: t('Vivid Imagery', 'Vivid Imagery', 'Lebhafte Bilder'),
          label: t('การใช้คำอุปมาอุปไมยที่ทรงพลังและการสร้างภาพในหัว', 'Using powerful metaphors and vivid mental imagery.', 'Starke Metaphern und lebhafte mentale Bilder nutzen.'), 
          nextId: 'a_capability' 
        },
        { 
          tag: t('Emotional Peaks', 'Emotional Peaks', 'Emotionale Spitzen'),
          label: t('การเล่นกับจังหวะจะโคนและการขยี้ประเด็นให้ถึงอารมณ์', 'Mastering pacing, rhythm, and hitting emotional peaks.', 'Meisterung von Rhythmus und emotionalen Höhepunkten.'), 
          nextId: 'a_capability' 
        }
      ]
    },
    a_capability: {
      dimension: t('มิติที่ 6: โปรโตคอล', 'Dimension 6: Guardrails', 'Dimension 6: Einschränkungen'),
      question: t(
        'กฎข้อใดคือสิ่งที่ Agent ตัวนี้ "ห้ามละเมิด" อย่างเด็ดขาด?',
        'What is the ultimate rule that the Agent must never break?',
        'Welche Regel darf der Agent niemals brechen?'
      ),
      options: [
        { 
          tag: t('Safety First', 'Safety First', 'Sicherheit zuerst'),
          label: t('ปฏิเสธคำขอที่อันตราย ไม่เหมาะสม หรือไม่ปลอดภัยทุกกรณี', 'Refuse any requests that are risky, infringing, or unsafe.', 'Risikoreiche oder unsichere Anfragen strikt ablehnen.'), 
          nextId: 'END' 
        },
        { 
          tag: t('Source Only', 'Source Only', 'Nur Quellen'),
          label: t('ห้ามเดาเด็ดขาด ต้องตอบจากข้อมูลที่กำหนดให้เท่านั้น', 'No guessing. Must reference provided source data only.', 'Kein Raten. Nur bereitgestellte Daten referenzieren.'), 
          nextId: 'END' 
        },
        { 
          tag: t('Role Lock', 'Role Lock', 'Rollenbindung'),
          label: t('ห้ามหลุดจากบทบาทที่ได้รับมอบหมายไม่ว่าจะเกิดอะไรขึ้น', 'Never break character or move outside the assigned role.', 'Niemals den Charakter oder die Rolle verlassen.'), 
          nextId: 'END' 
        },
        { 
          tag: t('Strict Format', 'Strict Format', 'Striktes Format'),
          label: t('ต้องตอบกลับตามรูปแบบที่กำหนดไว้เป๊ะๆ เท่านั้น', 'Output ONLY in the exact specified format (e.g. JSON only).', 'Nur im exakt vorgegebenen Format antworten.'), 
          nextId: 'END' 
        }
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

// Objective → recommended tag mapping for "Recommended" badges
QUESTION_FLOW.objectiveFilter = {
  // Creative Writing
  blog_writing: { recommendedTags: ['Storytelling', 'Cross-disciplinary', 'Elegant', 'Full Spectrum', 'Originality'] },
  storytelling: { recommendedTags: ['Optimist/Creator', 'Storytelling', 'Casual', 'Empathy', 'Originality'] },
  copywriting: { recommendedTags: ['Pragmatist', '80/20 Rule', 'Bold', 'Pain Points', 'Efficiency'] },
  social_media: { recommendedTags: ['Optimist/Creator', 'Casual', 'Humor/Wit', 'Originality', 'Emotional Peaks'] },
  // Business & Communication
  customer_support: { recommendedTags: ['Pragmatist', 'Fact-Focus', 'User-centric', 'Casual', 'Empathy', 'Accuracy'] },
  sales: { recommendedTags: ['Pragmatist', '80/20 Rule', 'Bold', 'Pain Points', 'Efficiency'] },
  corporate_comms: { recommendedTags: ['Systems Thinker', 'Categorize', 'Decision Support', 'Elegant', 'Authority', 'Neutrality'] },
  email_writing: { recommendedTags: ['Pragmatist', '80/20 Rule', 'Elegant', 'Logical Sequence', 'Efficiency'] },
  // Technical & Knowledge
  tech_docs: { recommendedTags: ['Systems Thinker', 'Categorize', 'Decision Support', 'Technical', 'Flow & Structure', 'Accuracy'] },
  research: { recommendedTags: ['Critical/Skeptical', 'Pattern Seeking', 'Decision Support', 'Elegant', 'Full Spectrum', 'Neutrality'] },
  code_review: { recommendedTags: ['Critical/Skeptical', 'Logic Audit', 'Decision Support', 'Technical', 'References', 'Accuracy'] },
  education: { recommendedTags: ['Optimist/Creator', 'Cross-disciplinary', 'Conversational', 'Socratic Method', 'Originality'] },
  // Brand & Media
  brand_voice: { recommendedTags: ['Optimist/Creator', 'Storytelling', 'Bold', 'Vivid Imagery', 'Originality'] },
  media_production: { recommendedTags: ['Optimist/Creator', 'Cross-disciplinary', 'Creative', 'Vivid Imagery', 'Originality'] },
  pr_crisis: { recommendedTags: ['Critical/Skeptical', 'Risk Assessment', 'Decision Support', 'Corporate', 'Compliance', 'Safety First'] },
  community: { recommendedTags: ['Pragmatist', 'User-centric', 'Conversational', 'Deep Empathy', 'Empathy'] },
  // Agent-specific
  _agent_tech_docs: { recommendedTags: ['Analyst', 'Taxonomy', 'Executor', 'Technical', 'Flow & Structure', 'Source Only'] },
  _agent_code_review: { recommendedTags: ['Analyst', 'Logic Audit', 'Decision Support', 'Technical', 'References', 'Source Only'] },
  _agent_customer_support: { recommendedTags: ['Pragmatist', 'Actionable-Only', 'Decision Support', 'Conversational', 'Deep Empathy', 'Role Lock'] },
};

