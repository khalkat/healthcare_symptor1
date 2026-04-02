# Healthcare Symptom Checker

[![Watch Demo Video](https://img.icons8.com/color/96/video.png)](https://drive.google.com/file/d/19LuJVYdpWiDjHUhLuOyrZLchGGYPftzG/view?usp=sharing)

🎥 **Click the image above to watch the demo video**

---

This is a full-stack web application that allows users to input their symptoms and receive possible health conditions along with general advice using an AI-powered system.

⚠️ This project is created for educational purposes only and should not be considered a reliable medical solution.

---

## 🚀 Key Features

* Users can enter symptoms through a simple interface
* The input is processed using an AI model via the Groq API
* The system provides:

  * Likely health conditions
  * Estimated severity
  * Basic suggestions
  * Advice on when professional medical help may be needed
* Previous user queries are saved in a database for future reference

---

## 🛠️ Technologies Used

### Frontend

* React (with Vite)
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB

### AI Integration

* Groq API
* Model used: `openai/gpt-oss-120b`

---

## 📁 Project Structure

backend/
  controllers/
  models/
  routes/
  config/
  server.js

frontend/
  src/
  public/

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/m-atharkhan/Healthcare-Symptor.git
cd Healthcare-Symptor

---

### 2️⃣ Backend Configuration

cd backend
npm install

Create a `.env` file and include the following:

MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_api_key

Start the backend server:

npm start

---

### 3️⃣ Frontend Configuration

cd frontend
npm install
npm run dev

---

## 📌 How to Use

* Launch the application in your browser
* Enter your symptoms (for example: fever, headache)
* Click on the **Analyze** button
* View the generated results instantly
* Past queries will be stored and can be accessed later

---

## 🔗 API Details

### POST /analyze

Request Body:
{
"symptoms": "fever, headache"
}

---

### GET /history

Retrieves all previously stored symptom records.

---

## ⚠️ Disclaimer

This application is not intended for medical diagnosis or treatment.
Always consult a qualified healthcare professional for medical concerns.

---

## 👤 Author

Khalkat Jahan
