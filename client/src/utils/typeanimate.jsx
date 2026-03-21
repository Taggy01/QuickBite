import { TypeAnimation } from "react-type-animation";

function TypeAnimationText() {
  return (
    <p className="text-base-content/70 text-lg">
      <TypeAnimation
        sequence={[
          'Search Breakfast',
          2000,
          'Search Lunch',
          2000,
          'Search Dinner',
          2000,
        ]}
        speed={50}
        repeat={Infinity}
      />
    </p>
  );
}

export default TypeAnimationText;