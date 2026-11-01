window.JISR_LAB = {
  scenarios: [
    { id: "airport", icon: "✈️", en: "At the airport check-in", ar: "في المطار", scenario: "You are an airline check-in agent at King Khalid International Airport. The trainee is a passenger flying to London for a municipal conference. Ask for passport, luggage, seat preference; mention boarding time and gate." },
    { id: "restaurant", icon: "🍽", en: "Ordering at a restaurant", ar: "في المطعم", scenario: "You are a friendly waiter in a restaurant in Riyadh. The trainee is a customer hosting an international guest. Greet them, offer the menu, take the order, suggest a dessert, and handle the bill." },
    { id: "counter", icon: "🏛", en: "Municipality service counter", ar: "خدمة المراجعين", scenario: "You are a foreign resident visiting the municipality. You need a permit to open a small café. The trainee is the municipal employee at the counter. Ask what documents you need, how long it takes and the fees." },
    { id: "phone", icon: "📞", en: "Taking a phone message", ar: "مكالمة هاتفية", scenario: "You are calling the municipality to speak to the Director of Parks, who is out. The trainee answers the phone. Give your name, company (GreenCity Landscaping), number and a short message about a meeting." },
    { id: "hotel", icon: "🏨", en: "Hotel check-in", ar: "في الفندق", scenario: "You are a hotel receptionist in Dubai. The trainee is checking in for a three-night business trip. Ask for the booking name, ID, breakfast, Wi-Fi and checkout time." },
    { id: "directions", icon: "🗺", en: "Giving directions", ar: "وصف الطريق", scenario: "You are a visitor who is lost near the municipality building. Ask the trainee how to get to the city park, the hospital and the nearest pharmacy. Ask them to repeat if unclear." },
    { id: "complaint", icon: "📝", en: "Handling a complaint", ar: "معالجة شكوى", scenario: "You are a resident who is unhappy because rubbish has not been collected from your street for four days. Be polite but firm. The trainee is the municipal employee who must apologise, ask for details and promise action." },
    { id: "interview", icon: "💼", en: "A short job interview", ar: "مقابلة عمل", scenario: "You are an interviewer for a municipal training programme abroad. Ask the trainee about their job, experience, strengths, why they want to join, and one question about teamwork." }
  ],
  prompts: [
    { q: "Introduce yourself: your name, your job, and your department.", time: 45 },
    { q: "Describe a normal working day from morning to afternoon.", time: 60 },
    { q: "Talk about your city. What do you like? What would you change?", time: 60 },
    { q: "Describe the last trip you took. Where did you go and what did you do?", time: 60 },
    { q: "Explain how a citizen can apply for a service in your department.", time: 75 },
    { q: "What is the most important skill in your job? Why?", time: 60 },
    { q: "Describe a problem at work and how you solved it.", time: 75 },
    { q: "Give your opinion: should cities have more parks or more parking? Why?", time: 75 }
  ],
  drills: [
    "Good morning. How can I help you today?",
    "Could you spell your family name, please?",
    "Please take a seat. I'll be with you in a moment.",
    "The office is open from eight in the morning until two in the afternoon.",
    "I'm afraid the manager is in a meeting. Can I take a message?",
    "Go straight ahead and turn left at the traffic lights.",
    "We will send you a text message when your permit is ready.",
    "Thank you for your patience. We apologise for the delay.",
    "Could you repeat that more slowly, please?",
    "I'd like a table for three, please.",
    "Where is the boarding gate for the flight to London?",
    "Our department is responsible for parks and public spaces."
  ]
};
