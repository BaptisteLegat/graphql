const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Event {
    eventId: ID!
    name: String!
    date: String!
    location: Location!
    sessions: [Session!]!
  }

  type Location {
    locationId: ID!
    name: String!
    capacity: Int!
    events: [Event!]!
  }

  type Speaker {
    speakerId: ID!
    name: String!
    bio: String!
    sessions: [Session!]!
  }
  
  type Attendee {
    attendeeId: ID!
    name: String!
    email: String!
    sessions: [Session!]!
  }

  type Session {
    sessionId: ID!
    title: String!
    time: String!
    event: Event!
    speakers: [Speaker!]!
    attendees: [Attendee!]!
  }

  type Query {
    event(eventId: ID!): Event
    events: [Event!]!
    location(locationId: ID!): Location
    locations: [Location!]!
    speaker(speakerId: ID!): Speaker
    speakers: [Speaker!]!
    attendee(attendeeId: ID!): Attendee
    attendees: [Attendee!]!
    session(sessionId: ID!): Session
    sessions: [Session!]!
  }

  type Mutation {
    createEvent(name: String!, date: String!, locationId: ID!): Event
    createSpeaker(name: String!, bio: String!): Speaker
    createAttendee(name: String!, email: String!): Attendee
    createLocation(name: String!, capacity: Int!): Location
    createSession(title: String!, time: String!, eventId: ID!, speakerIds: [ID!], attendeeIds: [ID!]): Session
    
    updateEvent(eventId: ID!, name: String, date: String, locationId: ID): Event
    updateSpeaker(speakerId: ID!, name: String, bio: String): Speaker
    updateAttendee(attendeeId: ID!, name: String, email: String): Attendee
    updateLocation(locationId: ID!, name: String, capacity: Int): Location
    updateSession(sessionId: ID!, title: String, time: String, eventId: ID, speakerIds: [ID!], attendeeIds: [ID!]): Session

    deleteEvent(eventId: ID!): Event
    deleteSpeaker(speakerId: ID!): Speaker
    deleteAttendee(attendeeId: ID!): Attendee
    deleteLocation(locationId: ID!): Location
    deleteSession(sessionId: ID!): Session
  }
`);

module.exports = schema;
