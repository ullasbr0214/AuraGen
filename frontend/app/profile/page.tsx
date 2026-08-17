import ProfileCard from "../components/auth/ProfileCard";

export default function ProfilePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070B14] px-6">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1d4ed822,transparent_35%),radial-gradient(circle_at_bottom_left,#7c3aed22,transparent_35%)]" />

      <div className="relative z-10 w-full flex justify-center">
        <ProfileCard />
      </div>

    </main>
  );
}
