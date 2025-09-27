import Navbar from "./components/navbar";
import ProfileImage from "./components/profile-image";

export function App() {
  return (
    <div className="min-h-screen w-full text-foreground">
      <Navbar />
      <main>
        <ProfileImage />
      </main>
    </div>
  );
}

export default App;
