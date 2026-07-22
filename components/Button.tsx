import type { ComponentPropsWithoutRef, ReactNode } from "react";

type BaseProps = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  /** Landing-page magnetic hover effect (bound by LandingFx via [data-magnetic]). */
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
};

export type ButtonProps =
  | (BaseProps & { as: "a" } & Omit<ComponentPropsWithoutRef<"a">, "className">)
  | (BaseProps & { as?: "button" } & Omit<ComponentPropsWithoutRef<"button">, "className">);

/**
 * DS Button (InneGolfDesignSystem.Button) — styles live in globals.css (.btn).
 * Renders an <a> when `as="a"`, otherwise a <button>.
 */
export default function Button(props: ButtonProps) {
  const {
    as = "button",
    variant = "primary",
    size = "md",
    fullWidth = false,
    magnetic = false,
    className = "",
    children,
    ...rest
  } = props as BaseProps & { as?: "a" | "button" } & Record<string, unknown>;

  const cls = ["btn", `btn--${variant}`, `btn--${size}`, fullWidth ? "btn--full" : "", className]
    .filter(Boolean)
    .join(" ");
  const magProps = magnetic ? { "data-magnetic": "true" } : {};

  if (as === "a") {
    return (
      <a className={cls} {...magProps} {...(rest as ComponentPropsWithoutRef<"a">)}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...magProps} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
