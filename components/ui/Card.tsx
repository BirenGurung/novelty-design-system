"use client";

import type { ReactNode } from "react";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { IconButton } from "./IconButton";
import type { IconName } from "./Icon";
import { Text } from "./Text";

/** Figma: Profile card — header style and layout. */
export type CardProfileVariant = "default" | "primary" | "primaryAlt";
/** Figma: Content / Content with image — optional left accent bar. */
export type CardContentVariant = "default" | "accent";
/** Figma: Content card padding/typography. */
export type CardContentSize = "default" | "compact";

export interface CardProfileRow {
  icon: IconName;
  text: string;
}

/** Profile card: contact/user with avatar, rows, optional status badge, footer action. */
export interface CardProfileProps {
  type: "profile";
  variant?: CardProfileVariant;
  title: string;
  subtitle: string;
  statusBadge?: string;
  avatarInitials?: string;
  rows?: CardProfileRow[];
  footerLabel?: string;
  onFooterClick?: () => void;
  onMenuClick?: () => void;
  className?: string;
}

/** Content card: title, optional badge/status/meta, body, optional footer actions. */
export interface CardContentProps {
  type: "content";
  variant?: CardContentVariant;
  size?: CardContentSize;
  /** "list" = Figma Card List: left = title, badge, subText; right = clock+metaText, statusBadge, ellipsis. */
  headerLayout?: "default" | "list";
  title: string;
  date?: string;
  /** Name/tag badge (e.g. "Janet Gwin"). In list layout: left column; in default: left below date. */
  badge?: string;
  statusBadge?: string;
  /** In list layout: "Some Text" below badge on left. */
  subText?: string;
  metaText?: string;
  children: ReactNode;
  footerActions?: ReactNode;
  onMenuClick?: () => void;
  showStatusIcons?: boolean;
  className?: string;
}

/** Figma Media Card layout: imageFirst = image then content; headerFirst = title+date then image then body. */
export type CardContentWithImageLayout = "imageFirst" | "headerFirst";

/** Content card with image (Media Card): title on top or below image only; no accent/red border variant. */
export interface CardContentWithImageProps {
  type: "contentWithImage";
  /** imageFirst = image → title/date/body → footer; headerFirst = title/date → image → body → footer. */
  layout?: CardContentWithImageLayout;
  title: string;
  date?: string;
  image?: ReactNode;
  children: ReactNode;
  footerActions?: ReactNode;
  onMenuClick?: () => void;
  className?: string;
}

/** User card (Figma row 4): 360px, avatar left in header, optional footer left content + View Detail. */
export interface CardUserProps {
  type: "user";
  variant?: "default" | "primary";
  title: string;
  subtitle: string;
  avatarInitials?: string;
  rows?: CardProfileRow[];
  footerLabel?: string;
  onFooterClick?: () => void;
  /** Left side of footer (e.g. "Enrollment" / "Start: 02/26/2020"). */
  footerLeftLabel?: string;
  footerLeftValue?: string;
  onMenuClick?: () => void;
  className?: string;
}

export type CardProps = CardProfileProps | CardContentProps | CardContentWithImageProps | CardUserProps;

const accentBar = (
  <div className="shrink-0 w-1 self-stretch bg-[var(--color-error)]" aria-hidden />
);

/* Figma: Profile card — all variants have centered overlapping avatar. Primary Alt = primary header + ellipsis top-right. Footer = text button. */
function ProfileCard({
  variant = "default",
  title,
  subtitle,
  statusBadge,
  avatarInitials = "SM",
  rows = [],
  footerLabel,
  onFooterClick,
  onMenuClick,
  className = "",
}: CardProfileProps) {
  const isPrimary = variant === "primary" || variant === "primaryAlt";
  const headerBg = isPrimary ? "bg-[var(--color-primary)]" : "bg-[var(--color-table-header-fill)]";
  const headerText = isPrimary ? "text-[var(--color-white)]" : "text-[var(--color-text-muted)]";

  return (
    <div
      className={`flex w-full max-w-[var(--size-card-profile-width)] flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] ${className}`}
    >
      <div className={`relative flex flex-col gap-1 p-4 ${headerBg}`}>
        <div className="flex flex-col items-center gap-1 pb-8">
          <Text variant="body-lg" className={`font-medium ${headerText}`}>{title}</Text>
          <Text variant="body-md" className={headerText}>{subtitle}</Text>
          {statusBadge && (
            <Badge variant="success" appearance="outline" size="small" type="tag">
              {statusBadge}
            </Badge>
          )}
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <Avatar initials={avatarInitials} size="large" className="border-4 border-[var(--color-surface)]" />
        </div>
        {(variant === "primary" || variant === "primaryAlt") && onMenuClick && (
          <div className="absolute right-2 top-2">
            <IconButton icon="three-dots-vertical" size="small" aria-label="More options" onClick={onMenuClick} />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 px-4 pt-8 pb-4">
        {rows.map(({ icon, text }) => (
          <div key={icon + text} className="flex items-center gap-2">
            <Icon name={icon} size={14} className="shrink-0 text-[var(--color-text-muted)]" />
            <Text variant="body-md" className="text-[var(--color-text-muted)]">{text}</Text>
          </div>
        ))}
      </div>
      {footerLabel && (
        <div className="border-t border-[var(--color-border)] px-4 py-2">
          <Button variant="text" size="small" onClick={onFooterClick}>
            {footerLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

/* Figma: User Card 360px — avatar left, header shadow, footer with optional left content + outline View Detail. */
function UserCard({
  variant = "default",
  title,
  subtitle,
  avatarInitials = "SM",
  rows = [],
  footerLabel,
  onFooterClick,
  footerLeftLabel,
  footerLeftValue,
  onMenuClick,
  className = "",
}: CardUserProps) {
  const isPrimary = variant === "primary";
  const headerBg = isPrimary ? "bg-[var(--color-primary)]" : "bg-[var(--color-table-header-fill)]";
  const headerText = isPrimary ? "text-[var(--color-white)]" : "text-[var(--color-text-muted)]";

  return (
    <div
      className={`flex w-full max-w-[var(--size-card-user-width)] flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] ${className}`}
    >
      <div className={`flex items-center justify-between gap-4 p-4 shadow-[var(--shadow-sm)] ${headerBg}`}>
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Avatar initials={avatarInitials} size="medium" className="shrink-0" />
          <div className="min-w-0 flex-1">
            <Text variant="body-lg" className={`font-medium ${headerText}`}>{title}</Text>
            <Text variant="body-md" className={headerText}>{subtitle}</Text>
          </div>
        </div>
        {onMenuClick && (
          <IconButton icon="three-dots-vertical" size="small" aria-label="More options" onClick={onMenuClick} className="shrink-0" />
        )}
      </div>
      <div className="flex flex-col gap-2 p-4">
        {rows.map(({ icon, text }) => (
          <div key={icon + text} className="flex items-center gap-2">
            <Icon name={icon} size={14} className="shrink-0 text-[var(--color-text-muted)]" />
            <Text variant="body-md" className="text-[var(--color-text-muted)]">{text}</Text>
          </div>
        ))}
      </div>
      {(footerLabel || footerLeftLabel || footerLeftValue) && (
        <div className="flex items-center justify-between gap-4 border-t border-[var(--color-border)] p-4">
          <div className="flex flex-col gap-1">
            {footerLeftLabel && (
              <Text variant="body-sm" className="text-[var(--color-text-muted)]">{footerLeftLabel}</Text>
            )}
            {footerLeftValue && (
              <Text variant="body-md" className="text-[var(--color-text)]">{footerLeftValue}</Text>
            )}
          </div>
          {footerLabel && (
            <Button variant="outline" size="small" onClick={onFooterClick}>
              {footerLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function ContentCard({
  variant = "default",
  size = "default",
  headerLayout = "default",
  title,
  date,
  badge,
  statusBadge,
  subText,
  metaText,
  children,
  footerActions,
  onMenuClick,
  showStatusIcons,
  className = "",
}: CardContentProps) {
  const hasAccent = variant === "accent";
  const isCompact = size === "compact";
  const isListLayout = headerLayout === "list";
  const paddingClass = isCompact ? "p-2" : "p-4";
  const bodySize = isCompact ? "text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)]" : "text-[length:var(--text-body-lg-size)] leading-[var(--text-body-lg-line)]";

  return (
    <div
      className={`flex w-full max-w-[var(--size-card-content-width)] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-table-header-fill)] shadow-[var(--shadow-sm)] ${className}`}
    >
      {hasAccent && accentBar}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className={`flex items-center justify-between gap-2 border-b border-[var(--color-border)] ${paddingClass}`}>
          {/* Left column: list = title, badge, subText; default = title, date, badge, metaText, statusBadge. items-start so badge fits content. */}
          <div className="flex min-w-0 flex-1 flex-col gap-1 items-start">
            <Text variant={isCompact ? "body-md" : "body-lg"} as="span" className="font-medium text-[var(--color-text-darker)]">
              {title}
            </Text>
            {isListLayout ? (
              <>
                {badge && (
                  <Badge variant="primary" size="small" type="tag">{badge}</Badge>
                )}
                {subText && (
                  <Text variant="body-sm" className="text-[var(--color-text-muted)]">{subText}</Text>
                )}
              </>
            ) : (
              <>
                {date && (
                  <Text variant="body-sm" className="text-[var(--color-text-muted)]">{date}</Text>
                )}
                {badge && (
                  <Badge variant="primary" size="small" type="tag">{badge}</Badge>
                )}
                {metaText && (
                  <div className="flex items-center gap-1.5">
                    <Icon name="clock-history" size={16} className="text-[var(--color-text-muted)]" />
                    <Text variant="body-sm" className="font-medium text-[var(--color-text-muted)]">{metaText}</Text>
                  </div>
                )}
                {statusBadge && (
                  <Badge variant="info" appearance="outline" size="small" type="tag">{statusBadge}</Badge>
                )}
              </>
            )}
          </div>
          {/* Right: list = clock+metaText, statusBadge, ellipsis; default = status icons, ellipsis */}
          <div className="flex shrink-0 items-center gap-2">
            {isListLayout ? (
              <>
                {metaText && (
                  <div className="flex items-center gap-1.5">
                    <Icon name="clock-history" size={16} className="text-[var(--color-text-muted)]" />
                    <Text variant="body-sm" className="font-medium text-[var(--color-text-muted)]">{metaText}</Text>
                  </div>
                )}
                {statusBadge && (
                  <Badge variant="info" appearance="outline" size="small" type="tag">{statusBadge}</Badge>
                )}
              </>
            ) : (
              <>
                {showStatusIcons && (
                  <>
                    <Icon name="check-circle-fill" size={isCompact ? 16 : 24} className="text-[var(--color-success)]" />
                    <Icon name="exclamation-triangle" size={isCompact ? 16 : 24} className="text-[var(--color-warning)]" />
                  </>
                )}
              </>
            )}
            {onMenuClick && (
              <IconButton icon="three-dots-vertical" size="small" aria-label="More options" onClick={onMenuClick} />
            )}
          </div>
        </div>
        <div className={`${paddingClass} font-[family-name:var(--font-body)] text-[var(--color-text-muted)] ${bodySize}`}>
          {children}
        </div>
        {footerActions && (
          <div className={`flex justify-end border-t border-[var(--color-border)] px-4 py-2 ${isCompact ? "gap-2" : "gap-4"}`}>
            {footerActions}
          </div>
        )}
      </div>
    </div>
  );
}

/* Figma Media Card: two variants. No internal borders. Image area h-[175px] when image provided. */
const mediaCardImageArea = (
  image: ReactNode,
  placeholder: ReactNode = <Icon name="image" size={48} className="text-[var(--color-text-muted)]" />
) => (
  <div className="flex h-[var(--size-media-card-image-height)] w-full items-center justify-center overflow-hidden bg-[var(--color-surface)] p-0">
    {image ?? placeholder}
  </div>
);

const mediaCardTitleBlock = (
  title: string,
  date?: string,
  onMenuClick?: () => void
) => (
  <div className="flex items-center justify-between gap-2 p-4">
    <div className="flex flex-col gap-1">
      <Text variant="body-lg" as="span" className="font-medium text-[var(--color-text-darker)]">{title}</Text>
      {date && <Text variant="body-sm" className="text-[var(--color-text-muted)]">{date}</Text>}
    </div>
    {onMenuClick && (
      <IconButton icon="three-dots-vertical" size="small" aria-label="More options" onClick={onMenuClick} />
    )}
  </div>
);

function ContentWithImageCard({
  layout = "imageFirst",
  title,
  date,
  image,
  children,
  footerActions,
  onMenuClick,
  className = "",
}: CardContentWithImageProps) {
  const isHeaderFirst = layout === "headerFirst";

  const imageBlock = mediaCardImageArea(image);
  const titleBlock = mediaCardTitleBlock(title, date, onMenuClick);
  const bodyBlock = (
    <div className="px-4 pb-4 font-[family-name:var(--font-body)] text-[length:var(--text-body-lg-size)] leading-[var(--text-body-lg-line)] text-[var(--color-text-muted)]">
      {children}
    </div>
  );
  const footerBlock = footerActions ? (
    <div className="flex justify-end gap-4 px-4 py-2">{footerActions}</div>
  ) : null;

  return (
    <div
      className={`flex w-full max-w-[var(--size-card-content-width)] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-table-header-fill)] shadow-[var(--shadow-sm)] ${className}`}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        {isHeaderFirst ? (
          <>
            {titleBlock}
            {imageBlock}
            {bodyBlock}
            {footerBlock}
          </>
        ) : (
          <>
            {imageBlock}
            {titleBlock}
            {bodyBlock}
            {footerBlock}
          </>
        )}
      </div>
    </div>
  );
}

export function Card(props: CardProps) {
  if (props.type === "profile") {
    return <ProfileCard {...props} />;
  }
  if (props.type === "user") {
    return <UserCard {...props} />;
  }
  if (props.type === "content") {
    return <ContentCard {...props} />;
  }
  return <ContentWithImageCard {...props} />;
}
