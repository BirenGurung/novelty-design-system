"use client";

import { useEffect, useState } from "react";

export function RadiusValue({ token }: { token: string }) {
  const [value, setValue] = useState<string>("—");

  useEffect(() => {
    const el = document.documentElement;
    const resolved = getComputedStyle(el).getPropertyValue(token.trim()).trim();
    setValue(resolved || "—");
  }, [token]);

  return <span className="text-[var(--color-text-muted)]">{value}</span>;
}
