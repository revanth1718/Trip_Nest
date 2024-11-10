export const SelectedTravelList = [
    {
        id: 1,
        title: "Just Me",
        desc: "A sole traveler in exploration",
        icon: "✈️",
        people: '1',
    },
    {
        id: 2,
        title: "A Couple",
        desc: "Two travelers in tandem",
        icon: "🥂",
        people: '2 people',
    },
    {
        id: 3,
        title: "Family",
        desc: "A group of fun-loving adventurers",
        icon: "🏡",
        people: '2 people and 2 children ', // Assuming a typical family size
    },
    {
        id: 4,
        title: "Friends",
        desc: "A bunch of thrill-seekers",
        icon: "⛵",
        people: '4 people', // Adjust the number based on group size
    },
];

export const SelectedBudgetOptions = [
    {
        id: 1,
        title: "Cheap",
        desc: "Stay conscious of costs",
        icon: "💵",
    },
    {
        id: 2,
        title: "Moderate",
        desc: "Keep cost on the average side",
        icon: "💰",
    },
    {
        id: 3,
        title: "Luxury",
        desc: "Don’t worry about cost",
        icon: "💸",
    },
];

export const AI_PROMPT='Generate Travel Plan for locaton : {location} for {noOfDays} Days for {traveler} with a {budget} budget ,Give me a hotels list with the hotelName, hotelAddress, price, hotelImageUrl, geoCoordinates, rating, and descriptions and suggest itinerary  with placeName, placeDetails, placeImageUrl, geoCoordinates, ticketPricing, rating and time to travel each of the location for {noOfDays} days with each day plan with best time to visit JSON format.'
