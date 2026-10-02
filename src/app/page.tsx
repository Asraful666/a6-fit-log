import Hero from "@/components/Hero";
import LibrarySection from "@/components/LibrarySection";
import { getAllWorkouts } from "@/utils/api";

export default async function HomePage() {
  const workouts = await getAllWorkouts();

  return (
    <>
      <Hero />

      <LibrarySection workouts={workouts} />
    </>
  );
}