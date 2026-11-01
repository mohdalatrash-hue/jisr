JISR_DATA({
  n: 1, title: "Hello & Welcome: Who's Who?",
  goals: ["Introduce yourself: name, job, department, city", "Understand people introducing themselves", "Use the verb “to be” (I am / he is / they are) and my / your / his / her", "Spell your name in English"],
  warmup: "Stand up and find three people. Ask: “What's your name?” and “What do you do?” Remember one fact about each person.",
  grammar: {
    title: "The verb to be + possessives",
    points: ["I am (I'm) · you are (you're) · he / she is (he's / she's) · we / they are (we're / they're)", "Questions: Are you an engineer? — Yes, I am. / No, I'm not.", "my · your · his · her · our · their: “His name is Nasser. Their office is on the second floor.”", "a / an + job: a manager, an engineer, an inspector"],
    quiz: [
      { t: "mcq", q: "Faisal ___ an engineer in the Planning Department.", o: ["am", "is", "are"], a: 1, why: "He / she / it → is." },
      { t: "mcq", q: "We ___ from the Licensing Department.", o: ["is", "am", "are"], a: 2, why: "We / you / they → are." },
      { t: "mcq", q: "This is Rakan. ___ job is very interesting.", o: ["His", "Her", "Their"], a: 0, why: "Rakan is a man → his." },
      { t: "mcq", q: "I'm ___ inspector.", o: ["a", "an", "—"], a: 1, why: "“inspector” starts with a vowel sound → an." },
      { t: "gap", q: "“Are you new here?” — “Yes, I ___.”", a: ["am"], why: "Short answer: Yes, I am. (Not “Yes, I'm.”)" }
    ]
  },
  vocab: [
    ["municipality", "البلدية", "I work for the municipality."],
    ["department", "إدارة / قسم", "He works in the Parks Department."],
    ["employee", "موظف", "There are 300 employees here."],
    ["manager", "مدير", "My manager is very helpful."],
    ["engineer", "مهندس", "He is a civil engineer."],
    ["inspector", "مفتّش / مراقب", "The inspector visits shops every day."],
    ["colleague", "زميل", "This is my colleague, Saad."],
    ["trainee", "متدرّب", "We are trainees in the Jisr programme."],
    ["licensing", "التراخيص", "Licensing is on the first floor."],
    ["customer service", "خدمة العملاء", "I work in customer service."],
    ["Nice to meet you.", "تشرّفت بمعرفتك", "Nice to meet you, too."],
    ["spell", "يتهجّى", "Can you spell your name, please?"]
  ],
  vocabQuiz: [
    { t: "match", q: "Match the word with its meaning.", pairs: [["colleague", "زميل"], ["inspector", "مفتّش"], ["department", "إدارة / قسم"], ["trainee", "متدرّب"]] },
    { t: "mcq", q: "Someone who checks that shops follow the rules is an…", o: ["engineer", "inspector", "trainee"], a: 1 }
  ],
  listening: [{
    title: "First day of the Jisr programme",
    intro: "Three municipality employees meet before class. Listen and answer.",
    speakers: { A: "Abdullah", B: "Nasser", C: "Turki" },
    lines: [
      ["A", "Good morning! Is this the room for the English course?"],
      ["B", "Yes, it is. Good morning. I'm Nasser. I work in the Licensing Department."],
      ["A", "Nice to meet you, Nasser. My name is Abdullah. I'm an engineer in the Planning Department."],
      ["B", "Nice to meet you, too. Are you from Buraidah?"],
      ["A", "No, I'm not. I'm from Unaizah, but I live in Buraidah now."],
      ["C", "Hello, everyone. Sorry I'm late. I'm Turki."],
      ["B", "Hi, Turki. What do you do?"],
      ["C", "I'm an inspector. I visit restaurants and shops. And this is my first English course!"],
      ["A", "Mine too. It's exciting."]
    ],
    questions: [
      { t: "mcq", q: "Where does Nasser work?", o: ["Planning", "Licensing", "Parks"], a: 1 },
      { t: "mcq", q: "What is Abdullah's job?", o: ["inspector", "manager", "engineer"], a: 2 },
      { t: "tf", q: "Abdullah is from Buraidah.", a: false, why: "He is from Unaizah but lives in Buraidah." },
      { t: "tf", q: "Turki arrives late.", a: true, why: "He says “Sorry I'm late.”" },
      { t: "gap", q: "Turki visits restaurants and ___.", a: ["shops"] },
      { t: "tf", q: "It is Abdullah's second English course.", a: false, why: "“Mine too” = it is his first course too." }
    ]
  }],
  reading: [{
    title: "Meet the Jisr trainees",
    intro: "Read the profiles from the programme's welcome page.",
    text: [
      "Saad Aldosari is 34 years old. He is a supervisor in the Waste Management Department. His team cleans the streets of the city every night. Saad wants to learn English because many workers in his team are from other countries.",
      "Hamad Almutairi is a customer service officer. He works at the main service counter. Every day he helps people with permits, payments and questions. Some visitors are tourists or foreign investors, so English is important in his job.",
      "Majed Alrashidi is a young architect. He designs public parks and walking paths. He often reads technical documents in English, and next year he wants to attend an international conference on green cities."
    ],
    glossary: [["supervisor", "مشرف"], ["permits", "تصاريح"], ["investors", "مستثمرون"], ["architect", "مهندس معماري"], ["conference", "مؤتمر"]],
    questions: [
      { t: "mcq", q: "Why does Saad want to learn English?", o: ["For a conference", "Because workers in his team speak other languages", "For tourists at the counter"], a: 1 },
      { t: "tf", q: "Hamad works at the main service counter.", a: true },
      { t: "tf", q: "Majed designs buildings for hospitals.", a: false, why: "He designs public parks and walking paths." },
      { t: "gap", q: "Saad's team cleans the streets every ___.", a: ["night"] },
      { t: "mcq", q: "Who reads technical documents in English?", o: ["Saad", "Hamad", "Majed"], a: 2 }
    ]
  }],
  roleplay: [{
    title: "Meeting a new colleague",
    scene: "It is the first day of training. You meet someone new at the coffee break.",
    you: "Trainee", npc: "New colleague",
    steps: [
      { npc: "Hi! I don't think we've met. I'm Sami.", hint: "Greet him and say your name.", keys: [["name"], ["i'm"], ["i am"]], model: "Hi Sami, nice to meet you. I'm Ahmed." },
      { npc: "Nice to meet you. Which department are you in?", hint: "Say your department.", keys: [["department"], ["i work"]], model: "I'm in the Parks Department." },
      { npc: "Oh, interesting! What do you do there?", hint: "Say your job: I'm a / an …", keys: [["i'm a"], ["i am a"], ["i'm an"], ["i am an"]], model: "I'm an engineer. I plan new parks." },
      { npc: "Can you spell your family name for me? I want to add you to our WhatsApp group.", hint: "Spell your family name letter by letter.", keys: [], model: "Sure. A-L-H-A-R-B-I." },
      { npc: "Great, thanks. See you in class!", hint: "Say goodbye politely.", keys: [["see you"], ["bye"], ["thank"]], model: "See you later, Sami. Have a good day!" }
    ],
    ai: "You are Sami, a new trainee from the Planning Department, meeting the trainee at a coffee break on the first day of an English course. Ask about their name, job, department and city."
  }],
  speaking: {
    readAloud: ["Good morning. My name is Abdullah.", "I'm an engineer in the Planning Department.", "Nice to meet you, too.", "Can you spell your name, please?", "This is my colleague. His name is Nasser."],
    tasks: [{ q: "Introduce yourself: your name, your job, your department and where you are from.", time: 45, tips: ["My name is … / I'm …", "I work in the … Department.", "I'm a / an …", "I'm from … and I live in …"] }]
  },
  writing: [{
    title: "My profile card", task: "Write a short profile of yourself for the Jisr welcome page (like the profiles in the reading).", min: 40, max: 80,
    checklist: ["Name and age (optional)", "Job and department", "What you do every day", "Why you want to learn English", "Capital letters and full stops"],
    model: "My name is Faisal Alotaibi. I am 29 years old. I am a licensing officer in the municipality. Every day I check documents and answer questions from shop owners. I want to learn English because I want to help foreign investors and travel for training."
  }],
  homework: ["Take the free EF SET level test (efset.org, 50 minutes) and keep your result. You will take it again at the end of the programme. · اختبر مستواك مجانًا", "Learn the 12 words: hide the Arabic and test yourself.", "Play the listening twice without the transcript and get 6/6.", "Record your self-introduction in the Speaking tab and try to get a higher score tomorrow.", "Write your profile card and press “Get feedback”."]
});
