# Chat Frontend Challenge

## Overview

This project is a frontend implementation of a simple chat application built using **React + TypeScript + Vite**. It interacts with a backend API to fetch and send messages in real time.

The goal of this project is to demonstrate:

* Clean React architecture
* API integration
* State management
* Responsive UI design
* Accessibility and performance considerations

---

## Tech Stack

* React
* TypeScript
* Vite
* Axios (API calls)

---

## Features

* Fetch messages from backend API
* Display messages in reverse chronological order
* Send new messages
* Optimistic UI updates
* Loading and error states
* Responsive design (mobile + desktop)
* Accessible UI structure

---

## API Integration

All endpoints require a Bearer token.

### Get Messages

```
GET /api/v1/messages
```

Supports pagination:

```
GET /api/v1/messages?after=<timestamp>&limit=10
```

### Send Message

```
POST /api/v1/messages
```

Example payload:

```json
{
  "message": "Hello world",
  "author": "Sejal Pande"
}
```

---
å
## Setup Instructions

### Install dependencies

```
npm install
```

### Run development server

```
npm run dev
```

### Build for production

```
npm run build
```

---

## Project Structure

```
src/
├── api/
├── components/
├── hooks/
├── types/
├── styles/
├── App.tsx
├── utils/
└── main.tsx
```

---

## Design Decisions

* Implemented optimistic updates for better UX during message sending
* Kept component structure modular for maintainability
* Focused on responsive and accessible UI from the start

---

## Future Improvements

If more time was available:

* Add message virtualization for large datasets
* Add user authentication
* Add message grouping by date

---

## Author
Sejal P.