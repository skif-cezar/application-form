import React from "react";
import BoxImgSrc from "src/resources/box-img.png";
import clsx from "clsx";
import styles from "src/app/components/notData/NotData.module.scss";

/**
 * Not data component
 */
export const NotData: React.FC = () => {
  const CONTAINER_STYLES = clsx(styles.container);
  const IMAGE_STYLES = clsx(styles.image);
  const TEXT_STYLES = clsx(styles.text);

  return (
    <div className={CONTAINER_STYLES}>
      <div className={IMAGE_STYLES}>
        <img alt="Пустая коробка." src={BoxImgSrc} />
      </div>
      <div className={TEXT_STYLES}>
        <p>У Вас нет заявок!</p>
      </div>
    </div>
  );
};