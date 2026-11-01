JISR_DATA({
  n: 4, title: "My Workplace: Departments & Daily Routine",
  goals: ["Name municipal departments and what they do", "Describe your daily routine with the present simple", "Use always / usually / often / sometimes / never", "Understand a tour of a municipal building"],
  warmup: "What time do you start work? What is the first thing you do every morning? Tell your partner.",
  grammar: {
    title: "Present simple for routines + frequency",
    points: ["I / you / we / they start at 7:30. · He / she starts at 7:30 (add -s).", "Negative: I don't work on Fridays. · She doesn't answer the phone.", "Question: Do you work on Saturdays? · Does he visit sites?", "Frequency: always 100% · usually · often · sometimes · never 0% — before the main verb: I usually check my email first."],
    quiz: [
      { t: "mcq", q: "Nasser ___ the office at 7:30 every day.", o: ["open", "opens", "is open"], a: 1 },
      { t: "mcq", q: "We ___ work on Fridays.", o: ["don't", "doesn't", "aren't"], a: 0 },
      { t: "mcq", q: "___ your manager visit the sites?", o: ["Do", "Does", "Is"], a: 1 },
      { t: "mcq", q: "Choose the correct order.", o: ["I check usually my email first.", "I usually check my email first.", "Usually I my email check first."], a: 1 },
      { t: "gap", q: "Inspectors ___ (sometimes / work) in the evening.", a: ["sometimes work"] }
    ]
  },
  vocab: [
    ["Urban Planning", "التخطيط العمراني", "Urban Planning approves building plans."],
    ["Licensing", "الرخص", "Licensing issues shop licences."],
    ["Parks & Public Spaces", "الحدائق والمساحات العامة", "Parks & Public Spaces looks after green areas."],
    ["Waste Management", "إدارة النفايات / النظافة", "Waste Management collects rubbish."],
    ["Roads & Maintenance", "الطرق والصيانة", "Roads & Maintenance repairs streets."],
    ["Human Resources (HR)", "الموارد البشرية", "HR deals with holidays and contracts."],
    ["Finance", "المالية", "Finance pays the invoices."],
    ["issue (a licence)", "يُصدر (رخصة)", "We issue about 40 licences a week."],
    ["approve", "يعتمد / يوافق", "The director approves the plans."],
    ["shift", "نوبة / وردية", "My shift starts at 7 a.m."],
    ["site", "موقع (عمل)", "Engineers visit the site on Mondays."],
    ["deal with", "يتعامل مع", "I deal with complaints."]
  ],
  vocabQuiz: [
    { t: "match", q: "Which department…", pairs: [["repairs streets?", "Roads & Maintenance"], ["issues shop licences?", "Licensing"], ["collects rubbish?", "Waste Management"], ["deals with holidays and contracts?", "Human Resources (HR)"]] }
  ],
  listening: [{
    title: "A tour of the municipality building",
    intro: "A new employee, Ali, gets a tour from Majed. Listen and follow the route.",
    speakers: { A: "Majed", B: "Ali" },
    lines: [
      ["A", "OK Ali, welcome. Let me show you around. This is the ground floor. Here is the main service counter. Citizens come here for permits and payments."],
      ["B", "It's very busy! When does it open?"],
      ["A", "It opens at seven thirty and closes at two thirty. On the first floor, there is Licensing and Finance."],
      ["B", "And where is Urban Planning?"],
      ["A", "Planning is on the second floor, next to the meeting rooms. The engineers usually visit sites in the morning, so the office is often quiet before eleven."],
      ["B", "Where is Human Resources? I need to give them my documents."],
      ["A", "HR is on the third floor, at the end of the corridor. Oh, and the prayer room is on every floor, near the lifts."],
      ["B", "Great. Thanks, Majed."]
    ],
    questions: [
      { t: "mcq", q: "What is on the ground floor?", o: ["Finance", "The main service counter", "HR"], a: 1 },
      { t: "gap", q: "The counter closes at two ___.", a: ["thirty", "30"] },
      { t: "mcq", q: "Which floor is Urban Planning on?", o: ["first", "second", "third"], a: 1 },
      { t: "tf", q: "The Planning office is usually busy before eleven.", a: false, why: "It is often quiet — engineers are on site." },
      { t: "tf", q: "Ali needs to give documents to HR.", a: true },
      { t: "gap", q: "The prayer room is near the ___.", a: ["lifts", "lift", "elevators"] }
    ]
  }],
  reading: [{
    title: "A day in the life of a municipal inspector",
    text: [
      "Turki is a health inspector. He usually wakes up at 5:30 and prays Fajr. He arrives at the office at 7:15 and checks his list of visits for the day.",
      "From 8:00 to 12:00 he visits restaurants, bakeries and supermarkets. He checks the kitchens, the fridges and the workers' health certificates. He always takes photos and writes notes on a tablet.",
      "Many workers in restaurants don't speak Arabic well, so Turki often uses simple English. He sometimes finds a problem — for example, food at the wrong temperature. Then he explains the rule and gives the shop a warning or a fine.",
      "In the afternoon, Turki writes his reports. He never leaves the office before he finishes them. He says his job is tiring but important, because it keeps people safe."
    ],
    glossary: [["health certificates", "الشهادات الصحية"], ["fridges", "الثلاجات"], ["temperature", "درجة الحرارة"], ["warning", "إنذار"], ["fine", "غرامة / مخالفة"], ["tiring", "مُتعب"]],
    questions: [
      { t: "gap", q: "Turki arrives at the office at ___.", a: ["7:15", "seven fifteen", "7.15"] },
      { t: "mcq", q: "What does Turki check in restaurants?", o: ["Prices and menus", "Kitchens, fridges and health certificates", "Parking"], a: 1 },
      { t: "tf", q: "Turki always takes photos.", a: true },
      { t: "mcq", q: "Why does he often use English?", o: ["His manager asks him to", "Many workers don't speak Arabic well", "His reports are in English"], a: 1 },
      { t: "tf", q: "He sometimes leaves before finishing his reports.", a: false, why: "He never leaves before he finishes them." }
    ]
  }],
  roleplay: [{
    title: "Telling a new colleague about your department",
    scene: "A new colleague asks you about your department and your day.",
    you: "Experienced employee", npc: "Ali (new colleague)",
    steps: [
      { npc: "Hi! Which department do you work in?", hint: "Name your department.", keys: [["department"], ["i work in"]], model: "I work in the Licensing Department." },
      { npc: "What does your department do?", hint: "Say what it does: We issue / approve / repair / deal with…", keys: [["we issue"], ["we approve"], ["we deal"], ["we repair"], ["we collect"], ["we check"]], model: "We issue licences for shops and restaurants." },
      { npc: "What time do you start?", hint: "Say your start time.", keys: [["start"], ["at"]], model: "I usually start at half past seven." },
      { npc: "What do you usually do first?", hint: "Use usually / always + present simple.", keys: [["usually"], ["always"], ["first"]], model: "I always check my email first, then I meet the citizens at the counter." },
      { npc: "Do you like your job?", hint: "Give your opinion and a reason with because.", keys: [["because"]], model: "Yes, I do, because I help people every day." }
    ],
    ai: "You are Ali, a new employee in the municipality. Ask the trainee about their department, what it does, their working hours and their daily routine. Ask one follow-up question each time."
  }],
  speaking: {
    readAloud: ["Citizens come here for permits and payments.", "The engineers usually visit sites in the morning.", "I always check my email first.", "He doesn't leave the office before he finishes his reports.", "Human Resources is on the third floor."],
    tasks: [{ q: "Describe your normal working day from morning to afternoon. Use at least three frequency words.", time: 60, tips: ["I usually arrive at …", "First, I … Then I … After that, I …", "I sometimes … / I never …"] }]
  },
  writing: [{
    title: "My working day", task: "Write about your typical working day. Use the present simple and at least three words: always, usually, often, sometimes, never.", min: 60, max: 120,
    checklist: ["Times (at 7:30, from 8 to 12)", "Sequence: first, then, after that, finally", "Three frequency words", "-s with he/she if you write about a colleague"],
    model: "I usually wake up at 5:45. I arrive at the municipality at 7:20. First, I check my email and the list of new applications. Then I meet citizens at the counter and answer their questions. I often help foreign investors, so I sometimes need English. After that, I write my reports. I never leave before 2:30."
  }],
  homework: ["Draw a simple map of your floor at work and label the offices in English.", "Listen to the building tour on “Slow” speed, then on “Normal”.", "Write “My working day” and get feedback.", "Speaking Lab: try today's topic for 60 seconds."]
});
