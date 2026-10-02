"use client";

import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { Workout, PlanWorkout } from "@/types";

interface PlanContextType {
  plan: PlanWorkout[];
  saved: Workout[];

  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;

  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;

  markAsDone: (id: number) => void;

  metrics: {
    exercises: number;
    minutes: number;
    calories: number;
  };
}

const PlanContext = createContext<PlanContextType | null>(null);

export function PlanProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  // Add workout to Today's Plan
  const addToPlan = (workout: Workout) => {
    // Maximum 5 workouts
    if (plan.length >= 5) {
      toast.error("Today's plan is full! Max 5 workouts.");
      return;
    }

    // Prevent duplicate workout
    if (plan.some((item) => item.id === workout.id)) {
      toast.error("Already in today's plan!");
      return;
    }

    setPlan((prev) => [
      ...prev,
      {
        ...workout,
        isDone: false,
      },
    ]);

    toast.success(`${workout.name} added to plan!`);
  };

  // Add workout to Saved
  const addToSaved = (workout: Workout) => {
    // Prevent duplicate saved workout
    if (saved.some((item) => item.id === workout.id)) {
      toast.error("Already saved!");
      return;
    }

    setSaved((prev) => [...prev, workout]);

    toast.success(`${workout.name} saved for later!`);
  };

  // Remove from Today's Plan
  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));

    toast.success("Removed from plan");
  };

  // Remove from Saved
  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));

    toast.success("Removed from saved");
  };

  // Mark workout as done
  const markAsDone = (id: number) => {
    setPlan((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isDone: true,
            }
          : item
      )
    );

    toast.success("Workout done! Great job!");
  };

  // Calculate metrics automatically
  const metrics = {
    exercises: plan.length,

    minutes: plan.reduce(
      (total, item) => total + item.duration,
      0
    ),

    calories: plan.reduce(
      (total, item) => total + item.caloriesBurned,
      0
    ),
  };

  const value: PlanContextType = {
    plan,
    saved,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    metrics,
  };

  return (
    <PlanContext.Provider value={value}>
      {children}
    </PlanContext.Provider>
  );
}

// Custom hook
export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error(
      "usePlan must be used within a PlanProvider"
    );
  }

  return context;
}