# GraphQl API

## Description

Un serveur GraphQL qui permet de gérer des événements, des emplacements, des orateurs, des participants et des sessions.
Dans le fichier __resolvers.js__, vous trouverez les fonctions de résolution pour chaque type de données. 
Dans le fichier __types.js__, vous trouverez le schéma GraphQL qui définit les types de données.
Dans le fichier __server.js__, vous trouverez la configuration du serveur GraphQL.

## Installation

```bash
$ npm install
```

## Démarage du serveur

```bash
# development
$ npm run dev
```

## Description des données

### Événements (events)
Les événements représentent des occurrences planifiées, tels que des conférences ou des sommets de start-up.

_eventId_: Identifiant unique de l'événement.

_name_: Nom de l'événement.

_date_: Date de l'événement au format 'YYYY-MM-DD'.

_locationId_: Identifiant de l'emplacement où se déroule l'événement.

_sessions_: Liste d'identifiants des sessions associées à cet événement.

### Emplacements (locations)
Les emplacements représentent des lieux où les événements peuvent avoir lieu.

_locationId_: Identifiant unique de l'emplacement.

_name_: Nom de l'emplacement.

_capacity_: Capacité maximale de personnes pouvant être accueillies.

_events_: Liste d'identifiants des événements qui ont lieu à cet emplacement.

### Orateurs (speakers)
Les orateurs représentent les personnes qui interviennent lors des sessions de l'événement.

_speakerId_: Identifiant unique de l'orateur.

_name_: Nom de l'orateur.

_bio_: Biographie de l'orateur.

_sessions_: Liste d'identifiants des sessions auxquelles cet orateur participe.

### Participants (attendees)
Les participants représentent les personnes inscrites pour assister à des sessions d'événements.

_attendeeId_: Identifiant unique du participant.

_name_: Nom du participant.

_email_: Adresse e-mail du participant.

_sessions_: Liste d'identifiants des sessions auxquelles ce participant est inscrit.

### Sessions (sessions)
Les sessions représentent des segments spécifiques d'un événement, tels que des présentations ou des ateliers.

_sessionId_: Identifiant unique de la session.

_title_: Titre de la session.

_time_: Heure de la session.

_eventId_: Identifiant de l'événement auquel la session est associée.

_speakers_: Liste d'identifiants des orateurs participant à la session.

_attendees_: Liste d'identifiants des participants inscrits à la session.

## Exemples de requêtes
__Conseil__: Utilisez Postman car il permet de faire des requêtes GraphQL et il utilise le schéma définit dans le fichier __types.js__. Pour ce faire, il faut créer une nouvelle request et de changer son type (exemple de HTTP à GraphQL) situé à coté du titre de la requête.

### Récupérer tous les événements
```graphql
query Events {
    events {
        eventId
        name
        date
        location {
            locationId
            name
            capacity
        }
        sessions {
            sessionId
            title
            time
        }
    }
}
```
### Créer un événement
```graphql
mutation CreateEvent {
    createEvent(name: "Test", date: "2023", locationId: "0") {
        eventId
        name
        date
    }
}
```

### Mettre à jour un événement
```graphql
mutation UpdateEvent {
    updateEvent(eventId: "1", name: "Test2") {
        eventId
        name
        date
    }
}
```

### Supprimer un événement
```graphql
mutation DeleteEvent {
    deleteEvent(eventId: "1") {
        eventId
        name
        date
    }
}
```