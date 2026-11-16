import { ui } from "@/lib/strings";

type ConfirmsProps = {
  items?: readonly string[];
  clearance?: boolean;
};

/**
 * A fact the owner has not yet supplied. It stays visible on the page as
 * [CONFIRM: ...] until the copy in src/lib/strings.ts is given the real value.
 */
export function Confirms({ items = [], clearance = false }: ConfirmsProps) {
  if (items.length === 0 && !clearance) {
    return null;
  }

  return (
    <>
      {clearance ? <span className="confirm">{ui.clearance}</span> : null}
      {clearance && items.length > 0 ? " " : null}
      {items.map((item, index) => (
        <span key={item}>
          {index > 0 ? " " : null}
          <span className="confirm">{`[${ui.confirmPrefix}: ${item}]`}</span>
        </span>
      ))}
    </>
  );
}
