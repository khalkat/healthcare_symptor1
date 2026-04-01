# Healthcare Symptom Checker

## 🎥 Demo Video

https://www.loom.com/share/cbd7f9f45b6d42438b94b2d4f96706d9

Short demo of the application showing full flow (input → AI → output → history)

---


A simple full-stack app where you can enter symptoms and get possible conditions and suggestions using an AI model.

This is built for learning purposes and not for real medical use.

---

## What it does

* Takes symptoms as input
* Sends them to an AI model (via Groq API)
* Returns:

  * possible conditions
  * severity
  * basic recommendations
  * when to see a doctor
* Saves previous searches in database

---

## Tech Stack

Frontend:

* React (Vite)
* Tailwind CSS

Backend:

* Node.js
* Express
* MongoDB

AI:

* Groq API
* Model: `openai/gpt-oss-120b`

---

## Folder Structure

```
backend/
  controllers/
  models/
  routes/
  config/
  server.js

frontend/
  src/
  public/
```

---

## Setup

Clone repo:

```
git clone https://github.com/m-atharkhan/Healthcare-Symptor.git
cd Healthcare-Symptor
```

### Backend

```
cd backend
npm install
```

Create `.env`:

```
MONGO_URI=your_mongodb_uri
GROQ_API_KEY=your_api_key
```

Run:

```
npm start
```

---

### Frontend

```
cd frontend
npm install
npm run dev
```

---

## Usage

* Open the app
* Enter symptoms
* Click analyze
* Results will be shown below
* Previous results are stored

---

## API

POST `/analyze`

```
{
  "symptoms": "fever, headache"
}
```

GET `/history`

Returns stored records

---

## Note

This is not a medical tool.
Do not rely on it for actual diagnosis.

---

## Author

Mohammad Athar
