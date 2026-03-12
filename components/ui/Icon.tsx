"use client";

import type { SVGAttributes } from "react";
import {
  Gear,
  GearFill,
  X,
  XLg,
  Search,
  CheckCircle,
  CheckCircleFill,
  ExclamationCircle,
  ExclamationTriangle,
  InfoCircle,
  ThreeDotsVertical,
  ClockHistory,
  Calendar,
  Telephone,
  Envelope,
  GeoAlt,
  PersonVcard,
  Wallet,
  Image,
  House,
  ChevronDown,
  ChevronUp,
} from "react-bootstrap-icons";

/** Bootstrap icon names used across the app. Add to this map and IconName when using a new icon. Dismiss: "x"; Figma chip uses "x-lg". */
const iconMap = {
  gear: Gear,
  "gear-fill": GearFill,
  x: X,
  "x-lg": XLg,
  search: Search,
  "check-circle": CheckCircle,
  "check-circle-fill": CheckCircleFill,
  "exclamation-circle": ExclamationCircle,
  "exclamation-triangle": ExclamationTriangle,
  "info-circle": InfoCircle,
  "three-dots-vertical": ThreeDotsVertical,
  "clock-history": ClockHistory,
  calendar: Calendar,
  telephone: Telephone,
  envelope: Envelope,
  "geo-alt": GeoAlt,
  "person-vcard": PersonVcard,
  wallet: Wallet,
  image: Image,
  house: House,
  "chevron-down": ChevronDown,
  "chevron-up": ChevronUp,
} as const;

export type IconName = keyof typeof iconMap;

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, "color"> {
  name: IconName;
  /** Size as CSS value (e.g. "1em", 20) or Tailwind size class is applied by parent. */
  size?: string | number;
  className?: string;
}

export function Icon({ name, size = "1em", className = "", ...rest }: IconProps) {
  const Component = iconMap[name];
  if (!Component) return null;
  return <Component size={size} className={className} color="currentColor" {...rest} />;
}
