import React from "react";
import clsx from "clsx";
import styles from "src/app/logic/footer/Footer.module.scss";
import {Button} from "src/app/components/button/Button";

/**
 * Footer component
 */
export const Footer: React.FC = () => {
  const FOOTER_STYLES = clsx(styles.footer);
  const FOOTER_TOP_STYLES = clsx(styles.footer__top);
  const FOOTER_BOTTOM_STYLES = clsx(styles.footer__bottom);
  const MAIL_STYLES = clsx(styles.mail);
  const BUTTONS_STYLES = clsx(styles.buttons);

  return (
    <footer className={FOOTER_STYLES}>
      <div className={FOOTER_TOP_STYLES}>
        <section>
          <h3>About Us</h3>
          <p>
            Don&#39;t leave compliance to chance – BELLFAM ELD makes it easy to keep your drivers,
            vehicles, and fleet DOT-legal. BELLFAM app works with electronic logging hardware (via
            Bluetooth) and our secure fleet management cloud platform. Stay compliant with the
            Electronic Logging Device Mandate and provide your drivers with the tools to be efficient
            and successful with BELLFAM ELD.
          </p>
        </section>
        <section>
          <h3>Download App</h3>
          <div className={BUTTONS_STYLES}>
            <Button text="Steam" className="steam" />
            <Button text="Nintendo" className="nintendo" />
            <Button text="Google Play" className="market" />
          </div>
        </section>
        <section>
          <h3>Contact Info</h3>
          <address className={MAIL_STYLES}>
            <a href="mailto: Info@yourmail.com">Info@yourmail.com</a>
          </address>
        </section>
      </div>
      <div className={FOOTER_BOTTOM_STYLES}>
        <p>
          <span className="footer_credit">
            Bellfam ELD Logbook, GPS Fleet Tracking &amp; More - © 2023 Bellfam
          </span>
        </p>
      </div>
    </footer>
  );
};
