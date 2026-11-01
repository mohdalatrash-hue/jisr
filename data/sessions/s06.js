JISR_DATA({
  n: 6, title: "Describing Your Department & Week 2 Review",
  goals: ["Write a clear paragraph about your department", "Join ideas with and, but, because, so", "Review present simple, frequency words, there is/are and prepositions", "Take the Weeks 1–2 progress quiz before the autumn break"],
  warmup: "In one minute, list everything your department does. Which list is the longest in the class?",
  grammar: {
    title: "Linking words: and · but · because · so",
    points: ["and = add: We issue licences and inspect shops.", "but = contrast: The work is busy, but it is interesting.", "because = reason: I use English because many workers are foreign.", "so = result: Many visitors are foreign, so we need English."],
    quiz: [
      { t: "mcq", q: "The office opens at 7:30, ___ the counter opens at 8:00.", o: ["but", "so", "because"], a: 0 },
      { t: "mcq", q: "I'm tired ___ I started very early.", o: ["so", "because", "and"], a: 1 },
      { t: "mcq", q: "It was raining, ___ the road team worked late.", o: ["because", "but", "so"], a: 2 },
      { t: "mcq", q: "We clean the parks ___ water the trees.", o: ["and", "but", "because"], a: 0 }
    ]
  },
  vocab: [
    ["responsible for", "مسؤول عن", "Our department is responsible for street lighting."],
    ["provide", "يقدّم / يوفّر", "We provide services for citizens."],
    ["team", "فريق", "My team has twelve people."],
    ["service", "خدمة", "The most popular service is building permits."],
    ["application", "طلب", "We receive 200 applications a month."],
    ["process", "يعالج / ينجز", "We process applications in five days."],
    ["challenge", "تحدٍّ", "Our biggest challenge is the summer heat."],
    ["improve", "يحسّن", "We want to improve our online services."],
    ["citizen / resident", "مواطن / مقيم", "Residents can apply online."],
    ["online", "عبر الإنترنت", "Most services are online now."]
  ],
  vocabQuiz: [
    { t: "gap", q: "We ___ (process) about 50 applications every week.", a: ["process"] },
    { t: "mcq", q: "“تحدٍّ” in English is…", o: ["challenge", "service", "team"], a: 0 }
  ],
  listening: [{
    title: "Podcast: “My department in one minute”",
    intro: "Three employees describe their departments on the municipality's podcast.",
    speakers: { A: "Host", B: "Saad", C: "Hamad" },
    lines: [
      ["A", "Welcome to “One Minute at the Municipality”. Saad, tell us about your department."],
      ["B", "I work in Waste Management. We're responsible for collecting rubbish from forty neighbourhoods. My team works at night because the streets are quieter. Our biggest challenge is the summer heat, so we start at nine p.m. and finish before sunrise."],
      ["A", "Thank you, Saad. Hamad?"],
      ["C", "I'm in Customer Service. We provide information and help citizens with their applications. We receive about three hundred visitors a day, but most services are online now, so the number is going down. We want to improve our phone service next year."],
      ["A", "Great. Thank you both."]
    ],
    questions: [
      { t: "gap", q: "Saad's team collects rubbish from ___ neighbourhoods.", a: ["forty", "40"] },
      { t: "mcq", q: "Why does Saad's team work at night?", o: ["It is cooler and quieter", "The manager wants it", "There are no cars at night"], a: 0, why: "The streets are quieter, and the summer heat is a challenge." },
      { t: "tf", q: "Saad's team finishes after sunrise.", a: false },
      { t: "gap", q: "Customer Service receives about ___ visitors a day.", a: ["300", "three hundred"] },
      { t: "mcq", q: "Why is the number of visitors going down?", o: ["The office is closed", "Most services are online", "Visitors go to Licensing"], a: 1 },
      { t: "mcq", q: "What does Hamad's department want to improve?", o: ["Online payments", "The phone service", "Parking"], a: 1 }
    ]
  }],
  reading: [{
    title: "Department profile: Parks & Public Spaces",
    text: [
      "The Parks and Public Spaces Department is responsible for 65 parks, 120 kilometres of walking paths and the green areas along the main roads. The department has 85 employees and works with three private contractors.",
      "Every day, teams water trees, repair benches and lights, and clean playgrounds. In spring, the department plants thousands of new trees as part of the national greening programme.",
      "The department's biggest challenge is water, because the climate is very dry. So the team now uses smart irrigation: sensors measure the soil and give water only when the plants need it. This saves about 30 percent of the water.",
      "Next year, the department wants to open four new parks and improve shade in children's playgrounds."
    ],
    glossary: [["contractors", "مقاولون"], ["benches", "مقاعد"], ["greening programme", "برنامج التشجير"], ["irrigation", "ريّ"], ["sensors", "حسّاسات"], ["soil", "التربة"], ["shade", "ظل"]],
    questions: [
      { t: "gap", q: "The department is responsible for ___ parks.", a: ["65", "sixty-five"] },
      { t: "tf", q: "The department works alone without private companies.", a: false, why: "It works with three private contractors." },
      { t: "mcq", q: "What is the biggest challenge?", o: ["Money", "Water", "Workers"], a: 1 },
      { t: "mcq", q: "Smart irrigation…", o: ["waters plants every hour", "gives water only when plants need it", "uses more water"], a: 1 },
      { t: "gap", q: "Smart irrigation saves about ___ percent of the water.", a: ["30", "thirty"] }
    ]
  }],
  roleplay: [{
    title: "Mini-podcast: your department in one minute",
    scene: "You are a guest on the municipality podcast. Answer the host's questions about your department.",
    you: "Guest employee", npc: "Podcast host",
    steps: [
      { npc: "Welcome to the show! Which department are you from?", hint: "Name your department.", keys: [["department"], ["i'm from"], ["i work"]], model: "Thank you. I'm from the Licensing Department." },
      { npc: "What is your department responsible for?", hint: "We're responsible for…", keys: [["responsible"]], model: "We're responsible for shop and restaurant licences in the city." },
      { npc: "How big is your team?", hint: "Use there are / we have + number.", keys: [["there are"], ["we have"]], model: "There are twenty people in our team." },
      { npc: "What is your biggest challenge?", hint: "Our biggest challenge is… because…", keys: [["challenge"], ["because"]], model: "Our biggest challenge is the number of applications, because the city is growing fast." },
      { npc: "And what do you want to improve?", hint: "We want to improve… so…", keys: [["improve"]], model: "We want to improve our online system, so people don't need to visit the office." }
    ],
    ai: "You are the host of a municipality podcast called “One Minute at the Municipality”. Interview the trainee about their department: responsibilities, team size, services, challenges and future plans. Keep it lively."
  }],
  speaking: {
    readAloud: ["We're responsible for collecting rubbish from forty neighbourhoods.", "Our biggest challenge is the summer heat.", "Most services are online now, so the number is going down.", "Smart irrigation saves about thirty percent of the water.", "We want to improve our phone service next year."],
    tasks: [{ q: "Your department in one minute: what it does, the team, one challenge and one plan.", time: 60, tips: ["We're responsible for …", "There are … people in my team.", "Our biggest challenge is … because …", "We want to improve …"] }]
  },
  writing: [{
    title: "Department profile", task: "Write a profile of your department (like the Parks profile). Use and, but, because and so at least once each.", min: 70, max: 140,
    checklist: ["What the department is responsible for", "Team size and main services", "A challenge + because", "A plan + so", "and / but / because / so"],
    model: "The Licensing Department is responsible for shop, restaurant and workshop licences in the city. There are 22 employees and we process about 400 applications a month. Most applications are online, but some people still visit the counter. Our biggest challenge is incomplete documents, because applicants often forget something. So we want to improve our website and add a clear checklist in Arabic and English."
  }],
  homework: ["Before the autumn break: finish all activities in Sessions 1–6 with 80% or more.", "Write your department profile and get feedback. Then paste it into Write & Improve (writeandimprove.com/free) to see its CEFR level.", "Record “Your department in one minute” three times — keep the best.", "During the break: use the Speaking Lab for 10 minutes a day. · خلال الإجازة: ١٠ دقائق يوميًا في مختبر المحادثة"]
});
