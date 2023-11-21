import React from "react";
import clsx from "clsx";
import styles from "src/app/logic/about/About.module.scss";
import {MSlider} from "src/app/components/slider/Slider";
import SliderSrc from "src/resources/slider.jpg";

/**
 * About section
 */
export const About: React.FC = () => {
  const ABOUT_STYLES = clsx(styles.about);
  const CONTAINER_STYLES = clsx(styles.container);
  const TITLE_STYLES = clsx(styles.title);
  const SUBTITLE_STYLES = clsx(styles.subtitle);
  const TEXT_STYLES = clsx(styles.text);

  const imgArr = [
    SliderSrc,
    SliderSrc,
    SliderSrc,
    SliderSrc,
    SliderSrc,
    SliderSrc,
    SliderSrc,
    SliderSrc,
  ];

  return (
    <section className={ABOUT_STYLES} id="about">
      <h2 className={TITLE_STYLES}>About The Game</h2>
      <div className={CONTAINER_STYLES}>
        <div>
          <MSlider images={imgArr} />
        </div>
        <article>
          <h3 className={SUBTITLE_STYLES}>Solve mysteries with Detective Pikachu</h3>
          <p className={TEXT_STYLES}>
            Unravel a series of mysteries across Ryme City with a tough-talking, coffee-loving
            Pikachu and his human partner, Tim Goodman. When a jewel theft occurs, the case sets
            this great detective duo down a path filled with mystery. Why did Tim’s father, Harry,
            go missing? What is causing the Pokémon-related incidents around Ryme City? Answer these
            questions and more by searching for clues, investigating scenes, and using your case
            notebook to make deductions.
          </p>
        </article>
      </div>
    </section>
  );
};
