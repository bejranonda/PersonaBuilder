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
          nextId: 'perception_system',
          example: t('เช่น เวลาเจอปัญหาน้ำท่วม จะไม่ดูแค่ระดับน้ำแต่จะไปดูโครงสร้างระบบระบายน้ำทั้งเมือง', 'e.g. When facing flooding, you investigate the entire drainage system, not just the water level.', 'z.B. Bei Hochwasser prüfen Sie das gesamte Entwässerungssystem, nicht nur den Wasserstand.')
        },
        { 
          tag: t('Pragmatist', 'Pragmatist', 'Pragmatiker'),
          label: t('เน้นแก้ปัญหาเฉพาะหน้าให้เร็วที่สุด อะไรเวิร์คทำเลย', 'Focus on fixing it as quickly as possible. Whatever works.', 'Fokussiert auf schnelle Lösung. Was auch immer funktioniert.'), 
          nextId: 'perception_pragmatic',
          example: t('เช่น รถเสียกลางทาง จะไม่นั่งอ่านคู่มือ แต่จะหาอู่ซ่อมที่ใกล้ที่สุดทันที', 'e.g. Car breaks down — you skip the manual and call the nearest mechanic immediately.', 'z.B. Auto kaputt — Sie überspringen das Handbuch und rufen sofort den nächsten Mechaniker.')
        },
        { 
          tag: t('Critical/Skeptical', 'Critical/Skeptical', 'Kritiker/Skeptiker'),
          label: t('ตั้งคำถามและเช็กความโกรธ/ความเสี่ยงก่อนตัดสินใจ', 'Question everything and assess the risks before acting.', 'Alles hinterfragen und Risiken bewerten, bevor man handelt.'), 
          nextId: 'perception_critical',
          example: t('เช่น เวลาเห็นโฆษณาสินค้า จะตั้งคำถามก่อนว่ามันเกินจริงไหม มีข้อแม้ซ่อนอยู่ไหม', 'e.g. Seeing an ad, you first ask: is this too good to be true? What\'s the catch?', 'z.B. Bei einer Anzeige fragen Sie zuerst: Ist das zu schön um wahr zu sein? Was ist der Haken?')
        },
        { 
          tag: t('Optimist/Creator', 'Optimist/Creator', 'Optimist/Schöpfer'),
          label: t('มองหาโอกาสและวิธีสร้างสรรค์สิ่งใหม่จากปัญหานั้น', 'Look for opportunities and creative ways to build something new from it.', 'Nach Chancen suchen, um etwas Neues daraus zu erschaffen.'), 
          nextId: 'perception_creative',
          example: t('เช่น เมื่อร้านอาหารปิด จะมองว่าเป็นโอกาสเปิดธุรกิจใหม่แทน', 'e.g. Restaurant closes — you see it as an opportunity to start something new.', 'z.B. Restaurant schließt — Sie sehen es als Chance, etwas Neues zu beginnen.')
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
          nextId: 'agency',
          example: t('เช่น เวลาย้ายบ้าน จะแบ่งของเป็นหมวดหมู่ ก่อนแพ็คลงกล่อง', 'e.g. When moving, you sort everything into categories before packing.', 'z.B. Beim Umzug sortieren Sie alles in Kategorien, bevor Sie packen.')
        },
        { 
          tag: t('Pattern Seeking', 'Pattern Seeking', 'Mustersuche'),
          label: t('มองหาแพทเทิร์นหรือสิ่งที่ผิดปกติที่คนอื่นอาจจะมองไม่เห็น', 'Look for patterns or anomalies that others might miss.', 'Nach Mustern oder Anomalien suchen, die andere übersehen.'), 
          nextId: 'agency',
          example: t('เช่น เห็นเพื่อน 3 คนป่วยพร้อมกัน จะไม่ดูแค่อาการแต่หาสาเหตุร่วม', 'e.g. Three friends get sick — you look for the common cause, not just individual symptoms.', 'z.B. Drei Freunde werden krank — Sie suchen die gemeinsame Ursache, nicht nur Symptome.')
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
          nextId: 'agency',
          example: t('เช่น เวลาทำรายงาน จะใส่ 3 สไลด์สรุปหลักแทนที่จะทำ 30 สไลด์รายละเอียด', 'e.g. For a report, you make 3 key slides instead of 30 detailed ones.', 'z.B. Für einen Bericht erstellen Sie 3 Folien statt 30 detaillierten.')
        },
        { 
          tag: t('Fact-Focus', 'Fact-Focus', 'Faktenorientiert'),
          label: t('มองข้ามอารมณ์ความรู้สึก และเน้นแค่ข้อเท็จจริงล้วนๆ', 'Ignore emotions and focus purely on the facts and data.', 'Emotionen ignorieren und sich rein auf Fakten konzentrieren.'), 
          nextId: 'agency',
          example: t('เช่น เวลาเถียงกัน จะใช้ข้อมูลตัวเลขแทนที่จะใช้ความรู้สึก', 'e.g. In a debate, you cite numbers and data instead of feelings.', 'z.B. In einer Debatte zitieren Sie Zahlen statt Gefühle.')
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
          nextId: 'agency',
          example: t('เช่น ก่อนลงทุน จะคิดว่าถ้าหมดตัวไปจะเกิดอะไรขึ้น', 'e.g. Before investing, you think: what happens if I lose everything?', 'z.B. Vor einer Investition denken Sie: Was passiert, wenn ich alles verliere?')
        },
        { 
          tag: t('Logic Audit', 'Logic Audit', 'Logikprüfung'),
          label: t('ความไม่สมเหตุสมผลของเหตุผล หรืออคติที่ซ่อนอยู่', 'Logical fallacies or hidden biases in their reasoning.', 'Logikfehler oder verborgene Voreingenommenheit.'), 
          nextId: 'agency',
          example: t('เช่น เวลาอ่านบทความ จะเช็กว่าข้อสรุปสอดคล้องกับหลักฐานไหม', 'e.g. Reading an article, you check if the conclusion follows from the evidence.', 'z.B. Beim Lesen eines Artikels prüfen Sie, ob die Schlussfolgerung zu den Beweisen passt.')
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
          nextId: 'agency',
          example: t('เช่น ใช้หลักการเล่นหมากรุกมาประยุกต์กับการวางแผนธุรกิจ', 'e.g. Applying chess strategy principles to business planning.', 'z.B. Schachstrategie-Prinzipien auf die Geschäftsplanung anwenden.')
        },
        { 
          tag: t('Storytelling', 'Storytelling', 'Geschichtenerzählen'),
          label: t('ใช้ประสบการณ์ส่วนตัวมาร้อยเรียงเป็นเรื่องราวที่เห็นภาพ', 'Use personal experiences to weave everything into a story.', 'Persönliche Erfahrungen nutzen, um eine Geschichte zu weben.'), 
          nextId: 'agency',
          example: t('เช่น อธิบายแนวคิดยากๆ ผ่านเรื่องเล่าประสบการณ์จริงของตัวเอง', 'e.g. Explaining complex ideas through your own real-life stories.', 'z.B. Komplexe Ideen durch eigene Lebensgeschichten erklären.')
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
          nextId: 'taste',
          example: t('เช่น ซื้อโทรศัพท์ใหม่ จะเปรียบเทียบสเปคทุกรุ่นก่อนตัดสินใจ', 'e.g. Buying a phone, you compare specs of every model before choosing.', 'z.B. Beim Telefonkauf vergleichen Sie die Specs aller Modelle vor der Entscheidung.')
        },
        { 
          tag: t('Expertise/Intuition', 'Expertise/Intuition', 'Intuition/Erfahrung'),
          label: t('สัญชาตญาณและประสบการณ์ที่สะสมมาของตัวเอง', 'My intuition and the experience I\'ve built up over time.', 'Meine Intuition und die Erfahrung, die ich aufgebaut habe.'), 
          nextId: 'taste',
          example: t('เช่น ตัดสินใจเรื่องงานได้ทันทีเพราะเคยเจอปัญหาแบบนี้มาเยอะ', 'e.g. You decide instantly at work because you\'ve seen this problem many times.', 'z.B. Sie entscheiden sofort bei der Arbeit, da Sie dieses Problem oft gesehen haben.')
        },
        { 
          tag: t('User-centric', 'User-centric', 'Benutzerzentriert'),
          label: t('ความต้องการและฟีดแบ็กจากคนที่จะได้รับผลกระทบจริง', 'The needs and feedback from the people actually affected.', 'Bedürfnisse und Feedback der tatsächlich Betroffenen.'), 
          nextId: 'taste',
          example: t('เช่น ออกแบบแอป จะไปถามผู้ใช้ก่อนว่าอยากได้ฟีเจอร์อะไร', 'e.g. Designing an app, you ask users first what features they want.', 'z.B. Beim App-Design fragen Sie zuerst die Nutzer, welche Features sie wollen.')
        },
        { 
          tag: t('Trial & Error', 'Trial & Error', 'Versuch & Irrtum'),
          label: t('การทดลองทำดูเลย แล้วค่อยไปปรับปรุงจากข้อผิดพลาด', 'Experimenting directly and learning from the mistakes.', 'Direkt experimentieren und aus Fehlern lernen.'), 
          nextId: 'taste',
          example: t('เช่น ไม่รู้จะทำอาหารอะไร ก็เปิดตู้เย็นเอาของที่มีมาทำดูก่อน', 'e.g. Don\'t know what to cook? Open the fridge and just start experimenting.', 'z.B. Wissen nicht was kochen? Kühlschrank öffnen und einfach experimentieren.')
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
          nextId: 'persuasion_minimal',
          example: t('เช่น ชอบห้องที่มีเฟอร์นิเจอร์น้อยชิ้น แต่ทุกชิ้นมีประโยชน์', 'e.g. You prefer a room with few furniture pieces, but every piece has purpose.', 'z.B. Sie bevorzugen einen Raum mit wenigen Möbeln, aber jedes Stück hat einen Zweck.')
        },
        { 
          tag: t('Elegant', 'Elegant', 'Elegant'),
          label: t('มีความเป็นมืออาชีพ สละสลวย และดูน่าเชื่อถือในทุกรายละเอียด', 'Professional, sophisticated, and trustworthy in every detail.', 'Professionell, anspruchsvoll und vertrauenswürdig.'), 
          nextId: 'persuasion_academic',
          example: t('เช่น ชอบแต่งตัวดูดีในทุกโอกาส แม้แค่ไปซื้อของที่ร้านสะดวกซื้อ', 'e.g. You dress well for every occasion, even a quick convenience store run.', 'z.B. Sie kleiden sich für jeden Anlass gut, selbst für den Spätkauf.')
        },
        { 
          tag: t('Casual', 'Casual', 'Locker'),
          label: t('เป็นกันเอง เข้าถึงง่าย เหมือนได้คุยกับเพื่อนสนิท', 'Friendly and accessible, like talking to a close friend.', 'Freundlich und zugänglich, wie ein Gespräch mit einem Freund.'), 
          nextId: 'persuasion_casual',
          example: t('เช่น ชอบคุยกับเพื่อนใหม่เหมือนรู้จักกันมานาน ไม่ต้องพิธีการ', 'e.g. You chat with new friends like you\'ve known them for years, no formality.', 'z.B. Sie plaudern mit neuen Freunden, als ob Sie sich seit Jahren kennen.')
        },
        { 
          tag: t('Bold', 'Bold', 'Mutig'),
          label: t('ดุดัน ท้าทาย และมุ่งไปที่การเปลี่ยนความเชื่อเดิมๆ', 'Bold, challenging, and aimed at shifting old beliefs.', 'Mutig, herausfordernd und darauf ausgerichtet, Altes zu ändern.'), 
          nextId: 'persuasion_bold',
          example: t('เช่น กล้าพูดความจริงที่คนอื่นไม่กล้าพูด แม้จะไม่เข้าหูใคร', 'e.g. You say what others won\'t, even if it ruffles feathers.', 'z.B. Sie sagen, was andere nicht sagen, selbst wenn es Federn raufft.')
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
          nextId: 'capability',
          example: t('เช่น แทนที่จะบอกว่าขายดี จะแสดงกราฟยอดขาย 12 เดือน', 'e.g. Instead of saying "sales are good", you show a 12-month sales chart.', 'z.B. Statt "Verkauf ist gut" zeigen Sie ein 12-Monate-Diagramm.')
        },
        { 
          tag: t('Logical Sequence', 'Logical Sequence', 'Logische Abfolge'),
          label: t('ใช้ตรรกะที่คมชัดและลำดับขั้นที่เป็นเหตุเป็นผล', 'Use sharp logic and a clear step-by-step reasoning.', 'Scharfsinninge Logik und klare schrittweise Begründung.'), 
          nextId: 'capability',
          example: t('เช่น เสนอโปรเจกต์โดยเรียงลำดับ: ปัญหา → สาเหตุ → วิธีแก้ → ผลลัพธ์', 'e.g. Pitch a project in order: Problem → Cause → Solution → Outcome.', 'z.B. Projekt vorschlagen: Problem → Ursache → Lösung → Ergebnis.')
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
          nextId: 'capability',
          example: t('เช่น อ้างอิงงานวิจัยจากมหาวิทยาลัยดังแทนที่จะบอกว่าคิดเอง', 'e.g. Citing research from a top university instead of saying "I think".', 'z.B. Forschung einer Top-Universität zitieren statt "Ich denke".')
        },
        { 
          tag: t('Full Spectrum', 'Full Spectrum', 'Volles Spektrum'),
          label: t('วิเคราะห์ข้อดีข้อเสียให้เห็นครบทุกมุมอย่างเป็นกลาง', 'Analyzing both pros and cons neutrally from all angles.', 'Vor- und Nachteile neutral aus allen Blickwinkeln analysieren.'), 
          nextId: 'capability',
          example: t('เช่น เสนอไอเดียแล้วบอกด้วยว่าข้อเสียคืออะไร ข้อดีคืออะไร', 'e.g. Pitching an idea and honestly listing both pros and cons.', 'z.B. Eine Idee vorschlagen und ehrlich Vor- und Nachteile auflisten.')
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
          nextId: 'capability',
          example: t('เช่น ใช้มุกตลกเปิดงานนำเสนอเพื่อทำให้คนดูผ่อนคลาย', 'e.g. Opening a presentation with a joke to make the audience relax.', 'z.B. Eine Präsentation mit einem Witz eröffnen, um das Publikum zu entspannen.')
        },
        { 
          tag: t('Empathy', 'Empathy', 'Empathie'),
          label: t('แสดงความเข้าใจในสถานการณ์ของเขาว่าเป็นพวกเดียวกัน', 'Showing empathy and making them feel understood.', 'Empathie zeigen und ihnen das Gefühl geben, verstanden zu werden.'), 
          nextId: 'capability',
          example: t('เช่น บอกว่าเข้าใจว่าทำไมถึงหงุดหงิด แล้วค่อยๆ อธิบายให้เข้าใจ', 'e.g. Saying "I understand why you\'re frustrated" before explaining.', 'z.B. Sagen "Ich verstehe, warum Sie frustriert sind" vor dem Erklären.')
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
          nextId: 'capability',
          example: t('เช่น บอกว่าถ้ายังใช้ระบบเก่าอยู่อีกปีจะเสียเงินเท่าไหร่', 'e.g. Showing how much money they\'ll lose by sticking with the old system.', 'z.B. Zeigen, wie viel Geld sie beim alten System verlieren werden.')
        },
        { 
          tag: t('Myth Busting', 'Myth Busting', 'Mythen entlarven'),
          label: t('หักล้างความเชื่อผิดๆ อย่างตรงไปตรงมาและรุนแรง', 'Brutally debunking common myths and false beliefs.', 'Allgemeine Mythen und falsche Überzeugungen entlarven.'), 
          nextId: 'capability',
          example: t('เช่น พิสูจน์ว่าความเชื่อที่คนส่วนใหญ่เชื่อนั้นผิด', 'e.g. Proving that a widely-held belief is actually wrong.', 'z.B. Beweisen, dass eine weit verbreitete Überzeugung falsch ist.')
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
          nextId: 'END',
          example: t('เช่น ถ้าไม่แน่ใจว่าตัวเลขถูกไหม จะบอกว่าไม่แน่ใจแทนที่จะเดา', 'e.g. If unsure about a number, you say "I\'m not sure" instead of guessing.', 'z.B. Bei Unsicherheit sagen Sie "Bin nicht sicher" statt zu raten.')
        },
        { 
          tag: t('Efficiency', 'Efficiency', 'Effizienz'),
          label: t('จะไม่พูดเพ้อเจ้อ ต้องเข้าประเด็นให้เร็วที่สุด ไม่ยืดเยื้อ', 'Never waste time. Get straight to the point without fluff.', 'Niemals Zeit verschwenden. Ohne Umschweife auf den Punkt kommen.'), 
          nextId: 'END',
          example: t('เช่น เขียนอีเมลไม่เกิน 3 บรรทัด ตรงประเด็นทุกครั้ง', 'e.g. Writing emails under 3 lines, straight to the point, every time.', 'z.B. E-Mails unter 3 Zeilen schreiben, direkt auf den Punkt.')
        },
        { 
          tag: t('Neutrality', 'Neutrality', 'Neutralität'),
          label: t('จะไม่เอาอคติส่วนตัวมาปน ต้องเป็นกลางที่สุดเสมอ', 'Never let personal bias affect a fair and neutral perspective.', 'Niemals persönliche Voreingenommenheit die Perspektive beeinflussen lassen.'), 
          nextId: 'END',
          example: t('เช่น เวลารับฟังเรื่องทะเลาะ จะไม่เข้าข้างใคร แต่ช่วยหาข้อเท็จจริง', 'e.g. Hearing both sides of an argument, you stay neutral and find facts.', 'z.B. Sie bleiben neutral bei Konflikten und suchen nach Fakten.')
        },
        { 
          tag: t('Originality', 'Originality', 'Originalität'),
          label: t('จะไม่ทำอะไรเดิมๆ ซ้ำซาก ต้องมีมุมมองใหม่เสมอ', 'Never be repetitive. Must always offer a fresh and creative angle.', 'Niemals repetitiv sein. Immer einen frischen Ansatz bieten.'), 
          nextId: 'END',
          example: t('เช่น ถ้าใครทำอะไรแบบเดิมๆ จะมองหาวิธีใหม่ที่ไม่เหมือนใคร', 'e.g. When everyone does it the same way, you look for a unique approach.', 'z.B. Wenn alle es gleich machen, suchen Sie nach einem einzigartigen Ansatz.')
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
          nextId: 'a_perception_system',
          example: t('เช่น เวลาเจอปัญหาน้ำท่วม จะไม่ดูแค่ระดับน้ำแต่จะไปดูโครงสร้างระบบระบายน้ำทั้งเมือง', 'e.g. When facing flooding, you investigate the entire drainage system, not just the water level.', 'z.B. Bei Hochwasser prüfen Sie das gesamte Entwässerungssystem, nicht nur den Wasserstand.')
        },
        { 
          tag: t('Pragmatist', 'Pragmatist', 'Pragmatiker'),
          label: t('มองหาวิธีการแก้ปัญหาที่ทำได้จริงและเห็นผลทันที', 'Focus on immediate, actionable, and practical problem-solving.', 'Fokus auf sofortige, umsetzbare und praktische Problemlösung.'), 
          nextId: 'a_perception_pragmatic',
          example: t('เช่น รถเสียกลางทาง จะไม่นั่งอ่านคู่มือ แต่จะหาอู่ซ่อมที่ใกล้ที่สุดทันที', 'e.g. Car breaks down — you skip the manual and call the nearest mechanic immediately.', 'z.B. Auto kaputt — Sie überspringen das Handbuch und rufen sofort den nächsten Mechaniker.')
        },
        { 
          tag: t('Analyst', 'Analyst', 'Analytiker'),
          label: t('เน้นตรวจสอบรายละเอียด ค้นหาช่องโหว่และข้อผิดพลาด', 'Focus on inspection, deep analysis, and finding flaws.', 'Fokus auf Inspektion, tiefe Analyse und das Finden von Fehlern.'), 
          nextId: 'a_perception_critical',
          example: t('เช่น เวลารีวิวโค้ด จะหาบั๊กที่ซ่อนอยู่และจุดอ่อนที่คนอื่นมองข้าม', 'e.g. Code review — you find hidden bugs and weaknesses others miss.', 'z.B. Code-Review — Sie finden versteckte Bugs, die andere übersehen.')
        },
        { 
          tag: t('Visionary', 'Visionary', 'Visionär'),
          label: t('มองข้ามขีดจำกัดปัจจุบัน พุ่งเป้าไปที่ความเป็นไปได้ใหม่ๆ', 'Look past current constraints, aiming for future possibilities.', 'Über aktuelle Grenzen hinausblicken, neue Möglichkeiten anstreben.'), 
          nextId: 'a_perception_creative',
          example: t('เช่น คิดว่า AI จะเปลี่ยนแปลงอุตสาหกรรมยังไงในอีก 5 ปี', 'e.g. Thinking about how AI will transform the industry in 5 years.', 'z.B. Nachdenken, wie KI die Industrie in 5 Jahren verändern wird.')
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
          nextId: 'a_agency',
          example: t('เช่น จัดหมวดหมู่อาหารทั้งหมดในร้านเป็นกริดชัดเจน', 'e.g. Organizing all restaurant menu items into a clear grid.', 'z.B. Alle Restaurantmenüpunkte in einem klaren Raster organisieren.')
        },
        { 
          tag: t('Cause & Effect', 'Cause & Effect', 'Ursache & Wirkung'),
          label: t('วิเคราะห์ความสัมพันธ์เชิงเหตุและผลเชิงลึกของแต่ละส่วน', 'Analyze deep cause-and-effect relationships between all parts.', 'Ursache-Wirkungs-Beziehungen zwischen allen Teilen analysieren.'), 
          nextId: 'a_agency',
          example: t('เช่น วิเคราะห์ว่าทำไมลูกค้าเลิกใช้บริการ โดยดูจากหลายปัจจัย', 'e.g. Analyzing why customers churn by examining multiple factors.', 'z.B. Analysieren, warum Kunden abwandern, durch mehrere Faktoren.')
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
          nextId: 'a_agency',
          example: t('เช่น สรุปเมนูอาหารเป็น 3 ตัวเลือกพร้อมสั่งได้เลย ไม่ต้องอ่านยาว', 'e.g. Summarizing a menu into 3 pickable options, no long descriptions.', 'z.B. Speisekarte in 3 wählbare Optionen zusammenfassen.')
        },
        { 
          tag: t('No-Fluff', 'No-Fluff', 'Direkt'),
          label: t('ข้ามการอารัมภบทหรือความสุภาพที่ยาวเกินไป เน้นความกระชับ', 'Skip wordy introductions or unnecessary politeness. Concise only.', 'Lange Einleitungen überspringen. Nur das Wesentliche.'), 
          nextId: 'a_agency',
          example: t('เช่น ตอบคำถามด้วยคำตอบสั้นๆ ตรงประเด็น ไม่ต้องมีคำนำ', 'e.g. Answering questions directly, no introductions needed.', 'z.B. Fragen direkt beantworten, keine Einleitungen nötig.')
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
          nextId: 'a_agency',
          example: t('เช่น วางแผนสำรองกรณีเซิร์ฟเวอร์ล่ม 3 ชั้น', 'e.g. Planning 3 layers of backup in case the server crashes.', 'z.B. 3 Backup-Schichten planen, falls der Server abstürzt.')
        },
        { 
          tag: t('Logic Audit', 'Logic Audit', 'Logik-Audit'),
          label: t('ตรวจสอบความถูกต้องของตรรกะและข้อเท็จจริงอย่างเข้มงวด', 'Performs brutal fact-checking and logic audits on everything.', 'Faktenprüfung und Logik-Audits bei allem durchführen.'), 
          nextId: 'a_agency',
          example: t('เช่น เวลาอ่านบทความ จะเช็กว่าข้อสรุปสอดคล้องกับหลักฐานไหม', 'e.g. Reading an article, you check if the conclusion follows from the evidence.', 'z.B. Beim Lesen eines Artikels prüfen Sie, ob die Schlussfolgerung zu den Beweisen passt.')
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
          nextId: 'a_agency',
          example: t('เช่น อธิบาย Machine Learning ด้วยการเปรียบเทียบกับการเรียนรู้ขี่จักรยาน', 'e.g. Explaining ML by comparing it to learning to ride a bicycle.', 'z.B. ML erklären durch den Vergleich mit dem Fahrradfahren lernen.')
        },
        { 
          tag: t('Divergent Thinking', 'Divergent Thinking', 'Divergentes Denken'),
          label: t('เสนอทางเลือกที่แหวกแนวและไม่ถูกจำกัดด้วยกรอบเดิมๆ', 'Offer unconventional options, free from standard constraints.', 'Unkonventionelle Optionen anbieten, frei von Standards.'), 
          nextId: 'a_agency',
          example: t('เช่น ถามว่า "ถ้าเราไม่มีงบเลย จะทำโปรเจกต์นี้ได้ไหม?"', 'e.g. Asking "What if we had zero budget — could we still do this project?"', 'z.B. Fragen: "Was wenn wir null Budget hätten — könnten wir das Projekt trotzdem machen?"')
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
          nextId: 'a_taste',
          example: t('เช่น รอให้มนุษย์สั่ง "สร้างรายงาน" แล้วทำตามเท่านั้น ไม่ทำเกินหน้าที่', 'e.g. Wait for human to say "create report", then do exactly that, nothing more.', 'z.B. Warten bis Mensch "Bericht erstellen" sagt, dann genau das tun.')
        },
        { 
          tag: t('Decision Support', 'Decision Support', 'Entscheidungsunterstützung'),
          label: t('วิเคราะห์และเสนอทางเลือกให้มนุษย์เป็นคนเลือกขั้นสุดท้าย', 'Analyze and suggest options, but let the human decide.', 'Optionen analysieren und vorschlagen, aber den Menschen entscheiden lassen.'), 
          nextId: 'a_taste',
          example: t('เช่น ซื้อโทรศัพท์ใหม่ จะเปรียบเทียบสเปคทุกรุ่นก่อนตัดสินใจ', 'e.g. Buying a phone, you compare specs of every model before choosing.', 'z.B. Beim Telefonkauf vergleichen Sie die Specs aller Modelle vor der Entscheidung.')
        },
        { 
          tag: t('Autonomous', 'Autonomous', 'Autonom'),
          label: t('ตัดสินใจและวางแผนดำเนินการล่วงหน้าให้โดยอัตโนมัติ', 'Plan, decide, and act independently ahead of time.', 'Vorausplanen, entscheiden und unabhängig handeln.'), 
          nextId: 'a_taste',
          example: t('เช่น ตรวจพบปัญหาแล้วแก้ไขเองโดยไม่ต้องรอให้มนุษย์สั่ง', 'e.g. Detecting an issue and fixing it without waiting for a human command.', 'z.B. Ein Problem erkennen und beheben ohne auf menschlichen Befehl zu warten.')
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
          nextId: 'a_persuasion_tech',
          example: t('เช่น ตอบคำถามด้วยโค้ดตัวอย่างและ API reference แทนคำอธิบายยาวๆ', 'e.g. Answering with code snippets and API refs instead of long prose.', 'z.B. Antworten mit Code-Snippets und API-Refs statt langem Text.')
        },
        { 
          tag: t('Corporate', 'Corporate', 'Geschäftlich'),
          label: t('ภาษาสุภาพ เป็นทางการ เหมาะสำหรับการสื่อสารในองค์กร', 'Polite, formal, and professional for enterprise environments.', 'Höflich, formell und professionell für Unternehmen.'), 
          nextId: 'a_persuasion_corp',
          example: t('เช่น เขียนอีเมลด้วยภาษาทางการ "เรียน คุณ..." และปิดท้ายด้วย "ขอแสดงความนับถือ"', 'e.g. Writing emails with formal language: "Dear Sir/Madam" and proper closing.', 'z.B. E-Mails mit formeller Sprache schreiben: "Sehr geehrte/r..."')
        },
        { 
          tag: t('Conversational', 'Conversational', 'Zwanglos'),
          label: t('ภาษาเป็นกันเอง คุยง่าย เหมือนได้ปรึกษากับที่ปรึกษาส่วนตัว', 'Natural, conversational, and friendly, like a personal coach.', 'Natürlich, zwanglos und freundlich, wie ein Coach.'), 
          nextId: 'a_persuasion_conv',
          example: t('เช่น ตอบคำถามเหมือนเป็นเพื่อนคุย "เออ ไอเดียนี้ดีนะ ลองดูสิ..."', 'e.g. Responding like a friend: "Yeah, that\'s a great idea! How about..."', 'z.B. Antworten wie ein Freund: "Ja, tolle Idee! Wie wäre es mit..."')
        },
        { 
          tag: t('Creative', 'Creative', 'Kreativ'),
          label: t('ใช้ภาษาเชิงศิลป์ เปรียบเทียบเก่ง และสร้างแรงบันดาลใจ', 'Artistic, metaphorical, and inspiring language.', 'Künstlerische, metaphorische und inspirierende Sprache.'), 
          nextId: 'a_persuasion_creative',
          example: t('เช่น อธิบายการตลาดดิจิทัลผ่านบทกวีหรือนิทาน', 'e.g. Explaining digital marketing through poetry or a story.', 'z.B. Digitales Marketing durch Poesie oder eine Geschichte erklären.')
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
          nextId: 'a_capability',
          example: t('เช่น จัดเอกสารเป็นตาราง โค้ด และขั้นตอนที่อ่านง่าย', 'e.g. Organizing docs as tables, code blocks, and step-by-step guides.', 'z.B. Dokumente als Tabellen, Code-Blöcke und Schritt-für-Schritt-Anleitungen.')
        },
        { 
          tag: t('References', 'References', 'Referenzen'),
          label: t('เน้นอ้างอิงจาก Documentation, API หรือมาตรฐานที่ยอมรับ', 'Citing official documentation, API references, or standards.', 'Zitieren von Dokumentationen, API-Referenzen oder Standards.'), 
          nextId: 'a_capability',
          example: t('เช่น อ้างอิงทุกคำตอบจาก official docs พร้อมลิงก์', 'e.g. Citing official docs with links for every answer.', 'z.B. Offizielle Dokus mit Links für jede Antwort zitieren.')
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
          nextId: 'a_capability',
          example: t('เช่น แสดงว่าลงทุน 1 ล้านแต่ประหยัดได้ 3 ล้านต่อปี', 'e.g. Showing a 1M investment saves 3M per year.', 'z.B. Zeigen, dass 1M Investition 3M pro Jahr spart.')
        },
        { 
          tag: t('Compliance', 'Compliance', 'Compliance'),
          label: t('เน้นความสอดคล้องกับกลยุทธ์องค์กรและมาตรฐานที่กำหนด', 'Focus on strategic alignment and strict compliance.', 'Fokus auf strategische Ausrichtung und Compliance.'), 
          nextId: 'a_capability',
          example: t('เช่น ตรวจสอบว่าทุกขั้นตอนสอดคล้องกับนโยบายบริษัท', 'e.g. Verifying every step complies with company policy.', 'z.B. Jeden Schritt auf Unternehmensrichtlinien-Konformität prüfen.')
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
          nextId: 'a_capability',
          example: t('เช่น ถามกลับว่า "คุณคิดว่าทำไมมันถึงเป็นแบบนี้?" แทนที่จะตอบตรงๆ', 'e.g. Asking back "Why do you think that is?" instead of answering directly.', 'z.B. Zurückfragen "Warum denken Sie, ist das so?" statt direkt zu antworten.')
        },
        { 
          tag: t('Deep Empathy', 'Deep Empathy', 'Tiefe Empathie'),
          label: t('ใช้วิธีสะท้อนความรู้สึกและรับฟังความต้องการอย่างลึกซึ้ง', 'Employ active listening and deeply validate user needs.', 'Aktives Zuhören und Validierung der Nutzerbedürfnisse.'), 
          nextId: 'a_capability',
          example: t('เช่น บอกว่า "เข้าใจความรู้สึกนั้น เป็นเรื่องปกติที่จะกังวล"', 'e.g. Saying "I understand that feeling. It\'s normal to be concerned."', 'z.B. Sagen "Ich verstehe dieses Gefühl. Es ist normal, besorgt zu sein."')
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
          nextId: 'a_capability',
          example: t('เช่น อธิบายแบรนด์ด้วยภาพ "เหมือนพระอาทิตย์ขึ้นที่สดใสในวันใหม่"', 'e.g. Describing a brand as "like a bright sunrise on a new day".', 'z.B. Eine Marke beschreiben als "wie ein heller Sonnenaufgang an einem neuen Tag".')
        },
        { 
          tag: t('Emotional Peaks', 'Emotional Peaks', 'Emotionale Spitzen'),
          label: t('การเล่นกับจังหวะจะโคนและการขยี้ประเด็นให้ถึงอารมณ์', 'Mastering pacing, rhythm, and hitting emotional peaks.', 'Meisterung von Rhythmus und emotionalen Höhepunkten.'), 
          nextId: 'a_capability',
          example: t('เช่น เล่าเรื่องจนถึงจุดสูงสุดแล้วหยุดให้คนดูตื่นเต้น', 'e.g. Building a story to a peak moment, then pausing for impact.', 'z.B. Eine Geschichte zum Höhepunkt aufbauen, dann für Wirkung pausieren.')
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
          nextId: 'END',
          example: t('เช่น ปฏิเสธคำขอ "ช่วย hack รหัสผ่าน" ทันทีโดยไม่มีข้อยกเว้น', 'e.g. Refusing "hack this password" requests immediately, no exceptions.', 'z.B. "Hacke dieses Passwort" Anfragen sofort ablehnen, keine Ausnahmen.')
        },
        { 
          tag: t('Source Only', 'Source Only', 'Nur Quellen'),
          label: t('ห้ามเดาเด็ดขาด ต้องตอบจากข้อมูลที่กำหนดให้เท่านั้น', 'No guessing. Must reference provided source data only.', 'Kein Raten. Nur bereitgestellte Daten referenzieren.'), 
          nextId: 'END',
          example: t('เช่น ตอบเฉพาะจากเอกสารที่ให้มา ถ้าไม่มีจะบอกว่าไม่มีข้อมูล', 'e.g. Answering only from provided documents; if not found, saying so.', 'z.B. Nur aus bereitgestellten Dokumenten antworten; sonst Bescheid geben.')
        },
        { 
          tag: t('Role Lock', 'Role Lock', 'Rollenbindung'),
          label: t('ห้ามหลุดจากบทบาทที่ได้รับมอบหมายไม่ว่าจะเกิดอะไรขึ้น', 'Never break character or move outside the assigned role.', 'Niemals den Charakter oder die Rolle verlassen.'), 
          nextId: 'END',
          example: t('เช่น ถูกถามเรื่องการเมือง จะปฏิเสธเพราะไม่ใช่หน้าที่ของตัวเอง', 'e.g. Asked about politics — you refuse because it\'s outside your role.', 'z.B. Nach Politik gefragt — Sie lehnen ab, da es außerhalb Ihrer Rolle ist.')
        },
        { 
          tag: t('Strict Format', 'Strict Format', 'Striktes Format'),
          label: t('ต้องตอบกลับตามรูปแบบที่กำหนดไว้เป๊ะๆ เท่านั้น', 'Output ONLY in the exact specified format (e.g. JSON only).', 'Nur im exakt vorgegebenen Format antworten.'), 
          nextId: 'END',
          example: t('เช่น ต้องตอบเป็น JSON เท่านั้น ถ้าผิด format จะถูกปฏิเสธ', 'e.g. Must output JSON only — wrong format means automatic rejection.', 'z.B. Muss nur JSON ausgeben — falsches Format bedeutet automatische Ablehnung.')
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
