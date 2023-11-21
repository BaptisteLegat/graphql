const events = [
  { eventId: "0", name: 'Tech Conference', date: '2023-12-01', locationId: "0", sessions: ["0"] },
  { eventId: "1", name: 'Startup Summit', date: '2023-11-15', locationId: "1", sessions: ["1"] }
];

const locations = [
  { locationId: "0", name: 'Convention Center', capacity: 500, events: ["0"] },
  { locationId: "1", name: 'Tech Hub', capacity: 200, events: ["1"] }
];

const speakers = [
  { speakerId: "0", name: 'John Doe', bio: 'Experienced Tech Speaker', sessions: ["0"] },
  { speakerId: "1", name: 'Jane Smith', bio: 'Entrepreneur and Innovator', sessions: ["1"] }
];

const attendees = [
  { attendeeId: "0", name: 'Alice', email: 'alice@example.com', sessions: ["0"] },
  { attendeeId: "1", name: 'Bob', email: 'bob@example.com', sessions: ["1"] }
];

const sessions = [
  { sessionId: "0", title: 'Web Development Trends', time: '10:00 AM', eventId: "0", speakers: ["0"], attendees: ["0"] },
  { sessionId: "1", title: 'Startup Success Stories', time: '2:00 PM', eventId: "1", speakers: ["1"], attendees: ["1"] }
];

const root = {
  event: ({ eventId }) => {
    const eventData = events.find(event => event.eventId === eventId);
    if (!eventData) {
      return null;
    }

    const eventSessions = sessions.filter(session => session.eventId === eventId);
    const locationData = locations.find(location => location.locationId === eventData.locationId);

    return {
      ...eventData,
      location: locationData,
      sessions: eventSessions,
    };
  },

  events: () => events.map(eventData => {
    const locationData = locations.find(location => location.locationId === eventData.locationId);
    const eventSessions = sessions.filter(session => session.eventId === eventData.eventId);
    return {
      ...eventData,
      location: locationData,
      sessions: eventSessions,
    };
  }),

  location: ({ locationId }) => {
    const locationData = locations.find(location => location.locationId === locationId);
    if (!locationData) {
      return null;
    }

    const locationEvents = events.filter(event => event.locationId === locationId);

    return {
      ...locationData,
      events: locationEvents,
    };
  },

  locations: () => locations.map(locationData => {
    const locationEvents = events.filter(event => event.locationId === locationData.locationId);
    return {
      ...locationData,
      events: locationEvents,
    };
  }),

  speaker: ({ speakerId }) => {
    const speakerData = speakers.find(speaker => speaker.speakerId === speakerId);
    if (!speakerData) {
      return null;
    }

    const speakerSessions = sessions.filter(session => session.speakers.includes(speakerId));

    return {
      ...speakerData,
      sessions: speakerSessions,
    };
  },

  speakers: () => speakers.map(speakerData => {
    const speakerSessions = sessions.filter(session => session.speakers.includes(speakerData.speakerId));
    return {
      ...speakerData,
      sessions: speakerSessions,
    };
  }),

  attendee: ({ attendeeId }) => {
    const attendeeData = attendees.find(attendee => attendee.attendeeId === attendeeId);
    if (!attendeeData) {
      return null;
    }

    const attendeeSessions = sessions.filter(session => session.attendees.includes(attendeeId));

    return {
      ...attendeeData,
      sessions: attendeeSessions,
    };
  },

  attendees: () => attendees.map(attendeeData => {
    const attendeeSessions = sessions.filter(session => session.attendees.includes(attendeeData.attendeeId));
    return {
      ...attendeeData,
      sessions: attendeeSessions,
    };
  }),

  session: ({ sessionId }) => {
    const sessionData = sessions.find(session => session.sessionId === sessionId);
    if (!sessionData) {
      return null;
    }

    const eventData = events.find(event => event.eventId === sessionData.eventId);
    const speakerData = speakers.filter(speaker => sessionData.speakers.includes(speaker.speakerId));
    const attendeeData = attendees.filter(attendee => sessionData.attendees.includes(attendee.attendeeId));

    return {
      ...sessionData,
      event: eventData,
      speakers: speakerData,
      attendees: attendeeData,
    };
  },

  sessions: () => sessions.map(sessionData => {
    const eventData = events.find(event => event.eventId === sessionData.eventId);
    const speakerData = speakers.filter(speaker => sessionData.speakers.includes(speaker.speakerId));
    const attendeeData = attendees.filter(attendee => sessionData.attendees.includes(attendee.attendeeId));

    return {
      ...sessionData,
      event: eventData,
      speakers: speakerData,
      attendees: attendeeData,
    };
  }),

  createEvent: ({ name, date, locationId }) => {
    const newEvent = {
      eventId: String(events.length + 1),
      name,
      date,
      locationId: locationId,
    };
    events.push(newEvent);
    return newEvent;
  },

  createSpeaker: ({ name, bio }) => {
    const newSpeaker = {
      speakerId: String(speakers.length + 1),
      name,
      bio,
    };
    speakers.push(newSpeaker);
    return newSpeaker;
  },

  createAttendee: ({ name, email }) => {
    const newAttendee = {
      attendeeId: String(attendees.length + 1),
      name,
      email,
    };
    attendees.push(newAttendee);
    return newAttendee;
  },

  createLocation: ({ name, capacity }) => {
    const newLocation = {
      locationId: String(locations.length + 1),
      name,
      capacity,
    };
    locations.push(newLocation);
    return newLocation;
  },

  createSession: ({ title, time, eventId, speakerIds, attendeeIds }) => {
    const newSession = {
      sessionId: String(sessions.length + 1),
      title,
      time,
      eventId,
    };

    if (speakerIds) {
      newSession.speakers = speakers.filter(speaker => speakerIds.includes(speaker.speakerId));
    }

    if (attendeeIds) {
      newSession.attendees = attendees.filter(attendee => attendeeIds.includes(attendee.attendeeId));
    }

    sessions.push(newSession);
    return newSession;
  },

  updateEvent: ({ eventId, name, date, locationId }) => {
    const eventIndex = events.findIndex(event => event.eventId === eventId);

    if (eventIndex === -1) {
      throw new Error("Event not found");
    }

    if (name !== undefined) {
      events[eventIndex].name = name;
    }
    if (date !== undefined) {
      events[eventIndex].date = date;
    }
    if (locationId !== undefined) {
      events[eventIndex].locationId = locationId;
    }

    const eventSessions = sessions.filter(session => session.eventId === eventId);

    const locationData = locations.find(location => location.locationId === events[eventIndex].locationId);

    return {
      ...events[eventIndex],
      location: locationData,
      sessions: eventSessions,
    };
  },

  updateSpeaker: ({ speakerId, name, bio }) => {
    const speakerIndex = speakers.findIndex(speaker => speaker.speakerId === speakerId);

    if (speakerIndex === -1) {
      throw new Error("Speaker not found");
    }

    if (name !== undefined) {
      speakers[speakerIndex].name = name;
    }
    if (bio !== undefined) {
      speakers[speakerIndex].bio = bio;
    }

    const speakerSessions = sessions.filter(session => session.speakers.includes(speakerId));

    return {
      ...speakers[speakerIndex],
      sessions: speakerSessions,
    };
  },

  updateAttendee: ({ attendeeId, name, email }) => {
    const attendeeIndex = attendees.findIndex(attendee => attendee.attendeeId === attendeeId);

    if (attendeeIndex === -1) {
      throw new Error("Attendee not found");
    }

    if (name !== undefined) {
      attendees[attendeeIndex].name = name;
    }
    if (email !== undefined) {
      attendees[attendeeIndex].email = email;
    }

    const attendeeSessions = sessions.filter(session => session.attendees.includes(attendeeId));

    return {
      ...attendees[attendeeIndex],
      sessions: attendeeSessions,
    };
  },

  updateLocation: ({ locationId, name, capacity }) => {
    const locationIndex = locations.findIndex(location => location.locationId === locationId);

    if (locationIndex === -1) {
      throw new Error("Location not found");
    }

    if (name !== undefined) {
      locations[locationIndex].name = name;
    }
    if (capacity !== undefined) {
      locations[locationIndex].capacity = capacity;
    }

    const locationEvents = events.filter(event => event.locationId === locationId);

    return {
      ...locations[locationIndex],
      events: locationEvents,
    };
  },

  updateSession: ({ sessionId, title, time, eventId, speakerIds, attendeeIds }) => {
    const sessionIndex = sessions.findIndex(session => session.sessionId === sessionId);

    if (sessionIndex === -1) {
      throw new Error("Session not found");
    }

    if (title !== undefined) {
      sessions[sessionIndex].title = title;
    }
    if (time !== undefined) {
      sessions[sessionIndex].time = time;
    }
    if (eventId !== undefined) {
      sessions[sessionIndex].eventId = eventId;
    }
    if (speakerIds !== undefined) {
      sessions[sessionIndex].speakers = speakers.filter(speaker => speakerIds.includes(speaker.speakerId));
    }
    if (attendeeIds !== undefined) {
      sessions[sessionIndex].attendees = attendees.filter(attendee => attendeeIds.includes(attendee.attendeeId));
    }

    const eventData = events.find(event => event.eventId === sessions[sessionIndex].eventId);
    const speakerData = speakers.filter(speaker => sessions[sessionIndex].speakers.includes(speaker.speakerId));
    const attendeeData = attendees.filter(attendee => sessions[sessionIndex].attendees.includes(attendee.attendeeId));

    return {
      ...sessions[sessionIndex],
      event: eventData,
      speakers: speakerData,
      attendees: attendeeData,
    };
  },

  deleteEvent: ({ eventId }) => {
    const eventIndex = events.findIndex(event => event.eventId === eventId);
  
    if (eventIndex === -1) {
      throw new Error("Event not found");
    }
  
    const deletedEvent = events.splice(eventIndex, 1)[0];
  
    const remainingSessions = sessions.filter(session => session.eventId !== eventId);
    sessions.length = 0;
    sessions.push(...remainingSessions);
  
    return deletedEvent;
  },

  deleteSpeaker: ({ speakerId }) => {
    const speakerIndex = speakers.findIndex(speaker => speaker.speakerId === speakerId);
  
    if (speakerIndex === -1) {
      throw new Error("Speaker not found");
    }
  
    const deletedSpeaker = speakers.splice(speakerIndex, 1)[0];
  
    const remainingSessions = sessions.filter(session => !session.speakers.includes(speakerId));
    sessions.length = 0;
    sessions.push(...remainingSessions);
  
    return deletedSpeaker;
  },

  deleteAttendee: ({ attendeeId }) => {
    const attendeeIndex = attendees.findIndex(attendee => attendee.attendeeId === attendeeId);
  
    if (attendeeIndex === -1) {
      throw new Error("Attendee not found");
    }
  
    const deletedAttendee = attendees.splice(attendeeIndex, 1)[0];
  
    const remainingSessions = sessions.filter(session => !session.attendees.includes(attendeeId));
    sessions.length = 0;
    sessions.push(...remainingSessions);
  
    return deletedAttendee;
  },

  deleteLocation: ({ locationId }) => {
    const locationIndex = locations.findIndex(location => location.locationId === locationId);
  
    if (locationIndex === -1) {
      throw new Error("Location not found");
    }
  
    const deletedLocation = locations.splice(locationIndex, 1)[0];
  
    const remainingEvents = events.filter(event => event.locationId !== locationId);
    events.length = 0;
    events.push(...remainingEvents);
  
    return deletedLocation;
  },

  deleteSession: ({ sessionId }) => {
    const sessionIndex = sessions.findIndex(session => session.sessionId === sessionId);
  
    if (sessionIndex === -1) {
      throw new Error("Session not found");
    }
  
    const deletedSession = sessions.splice(sessionIndex, 1)[0];
  
    return deletedSession;
  },
};

module.exports = root;
