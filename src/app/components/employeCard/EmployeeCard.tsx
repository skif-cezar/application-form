import React, {memo} from "react";
import clsx from "clsx";
import styles from "src/app/components/employeCard/EmployeeCard.module.scss";

/**
 * EmployeeCard props
 */
export interface EmployeeCardProps {
  employee: string | null;
  email: string | null;
  role: string | null;
}

/**
 * Employee card component
 */
export const EmployeeCard: React.FC<EmployeeCardProps> = memo((props: EmployeeCardProps) => {
  const CARD_STYLES = clsx(styles.card);
  const EMPLOYEE_STYLES = clsx(styles.employee);
  const EMAIL_STYLES = clsx(styles.email);
  const ROLE_STYLES = clsx(styles.role);

  return (
    <div className={CARD_STYLES}>
      <p className={EMPLOYEE_STYLES}>{props.employee}</p>
      <p className={EMAIL_STYLES}>{props.email}</p>
      <p className={ROLE_STYLES}>{props.role}</p>
    </div>
  );
});