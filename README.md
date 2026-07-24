# 📱 Guess the Number — React Native Mobile App

> A feature-rich "Guess the Number" mini-game built with **React Native (Expo)**, featuring secure credential storage, local high-score persistence via SQLite, and modern file-based routing. Developed as part of the Mobile Developer hiring process.

---

## 🚀 Key Features

* **Cross-Platform Compatibility:** Built with **React Native** and **Expo** for seamless performance on both iOS and Android.
* **Secure Authentication:**
* User Registration and Login flow.
* Credentials stored securely using **AES encryption** via `expo-secure-store`.


* **Engaging Game Logic:**
* Random number generation between **1 and 43**.
* Real-time hint system (*Higher / Lower* feedback).
* Live attempt counter to track current performance.


* **Persistent Local Database:**
* Powered by **SQLite** (`expo-sqlite`) to track personal bests (lowest number of guesses).
* High score integration: Displays the user's best score right on the login screen upon return.


* **Modern Navigation:** Utilizes **Expo Router** for clean, file-based routing.

---

## 🛠️ Tech Stack

* **Framework:** React Native (Expo SDK 57)
* **Language:** TypeScript
* **Database:** SQLite (`expo-sqlite`)
* **Security:** Expo SecureStore
* **Navigation:** Expo Router

---

## 📦 Installation & Setup

Follow these steps to get the project up and running locally:

### 1. Clone the Repository

```bash
git clone https://github.com/AhmedMohamedKhairy123-git/mobile-developer-technical-task.git
cd mobile-developer-technical-task

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Start the Application

```bash
npx expo start

```

### 4. Run on Your Device

* Scan the generated **QR code** using the **Expo Go** app on your iOS or Android device (must be latest version SDX 57 from here:https://expo.dev/go?sdkVersion=57&platform=android&device=true), or run it on a local emulator.

---

## 📁 Project Structure

```text
mobile-developer-technical-task/
│
├── src/
│   ├── app/        # Application screens and Expo Router navigation logic
│   └── services/   # Business logic for Auth (SecureStore) and Database (SQLite)
│
├── assets/         # Application images, icons, and static resources
└── README.md

```
Candidate: Ahmed Mohamed Khairy
Task: Mobile Developer Technical Task