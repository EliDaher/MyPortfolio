
import { Spotlight } from "./ui/Spotlight";
import Avatar3D from "./Avatar3D";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import AvatarCircles from "./AvatarCircles";

const Hero = () => {
  return (
    <section className="pt-20 pb-10">
      {/* ------------Spot Light----------- */}
      <div className="pointer-events-none">
        <Spotlight
          className="-top-16 -left-20 md:-top-40 md:-left-10 h-screen"
          fill="white"
        />
        <Spotlight className="top-20 left-12 h-[80vh] w-[50vw]" fill="indigo" />
        <Spotlight className="top-0 -right-0 h-[80vh] w-[60vw]" fill="purple" />
      </div>

      {/* -----------Main Text---------- */}
      <div className="text-center w-full mb-28 pointer-events-none">
        <h1 className="bg-clip-text animated-background bg-gradient-to-l from-indigo-500 to-purple-400 via-indigo-500 text-transparent text-7xl md:text-8xl font-extrabold text-center select-none">
          Eli Daher
        </h1>
        <h3 className="text-3xl md:text-5xl px-2 text-foreground font-semibold mt-5 pb-2 select-none">
          In the quiet of the console, <br /> I orchestrate impactful change.
        </h3>
      </div>

      {/*--------Avatar--------*/}
      <div className="relative w-full h-auto md:-left-32 pointer-events-none">
        <div className="absolute -top-10 -left-16 md:left-40 flex items-center gap-4 md:gap-6 ">
          <Avatar3D />
        </div>
        <div className="z-20 absolute -top-10 left-36 md:left-96 max-w-52 md:max-w-72">
          <TextGenerateEffect duration={2} words="Hey, Can Your AI Do This !" />
        </div>
      </div>

      {/* -----------Profile Image----------- */}
      <AvatarCircles />

    </section>
  );
};

export default Hero;
