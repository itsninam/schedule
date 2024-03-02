const concertData = [
  {
    id: 0,
    day: new Date("June 20, 2024"),
    timeSlot: [
      {
        hour: 8,
        events: [
          {
            startTime: "8:00 AM",
            title: "Thursday 8:00AM",
            location: "Trip",
          },
          {
            startTime: "8:15 AM",
            title: "Thursday 8:15AM",
            location: "Trip",
          },
        ],
      },
      {
        hour: 12,
        events: [
          {
            startTime: "12:00 PM",
            title: "Thursday 12:00PM",
            location: "Trip",
          },
          {
            startTime: "12:15 PM",
            title: "Thursday 12:15PM",
            location: "Trip",
          },
        ],
      },
    ],
  },
  {
    id: 1,
    day: new Date("Jun 21, 2024"),
    timeSlot: [
      {
        hour: 8,
        events: [
          {
            startTime: "8:00 AM",
            title: "Friday 8:00AM",
            location: "Trip",
          },
          {
            startTime: "8:15 AM",
            title: " Friday 8:15AM",
            location: "Trip",
          },
        ],
      },
      {
        hour: 12,
        events: [
          {
            startTime: "12:00 PM",
            title: "Friday 12:00PM",
            location: "Trip",
          },
          {
            startTime: "12:15 PM",
            title: "Friday 12:15PM",
            location: "Trip",
          },
        ],
      },
    ],
  },
];

export default concertData;
