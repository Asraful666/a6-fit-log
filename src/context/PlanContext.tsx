"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";
import type { PlanWorkout, Workout } from "@/types";

interface PlanContextType {
  plan: PlanWorkout[];
  saved: PlanWorkout[];

  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;

  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;

  markAsDone: (id: number) => void;

  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(
  undefined
);

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

export function PlanProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<PlanWorkout[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(PLAN_KEY);
      const storedSaved = localStorage.getItem(SAVED_KEY);

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }
    } catch (error) {
      console.error("Failed to load FitLog data:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save plan to localStorage
  useEffect(() => {
    if (!isHydrated) return;

    localStorage.setItem(
      PLAN_KEY,
      JSON.stringify(plan)
    );
  }, [plan, isHydrated]);

  // Save saved workouts to localStorage
  useEffect(() => {
    if (!isHydrated) return;

    localStorage.setItem(
      SAVED_KEY,
      JSON.stringify(saved)
    );
  }, [saved, isHydrated]);

  // Add workout to today's plan
  const addToPlan = (workout: Workout) => {
    if (plan.some((item) => item.id === workout.id)) {
      toast("Already in today's plan");
      return;
    }

    if (plan.length >= 5) {
      toast.error(
        "Today's plan can contain only 5 workouts"
      );
      return;
    }

    const newWorkout: PlanWorkout = {
      ...workout,
      isDone: false,
    };

    setPlan((currentPlan) => [
      ...currentPlan,
      newWorkout,
    ]);

    toast.success("Added to today's plan");
  };

  // Remove workout from today's plan
  const removeFromPlan = (id: number) => {
    setPlan((currentPlan) =>
      currentPlan.filter(
        (workout) => workout.id !== id
      )
    );

    toast.success("Removed from today's plan");
  };

  // Save workout for later
  const addToSaved = (workout: Workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast("Already saved");
      return;
    }

    const newWorkout: PlanWorkout = {
      ...workout,
      isDone: false,
    };

    setSaved((currentSaved) => [
      ...currentSaved,
      newWorkout,
    ]);

    toast.success("Saved for later");
  };

  // Remove workout from saved
  const removeFromSaved = (id: number) => {
    setSaved((currentSaved) =>
      currentSaved.filter(
        (workout) => workout.id !== id
      )
    );

    toast.success("Removed from saved");
  };

  // Mark workout as done / undone
  const markAsDone = (id: number) => {
    setPlan((currentPlan) =>
      currentPlan.map((workout) =>
        workout.id === id
          ? {
              ...workout,
              isDone: !workout.isDone,
            }
          : workout
      )
    );

    toast.success("Workout status updated");
  };

  // Check if workout is already in plan
  const isInPlan = (id: number) => {
    return plan.some(
      (workout) => workout.id === id
    );
  };

  // Check if workout is already saved
  const isSaved = (id: number) => {
    return saved.some(
      (workout) => workout.id === id
    );
  };

  const value = useMemo(
    () => ({
      plan,
      saved,
      addToPlan,
      removeFromPlan,
      addToSaved,
      removeFromSaved,
      markAsDone,
      isInPlan,
      isSaved,
    }),
    [plan, saved]
  );

  return (
    <PlanContext.Provider value={value}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error(
      "usePlan must be used inside PlanProvider"
    );
  }

  return context;
}