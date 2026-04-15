
# 🍔 Foodles – Delivers food 🍔
"Craving something delicious? Our food delivery app makes it effortless — explore top restaurants, customize your order, watch your meal travel to you in real time, and enjoy fresh, hot food delivered faster than you can say ‘I’m hungry!’"

Foodles is a full-featured React Native food delivery app built with the power of [React Native Paper](https://callstack.github.io/react-native-paper/) to deliver a clean, modern, and responsive UI.  
It’s designed to give users a smooth experience — from browsing restaurants to tracking their delivery in real time.

---

##  Key Features

-  **Modern Material UI** – Built with React Native Paper for consistent, beautiful design.
-  **Restaurant & Menu Browsing** – Explore local restaurants and view detailed menus.
-  **Simple Ordering Flow** – Add to cart, customize items, and place your order with a single tap.
-  **Live Order Tracking** – Watch your order progress from kitchen to doorstep.
-  **Secure Authentication** – Signup/Login with validation and state persistence.
-  **Light & Dark Themes** – Seamlessly switch between light and dark modes.
-  **Fast & Responsive** – Optimized for both iOS and Android.

---

## 🔐 Authentication

- **Login & Signup Screens:** Implemented with form validation and navigation bar.
- **Navigation:** Seamless transition between Login, Signup, and Home screens.
- **UI Components:** Utilized React Native Paper for consistent design.


## 🛠 Tech Stack

| Layer          | Technology |
|---------------|------------|
| Frontend      | **React Native** (with Expo) |
| UI Components | **React Native Paper** |
| Navigation    | React Navigation (Stack + Bottom Tabs) |
| State Mgmt    | Context API / Redux (optional) |
| Backend       | REST API or Firebase (for auth, orders, real-time updates) |
| Networking    | Axios / Fetch API |

---

## Project Structure

```
Foodles/
│── components/        # Reusable UI components
│── screens/           # App screens
│── features/          # Redux slices
│── services/          # API layer
│── mock-api/          # Mock backend
│── assets/            # Images
│── App.js             # Entry point
│── store.js           # Redux store
```

---

## Installation

```
git clone https://github.com/your-username/foodles.git
cd foodles
npm install
npx expo start
```

Run on:

* Android emulator (press "a")
* iOS simulator (press "i")
* Physical device using Expo Go

---

## Future Improvements

* User authentication (Firebase / JWT)
* Persistent cart storage
* Checkout flow (address, payment, coupons)
* Favorites and order history
* Backend integration for orders and users
* Admin dashboard and analytics

---




