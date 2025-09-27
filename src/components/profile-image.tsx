import { cn } from "@/lib/utils";

const ProfileImage = () => {
  return (
    <>
      <div className="absolute top-28 left-80">
        <div className="relative w-64 h-64">
          <img
            src="/profile-image.png"
            alt="Profile"
            className="w-full h-full object-cover"
            style={{
              maskImage: 'radial-gradient(ellipse at center, black 40%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.4) 80%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.4) 80%, transparent 100%)'
            }}
          />
        </div>
      </div>

      <div className="absolute top-60 left-[40rem] flex flex-col">
        <h1 className="text-5xl font-bold text-foreground mb-2" style={{ fontFamily: 'Kablammo, cursive' }}>
          Briheet Singh Yadav
        </h1>
        <p className="text-2xl text-muted-foreground" style={{ fontFamily: 'Indie Flower, cursive' }}>
          Developer, Nix Enjoyer
        </p>
      </div>
    </>
  );
};

export default ProfileImage;