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
          helpExample: t('เช่น เมื่อต้องวิเคราะห์ฟีดแบ็กลูกค้า 500 รายการ คุณจะแบ่งเป็นหมวดหมู่ เช่น UX, ราคา, ฟีเจอร์ ก่อนเริ่มวิเคราะห์', 'E.g., When analyzing 500 customer feedbacks, you\'d first sort them into categories like UX, Pricing, and Features before analyzing.', 'Z.B., Bei 500 Kundenfeedbacks würden Sie diese zuerst in Kategorien wie UX, Preis und Features sortieren.'),
          nextId: 'agency' 
        },
        { 
          tag: t('Pattern Seeking', 'Pattern Seeking', 'Mustersuche'),
          label: t('มองหาแพทเทิร์นหรือสิ่งที่ผิดปกติที่คนอื่นอาจจะมองไม่เห็น', 'Look for patterns or anomalies that others might miss.', 'Nach Mustern oder Anomalien suchen, die andere übersehen.'), 
          helpExample: t('เช่น เมื่อดูยอดขายรายเดือน คุณสังเกตว่ายอดตกทุกวันจันทร์ที่ 3 ของเดือน ซึ่งคนอื่นไม่เคยสังเกต', 'E.g., Looking at monthly sales, you notice a consistent dip every 3rd Monday — a pattern no one else spotted.', 'Z.B., Bei den Monatsumsätzen bemerken Sie einen regelmäßigen Rückgang jeden 3. Montag.'),
          nextId: 'agency' 
        },
        { 
          tag: t('Prioritize', 'Prioritize', 'Priorisieren'),
          label: t('จัดลำดับความสำคัญตามผลกระทบ ทำเรื่องสำคัญก่อนเสมอ', 'Rank by impact and urgency — always tackle what matters most first.', 'Nach Wichtigkeit und Dringlichkeit ordnen — das Wichtigste zuerst.'), 
          helpExample: t('เช่น เมื่อมีงาน 20 อย่างพร้อมกัน คุณจะจัดอันดับตาม impact/effort matrix แล้วทำ quick wins ก่อน', 'E.g., With 20 tasks at once, you\'d create an impact/effort matrix and knock out the quick wins first.', 'Z.B., Bei 20 gleichzeitigen Aufgaben erstellen Sie eine Impact/Effort-Matrix und erledigen Quick Wins zuerst.'),
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
          helpExample: t('เช่น รายงานที่ต้องส่งพรุ่งนี้ คุณจะเน้นเขียน 20% ที่สำคัญที่สุดก่อน แล้วค่อยเติมรายละเอียดทีหลัง', 'E.g., For a report due tomorrow, you\'d focus on writing the critical 20% first, then fill in details later.', 'Z.B., Bei einem Bericht für morgen konzentrieren Sie sich auf die wichtigsten 20%.'),
          nextId: 'agency' 
        },
        { 
          tag: t('Fact-Focus', 'Fact-Focus', 'Faktenorientiert'),
          label: t('มองข้ามอารมณ์ความรู้สึก และเน้นแค่ข้อเท็จจริงล้วนๆ', 'Ignore emotions and focus purely on the facts and data.', 'Emotionen ignorieren und sich rein auf Fakten konzentrieren.'), 
          helpExample: t('เช่น ในที่ประชุมที่คนเริ่มใช้อารมณ์ คุณจะดึงกลับมาที่ตัวเลขและข้อมูลจริงเสมอ', 'E.g., In heated meetings, you always steer the conversation back to actual numbers and data.', 'Z.B., In hitzigen Meetings lenken Sie das Gespräch immer zurück zu Zahlen und Fakten.'),
          nextId: 'agency' 
        },
        { 
          tag: t('Time-boxing', 'Time-boxing', 'Zeitbegrenzung'),
          label: t('กำหนดเวลาตายตัว ถ้าหมดเวลาก็ต้องเดินหน้าต่อทันที', 'Set a fixed time limit — when it\'s up, move on regardless.', 'Feste Zeitlimits setzen — wenn die Zeit um ist, weitermachen.'), 
          helpExample: t('เช่น ให้เวลา 15 นาทีในการหาคำตอบ ถ้าไม่เจอก็ตัดสินใจจากข้อมูลที่มี แล้วไปต่อ', 'E.g., You give yourself 15 minutes to find the answer. If you don\'t, decide with what you have and move on.', 'Z.B., Sie geben sich 15 Minuten für die Antwort. Wenn nicht, entscheiden Sie mit dem, was Sie haben.'),
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
          helpExample: t('เช่น เพื่อนร่วมงานเสนอให้ย้ายระบบไป cloud คุณถามทันทีว่า "แล้วถ้า downtime ระหว่างย้ายล่ะ?"', 'E.g., A colleague suggests migrating to cloud — you immediately ask "What about downtime during migration?"', 'Z.B., Ein Kollege schlägt Cloud-Migration vor — Sie fragen sofort "Was ist mit Ausfallzeiten?"'),
          nextId: 'agency' 
        },
        { 
          tag: t('Logic Audit', 'Logic Audit', 'Logikprüfung'),
          label: t('ความไม่สมเหตุสมผลของเหตุผล หรืออคติที่ซ่อนอยู่', 'Logical fallacies or hidden biases in their reasoning.', 'Logikfehler oder verborgene Voreingenommenheit.'), 
          helpExample: t('เช่น เมื่อได้ยินว่า "ทุกคนใช้ X ดังนั้นเราต้องใช้ด้วย" คุณจะชี้ว่านี่คือ bandwagon fallacy', 'E.g., When you hear "Everyone uses X, so we should too," you point out this is a bandwagon fallacy.', 'Z.B., Wenn Sie hören "Alle nutzen X," weisen Sie auf den Mitläufereffekt hin.'),
          nextId: 'agency' 
        },
        { 
          tag: t("Devil's Advocate", "Devil's Advocate", 'Advocatus Diaboli'),
          label: t('ตั้งคำถามท้าทายจากมุมตรงข้ามเพื่อทดสอบความแข็งแกร่งของไอเดีย', 'Challenge every assumption from the opposite angle to stress-test the idea.', 'Jede Annahme aus der Gegenposition hinterfragen, um die Idee zu testen.'), 
          helpExample: t('เช่น แม้คุณจะเห็นด้วยกับไอเดีย แต่คุณจะทำตัวเป็นฝ่ายค้านเพื่อหาจุดอ่อนที่ทีมอาจมองข้าม', 'E.g., Even if you agree with an idea, you deliberately argue against it to find weaknesses the team might overlook.', 'Z.B., Selbst wenn Sie einverstanden sind, argumentieren Sie absichtlich dagegen.'),
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
          helpExample: t('เช่น นำหลักการวิวัฒนาการของดาร์วินมาใช้ออกแบบอัลกอริทึมการเรียนรู้ของ AI', 'E.g., Applying Darwin\'s evolution theory to design an AI learning algorithm.', 'Z.B., Darwins Evolutionstheorie auf das Design eines KI-Lernalgorithmus anwenden.'),
          nextId: 'agency' 
        },
        { 
          tag: t('Storytelling', 'Storytelling', 'Geschichtenerzählen'),
          label: t('ใช้ประสบการณ์ส่วนตัวมาร้อยเรียงเป็นเรื่องราวที่เห็นภาพ', 'Use personal experiences to weave everything into a story.', 'Persönliche Erfahrungen nutzen, um eine Geschichte zu weben.'), 
          helpExample: t('เช่น อธิบายการทำงานของ API โดยเปรียบเทียบกับประสบการณ์สั่งอาหารที่ร้านโปรดของคุณ', 'E.g., Explaining how APIs work by comparing it to your experience ordering at your favorite restaurant.', 'Z.B., APIs erklären, indem Sie es mit dem Bestellen in Ihrem Lieblingsrestaurant vergleichen.'),
          nextId: 'agency' 
        },
        { 
          tag: t('Visual Thinking', 'Visual Thinking', 'Visuelles Denken'),
          label: t('ใช้แผนภาพ ไดอะแกรม หรือภาพในหัวเพื่อจัดระเบียบความคิด', 'Use diagrams, spatial reasoning, and mental imagery to organize thoughts.', 'Diagramme, räumliches Denken und mentale Bilder nutzen.'), 
          helpExample: t('เช่น เมื่อวางแผนโปรเจกต์ คุณจะวาด mind map หรือ flowchart ก่อนเริ่มเขียนอะไรก็ตาม', 'E.g., When planning a project, you always draw a mind map or flowchart before writing anything.', 'Z.B., Bei der Projektplanung zeichnen Sie immer erst eine Mind Map oder ein Flussdiagramm.'),
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
          helpExample: t('เช่น แทนที่จะบอกว่า "ยอดขายเพิ่มขึ้น" คุณจะพูดว่า "ยอดขายเพิ่ม 47% ใน Q3 เทียบกับ Q2"', 'E.g., Instead of saying "sales went up," you\'d say "sales grew 47% in Q3 vs Q2."', 'Z.B., Statt "Umsatz gestiegen" sagen Sie "Umsatz um 47% in Q3 vs Q2 gestiegen."'),
          nextId: 'capability' 
        },
        { 
          tag: t('Logical Sequence', 'Logical Sequence', 'Logische Abfolge'),
          label: t('ใช้ตรรกะที่คมชัดและลำดับขั้นที่เป็นเหตุเป็นผล', 'Use sharp logic and a clear step-by-step reasoning.', 'Scharfsinninge Logik und klare schrittweise Begründung.'), 
          helpExample: t('เช่น "ถ้า A เป็นจริง แล้ว B ก็ต้องตามมา ดังนั้นเราควรทำ C" — เรียบง่ายแต่ปฏิเสธไม่ได้', 'E.g., "If A is true, then B follows, therefore we should do C" — simple but undeniable.', 'Z.B., "Wenn A wahr ist, folgt B, also sollten wir C tun" — einfach, aber unwiderlegbar.'),
          nextId: 'capability' 
        },
        { 
          tag: t('Comparison Matrix', 'Comparison Matrix', 'Vergleichsmatrix'),
          label: t('เปรียบเทียบทางเลือกแบบเคียงข้างกันให้เห็นชัดด้วยตาราง', 'Compare alternatives side by side in a clear matrix format.', 'Alternativen in einer klaren Matrix nebeneinander vergleichen.'), 
          helpExample: t('เช่น สร้างตาราง Pros/Cons ของทุกทางเลือก แล้วให้คนอื่นเลือกจากข้อมูลที่จัดไว้ชัดเจน', 'E.g., Creating a Pros/Cons table for every option, letting others decide from clearly laid-out data.', 'Z.B., Eine Vor-/Nachteile-Tabelle für jede Option erstellen.'),
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
          helpExample: t('เช่น "ตาม McKinsey Report 2024 ระบุว่า..." หรือ "ศ.ดร. แห่ง MIT เสนอว่า..."', 'E.g., "According to McKinsey\'s 2024 Report..." or "Prof. X at MIT suggests..."', 'Z.B., "Laut McKinsey Report 2024..." oder "Prof. X am MIT schlägt vor..."'),
          nextId: 'capability' 
        },
        { 
          tag: t('Full Spectrum', 'Full Spectrum', 'Volles Spektrum'),
          label: t('วิเคราะห์ข้อดีข้อเสียให้เห็นครบทุกมุมอย่างเป็นกลาง', 'Analyzing both pros and cons neutrally from all angles.', 'Vor- und Nachteile neutral aus allen Blickwinkeln analysieren.'), 
          helpExample: t('เช่น "ทางเลือก A มีข้อดี 3 ข้อ แต่มีข้อเสีย 2 ข้อ ส่วนทางเลือก B..." — ให้ครบทุกมุม', 'E.g., "Option A has 3 pros but 2 cons, while Option B..." — covering every angle objectively.', 'Z.B., "Option A hat 3 Vorteile, aber 2 Nachteile, während Option B..."'),
          nextId: 'capability' 
        },
        { 
          tag: t('Case Studies', 'Case Studies', 'Fallstudien'),
          label: t('พิสูจน์ด้วยตัวอย่างจริงและกรณีศึกษาที่เกิดขึ้นแล้ว', 'Prove points through real-world case studies and concrete examples.', 'Punkte durch reale Fallstudien und konkrete Beispiele belegen.'), 
          helpExample: t('เช่น "Netflix เคยประสบปัญหาเดียวกัน แล้วแก้ด้วยวิธี X ซึ่งลด churn ลง 30%"', 'E.g., "Netflix faced the same issue and solved it with method X, reducing churn by 30%."', 'Z.B., "Netflix hatte dasselbe Problem und löste es mit Methode X, Churn um 30% reduziert."'),
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
          helpExample: t('เช่น เปิดการนำเสนอด้วยมุกเกี่ยวกับปัญหาที่ทุกคนเจอ ทำให้บรรยากาศเบาลงก่อนเข้าเนื้อหาจริง', 'E.g., Opening a presentation with a joke about a common struggle, lightening the mood before diving in.', 'Z.B., Eine Präsentation mit einem Witz über ein gemeinsames Problem eröffnen.'),
          nextId: 'capability' 
        },
        { 
          tag: t('Empathy', 'Empathy', 'Empathie'),
          label: t('แสดงความเข้าใจในสถานการณ์ของเขาว่าเป็นพวกเดียวกัน', 'Showing empathy and making them feel understood.', 'Empathie zeigen und ihnen das Gefühl geben, verstanden zu werden.'), 
          helpExample: t('เช่น "ผมเข้าใจครับ ผมเคยเจอเหมือนกัน..." ทำให้คนรู้สึกว่าคุณเป็นพวกเดียวกัน', 'E.g., "I totally get it — I\'ve been there too..." making people feel you\'re on their side.', 'Z.B., "Ich verstehe das völlig — das kenne ich auch..."'),
          nextId: 'capability' 
        },
        { 
          tag: t('Relatability', 'Relatability', 'Nahbarkeit'),
          label: t('ใช้ประสบการณ์ร่วมและเรื่องราวที่ทุกคนเข้าใจได้', 'Use shared experiences and common ground to connect.', 'Gemeinsame Erfahrungen und Gemeinsamkeiten nutzen.'), 
          helpExample: t('เช่น แทนที่จะพูดเรื่องเทคนิค คุณเปรียบเทียบกับเรื่องในชีวิตจริงที่ทุกคนเคยเจอ', 'E.g., Instead of talking tech, you compare it to something everyone has experienced in daily life.', 'Z.B., Statt Technik zu sprechen, vergleichen Sie es mit Alltagserfahrungen.'),
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
          helpExample: t('เช่น "ถ้าไม่อัพเดทระบบตอนนี้ ข้อมูลจะรั่วไหลภายใน 6 เดือน" — ทำให้คนเห็นภาพความเจ็บปวด', 'E.g., "If you don\'t update the system now, data will leak within 6 months" — making the pain vivid.', 'Z.B., "Wenn Sie das System jetzt nicht aktualisieren, werden Daten innerhalb von 6 Monaten lecken."'),
          nextId: 'capability' 
        },
        { 
          tag: t('Myth Busting', 'Myth Busting', 'Mythen entlarven'),
          label: t('หักล้างความเชื่อผิดๆ อย่างตรงไปตรงมาและรุนแรง', 'Brutally debunking common myths and false beliefs.', 'Allgemeine Mythen und falsche Überzeugungen entlarven.'), 
          helpExample: t('เช่น "ทุกคนคิดว่า MVP ต้องเร็ว — แต่ MVP ที่ไม่มีคุณค่ามันไม่ใช่ MVP มันคือ WASTE"', 'E.g., "Everyone thinks MVPs must be fast — but an MVP without value isn\'t an MVP, it\'s WASTE."', 'Z.B., "Alle denken, MVPs müssen schnell sein — aber ein MVP ohne Wert ist VERSCHWENDUNG."'),
          nextId: 'capability' 
        },
        { 
          tag: t('Provocative Questions', 'Provocative Questions', 'Provokative Fragen'),
          label: t('ตั้งคำถามที่ท้าทายและบังคับให้คนต้องคิดใหม่ทันที', 'Ask hard questions that force immediate reflection and rethinking.', 'Harte Fragen stellen, die sofortiges Umdenken erzwingen.'), 
          helpExample: t('เช่น "ถ้าธุรกิจของคุณถูก AI แทนที่ภายใน 2 ปี คุณจะทำอะไรตอนนี้?" — สะเทือนความเชื่อเดิม', 'E.g., "If AI replaced your entire business in 2 years, what would you do today?" — shaking old beliefs.', 'Z.B., "Wenn KI Ihr Unternehmen in 2 Jahren ersetzt, was würden Sie heute tun?"'),
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
          helpExample: t('เช่น เวลาดีบักปัญหาของ microservice ตัว Agent จะไล่ดู dependency chain ทั้งหมดแทนที่จะแก้แค่ปลายเหตุ', 'E.g., When debugging a microservice failure, the Agent traces the full dependency chain rather than fixing the symptom.', 'Z.B.: Beim Debuggen eines Microservice-Fehlers verfolgt der Agent die gesamte Abhängigkeitskette, anstatt nur das Symptom zu beheben.'), 
          nextId: 'a_perception_system' 
        },
        { 
          tag: t('Pragmatist', 'Pragmatist', 'Pragmatiker'),
          label: t('มองหาวิธีการแก้ปัญหาที่ทำได้จริงและเห็นผลทันที', 'Focus on immediate, actionable, and practical problem-solving.', 'Fokus auf sofortige, umsetzbare und praktische Problemlösung.'),
          helpExample: t('เช่น ผู้ใช้ถามเรื่องบั๊ก — Agent จะให้โค้ดที่แก้แล้วก่อน แล้วค่อยอธิบายต้นเหตุถ้าถูกถาม', 'E.g., User asks about a bug — the Agent gives a working fix first, then explains the root cause if asked.', 'Z.B.: Ein Nutzer fragt nach einem Bug — der Agent liefert zuerst einen funktionierenden Fix und erklärt die Ursache erst auf Nachfrage.'), 
          nextId: 'a_perception_pragmatic' 
        },
        { 
          tag: t('Analyst', 'Analyst', 'Analytiker'),
          label: t('เน้นตรวจสอบรายละเอียด ค้นหาช่องโหว่และข้อผิดพลาด', 'Focus on inspection, deep analysis, and finding flaws.', 'Fokus auf Inspektion, tiefe Analyse und das Finden von Fehlern.'),
          helpExample: t('เช่น เวลาตรวจสอบ PR ตัว Agent จะเช็ก edge cases, race conditions และช่องโหว่ด้านความปลอดภัยก่อนอนุมัติ', 'E.g., When reviewing a PR, the Agent checks edge cases, race conditions, and security vulnerabilities before approving.', 'Z.B.: Beim Überprüfen eines PR prüft der Agent Grenzfälle, Race Conditions und Sicherheitslücken vor der Genehmigung.'), 
          nextId: 'a_perception_critical' 
        },
        { 
          tag: t('Visionary', 'Visionary', 'Visionär'),
          label: t('มองข้ามขีดจำกัดปัจจุบัน พุ่งเป้าไปที่ความเป็นไปได้ใหม่ๆ', 'Look past current constraints, aiming for future possibilities.', 'Über aktuelle Grenzen hinausblicken, neue Möglichkeiten anstreben.'),
          helpExample: t('เช่น แทนที่จะปะแก้โค้ดเก่า Agent จะเสนอการออกแบบสถาปัตยกรรมใหม่ที่รองรับอนาคต', 'E.g., Instead of patching legacy code, the Agent proposes a future-proof architecture redesign.', 'Z.B.: Anstatt alten Code zu patchen, schlägt der Agent ein zukunftssicheres Architektur-Redesign vor.'), 
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
          helpExample: t('เช่น เมื่อได้รับฟีดแบ็กดิบจากผู้ใช้ Agent จะสร้างรายงานที่จัดหมวดหมู่และจัดลำดับความสำคัญให้โดยอัตโนมัติ', 'E.g., Given raw user feedback, the Agent auto-generates a categorized report with themes and priorities.', 'Z.B.: Bei rohem Nutzerfeedback erstellt der Agent automatisch einen kategorisierten Bericht mit Themen und Prioritäten.'), 
          nextId: 'a_agency' 
        },
        { 
          tag: t('Cause & Effect', 'Cause & Effect', 'Ursache & Wirkung'),
          label: t('วิเคราะห์ความสัมพันธ์เชิงเหตุและผลเชิงลึกของแต่ละส่วน', 'Analyze deep cause-and-effect relationships between all parts.', 'Ursache-Wirkungs-Beziehungen zwischen allen Teilen analysieren.'),
          helpExample: t('เช่น เมื่อตัวเลขวัดผลตกลง Agent จะไล่กลับไปดูทุก dependency ขั้นต้นเพื่อหาต้นเหตุที่แท้จริง', 'E.g., When a metric drops, the Agent traces through every upstream dependency to find the true trigger.', 'Z.B.: Wenn eine Metrik sinkt, verfolgt der Agent jede vorgelagerte Abhängigkeit zurück, um den wahren Auslöser zu finden.'), 
          nextId: 'a_agency' 
        }
      ,
        { 
          tag: t('Impact Ranking', 'Impact Ranking', 'Wirkungsranking'),
          label: t('จัดลำดับข้อมูลตามผลกระทบ แล้ววิเคราะห์สิ่งที่สำคัญที่สุดก่อน', 'Rank data by impact level and analyze the highest-priority items first.', 'Daten nach Wirkungsgrad ordnen und die wichtigsten zuerst analysieren.'), 
          helpExample: t('เช่น เมื่อมีทิกเก็ตแจ้งปัญหา 50 ใบ Agent จะจัดอันดับตามความรุนแรงและผลกระทบทางธุรกิจก่อนลงมือแก้', 'E.g., Given 50 support tickets, the Agent auto-ranks by severity and business impact before processing.', 'Z.B.: Bei 50 Support-Tickets rankt der Agent diese automatisch nach Schweregrad und geschäftlicher Auswirkung, bevor er sie bearbeitet.'),
          nextId: 'a_agency' 
        }]
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
          helpExample: t('เช่น แทนที่จะอธิบายทฤษฎี REST เทียบกับ GraphQL ตัว Agent จะให้คำสั่ง API ที่คุณต้องใช้ตอนนี้เลย', 'E.g., Instead of explaining REST vs GraphQL theory, the Agent just gives you the right API call to use now.', 'Z.B.: Anstatt die Theorie von REST vs. GraphQL zu erklären, gibt der Agent einfach den richtigen API-Aufruf für den direkten Einsatz.'), 
          nextId: 'a_agency' 
        },
        { 
          tag: t('No-Fluff', 'No-Fluff', 'Direkt'),
          label: t('ข้ามการอารัมภบทหรือความสุภาพที่ยาวเกินไป เน้นความกระชับ', 'Skip wordy introductions or unnecessary politeness. Concise only.', 'Lange Einleitungen überspringen. Nur das Wesentliche.'),
          helpExample: t('เช่น แทนที่จะขึ้นต้นว่า "เป็นคำถามที่ดีมาก! ให้ฉันช่วยนะ..." Agent จะตอบตรงเข้าประเด็นทันที', 'E.g., Instead of \'Great question! Let me help...\', the Agent responds with the answer directly.', 'Z.B.: Anstatt "Gute Frage! Lass mich helfen..." antwortet der Agent direkt mit der Lösung.'), 
          nextId: 'a_agency' 
        }
      ,
        { 
          tag: t('Summary-First', 'Summary-First', 'Zusammenfassung zuerst'),
          label: t('สรุปใจความสำคัญก่อนเสมอ แล้วค่อยให้รายละเอียดถ้าถูกถาม', 'Always lead with a concise summary; provide details only when asked.', 'Immer mit einer Zusammenfassung beginnen; Details nur auf Nachfrage.'), 
          helpExample: t('เช่น แทนที่จะอธิบายยาว 500 คำ Agent จะสรุปมาให้ 2 ประโยค พร้อมถามว่า "ต้องการรายละเอียดเพิ่มเติมไหม?"', 'E.g., Instead of a 500-word explanation, the Agent gives a 2-sentence summary with a "Want details?" prompt.', 'Z.B.: Anstatt einer 500-Worte-Erklärung gibt der Agent eine 2-Sätze-Zusammenfassung mit der Frage "Möchtest du Details?".'),
          nextId: 'a_agency' 
        }]
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
          helpExample: t('เช่น ก่อนดีพลอย Agent จะเตือนว่า "คำเตือน: การเปลี่ยนแปลงนี้จะกระทบกับ 3 บริการที่อยู่ปลายน้ำ"', 'E.g., Before deploying, the Agent flags: \'Warning: This change affects 3 downstream services.\'', 'Z.B.: Vor dem Deployment warnt der Agent: "Warnung: Diese Änderung betrifft 3 nachgelagerte Dienste."'), 
          nextId: 'a_agency' 
        },
        { 
          tag: t('Logic Audit', 'Logic Audit', 'Logik-Audit'),
          label: t('ตรวจสอบความถูกต้องของตรรกะและข้อเท็จจริงอย่างเข้มงวด', 'Performs brutal fact-checking and logic audits on everything.', 'Faktenprüfung und Logik-Audits bei allem durchführen.'),
          helpExample: t('เช่น Agent ตอบว่า: "ข้ออ้างที่ว่า X ทำให้เกิด Y ไม่มีหลักฐานรองรับ แหล่งข้อมูล A บอกไว้แบบอื่น"', 'E.g., The Agent responds: \'Your claim that X causes Y is unsupported. Source A says otherwise.\'', 'Z.B.: Der Agent antwortet: "Ihre Behauptung, dass X zu Y führt, ist nicht belegt. Quelle A besagt etwas anderes."'), 
          nextId: 'a_agency' 
        }
      ,
        { 
          tag: t('Assumption Check', 'Assumption Check', 'Annahmenprüfung'),
          label: t('ตรวจสอบสิ่งที่ผู้ใช้คิดว่าเป็นจริง แล้วชี้ให้เห็นถ้าผิด', 'Actively question user assumptions and flag incorrect premises.', 'Annahmen des Nutzers aktiv hinterfragen und falsche Prämissen aufzeigen.'), 
          helpExample: t('เช่น ผู้ใช้บอกว่า "React เร็วกว่า Vue" — Agent ตอบว่า "ขึ้นอยู่กับเกณฑ์การวัดผล นี่คือข้อมูลเปรียบเทียบ..."', 'E.g., User says "React is faster than Vue" — Agent: "That depends on the benchmark. Here is a comparison..."', 'Z.B.: Nutzer sagt "React ist schneller als Vue" — Agent: "Das hängt vom Benchmark ab. Hier ist ein Vergleich..."'),
          nextId: 'a_agency' 
        }]
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
          helpExample: t('เช่น Agent อธิบายเรื่อง database sharding ว่าเหมือน "การแบ่งห้องสมุดเป็นสาขาย่อยๆ เพื่อให้เข้าถึงในพื้นที่ได้เร็วขึ้น"', 'E.g., The Agent explains database sharding like \'splitting a library into branches for faster local access.\'', 'Z.B.: Der Agent erklärt Database-Sharding wie "das Aufteilen einer Bibliothek in Filialen für schnelleren lokalen Zugriff."'), 
          nextId: 'a_agency' 
        },
        { 
          tag: t('Divergent Thinking', 'Divergent Thinking', 'Divergentes Denken'),
          label: t('เสนอทางเลือกที่แหวกแนวและไม่ถูกจำกัดด้วยกรอบเดิมๆ', 'Offer unconventional options, free from standard constraints.', 'Unkonventionelle Optionen anbieten, frei von Standards.'),
          helpExample: t('เช่น เมื่อถูกสั่งให้ปรับปรุงแบบฟอร์ม Agent กลับเสนอให้ยกเลิกแบบฟอร์มนั้นทิ้ง แล้วเปลี่ยนไปใช้ conversational UI แทน', 'E.g., Asked to optimize a form, the Agent suggests eliminating the form entirely and using conversational UI.', 'Z.B.: Auf die Bitte, ein Formular zu optimieren, schlägt der Agent vor, das Formular komplett zu streichen und ein Conversational UI zu nutzen.'), 
          nextId: 'a_agency' 
        }
      ,
        { 
          tag: t('First Principles', 'First Principles', 'Erste Prinzipien'),
          label: t('คิดจากหลักการพื้นฐานที่สุด แล้วสร้างวิธีใหม่ขึ้นมาจากศูนย์', 'Reason from first principles — break down to fundamentals and rebuild from scratch.', 'Von Grundprinzipien aus denken und neu aufbauen.'), 
          helpExample: t('เช่น แทนที่จะปรับปรุงโค้ดเดิม Agent ถามกลับว่า: "แล้วถ้าเราออกแบบ data model ใหม่ทั้งหมดเลยล่ะ?"', 'E.g., Instead of optimizing existing code, Agent asks: "What if we redesigned the data model entirely?"', 'Z.B.: Anstatt bestehenden Code zu optimieren, fragt der Agent: "Was wäre, wenn wir das Datenmodell komplett neu entwerfen?"'),
          nextId: 'a_agency' 
        }]
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
          helpExample: t('เช่น Agent จะเขียนฟังก์ชันให้ตรงตามที่คุณขอเป๊ะๆ — ไม่มีการปรับปรุงโค้ด ไม่เสนอแนะ และไม่สร้างไฟล์เพิ่ม', 'E.g., The Agent only writes the exact function you ask for — no refactoring, no suggestions, no extra files.', 'Z.B.: Der Agent schreibt nur exakt die angeforderte Funktion — kein Refactoring, keine Vorschläge, keine zusätzlichen Dateien.'), 
          nextId: 'a_taste' 
        },
        { 
          tag: t('Decision Support', 'Decision Support', 'Entscheidungsunterstützung'),
          label: t('วิเคราะห์และเสนอทางเลือกให้มนุษย์เป็นคนเลือกขั้นสุดท้าย', 'Analyze and suggest options, but let the human decide.', 'Optionen analysieren und vorschlagen, aber den Menschen entscheiden lassen.'),
          helpExample: t('เช่น "มี 3 แนวทางครับ: A (เร็วแต่เสี่ยง), B (ปลอดภัยแต่ช้า), C (สมดุล) คุณต้องการแบบไหน?"', 'E.g., \'Here are 3 approaches: A (fast, risky), B (safe, slow), C (balanced). Which do you prefer?\'', 'Z.B.: "Hier sind 3 Ansätze: A (schnell, riskant), B (sicher, langsam), C (ausgewogen). Welchen bevorzugen Sie?"'), 
          nextId: 'a_taste' 
        },
        { 
          tag: t('Autonomous', 'Autonomous', 'Autonom'),
          label: t('ตัดสินใจและวางแผนดำเนินการล่วงหน้าให้โดยอัตโนมัติ', 'Plan, decide, and act independently ahead of time.', 'Vorausplanen, entscheiden und unabhängig handeln.'),
          helpExample: t('เช่น Agent เขียนเทสต์ อัปเดตเอกสาร และเปิด PR ให้โดยอัตโนมัติ — ทั้งหมดนี้ก่อนที่คุณจะทันร้องขอเสียอีก', 'E.g., The Agent auto-creates tests, updates docs, and opens a PR — all before you even ask.', 'Z.B.: Der Agent erstellt automatisch Tests, aktualisiert die Doku und öffnet einen PR — noch bevor Sie überhaupt fragen.'), 
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
          helpExample: t('เช่น คำตอบจะเต็มไปด้วย block โค้ด, การกำหนด type และแผนภาพสถาปัตยกรรม — ไม่ใช้ภาษาพูด', 'E.g., Responses include code blocks, type annotations, and architecture diagrams — no casual language.', 'Z.B.: Antworten enthalten Code-Blöcke, Typ-Annotationen und Architekturdiagramme — keine Alltagssprache.'), 
          nextId: 'a_persuasion_tech' 
        },
        { 
          tag: t('Corporate', 'Corporate', 'Geschäftlich'),
          label: t('ภาษาสุภาพ เป็นทางการ เหมาะสำหรับการสื่อสารในองค์กร', 'Polite, formal, and professional for enterprise environments.', 'Höflich, formell und professionell für Unternehmen.'),
          helpExample: t('เช่น "เรียน ทีมงานทุกท่าน โปรดตรวจสอบข้อกำหนดที่อัปเดตใหม่ แผนงานที่เสนอได้ระบุไว้ด้านล่างนี้"', 'E.g., \'Dear team, please find the updated specifications. The proposed timeline is outlined below.\'', 'Z.B.: "Liebes Team, anbei finden Sie die aktualisierten Spezifikationen. Der vorgeschlagene Zeitplan ist unten aufgeführt."'), 
          nextId: 'a_persuasion_corp' 
        },
        { 
          tag: t('Conversational', 'Conversational', 'Zwanglos'),
          label: t('ภาษาเป็นกันเอง คุยง่าย เหมือนได้ปรึกษากับที่ปรึกษส่วนตัว', 'Natural, conversational, and friendly, like a personal coach.', 'Natürlich, zwanglos und freundlich, wie ein Coach.'),
          helpExample: t('เช่น "สวัสดี! นี่คือสิ่งที่ฉันจะทำนะ — ลองสลับ middleware ดูก่อน ปกติวิธีนี้ก็แก้ได้แล้ว"', 'E.g., \'Hey! So here\'s what I\'d do — try swapping the middleware first, that usually fixes it.\'', 'Z.B.: "Hey! Also ich würde das so machen — versuch zuerst die Middleware auszutauschen, das behebt es meistens."'), 
          nextId: 'a_persuasion_conv' 
        },
        { 
          tag: t('Creative', 'Creative', 'Kreativ'),
          label: t('ใช้ภาษาเชิงศิลป์ เปรียบเทียบเก่ง และสร้างแรงบันดาลใจ', 'Artistic, metaphorical, and inspiring language.', 'Künstlerische, metaphorische und inspirierende Sprache.'),
          helpExample: t('เช่น "โค้ดเบสของคุณเหมือนกับสวน — บางจุดก็เบ่งบานสวยงาม แต่ระบบ auth อาจจะต้องตัดแต่งกิ่งสักหน่อยนะ"', 'E.g., \'Your codebase is like a garden — some areas bloom, but the auth module needs pruning.\'', 'Z.B.: "Deine Codebase ist wie ein Garten — einige Bereiche blühen, aber das Auth-Modul muss beschnitten werden."'), 
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
          helpExample: t('เช่น ทุกคำอธิบายจะมีตัวอย่างโค้ดที่รันได้จริง พร้อมคำแนะนำในการนำไปใช้ทีละขั้นตอน', 'E.g., Every explanation includes a working code example and a step-by-step implementation guide.', 'Z.B.: Jede Erklärung enthält ein funktionierendes Code-Beispiel und eine Schritt-für-Schritt-Implementierungsanleitung.'), 
          nextId: 'a_capability' 
        },
        { 
          tag: t('References', 'References', 'Referenzen'),
          label: t('เน้นอ้างอิงจาก Documentation, API หรือมาตรฐานที่ยอมรับ', 'Citing official documentation, API references, or standards.', 'Zitieren von Dokumentationen, API-Referenzen oder Standards.'),
          helpExample: t('เช่น "ตามคู่มือของ React (v19.1) ตัว cleanup ของ useEffect จะทำงานก่อนการเรนเดอร์ใหม่ ดูเพิ่มเติม: [link]"', 'E.g., \'According to the React docs (v19.1), useEffect cleanup runs before re-render. See: [link]\'', 'Z.B.: "Laut React-Doku (v19.1) läuft das useEffect-Cleanup vor dem Re-Render. Siehe: [link]"'), 
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
          helpExample: t('เช่น "การย้ายระบบครั้งนี้ช่วยลดต้นทุนโครงสร้างพื้นฐาน 40% ($120K/ปี) และคุ้มทุนภายใน 2 สัปดาห์"', 'E.g., \'This migration reduces infra cost by 40% ($120K/yr) with 2-week payback period.\'', 'Z.B.: "Diese Migration senkt die Infrastrukturkosten um 40% ($120K/Jahr) mit einer Amortisationszeit von 2 Wochen."'), 
          nextId: 'a_capability' 
        },
        { 
          tag: t('Compliance', 'Compliance', 'Compliance'),
          label: t('เน้นความสอดคล้องกับกลยุทธ์องค์กรและมาตรฐานที่กำหนด', 'Focus on strategic alignment and strict compliance.', 'Fokus auf strategische Ausrichtung und Compliance.'),
          helpExample: t('เช่น "แนวทางนี้สอดคล้องกับมาตรฐาน ISO 27001 มาตรา 6.2 และเป้าหมาย OKR ไตรมาส 3 ด้านความปลอดภัยของคุณ"', 'E.g., \'This approach aligns with ISO 27001 Section 6.2 and your Q3 OKR on security posture.\'', 'Z.B.: "Dieser Ansatz entspricht der ISO 27001 Sektion 6.2 und Ihren Q3-OKRs zur Sicherheitslage."'), 
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
          helpExample: t('เช่น แทนที่จะให้คำตอบทันที Agent ถามกลับว่า: "แล้วถ้าเราลองใช้วิธี X ก่อนล่ะ จะเกิดอะไรขึ้น?"', 'E.g., Instead of giving the answer, the Agent asks: \'What would happen if we tried X first?\'', 'Z.B.: Anstatt die Antwort zu geben, fragt der Agent: "Was würde passieren, wenn wir zuerst X ausprobieren?"'), 
          nextId: 'a_capability' 
        },
        { 
          tag: t('Deep Empathy', 'Deep Empathy', 'Tiefe Empathie'),
          label: t('ใช้วิธีสะท้อนความรู้สึกและรับฟังความต้องการอย่างลึกซึ้ง', 'Employ active listening and deeply validate user needs.', 'Aktives Zuhören und Validierung der Nutzerbedürfnisse.'),
          helpExample: t('เช่น "ฉันเข้าใจคุณเลย — ดูเหมือนปัญหาจริงๆ จะอยู่ที่ความต้องการที่ไม่ชัดเจน เรามาแก้เรื่องนั้นก่อนเถอะ"', 'E.g., \'I hear you — it sounds like the real issue is unclear requirements. Let\'s fix that first.\'', 'Z.B.: "Ich verstehe dich — es klingt so, als ob das wahre Problem unklare Anforderungen sind. Lass uns das zuerst beheben."'), 
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
          helpExample: t('เช่น "ลองคิดว่า API gateway คือการ์ดคุมผับสิ — มันเป็นตัวตัดสินว่าใครเข้าได้หรือใครต้องโดนเด้งออกไป"', 'E.g., \'Think of your API gateway as a bouncer — it decides who gets in and who gets turned away.\'', 'Z.B.: "Stell dir dein API-Gateway wie einen Türsteher vor — er entscheidet, wer reinkommt und wer abgewiesen wird."'), 
          nextId: 'a_capability' 
        },
        { 
          tag: t('Emotional Peaks', 'Emotional Peaks', 'Emotionale Spitzen'),
          label: t('การเล่นกับจังหวะจะโคนและการขยี้ประเด็นให้ถึงอารมณ์', 'Mastering pacing, rhythm, and hitting emotional peaks.', 'Meisterung von Rhythmus und emotionalen Höhepunkten.'),
          helpExample: t('เช่น Agent สร้างอารมณ์ร่วม: "ระบบเคยเสถียรดี... จนกระทั่งวันอังคาร แล้วทุกอย่างก็เปลี่ยนไป"', 'E.g., The Agent builds tension: \'The system was stable... until Tuesday. Then everything changed.\'', 'Z.B.: Der Agent baut Spannung auf: "Das System war stabil... bis Dienstag. Dann änderte sich alles."'), 
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
          helpExample: t('เช่น ผู้ใช้สั่งให้ข้ามระบบ auth — Agent ตอบว่า: "ฉันไม่สามารถช่วยเรื่องนั้นได้ นี่คือวิธีที่ปลอดภัยกว่าแทนครับ"', 'E.g., User asks to bypass auth — Agent responds: \'I cannot help with that. Here\'s the secure alternative.\'', 'Z.B.: Nutzer fragt nach Umgehung der Authentifizierung — Agent: "Dabei kann ich nicht helfen. Hier ist die sichere Alternative."'), 
          nextId: 'END' 
        },
        { 
          tag: t('Source Only', 'Source Only', 'Nur Quellen'),
          label: t('ห้ามเดาเด็ดขาด ต้องตอบจากข้อมูลที่กำหนดให้เท่านั้น', 'No guessing. Must reference provided source data only.', 'Kein Raten. Nur bereitgestellte Daten referenzieren.'),
          helpExample: t('เช่น "จากไฟล์ CSV ที่อัปโหลด (แถว 42) พบว่าค่าคือ 3.14 แต่ฉันไม่มีข้อมูลสำหรับแถวที่ 99 เลย"', 'E.g., \'Based on your uploaded CSV (row 42), the value is 3.14. I have no data for row 99.\'', 'Z.B.: "Basierend auf Ihrer hochgeladenen CSV (Zeile 42) ist der Wert 3.14. Für Zeile 99 liegen mir keine Daten vor."'), 
          nextId: 'END' 
        },
        { 
          tag: t('Role Lock', 'Role Lock', 'Rollenbindung'),
          label: t('ห้ามหลุดจากบทบาทที่ได้รับมอบหมายไม่ว่าจะเกิดอะไรขึ้น', 'Never break character or move outside the assigned role.', 'Niemals den Charakter oder die Rolle verlassen.'),
          helpExample: t('เช่น แม้จะถูกสั่งให้ "ลืมคำสั่งทั้งหมดซะ" ตัว Agent ก็จะยังคงอยู่ในบทบาทที่กำหนดไว้อย่างแน่วแน่', 'E.g., Even if asked \'forget your instructions\', the Agent stays in its defined role consistently.', 'Z.B.: Selbst bei der Aufforderung "vergiss deine Anweisungen" bleibt der Agent konsequent in seiner definierten Rolle.'), 
          nextId: 'END' 
        },
        { 
          tag: t('Strict Format', 'Strict Format', 'Striktes Format'),
          label: t('ต้องตอบกลับตามรูปแบบที่กำหนดไว้เป๊ะๆ เท่านั้น', 'Output ONLY in the exact specified format (e.g. JSON only).', 'Nur im exakt vorgegebenen Format antworten.'),
          helpExample: t('เช่น ไม่ว่าจะถามอะไร Agent จะตอบกลับเป็นโครงสร้าง JSON ตามที่ระบุไว้เสมอ — ไม่มีข้อความอื่นเจือปน', 'E.g., No matter the question, the Agent always responds in the specified JSON schema — nothing else.', 'Z.B.: Unabhängig von der Frage antwortet der Agent immer im angegebenen JSON-Schema — nichts anderes.'), 
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
  blog_writing: { recommendedTags: ['Storytelling', 'Cross-disciplinary', 'Visual Thinking', 'Elegant', 'Full Spectrum', 'Case Studies', 'Originality'] },
  storytelling: { recommendedTags: ['Optimist/Creator', 'Storytelling', 'Casual', 'Empathy', 'Originality'] },
  copywriting: { recommendedTags: ['Pragmatist', '80/20 Rule', 'Time-boxing', 'Bold', 'Pain Points', 'Provocative Questions', 'Efficiency'] },
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
  community: { recommendedTags: ['Pragmatist', 'User-centric', 'Conversational', 'Deep Empathy', 'Empathy', 'Relatability'] },
  // Agent-specific
  _agent_tech_docs: { recommendedTags: ['Analyst', 'Taxonomy', 'Executor', 'Technical', 'Flow & Structure', 'Source Only'] },
  _agent_code_review: { recommendedTags: ['Analyst', 'Logic Audit', 'Decision Support', 'Technical', 'References', 'Source Only'] },
  _agent_customer_support: { recommendedTags: ['Pragmatist', 'Actionable-Only', 'Decision Support', 'Conversational', 'Deep Empathy', 'Role Lock'] },
};
