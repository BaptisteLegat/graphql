const events = [
  { eventId: "0", name: 'Tech Conference', date: '2023-12-01', locationId: "0" },
  { eventId: "1", name: 'Startup Summit', date: '2023-11-15', locationId: "1" }
];

const speakers = [
  { speakerId: "0", name: 'John Doe', bio: 'Experienced Tech Speaker' },
  { speakerId: "1", name: 'Jane Smith', bio: 'Entrepreneur and Innovator' }
];

const attendees = [
  { attendeeId: "0", name: 'Alice', email: 'alice@example.com' },
  { attendeeId: "1", name: 'Bob', email: 'bob@example.com' }
];

const locations = [
  { locationId: "0", name: 'Convention Center', capacity: 500 },
  { locationId: "1", name: 'Tech Hub', capacity: 200 }
];

const sessions = [
  { sessionId: "0", title: 'Web Development Trends', time: '10:00 AM', eventId: "0" },
  { sessionId: "1", title: 'Startup Success Stories', time: '2:00 PM', eventId: "1" }
];

const speakerSessions = [
  { speakerId: "0", sessionId: "0" },
  { speakerId: "1", sessionId: "1" }
];

const attendeeSessions = [
  { attendeeId: "0", sessionId: "0" },
  { attendeeId: "1", sessionId: "1" }
];

const root = {
  event: ({eventId}) => {
    const event = events.find(event => event.eventId === eventId);
    return event;
  },

  events: () => {
    return events;
  },

  createEvent: ({name, date, locationId}) => {
    const newEvent = { eventId: String(events.length + 1), name, date, locationId: locationId };
    events.push(newEvent);
    return newEvent;
  },

  speaker: ({speakerId}) => {
    const speaker = speakers.find(speaker => speaker.speakerId === speakerId);
    return speaker;
  },

  speakers: () => {
    return speakers;
  },

  createSpeaker: ({name, bio}) => {
    const newSpeaker = { speakerId: String(speakers.length + 1), name, bio };
    speakers.push(newSpeaker);
    return newSpeaker;
  },

  attendee: ({attendeeId}) => {
    const attendee = attendees.find(attendee => attendee.attendeeId === attendeeId);
    return attendee;
  },

  attendees: () => {
    return attendees;
  },

  createAttendee: ({name, email}) => {
    const newAttendee = { attendeeId: String(attendees.length + 1), name, email };
    attendees.push(newAttendee);
    return newAttendee;
  },

  location: ({locationId}) => {
    const location = locations.find(location => location.locationId === locationId);
    return location;
  },

  locations: () => {
    return locations;
  },

  createLocation: ({name, capacity}) => {
    const newLocation = { locationId: String(locations.length + 1), name, capacity };
    locations.push(newLocation);
    return newLocation;
  },

  session: ({sessionId}) => {
    const session = sessions.find(session => session.sessionId === sessionId);
    return session;
  },

  sessions: () => {
    return sessions;
  },

  createSession: ({ title, time, eventId, speakerIds, attendeeIds }) => {
    const newSession = { sessionId: String(sessions.length + 1), title, time, eventId };
    sessions.push(newSession);
  
    if (Array.isArray(speakerIds)) {
      speakerIds.forEach((speakerId) => {
        const newSpeakerSession = { speakerId, sessionId: newSession.sessionId };
        speakerSessions.push(newSpeakerSession);
      });
    }
  
    if (Array.isArray(attendeeIds)) {
      attendeeIds.forEach((attendeeId) => {
        const newAttendeeSession = { attendeeId, sessionId: newSession.sessionId };
        attendeeSessions.push(newAttendeeSession);
      });
    }
  
    return newSession;
  }  
};

module.exports = root;
