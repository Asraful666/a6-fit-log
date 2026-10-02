# A6 FitLog

A modern and responsive workout library built with Next.js. FitLog allows users to browse workouts, view detailed exercise information, save workouts for later, and create a personal workout plan.



## 🛠️ Technologies Used

* Next.js
* React
* TypeScript
* Tailwind CSS
* CSS
* Next.js App Router
* Context API
* React Hot Toast
* REST API

## ✨ Key Features

1. **Workout Library**
   Browse workouts covering different major muscle groups.

2. **Workout Details**
   View exercise image, description, equipment, difficulty, sets, reps, duration, calories, rating, and instructions.

3. **Today's Plan**
   Add workouts to a personal workout plan and manage planned exercises.

4. **Saved Workouts**
   Save workouts for later and access them from the My Plan page.

5. **Workout Management**
   Mark planned workouts as done or remove them from the plan.

6. **Workout Sorting**
   Sort workouts by duration, calories, or rating.

7. **Responsive Design**
   The website works across mobile, tablet, and desktop screen sizes.

8. **Toast Notifications**
   Users receive feedback when adding, saving, completing, or removing workouts.

9. **Dynamic Workout Pages**
   Each workout has its own dynamic details route.

10. **Custom 404 Page**
    Invalid routes display a dedicated not-found page.

## 📁 Main Pages

* `/` — Workout Library
* `/workout/[id]` — Workout Details
* `/my-plan` — Today's Plan and Saved Workouts

## 🔌 API

FitLog uses the provided FitLog API to load workout data.

All workouts:

`https://api.abcz.workers.dev/api/fitlog`

Single workout:

`https://api.abcz.workers.dev/api/fitlog/:id`

## 📱 Responsive

The interface is designed for:

* Mobile
* Tablet
* Desktop

## 🎯 Project Goal

The goal of this project is to create a clean, responsive workout library and planning experience following the provided FitLog design and assignment requirements.
