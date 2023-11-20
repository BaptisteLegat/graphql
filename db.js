const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Event (
      eventId INTEGER PRIMARY KEY,
      name TEXT,
      date TEXT,
      locationId INTEGER,
      FOREIGN KEY (locationId) REFERENCES Location(locationId)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Speaker (
      speakerId INTEGER PRIMARY KEY,
      name TEXT,
      bio TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Attendee (
      attendeeId INTEGER PRIMARY KEY,
      name TEXT,
      email TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Location (
      locationId INTEGER PRIMARY KEY,
      name TEXT,
      capacity INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Session (
      sessionId INTEGER PRIMARY KEY,
      title TEXT,
      time TEXT,
      eventId INTEGER,
      FOREIGN KEY (eventId) REFERENCES Event(eventId)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS SpeakerSession (
      speakerId INTEGER,
      sessionId INTEGER,
      PRIMARY KEY (speakerId, sessionId),
      FOREIGN KEY (speakerId) REFERENCES Speaker(speakerId),
      FOREIGN KEY (sessionId) REFERENCES Session(sessionId)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS AttendeeSession (
      attendeeId INTEGER,
      sessionId INTEGER,
      PRIMARY KEY (attendeeId, sessionId),
      FOREIGN KEY (attendeeId) REFERENCES Attendee(attendeeId),
      FOREIGN KEY (sessionId) REFERENCES Session(sessionId)
    )
  `);
});

module.exports = db;
