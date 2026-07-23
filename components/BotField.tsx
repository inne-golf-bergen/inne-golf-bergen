/**
 * Honeypot: invisible to people (offscreen, no tab stop, hidden from AT) but
 * filled in by naive spam bots. lib/forms.ts drops any submission where it
 * has a value before posting — the bot still sees the success card.
 */
export default function BotField() {
  return (
    <input
      type="text"
      name="botcheck"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
    />
  );
}
