"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getWorkoutById } from "@/utils/api";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/types";

export default function WorkoutDetailsPage() {
  const params = useParams();
  const id = String(params.id);

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const {
    addToPlan,
    addToSaved,
    isInPlan,
    isSaved,
  } = usePlan();

  useEffect(() => {
    async function loadWorkout() {
      try {
        setLoading(true);
        setError(false);

        const data = await getWorkoutById(id);

        setWorkout(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadWorkout();
  }, [id]);

  if (loading) {
    return (
      <main className="details-page">
        <div className="details-loading">
          <div className="loading-spinner"></div>
          <p>Loading workout...</p>
        </div>
      </main>
    );
  }

  if (error || !workout) {
    return (
      <main className="details-page">
        <div className="details-error">
          <h1>WORKOUT NOT FOUND</h1>

          <p>
            The workout you are looking for does not exist.
          </p>

          <Link
            href="/"
            className="back-workouts-btn"
          >
            Back to workouts
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="details-page">
      <section className="details-container">

        {/* ================= LEFT - IMAGE ================= */}

        <div className="details-image-wrapper">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 50vw"
            className="details-image"
            unoptimized
          />
        </div>

        {/* ================= RIGHT - CONTENT ================= */}

        <div className="details-content">

          <h1>{workout.name}</h1>

          <p className="details-description">
            {workout.description}
          </p>

          {/* ================= TAGS ================= */}

          <div className="details-tags">
            {workout.muscleGroups.map((group) => (
              <span key={group}>
                {group}
              </span>
            ))}
          </div>

          {/* ================= SPECS ================= */}

          <div className="details-specs">

            <div className="spec-row">
              <span>EQUIPMENT</span>
              <strong>
                {workout.equipment}
              </strong>
            </div>

            <div className="spec-row">
              <span>DIFFICULTY</span>
              <strong>
                {workout.difficulty}
              </strong>
            </div>

            <div className="spec-row">
              <span>SETS</span>
              <strong>
                {workout.sets}
              </strong>
            </div>

            <div className="spec-row">
              <span>REPS</span>
              <strong>
                {workout.reps}
              </strong>
            </div>

            <div className="spec-row">
              <span>DURATION</span>
              <strong>
                {workout.duration} min
              </strong>
            </div>

            <div className="spec-row">
              <span>CALORIES</span>
              <strong>
                {workout.caloriesBurned} kcal
              </strong>
            </div>

            <div className="spec-row">
              <span>RATING</span>
              <strong>
                {workout.rating}
              </strong>
            </div>

          </div>

          {/* ================= INSTRUCTIONS ================= */}

          <div className="instructions">

            <h2>INSTRUCTIONS</h2>

            <ol>
              {workout.instructions.map(
                (instruction, index) => (
                  <li key={index}>
                    <span>{index + 1}.</span>

                    <p>{instruction}</p>
                  </li>
                )
              )}
            </ol>

          </div>

          {/* ================= ACTION BUTTONS ================= */}

          <div className="details-actions">

            <button
              type="button"
              className={`add-plan-btn ${
                isInPlan(workout.id)
                  ? "already-added"
                  : ""
              }`}
              onClick={() =>
                addToPlan(workout)
              }
            >
              {isInPlan(workout.id)
                ? "✓ Added to today's plan"
                : "＋ Add to today's plan"}
            </button>

            <button
              type="button"
              className={`save-workout-btn ${
                isSaved(workout.id)
                  ? "already-saved"
                  : ""
              }`}
              onClick={() =>
                addToSaved(workout)
              }
            >
              {isSaved(workout.id)
                ? "✓ Saved"
                : "♡ Save for later"}
            </button>

          </div>

        </div>
      </section>
    </main>
  );
}