JISR_DATA({
  n: 5, title: "Where Is It? Helping Visitors Inside the Building",
  goals: ["Use there is / there are to describe a place", "Use prepositions of place: next to, opposite, between, at the end of, on the … floor", "Give clear directions inside a building", "Check understanding: So, it's on the second floor?"],
  warmup: "Close your eyes. Describe your office: What is next to your desk? What is opposite the door?",
  grammar: {
    title: "There is / there are + prepositions of place",
    points: ["There is a lift next to the stairs. · There are two meeting rooms on this floor.", "Is there a prayer room? — Yes, there is. / No, there isn't.", "next to · opposite · between A and B · in front of · behind · at the end of the corridor · on the left / right · on the ground / first / second floor", "Directions: Take the lift to the third floor. · Turn left. · Go along the corridor. · It's the second door on your right."],
    quiz: [
      { t: "mcq", q: "___ two lifts in the building.", o: ["There is", "There are", "It is"], a: 1 },
      { t: "mcq", q: "The café is ___ the bank and the pharmacy.", o: ["between", "opposite to", "at"], a: 0 },
      { t: "mcq", q: "HR is ___ the end of the corridor.", o: ["in", "on", "at"], a: 2 },
      { t: "mcq", q: "Finance is ___ the first floor.", o: ["in", "on", "at"], a: 1 },
      { t: "gap", q: "Is there a car park? — Yes, there ___.", a: ["is"] }
    ]
  },
  vocab: [
    ["reception", "الاستقبال", "Please ask at reception."],
    ["lift / elevator", "مصعد", "Take the lift to the second floor."],
    ["stairs", "درج", "The stairs are next to the lift."],
    ["corridor", "ممر", "Go along the corridor."],
    ["opposite", "مقابل", "The meeting room is opposite HR."],
    ["next to", "بجانب", "The prayer room is next to the lift."],
    ["between", "بين", "Finance is between Licensing and IT."],
    ["entrance / exit", "مدخل / مخرج", "The main entrance is on King Abdulaziz Road."],
    ["car park", "موقف سيارات", "The visitors' car park is behind the building."],
    ["turn left / right", "انعطف يسارًا / يمينًا", "Turn right after the lift."],
    ["ground floor", "الطابق الأرضي", "The service counter is on the ground floor."],
    ["appointment", "موعد", "Do you have an appointment?"]
  ],
  vocabQuiz: [
    { t: "match", q: "Match.", pairs: [["opposite", "مقابل"], ["corridor", "ممر"], ["stairs", "درج"], ["entrance", "مدخل"]] }
  ],
  listening: [{
    title: "At reception: three visitors",
    intro: "Three visitors ask the receptionist for help. Where does each person go?",
    speakers: { A: "Receptionist", B: "Visitor 1", C: "Visitor 2", D: "Visitor 3" },
    lines: [
      ["B", "Excuse me. Where can I pay a traffic fine?"],
      ["A", "Payments are on the ground floor. Go straight ahead. The payment desk is at the end, opposite the café."],
      ["C", "Hello. I have an appointment with Eng. Reem in Urban Planning at nine."],
      ["A", "Planning is on the second floor. Take the lift, turn left, and it's the third door on your right, next to the meeting rooms."],
      ["C", "Third door on the right. Thank you."],
      ["D", "Sorry, is there a prayer room in the building?"],
      ["A", "Yes, there is. There's one on every floor. On this floor, it's behind the stairs."]
    ],
    questions: [
      { t: "mcq", q: "Visitor 1 wants to…", o: ["meet an engineer", "pay a fine", "find a café"], a: 1 },
      { t: "mcq", q: "The payment desk is opposite the…", o: ["lift", "café", "stairs"], a: 1 },
      { t: "gap", q: "Visitor 2's appointment is at ___.", a: ["nine", "9"] },
      { t: "tf", q: "Reem's office is the third door on the left.", a: false, why: "Third door on the right." },
      { t: "gap", q: "On the ground floor, the prayer room is behind the ___.", a: ["stairs"] }
    ]
  }],
  reading: [{
    title: "Visitor guide: Municipality Service Centre",
    text: [
      "Welcome to the Service Centre. The main entrance is on King Abdulaziz Road. There is a visitors' car park behind the building and there are spaces for people with disabilities near the entrance.",
      "Ground floor: reception, the main service counter and the payment desk. There is a waiting area with screens that show your ticket number.",
      "First floor: Licensing, Finance and the IT help desk. Second floor: Urban Planning and two meeting rooms. Third floor: Human Resources and the Director's office.",
      "Lifts and stairs are in the centre of the building. Prayer rooms and toilets are on every floor. Opening hours: Sunday to Thursday, 7:30 a.m. to 2:30 p.m."
    ],
    glossary: [["disabilities", "ذوو الإعاقة"], ["waiting area", "منطقة الانتظار"], ["ticket number", "رقم التذكرة"], ["help desk", "مكتب الدعم"]],
    questions: [
      { t: "mcq", q: "Where is the visitors' car park?", o: ["In front of the building", "Behind the building", "On King Abdulaziz Road"], a: 1 },
      { t: "mcq", q: "Which floor is the IT help desk on?", o: ["ground", "first", "third"], a: 1 },
      { t: "tf", q: "The Service Centre is open on Fridays.", a: false },
      { t: "gap", q: "The screens show your ___ number.", a: ["ticket"] },
      { t: "tf", q: "The Director's office is on the same floor as HR.", a: true }
    ]
  }],
  roleplay: [{
    title: "Directing a lost visitor",
    scene: "You work at reception. A foreign visitor needs help. Use the visitor guide in the Reading tab.",
    you: "Receptionist", npc: "Mr Ahmed Khan (visitor)",
    steps: [
      { npc: "Excuse me, I'm looking for the IT help desk.", hint: "Say the floor, and how to get there.", keys: [["first floor"]], model: "The IT help desk is on the first floor. Take the lift and turn right." },
      { npc: "Is there a lift? My knee hurts today.", hint: "Answer with there is + where.", keys: [["there is"], ["there's"]], model: "Yes, there is. The lifts are in the centre of the building, next to the stairs." },
      { npc: "Thank you. Also, where can I pay for my licence?", hint: "Payments are on the ground floor.", keys: [["ground floor"], ["payment"]], model: "You can pay at the payment desk on the ground floor, at the end of the hall." },
      { npc: "OK, so… first the IT desk upstairs, then I come back down to pay?", hint: "Confirm. Then check: Is there anything else?", keys: [["yes"], ["exactly"], ["right"], ["correct"]], model: "Yes, exactly. Is there anything else I can help you with?" },
      { npc: "No, that's all. You're very kind.", hint: "Reply politely.", keys: [["welcome"], ["pleasure"]], model: "You're welcome. Have a nice day." }
    ],
    ai: "You are a foreign visitor at a municipality service centre (ground floor: reception, counter, payments; 1st: Licensing, Finance, IT; 2nd: Planning, meeting rooms; 3rd: HR, Director). Ask the trainee (receptionist) how to find different offices. Sometimes ask them to repeat."
  }],
  speaking: {
    readAloud: ["Take the lift to the second floor and turn left.", "It's the third door on your right.", "The payment desk is opposite the café.", "Is there a prayer room on this floor?", "Go along the corridor. It's at the end."],
    tasks: [{ q: "Describe the building where you work: the floors, the important offices, and where your desk is.", time: 60, tips: ["There is / There are …", "On the ground floor, …", "My office is next to / opposite …"] }]
  },
  writing: [{
    title: "Directions for a visitor", task: "A visitor is coming to meet you. Write a short WhatsApp message telling them how to find your office from the main entrance.", min: 30, max: 70,
    checklist: ["Start with a greeting", "3–4 clear steps (take, turn, go along)", "At least two prepositions of place", "End politely"],
    model: "Hello Mr Khan, welcome! From the main entrance, go straight to the lifts. Take the lift to the second floor and turn left. Go along the corridor. My office is the third door on the right, opposite the meeting room. See you soon!"
  }],
  homework: ["Do the role-play twice; second time, close the Reading tab and use memory.", "Write your directions message and get feedback.", "AI partner: let it ask you for three different offices.", "Read-aloud: beat your score from Session 4."]
});
