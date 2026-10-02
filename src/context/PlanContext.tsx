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

  // Load localStorage
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

  // Save plan
  useEffect(() => {
    if (!isHydrated) return;

    localStorage.setItem(
      PLAN_KEY,
      JSON.stringify(plan)
    );
  }, [plan, isHydrated]);

  // Save saved workouts
  useEffect(() => {
    if (!isHydrated) return;

    localStorage.setItem(
      SAVED_KEY,
      JSON.stringify(saved)
    );
  }, [saved, isHydrated]);

  // Add workout to today's plan
  const addToPlan = (workout: Workout) => {
    setPlan((currentPlan) => {
      if (currentPlan.some((item) => item.id === workout.id)) {
        toast("Already in today's plan");
        return currentPlan;
      }

      if (currentPlan.length >= 5) {
        toast.error("Today's plan can contain only 5 workouts");
        return currentPlan;
      }

      const newWorkout: PlanWorkout = {
        ...workout,
        isDone: false,
      };

      toast.success("Added to today's plan");

      return [...currentPlan, newWorkout];
    });
  };

  // Remove from plan
  const removeFromPlan = (id: number) => {
    setPlan((currentPlan) =>
      currentPlan.filter((workout) => workout.id !== id)
    );

    toast.success("Removed from today's plan");
  };

  // Add to saved
  const addToSaved = (workout: Workout) => {
    setSaved((currentSaved) => {
      if (currentSaved.some((item) => item.id === workout.id)) {
        toast("Already saved");
        return currentSaved;
      }

      const newWorkout: PlanWorkout = {
        ...workout,
        isDone: false,
      };

      toast.success("Saved for later");

      return [...currentSaved, newWorkout];
    });
  };

  // Remove from saved
  const removeFromSaved = (id: number) => {
    setSaved((currentSaved) =>
      currentSaved.filter((workout) => workout.id !== id)
    );

    toast.success("Removed from saved");
  };

  // Mark as done
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

  const isInPlan = (id: number) => {
    return plan.some((workout) => workout.id === id);
  };

  const isSaved = (id: number) => {
    return saved.some((workout) => workout.id === id);
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