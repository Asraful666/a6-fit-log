import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types";

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="workout-card"
    >
      <div className="workout-card-image">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
        />
      </div>

      <div className="workout-card-body">
        <div className="workout-tags">
          {workout.muscleGroups.slice(0, 2).map((muscle) => (
            <span key={muscle} className="workout-tag">
              {muscle}
            </span>
          ))}
        </div>

        <h3>{workout.name}</h3>

        <p className="workout-equipment">
          {workout.equipment}
        </p>

        <div className="workout-stats">
          <span>
            <b>◷</b> {workout.duration} min
          </span>

          <span>
            <b>◉</b> {workout.caloriesBurned} kcal
          </span>

          <span>
            <b>★</b> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}