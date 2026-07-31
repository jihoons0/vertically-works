"use client";

/**
 * VerticalToggle · 読み方向に沿って親指のノブが上下する縦書きのオン/オフ切替。
 *
 * 縦組みレイアウトでは上が ON。横方向への回転ではなく、表示方向そのものを縦に設計しています。
 * role="switch" と aria-checked でネイティブなスイッチのセマンティクスを保持し、
 * Space / Enter のどちらでもトグルできます。
 *
 * Docs: https://vertically.works/components/toggle
 */

import type { CSSProperties } from "react";

export interface VerticalToggleProps {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  disabled?: boolean;
  id?: string;
  /** Accessible name · required unless `aria-labelledby` points at a visible label. */
  "aria-label"?: string;
  "aria-labelledby"?: string;
  style?: CSSProperties;
}

export function VerticalToggle({
  checked,
  onCheckedChange,
  disabled = false,
  id,
  style,
  ...aria
}: VerticalToggleProps) {
  return (
    <button
      data-vw="toggle"
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      aria-label={aria["aria-label"]}
      aria-labelledby={aria["aria-labelledby"]}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      style={{
        position: "relative",
        width: 26,
        height: 44,
        padding: 0,
        borderRadius: "var(--radius-full)",
        border: "none",
        background: checked ? "var(--color-fg)" : "var(--color-border-strong)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        flexShrink: 0,
        transition: "background var(--duration-base) var(--easing-default)",
        ...style,
      }}
    >
      <span
        aria-hidden
        className="corner-round"
        style={{
          position: "absolute",
          left: 3,
          top: checked ? 3 : 21, // 上が ON: ノブは読み進行方向へ上方向に上がる
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "var(--color-bg)",
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
          transition: "top var(--duration-base) var(--easing-out)",
        }}
      />
    </button>
  );
}
