import { Workout } from "@/types";
import WorkoutCard from "./WorkoutCard";

type LibrarySectionProps = {
  workouts: Workout[];
};

export default function LibrarySection({
  workouts,
}: LibrarySectionProps) {
  return (
    <section id="library" className="library-section">
      <div className="library-header">
        <div>
          <h2>THE LIBRARY</h2>

          <p>
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <span className="library-count">
          {workouts.length} WORKOUTS
        </span>
      </div>

      {workouts.length === 0 ? (
        <div className="empty-library">
          <h3>NO WORKOUTS FOUND</h3>
          <p>Please try again later.</p>
        </div>
      ) : (
        <div className="workout-grid">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      )}
    </section>
  );
}