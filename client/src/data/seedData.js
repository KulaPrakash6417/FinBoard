const categories = [
  "Food",
  "Travel",
  "Entertainment",
  "Bills",
  "Medical",
  "Education",
  "Amenities",
];

const titles = {
  Food: [
    "Swiggy Order",
    "Zomato Dinner",
    "Cafe Meetup",
    "Restaurant Lunch",
    "Festival Sweets",
    "Birthday Dinner",
  ],
  Travel: [
    "Uber Ride",
    "Bus Ticket",
    "Train Journey",
    "Flight Booking",
    "Trip to Hometown",
    "Weekend Getaway",
  ],
  Entertainment: [
    "Movie Night",
    "Netflix Subscription",
    "Gaming Purchase",
    "Concert Ticket",
    "Party Night",
    "Festival Event Pass",
  ],
  Bills: [
    "Electricity Bill",
    "Internet Bill",
    "House Rent",
    "Mobile Recharge",
    "Maintenance Charges",
  ],
  Medical: [
    "Pharmacy Purchase",
    "Doctor Visit",
    "Health Checkup",
    "Emergency Treatment",
  ],
  Education: [
    "Online Course",
    "Books Purchase",
    "Exam Fee",
    "Workshop Registration",
  ],
  Amenities: [
    "Grocery Shopping",
    "Clothing Purchase",
    "Festival Shopping",
    "Home Decor for Festival",
    "Party Decorations",
    "Gift Purchase",
  ],
};

const generateData = () => {
  const data = [];

  const specialEvents = [
    "Diwali Shopping",
    "Pongal Festival Expenses",
    "Birthday Celebration",
    "Wedding Gift",
    "House Party",
    "New Year Celebration",
  ];

  for (let i = 1; i <= 150; i++) {
    const type = Math.random() > 0.35 ? "expense" : "income";

    const category =
      type === "income"
        ? "Salary"
        : categories[Math.floor(Math.random() * categories.length)];

    // 🎯 Title logic (normal + event-based)
    let title;

    if (type === "income") {
      const incomeTypes = ["Salary", "Freelance Work", "Bonus", "Side Income"];
      title = incomeTypes[Math.floor(Math.random() * incomeTypes.length)];
    } else {
      const baseTitles = titles[category];

      if (Math.random() < 0.15) {
        // 15% chance → special event
        title = specialEvents[Math.floor(Math.random() * specialEvents.length)];
      } else {
        title = baseTitles[Math.floor(Math.random() * baseTitles.length)];
      }
    }

    // 💰 Amount logic
    let amount;

    if (type === "income") {
      const rand = Math.random();

      if (rand < 0.7) {
        amount = Math.floor(Math.random() * 30000) + 20000; // Salary: 20k–50k
      } else if (rand < 0.9) {
        amount = Math.floor(Math.random() * 10000) + 5000; // Freelance: 5k–15k
      } else {
        amount = Math.floor(Math.random() * 3000) + 1000; // Small income
      }
    } else {
      switch (category) {
        case "Food":
          amount = Math.floor(Math.random() * 500) + 100;
          break;
        case "Travel":
          amount = Math.floor(Math.random() * 1500) + 200;
          break;
        case "Entertainment":
          amount = Math.floor(Math.random() * 1000) + 200;
          break;
        case "Bills":
          amount = Math.floor(Math.random() * 5000) + 1000;
          break;
        case "Medical":
          amount = Math.floor(Math.random() * 7000) + 500;
          break;
        case "Education":
          amount = Math.floor(Math.random() * 8000) + 1000;
          break;
        case "Amenities":
          amount = Math.floor(Math.random() * 2000) + 300;
          break;
        default:
          amount = 500;
      }
    }

    // 📅 Date (spread across year)
    const randomDate = new Date(
      2025,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    );

    data.push({
      id: i,
      title,
      amount,
      type,
      category,
      date: randomDate.toISOString().split("T")[0],
    });
  }

  return data;
};

const seedData = generateData();

export default seedData;