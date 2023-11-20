const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Event {
    eventId: ID!
    name: String!
    date: String!
    location: Location!
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
  }

  type Location {
    locationId: ID!
    name: String!
    capacity: Int!
  }

  type Session {
    sessionId: ID!
    title: String!
    time: String!
    event: Event!
  }

  type Query {
    event(eventId: ID!): Event
    events: [Event!]!
    speaker(speakerId: ID!): Speaker
    speakers: [Speaker!]!
    attendee(attendeeId: ID!): Attendee
    attendees: [Attendee!]!
    location(locationId: ID!): Location
    locations: [Location!]!
    session(sessionId: ID!): Session
    sessions: [Session!]!
  }

  type Mutation {
    createEvent(name: String!, date: String!, locationId: ID!): Event
    createSpeaker(name: String!, bio: String!): Speaker
    createAttendee(name: String!, email: String!): Attendee
    createLocation(name: String!, capacity: Int!): Location
    createSession(title: String!, time: String!, eventId: ID!, speakerIds: [ID!], attendeeIds: [ID!]): Session
  }
`);

module.exports = schema;
