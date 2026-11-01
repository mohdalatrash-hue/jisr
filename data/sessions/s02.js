JISR_DATA({
  n: 2, title: "Greetings, Introductions & Small Talk",
  goals: ["Greet people formally and informally", "Introduce a colleague to a visitor", "Ask and answer simple personal questions", "Use polite phrases: Excuse me, Sorry?, Could you repeat that?"],
  warmup: "Formal or informal? Sort these: “Hey!”, “Good afternoon, sir.”, “How's it going?”, “How do you do?”, “Pleased to meet you.”",
  grammar: {
    title: "Wh- questions with be and do",
    points: ["Where are you from? · What is your job? · Who is your manager?", "Where do you work? · What do you do? · How long do you work every day?", "Answer in full sentences: I work in … / My manager is …", "Polite repair: Sorry? · Could you repeat that, please? · Could you speak more slowly?"],
    quiz: [
      { t: "mcq", q: "___ do you work? — In the Licensing Department.", o: ["What", "Where", "Who"], a: 1 },
      { t: "mcq", q: "___ is your manager? — Mr Khalid Alsaleh.", o: ["Who", "When", "Where"], a: 0 },
      { t: "mcq", q: "What ___ you do? — I'm an inspector.", o: ["are", "do", "is"], a: 1 },
      { t: "gap", q: "Could you ___ that, please? I didn't hear you.", a: ["repeat"] }
    ]
  },
  vocab: [
    ["Good morning / afternoon", "صباح الخير / مساء الخير", "Good afternoon. Welcome to the municipality."],
    ["How do you do?", "كيف حالك؟ (رسمية جدًا عند أول لقاء)", "How do you do? — How do you do?"],
    ["Pleased to meet you.", "سعدت بلقائك", "Pleased to meet you, Mr Brown."],
    ["Let me introduce…", "دعني أعرّفك بـ…", "Let me introduce my manager, Mr Khalid."],
    ["visitor", "زائر", "We have a visitor from Germany today."],
    ["delegation", "وفد", "A delegation from Dubai is here."],
    ["welcome", "يرحّب / مرحبًا", "Welcome to Buraidah!"],
    ["Excuse me", "عفوًا / لو سمحت", "Excuse me, where is the meeting room?"],
    ["Could you repeat that?", "هل يمكنك إعادة ذلك؟", "Sorry, could you repeat that, please?"],
    ["business card", "بطاقة عمل", "Here is my business card."],
    ["director", "مدير عام / مدير إدارة", "He is the director of planning."],
    ["How was your trip?", "كيف كانت رحلتك؟", "How was your trip? — It was fine, thanks."]
  ],
  vocabQuiz: [
    { t: "mcq", q: "Which is the MOST formal greeting?", o: ["Hey there!", "How's it going?", "Good morning, sir. Pleased to meet you."], a: 2 },
    { t: "match", q: "Match.", pairs: [["delegation", "وفد"], ["business card", "بطاقة عمل"], ["visitor", "زائر"], ["director", "مدير إدارة"]] }
  ],
  listening: [{
    title: "Welcoming a visiting delegation",
    intro: "Hamad welcomes two visitors from a smart-city company and introduces his director.",
    speakers: { A: "Hamad", B: "Mr Brown", C: "Director" },
    lines: [
      ["A", "Good morning, and welcome to the municipality. I'm Hamad Almutairi from Customer Relations."],
      ["B", "Good morning. I'm David Brown from SmartWay Solutions. Pleased to meet you."],
      ["A", "Pleased to meet you too, Mr Brown. How was your trip?"],
      ["B", "It was long, but fine, thank you. We flew from London to Riyadh yesterday."],
      ["A", "I'm glad to hear that. Please let me introduce our Director of Planning, Eng. Khalid Alsaleh."],
      ["C", "Welcome to Qassim, Mr Brown. Here is my business card."],
      ["B", "Thank you very much. And this is my card. Sorry, could you repeat your name, please?"],
      ["C", "Of course. Khalid. K-H-A-L-I-D. Please, come in. The meeting room is on the second floor."]
    ],
    questions: [
      { t: "mcq", q: "Which company is Mr Brown from?", o: ["SmartWay Solutions", "Smart City Planning", "WayPoint London"], a: 0 },
      { t: "tf", q: "Mr Brown arrived in Riyadh today.", a: false, why: "He flew yesterday." },
      { t: "mcq", q: "Who is Khalid Alsaleh?", o: ["A visitor", "The Director of Planning", "A customer relations officer"], a: 1 },
      { t: "tf", q: "Mr Brown asks Khalid to repeat his name.", a: true },
      { t: "gap", q: "The meeting room is on the ___ floor.", a: ["second", "2nd"] }
    ]
  }],
  reading: [{
    title: "Saudi and international greetings at work",
    text: [
      "In Saudi workplaces, people often greet each other warmly and ask about family and health. A meeting may start with a few minutes of friendly conversation and Arabic coffee.",
      "International visitors may have different habits. Many people from Europe and North America shake hands briefly and then start business quickly. Some visitors prefer not to shake hands, so it is polite to wait and follow their lead.",
      "Small talk is short, friendly conversation. Safe topics are the weather, the trip, the city and food. Questions about salary, age or religion are usually not polite with a new visitor."
    ],
    glossary: [["warmly", "بحرارة / بودّ"], ["habits", "عادات"], ["follow their lead", "اتبع تصرّفهم"], ["small talk", "حديث خفيف"], ["salary", "راتب"]],
    questions: [
      { t: "tf", q: "Saudi meetings often start with friendly conversation.", a: true },
      { t: "mcq", q: "What is a safe small-talk topic with a new visitor?", o: ["Salary", "The weather", "Religion"], a: 1 },
      { t: "tf", q: "All visitors like to shake hands.", a: false, why: "Some prefer not to — follow their lead." },
      { t: "gap", q: "Small talk is short, ___ conversation.", a: ["friendly"] }
    ]
  }],
  roleplay: [{
    title: "Welcome the visitor and introduce your manager",
    scene: "A visitor from an international company arrives at your office. Welcome him, make small talk and introduce your manager.",
    you: "Municipality employee", npc: "Mr Carl Weber (visitor)",
    steps: [
      { npc: "Good morning. I have a meeting with the Director of Parks at ten.", hint: "Greet him formally, welcome him, say your name.", keys: [["welcome"], ["good morning"]], model: "Good morning, and welcome. I'm Faisal from the Parks Department." },
      { npc: "Thank you. I'm Carl Weber from GreenTech.", hint: "Say you're pleased to meet him. Ask about his trip.", keys: [["trip"], ["journey"], ["flight"]], model: "Pleased to meet you, Mr Weber. How was your trip?" },
      { npc: "It was fine, thanks. It's my first time in Qassim.", hint: "Respond kindly. Offer him something to drink.", keys: [["coffee"], ["tea"], ["water"], ["drink"]], model: "Welcome! Would you like some Arabic coffee or water?" },
      { npc: "Coffee would be lovely, thank you.", hint: "Introduce your manager: Let me introduce…", keys: [["introduce"], ["this is"]], model: "Let me introduce my manager, Mr Saleh Alharbi, Director of Parks." },
      { npc: "Sorry, what was his name again?", hint: "Repeat the name slowly and spell it.", keys: [], model: "Saleh. S-A-L-E-H. Saleh Alharbi." }
    ],
    ai: "You are Carl Weber, a German visitor from GreenTech arriving at the municipality for a meeting. Make polite small talk (trip, weather, city) and ask the trainee about their job before the meeting."
  }],
  speaking: {
    readAloud: ["Good afternoon, and welcome to the municipality.", "Pleased to meet you. How was your trip?", "Let me introduce our Director of Planning.", "Sorry, could you repeat that, please?", "Here is my business card."],
    tasks: [{ q: "Introduce a classmate: say their name, job, department and one interesting fact about them.", time: 45, tips: ["This is … / Let me introduce …", "He / She works in …", "He / She is a / an …", "One interesting thing about him / her is …"] }]
  },
  writing: [{
    title: "Three questions for a visitor", task: "A delegation from another country is visiting your department. Write five polite small-talk questions and a short welcome sentence.", min: 30, max: 70,
    checklist: ["One welcome sentence", "Five questions with question marks", "Safe topics only (trip, weather, city, food, work)"],
    model: "Welcome to Buraidah! We are happy to have you here.\n1. How was your trip?\n2. Is this your first visit to Saudi Arabia?\n3. How do you like the weather?\n4. Have you tried Arabic coffee?\n5. What does your company do?"
  }],
  homework: ["Do the role-play twice — once with your voice only.", "Try the free AI conversation as Carl Weber.", "Read-aloud: reach 80% on all five sentences.", "Learn how to spell your full name in English quickly."]
});
