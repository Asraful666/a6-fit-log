import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/utils/api";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function WorkoutDetailsPage({ params }: Props) {
  const { id } = await params;

  let workout;

  try {
    workout = await getWorkoutById(id);
  } catch {
    notFound();
  }

  return (
    <main className="details-page">
      <div className="details-container">
        <section className="details-main">

          {/* LEFT — IMAGE */}
          <div className="details-image-box">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
              className="details-image"
            />
          </div>

          {/* RIGHT — CONTENT */}
          <div className="details-info">
            <h1>{workout.name}</h1>

            <p className="details-description">
              {workout.description}
            </p>

            {/* TAGS */}
            <div className="details-tags">
              {workout.muscleGroups.map((muscle) => (
                <span key={muscle}>{muscle}</span>
              ))}
            </div>

            {/* SPECS */}
            <div className="details-specs">
              <div className="spec-row">
                <span>EQUIPMENT</span>
                <strong>{workout.equipment}</strong>
              </div>

              <div className="spec-row">
                <span>DIFFICULTY</span>
                <strong>{workout.difficulty}</strong>
              </div>

              <div className="spec-row">
                <span>SETS</span>
                <strong>{workout.sets}</strong>
              </div>

              <div className="spec-row">
                <span>REPS</span>
                <strong>{workout.reps}</strong>
              </div>

              <div className="spec-row">
                <span>DURATION</span>
                <strong>{workout.duration} min</strong>
              </div>

              <div className="spec-row">
                <span>CALORIES</span>
                <strong>{workout.caloriesBurned} kcal</strong>
              </div>

              <div className="spec-row">
                <span>RATING</span>
                <strong>{workout.rating}</strong>
              </div>
            </div>

            {/* INSTRUCTIONS */}
            <section className="instructions">
              <h2>INSTRUCTIONS</h2>

              <ol>
                {workout.instructions.map((instruction, index) => (
                  <li key={index}>
                    <span>{index + 1}.</span>
                    <p>{instruction}</p>
                  </li>
                ))}
              </ol>
            </section>

            {/* ACTIONS */}
            <div className="details-actions">
              <button className="add-plan-btn">
                ▣ &nbsp; Add to today&apos;s plan
              </button>

              <button className="save-btn">
                ♡ &nbsp; Save for later
              </button>
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}