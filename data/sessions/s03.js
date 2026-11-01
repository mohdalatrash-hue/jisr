JISR_DATA({
  n: 3, title: "Writing About Yourself & Week 1 Review",
  goals: ["Write a short, polite email introducing yourself", "Use capital letters, full stops and question marks correctly", "Review the verb to be, possessives and Wh- questions", "Check your progress with the Week 1 quiz"],
  warmup: "Look at this email subject line: “hello i am new”. What is wrong with it? Make it better together.",
  grammar: {
    title: "Capital letters & punctuation",
    points: ["Capital letter: the first word of a sentence, the pronoun I, names (Nouf, Buraidah, Saudi Arabia), days and months (Sunday, November), departments (the Planning Department)", "Full stop (.) at the end of a sentence; question mark (?) at the end of a question", "Email opening: Dear Dr Muhammad, / Dear Ms Weber,  ·  Closing: Best regards, + your name"],
    quiz: [
      { t: "mcq", q: "Which sentence is correct?", o: ["i work in the parks department.", "I work in the Parks Department.", "I work in the parks Department"], a: 1 },
      { t: "mcq", q: "Which is a good email opening to your trainer?", o: ["Hey Doctor!", "Dear Dr Muhammad,", "dear doctor muhammad"], a: 1 },
      { t: "mcq", q: "Choose the correct ending for a formal email.", o: ["Bye bye", "Best regards,\nFaisal Alotaibi", "see u"], a: 1 },
      { t: "tf", q: "Days of the week start with a capital letter in English.", a: true }
    ]
  },
  vocab: [
    ["email", "بريد إلكتروني", "I will send you an email."],
    ["subject line", "عنوان الرسالة", "Write a clear subject line."],
    ["Dear …,", "عزيزي … (افتتاحية رسمية)", "Dear Ms Weber,"],
    ["I am writing to…", "أكتب إليك من أجل…", "I am writing to introduce myself."],
    ["Best regards,", "مع أطيب التحيات", "Best regards, Hessa"],
    ["attach", "يرفق", "I attach my CV."],
    ["experience", "خبرة", "I have five years' experience."],
    ["responsible for", "مسؤول عن", "I am responsible for building permits."],
    ["look forward to", "أتطلع إلى", "I look forward to the course."],
    ["goal", "هدف", "My goal is to speak with confidence."]
  ],
  vocabQuiz: [
    { t: "gap", q: "I am ___ for checking restaurant licences.", a: ["responsible"] },
    { t: "gap", q: "I look forward ___ meeting you.", a: ["to"] },
    { t: "mcq", q: "“مع أطيب التحيات” in an email is…", o: ["Dear Sir,", "Best regards,", "I am writing to"], a: 1 }
  ],
  listening: [{
    title: "Voicemail from the training coordinator",
    intro: "Listen to a phone message about the course. Take notes.",
    speakers: { A: "Coordinator" },
    lines: [
      ["A", "Hello, this is Mona from the Training Office at the municipality. This message is for all Jisr trainees."],
      ["A", "Please send a short email to your English trainer before Sunday. Introduce yourself in five or six sentences."],
      ["A", "Write your name, your job, your department, and your goal for the course."],
      ["A", "Please don't forget to sign in on the website every session. Attendance is required for the certificate."],
      ["A", "You need eighty percent attendance to graduate. If you have any questions, call me on extension four-two-one. Thank you."]
    ],
    questions: [
      { t: "mcq", q: "Who is the message from?", o: ["The trainer", "The Training Office", "The director"], a: 1 },
      { t: "gap", q: "Send the email before ___.", a: ["Sunday"] },
      { t: "mcq", q: "How many sentences should the email have?", o: ["two or three", "five or six", "ten"], a: 1 },
      { t: "gap", q: "You need ___ percent attendance to graduate.", a: ["eighty", "80"] },
      { t: "gap", q: "Mona's extension number is ___.", a: ["421", "four two one", "four-two-one"] }
    ]
  }],
  reading: [{
    title: "An introduction email",
    intro: "Read Reem's email. Then answer.",
    text: [
      "Subject: Introduction – Reem Alshammari (Jisr trainee)",
      "Dear Dr Muhammad,",
      "I am writing to introduce myself. My name is Reem Alshammari and I am a planning officer in the Urban Planning Department. I am responsible for checking building plans for new houses.",
      "I have six years' experience at the municipality. I can read simple English, but speaking is difficult for me. My goal is to speak with confidence in meetings with consultants.",
      "I look forward to the course.",
      "Best regards,",
      "Reem Alshammari"
    ],
    glossary: [["planning officer", "موظف تخطيط"], ["building plans", "مخططات البناء"], ["consultants", "استشاريون"], ["confidence", "ثقة"]],
    questions: [
      { t: "mcq", q: "What is the purpose of the email?", o: ["To ask for leave", "To introduce herself", "To complain"], a: 1 },
      { t: "tf", q: "Reem finds speaking English easy.", a: false },
      { t: "gap", q: "Reem has ___ years' experience.", a: ["six", "6"] },
      { t: "mcq", q: "Where does she want to speak with confidence?", o: ["At the airport", "In meetings with consultants", "On the phone"], a: 1 }
    ]
  }],
  roleplay: [{
    title: "Checking in with the training office",
    scene: "You call the training office to ask about the course.",
    you: "Trainee", npc: "Mona (Training Office)",
    steps: [
      { npc: "Training Office, Mona speaking. How can I help you?", hint: "Greet her and say your name and department.", keys: [["my name"], ["this is"], ["i'm"]], model: "Hello Mona, this is Saad Aldosari from Waste Management." },
      { npc: "Hello Saad. What's your question?", hint: "Ask how many sessions you can miss.", keys: [["miss"], ["absent"], ["absence"]], model: "How many sessions can I miss?" },
      { npc: "You need eighty percent attendance, so you can miss about twelve sessions in total.", hint: "Ask her to repeat the number.", keys: [["repeat"], ["sorry"], ["again"]], model: "Sorry, could you repeat the number, please?" },
      { npc: "Twelve. One-two.", hint: "Thank her and say goodbye.", keys: [["thank"]], model: "Thank you very much. Goodbye." }
    ],
    ai: "You are Mona from the municipality Training Office answering the phone. The trainee asks practical questions about the English course (times, attendance, certificate, the website). Answer helpfully and briefly."
  }],
  speaking: {
    readAloud: ["I am writing to introduce myself.", "I am responsible for checking building plans.", "My goal is to speak with confidence.", "I look forward to the course.", "You need eighty percent attendance to graduate."],
    tasks: [{ q: "Week 1 review: Tell us about a colleague in your department — name, job, what they do every day.", time: 60 }]
  },
  writing: [{
    title: "Email to your trainer", task: "Write an email to your trainer (Dr Muhammad) to introduce yourself. Use Reem's email as a model.", min: 50, max: 110,
    checklist: ["Subject line", "Dear Dr Muhammad,", "Name, job, department", "Your experience", "Your goal for the course", "Best regards, + your name"],
    model: "Subject: Introduction – Turki Alenezi (Jisr trainee)\nDear Dr Muhammad,\nI am writing to introduce myself. My name is Turki Alenezi and I am a health inspector in the municipality. I visit restaurants and shops and check that they are clean and safe. I have four years' experience. My goal is to understand foreign workers and give them clear instructions.\nI look forward to the course.\nBest regards,\nTurki Alenezi"
  }],
  homework: ["Send your introduction email (write it here first and get feedback).", "Week 1 review: redo any quiz below 80% in Sessions 1–3.", "Talk to the AI partner for 5 minutes as the Training Office.", "Make sure your check-in worked for all three sessions this week."]
});
