import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <nav className="fixed top-8 left-3/4 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-12 px-8 py-4 bg-background/20 backdrop-blur-xl rounded-full">
        <a
          href="#blogs"
          className={cn(
            "text-base font-medium transition-all duration-300 ease-out",
            "text-foreground/70 hover:text-foreground hover:scale-105"
          )}
          style={{ fontFamily: 'Rubik Burned, cursive' }}
        >
          Blogs
        </a>
        <a
          href="#images"
          className={cn(
            "text-base font-medium transition-all duration-300 ease-out",
            "text-foreground/70 hover:text-foreground hover:scale-105"
          )}
          style={{ fontFamily: 'Rubik Burned, cursive' }}
        >
          Images
        </a>
      </div>
    </nav>
  );
};

export default Navbar;