"use client";

import {
  Text,
  Button,
  IconButton,
  Input,
  TextArea,
  Checkbox,
  Radio,
  Select,
  SearchInput,
  Card,
  Alert,
  Avatar,
  Tooltip,
  Badge,
  Chip,
  Toast,
  Modal,
  Dialog,
  Table,
} from "@/components";
import { ShowcaseClient } from "../showcase-client";

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 space-y-6">
      <div>
        <Text variant="h2" as="h2" id={id}>{title}</Text>
        <p className="mt-2 text-[var(--color-text)] font-[var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}

export default function ComponentsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-16">
      <header className="space-y-4">
        <Text variant="h1" as="h1">Components</Text>
        <Text variant="body-lg" className="text-[var(--color-text-muted)]">
          Reusable UI components built on design tokens. Each follows the theme contract so you can swap themes without changing code. Use the right component for the job and keep accessibility in mind (labels, aria, keyboard).
        </Text>
        <nav aria-label="On this page" className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {["buttons", "inputs", "feedback", "data-display", "overlays"].map((id) => (
            <a key={id} href={`#${id}`} className="text-[var(--color-primary)] hover:underline capitalize">
              {id.replace("-", " ")}
            </a>
          ))}
        </nav>
      </header>

      <Section
        id="buttons"
        title="Buttons"
        description="Buttons trigger actions. Use filled for the primary action, outline for secondary, and text for tertiary or low-emphasis actions. Icon buttons are for icon-only actions (e.g. close, settings); always provide an aria-label."
      >
        {/* Figma layout: each variant (Default, Outline, Text, Danger) × states (Default, Hover, Pressed, Disabled) × sizes (Large, Medium, Small) */}
        {[
          { variant: "filled" as const, label: "Default" },
          { variant: "outline" as const, label: "Outline" },
          { variant: "text" as const, label: "Text" },
          { variant: "danger" as const, label: "Danger" },
        ].map(({ variant, label }) => (
          <div key={variant} className="space-y-3">
            <Text variant="h6" as="h3" className="text-[var(--color-text-muted)]">{label}</Text>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="pb-2 pr-4 font-[family-name:var(--font-body)] text-[length:var(--text-body-sm-size)] font-medium text-[var(--color-text-muted)] w-20">Size</th>
                    <th className="pb-2 pr-4 font-[family-name:var(--font-body)] text-[length:var(--text-body-sm-size)] font-medium text-[var(--color-text-muted)]">Default</th>
                    <th className="pb-2 pr-4 font-[family-name:var(--font-body)] text-[length:var(--text-body-sm-size)] font-medium text-[var(--color-text-muted)]">Hover</th>
                    <th className="pb-2 pr-4 font-[family-name:var(--font-body)] text-[length:var(--text-body-sm-size)] font-medium text-[var(--color-text-muted)]">Pressed</th>
                    <th className="pb-2 font-[family-name:var(--font-body)] text-[length:var(--text-body-sm-size)] font-medium text-[var(--color-text-muted)]">Disabled</th>
                  </tr>
                </thead>
                <tbody className="align-baseline">
                  {[
                    { size: "large" as const, label: "Large" },
                    { size: "medium" as const, label: "Medium" },
                    { size: "small" as const, label: "Small" },
                  ].map(({ size, label: sizeLabel }) => (
                    <tr key={size} className="border-b border-[var(--color-border)]">
                      <td className="py-3 pr-4 font-[family-name:var(--font-body)] text-[length:var(--text-body-sm-size)] text-[var(--color-text-muted)]">{sizeLabel}</td>
                      <td className="py-3 pr-4"><Button variant={variant} size={size}>Button</Button></td>
                      <td className="py-3 pr-4"><Button variant={variant} size={size} visualState="hover">Button</Button></td>
                      <td className="py-3 pr-4"><Button variant={variant} size={size} visualState="pressed">Button</Button></td>
                      <td className="py-3"><Button variant={variant} size={size} disabled>Button</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        {/* IconButton: variant × state × size */}
        <div className="space-y-3 pt-4">
          <Text variant="h6" as="h3" className="text-[var(--color-text-muted)]">Icon button — size & states</Text>
          {[
            { variant: "filled" as const, label: "Filled" },
            { variant: "outline" as const, label: "Outline" },
            { variant: "clear" as const, label: "Clear" },
          ].map(({ variant, label }) => (
            <div key={variant} className="space-y-3">
              <Text variant="body-sm" className="font-medium text-[var(--color-text-muted)]">{label}</Text>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[var(--color-border)]">
                      <th className="pb-2 pr-4 font-[family-name:var(--font-body)] text-[length:var(--text-body-sm-size)] font-medium text-[var(--color-text-muted)] w-20">Size</th>
                      <th className="pb-2 pr-4 font-[family-name:var(--font-body)] text-[length:var(--text-body-sm-size)] font-medium text-[var(--color-text-muted)]">Default</th>
                      <th className="pb-2 pr-4 font-[family-name:var(--font-body)] text-[length:var(--text-body-sm-size)] font-medium text-[var(--color-text-muted)]">Hover</th>
                      <th className="pb-2 pr-4 font-[family-name:var(--font-body)] text-[length:var(--text-body-sm-size)] font-medium text-[var(--color-text-muted)]">Pressed</th>
                      <th className="pb-2 font-[family-name:var(--font-body)] text-[length:var(--text-body-sm-size)] font-medium text-[var(--color-text-muted)]">Disabled</th>
                    </tr>
                  </thead>
                  <tbody className="align-baseline">
                    {[
                      { size: "large" as const, label: "Large" },
                      { size: "medium" as const, label: "Medium" },
                      { size: "small" as const, label: "Small" },
                    ].map(({ size, label: sizeLabel }) => (
                      <tr key={size} className="border-b border-[var(--color-border)]">
                        <td className="py-3 pr-4 font-[family-name:var(--font-body)] text-[length:var(--text-body-sm-size)] text-[var(--color-text-muted)]">{sizeLabel}</td>
                        <td className="py-3 pr-4">
                          <IconButton variant={variant} size={size} icon="gear" aria-label="Action" />
                        </td>
                        <td className="py-3 pr-4">
                          <IconButton variant={variant} size={size} icon="gear" visualState="hover" aria-label="Action" />
                        </td>
                        <td className="py-3 pr-4">
                          <IconButton variant={variant} size={size} icon="gear" visualState="pressed" aria-label="Action" />
                        </td>
                        <td className="py-3">
                          <IconButton variant={variant} size={size} icon="gear" disabled aria-label="Action" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="inputs"
        title="Inputs & form controls"
        description="Text fields, textareas, selects, and search capture user input. Always pair with a visible label; use hint for helper text and error for validation. Checkboxes and radios are for single or multiple choices in forms."
      >
        <div className="max-w-sm space-y-4">
          <Input label="Label" placeholder="Placeholder" />
          <Input label="Filled variant" variant="filled" placeholder="Placeholder" />
          <Input label="With hint" hint="Supporting text here." placeholder="Placeholder" />
          <Input label="With error" error="This field is required." placeholder="Placeholder" defaultValue="invalid" />
          <Input label="Warning status" status="warning" placeholder="Check this" />
          <Input label="Success status" status="success" placeholder="Looks good" />
          <Input label="Disabled" disabled placeholder="Disabled" />
          <TextArea label="Text area" placeholder="Type your message here." hint="Supporting text." />
          <Select label="Select" placeholder="Select option" options={[{ value: "a", label: "Option A" }, { value: "b", label: "Option B" }]} />
          <SearchInput placeholder="Search" />
          <div className="space-y-4">
            <p className="text-[length:var(--text-body-sm-size)] font-medium text-[var(--color-text-muted)]">Checkbox — size variant</p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 items-center">
              <span className="inline-flex flex-col gap-2">
                <span className="text-[length:var(--text-body-sm-size)] text-[var(--color-text-muted)]">Size: Medium</span>
                <Checkbox label="Checkbox option" name="cb-m" size="medium" />
                <Checkbox label="Indeterminate" name="cb2-m" size="medium" indeterminate />
              </span>
              <span className="inline-flex flex-col gap-2">
                <span className="text-[length:var(--text-body-sm-size)] text-[var(--color-text-muted)]">Size: Large</span>
                <Checkbox label="Checkbox option" name="cb-l" size="large" />
                <Checkbox label="Indeterminate" name="cb2-l" size="large" indeterminate />
              </span>
            </div>
            <p className="text-[length:var(--text-body-sm-size)] font-medium text-[var(--color-text-muted)] pt-2">Radio — size variant</p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 items-start">
              <span className="inline-flex flex-col gap-2">
                <span className="text-[length:var(--text-body-sm-size)] text-[var(--color-text-muted)]">Size: Medium</span>
                <Radio label="Radio option A" name="radio-m" value="1" size="medium" />
                <Radio label="Radio option B" name="radio-m" value="2" size="medium" />
              </span>
              <span className="inline-flex flex-col gap-2">
                <span className="text-[length:var(--text-body-sm-size)] text-[var(--color-text-muted)]">Size: Large</span>
                <Radio label="Radio option A" name="radio-l" value="1" size="large" />
                <Radio label="Radio option B" name="radio-l" value="2" size="large" />
              </span>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="feedback"
        title="Feedback"
        description="Alerts and toasts communicate outcome or status. Use alerts for inline, persistent messages (e.g. form errors, success). Use toasts for transient notifications that auto-dismiss or can be dismissed. Badges and chips show status or tags; chips are more interactive (e.g. removable filters)."
      >
        <div className="space-y-6 max-w-xl">
          <div className="space-y-3">
            <Text variant="h6" as="h3" className="text-[var(--color-text-muted)]">Alert — type: default, size: default / compact</Text>
            <Alert variant="success" title="Alert Title" description="Lorem ipsum dolor sit amet." onDismiss={() => {}} />
            <Alert variant="warning" title="Warning" description="Something to be aware of." actionLabel="Action" onAction={() => {}} onDismiss={() => {}} />
            <Alert variant="error" title="Error" description="Something went wrong." />
            <Alert variant="info" title="Info" size="compact" description="Compact size alert." onDismiss={() => {}} />
            <Alert variant="default" title="Default (neutral)" description="Neutral alert with border." onDismiss={() => {}} />
          </div>
          <div className="space-y-3">
            <Text variant="h6" as="h3" className="text-[var(--color-text-muted)]">Alert — type: banner, size: default</Text>
            <Alert type="banner" variant="success" title="Banner Title" description="Solid background, white text (Figma Type=Banner)." onDismiss={() => {}} />
            <Alert type="banner" variant="error" title="Banner Error" description="Something went wrong." onDismiss={() => {}} />
            <Alert type="banner" variant="info" title="Banner Info" description="Informational banner." onDismiss={() => {}} />
          </div>
          <div className="space-y-3">
            <Text variant="h6" as="h3" className="text-[var(--color-text-muted)]">Alert — type: banner, size: compact</Text>
            <Alert type="banner" variant="success" size="compact" title="Banner compact" description="Tighter padding, body-md title." onDismiss={() => {}} />
            <Alert type="banner" variant="warning" size="compact" title="Banner warning compact" onDismiss={() => {}} />
          </div>
        </div>
        <div className="max-w-md space-y-2">
          <Toast variant="success" message="Success! Your changes have been saved." onDismiss={() => {}} />
          <Toast variant="error" message="Something went wrong. Please try again." />
          <Toast variant="default" message="Neutral toast (default variant)." onDismiss={() => {}} />
        </div>
        {/* Badge — Figma: all variants (default, primary, success, error, info, warning), appearance (default, outline), sizes (default, small), types (pill, tag, icon) */}
        <div className="space-y-4">
          <Text variant="h6" as="h3" className="text-[var(--color-text-muted)]">Badge</Text>
          <div className="space-y-3">
            <p className="text-[length:var(--text-body-sm-size)] text-[var(--color-text-muted)]">Default (filled) and Outline, Size Default / Small</p>
            <div className="flex flex-wrap gap-2 items-center">
              {(["default", "primary", "success", "error", "info", "warning"] as const).map((v) => (
                <span key={v} className="inline-flex gap-2 items-center">
                  <Badge variant={v} size="default">Badge</Badge>
                  <Badge variant={v} appearance="outline" size="default">Badge</Badge>
                </span>
              ))}
              <Badge variant="outline">Outline</Badge>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {(["default", "primary", "success"] as const).map((v) => (
                <span key={v} className="inline-flex gap-2 items-center">
                  <Badge variant={v} size="small">Badge</Badge>
                  <Badge variant={v} appearance="outline" size="small">Badge</Badge>
                </span>
              ))}
            </div>
            <p className="text-[length:var(--text-body-sm-size)] text-[var(--color-text-muted)]">Type: Pill (default)</p>
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="primary" type="pill">Pill</Badge>
              <Badge variant="success" type="pill">Pill</Badge>
              <Badge variant="error" type="pill" onDismiss={() => {}}>Dismissible</Badge>
            </div>
            <p className="text-[length:var(--text-body-sm-size)] text-[var(--color-text-muted)]">Type: Tag (rectangular radius) — Size default</p>
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="default" type="tag" size="default">Badge</Badge>
              <Badge variant="primary" type="tag" size="default">Tag</Badge>
              <Badge variant="success" type="tag" size="default">Tag</Badge>
              <Badge variant="error" type="tag" size="default">Tag</Badge>
              <Badge variant="info" type="tag" size="default">Tag</Badge>
              <Badge variant="warning" type="tag" size="default">Tag</Badge>
              <Badge variant="primary" type="tag" appearance="outline" size="default">Tag outline</Badge>
              <Badge variant="success" type="tag" size="default" onDismiss={() => {}}>Dismissible</Badge>
            </div>
            <p className="text-[length:var(--text-body-sm-size)] text-[var(--color-text-muted)]">Type: Tag — Size small</p>
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="default" type="tag" size="small">Badge</Badge>
              <Badge variant="primary" type="tag" size="small">Tag</Badge>
              <Badge variant="success" type="tag" size="small">Tag</Badge>
              <Badge variant="error" type="tag" size="small">Tag</Badge>
              <Badge variant="info" type="tag" size="small">Tag</Badge>
              <Badge variant="warning" type="tag" size="small">Tag</Badge>
              <Badge variant="primary" type="tag" appearance="outline" size="small">Tag outline</Badge>
              <Badge variant="success" type="tag" size="small" onDismiss={() => {}}>Dismiss</Badge>
            </div>
          </div>
        </div>
        {/* Chip — Figma: Size Large / Medium / Small, Solid / Solid+Dismiss / Outline / Outline+Dismiss / Soft */}
        <div className="space-y-4">
          <Text variant="h6" as="h3" className="text-[var(--color-text-muted)]">Chip</Text>
          {(["large", "medium", "small"] as const).map((sz) => (
            <div key={sz} className="space-y-2">
              <p className="text-[length:var(--text-body-sm-size)] text-[var(--color-text-muted)]">Size — {sz}</p>
              <div className="flex flex-wrap gap-2 items-center">
                <Chip size={sz} variant="success">Chip</Chip>
                <Chip size={sz} variant="error">Chip</Chip>
                <Chip size={sz} variant="info">Chip</Chip>
                <Chip size={sz} variant="warning">Chip</Chip>
                <Chip size={sz} variant="default">Chip</Chip>
                <Chip size={sz} variant="primary">Chip</Chip>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <Chip size={sz} variant="success" onDismiss={() => {}}>Chip</Chip>
                <Chip size={sz} variant="primary" onDismiss={() => {}}>Chip</Chip>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <Chip size={sz} variant="success" appearance="outline">Chip</Chip>
                <Chip size={sz} variant="error" appearance="outline">Chip</Chip>
                <Chip size={sz} variant="primary" appearance="outline" onDismiss={() => {}}>Chip</Chip>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <Chip size={sz} variant="success" appearance="soft">Chip</Chip>
                <Chip size={sz} variant="error" appearance="soft">Chip</Chip>
                <Chip size={sz} variant="info" appearance="soft">Chip</Chip>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="data-display"
        title="Data display"
        description="Tables present tabular data; use clear headers and consistent alignment. Cards group related content and optional actions. Avatars represent people (initials or image) and come in several sizes."
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <Text variant="h6" as="h3" className="text-[var(--color-text-muted)]">Table — style: default, size: default</Text>
            <Table
              headers={["Name", "Role", "Status"]}
              rows={[
                ["Jane Doe", "Admin", "Active"],
                ["John Smith", "Editor", "Pending"],
              ]}
            />
          </div>
          <div className="space-y-2">
            <Text variant="h6" as="h3" className="text-[var(--color-text-muted)]">Table — style: filled (gray header, row hover), size: default</Text>
            <Table
              style="filled"
              headers={["Name", "Role", "Status"]}
              rows={[
                ["Jane Doe", "Admin", "Active"],
                ["John Smith", "Editor", "Pending"],
              ]}
            />
          </div>
          <div className="space-y-2">
            <Text variant="h6" as="h3" className="text-[var(--color-text-muted)]">Table — size: compact</Text>
            <Table
              size="compact"
              headers={["Col A", "Col B"]}
              rows={[["Row 1", "Data"], ["Row 2", "Data"]]}
            />
          </div>
          <div className="space-y-2">
            <Text variant="h6" as="h3" className="text-[var(--color-text-muted)]">Table — size: large</Text>
            <Table
              size="large"
              style="filled"
              headers={["Name", "Role"]}
              rows={[["Alice", "Admin"], ["Bob", "Viewer"]]}
            />
          </div>
        </div>
        <div className="space-y-6">
          <Text variant="h6" as="h3" className="text-[var(--color-text-muted)]">Card — profile (type & variant)</Text>
          <div className="flex flex-wrap gap-6">
            <Card
              type="profile"
              variant="default"
              title="Briana Swanson"
              subtitle="Silver Springs Foods, Inc"
              statusBadge="Linked"
              avatarInitials="SM"
              rows={[
                { icon: "person-vcard", text: "22112211" },
                { icon: "telephone", text: "(123) 456 7890" },
                { icon: "envelope", text: "robertwill@gmail.com" },
                { icon: "calendar", text: "11/01/1995" },
                { icon: "wallet", text: "Payment Type - Bank" },
                { icon: "geo-alt", text: "Drawer 78864, Milwaukee, WI 53278" },
              ]}
              footerLabel="Action 2"
            />
            <Card
              type="profile"
              variant="primary"
              title="Briana Swanson"
              subtitle="Silver Springs Foods, Inc"
              statusBadge="Linked"
              avatarInitials="SM"
              rows={[
                { icon: "telephone", text: "(123) 456 7890" },
                { icon: "envelope", text: "robertwill@gmail.com" },
              ]}
              footerLabel="Action 2"
            />
            <Card
              type="profile"
              variant="primaryAlt"
              title="Briana Swanson"
              subtitle="Silver Springs Foods, Inc"
              avatarInitials="SM"
              rows={[
                { icon: "telephone", text: "(123) 456 7890" },
                { icon: "envelope", text: "robertwill@gmail.com" },
              ]}
              footerLabel="Action 2"
              onMenuClick={() => {}}
            />
          </div>
          <Text variant="h6" as="h3" className="text-[var(--color-text-muted)]">Card — user (360px, avatar left)</Text>
          <div className="flex flex-wrap gap-6">
            <Card
              type="user"
              variant="default"
              title="Raymond Wui Moy"
              subtitle="Dependent"
              avatarInitials="SM"
              rows={[
                { icon: "calendar", text: "11/01/1995" },
                { icon: "envelope", text: "robertwill@gmail.com" },
                { icon: "telephone", text: "(123) 456 7890" },
                { icon: "geo-alt", text: "230 Park Avenue, New York, NY 10169" },
              ]}
              footerLeftLabel="Enrollment"
              footerLeftValue="Start: 02/26/2020"
              footerLabel="View Detail"
              onMenuClick={() => {}}
            />
            <Card
              type="user"
              variant="primary"
              title="Jessica Chen"
              subtitle="Self"
              avatarInitials="LM"
              rows={[
                { icon: "calendar", text: "03/15/1990" },
                { icon: "envelope", text: "jessica@example.com" },
                { icon: "telephone", text: "(123) 456 7890" },
              ]}
              footerLeftLabel="Enrollment"
              footerLeftValue="Start: 07/12/2021"
              footerLabel="View Detail"
              onMenuClick={() => {}}
            />
          </div>
          <Text variant="h6" as="h3" className="text-[var(--color-text-muted)]">Card — content (variant: default / accent)</Text>
          <div className="flex flex-wrap gap-6">
            <Card
              type="content"
              variant="default"
              headerLayout="list"
              title="Title"
              badge="Janet Gwin"
              subText="Some Text"
              statusBadge="Status"
              metaText="20223 Days"
              onMenuClick={() => {}}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum faucibus id massa auctor malesuada tristique.
            </Card>
            <Card
              type="content"
              variant="accent"
              headerLayout="list"
              title="Title"
              badge="Janet Gwin"
              subText="Some Text"
              statusBadge="Status"
              metaText="20223 Days"
              onMenuClick={() => {}}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum faucibus id massa auctor malesuada tristique.
            </Card>
            <Card
              type="content"
              variant="default"
              size="compact"
              title="Title"
              date="mm/dd/yy"
              showStatusIcons
              footerActions={
                <>
                  <Button variant="filled" size="small">Action 2</Button>
                  <Button variant="filled" size="small">Action 1</Button>
                </>
              }
              onMenuClick={() => {}}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum faucibus id massa auctor malesuada tristique.
            </Card>
            <Card
              type="content"
              variant="accent"
              size="compact"
              title="Title"
              date="mm/dd/yy"
              showStatusIcons
              footerActions={
                <>
                  <Button variant="filled" size="small">Action 2</Button>
                  <Button variant="filled" size="small">Action 1</Button>
                </>
              }
              onMenuClick={() => {}}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum faucibus id massa auctor malesuada tristique.
            </Card>
          </div>
          <Text variant="h6" as="h3" className="text-[var(--color-text-muted)]">Card — content with image (Media Card: title on top or below image only)</Text>
          <div className="flex flex-wrap gap-6">
            <Card
              type="contentWithImage"
              layout="imageFirst"
              title="Title"
              date="mm/dd/yy"
              footerActions={
                <>
                  <Button variant="filled" size="small">Action 2</Button>
                  <Button variant="filled" size="small">Action 1</Button>
                </>
              }
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum faucibus id massa auctor malesuada tristique.
            </Card>
            <Card
              type="contentWithImage"
              layout="headerFirst"
              title="Title"
              date="mm/dd/yy"
              footerActions={
                <>
                  <Button variant="filled" size="small">Action 2</Button>
                  <Button variant="filled" size="small">Action 1</Button>
                </>
              }
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum faucibus id massa auctor malesuada tristique.
            </Card>
          </div>
        </div>
        <div className="space-y-2">
          <Text variant="h6" as="h3" className="text-[var(--color-text-muted)]">Avatar — size (Figma: 32px, 44px, 64px, 128px)</Text>
          <div className="flex flex-wrap gap-4 items-end">
            <Avatar initials="SM" size="small" />
            <Avatar initials="SM" size="medium" />
            <Avatar initials="SM" size="large" />
            <Avatar initials="SM" size="extra-large" />
            <Avatar size="medium" loading />
          </div>
        </div>
      </Section>

      <Section
        id="overlays"
        title="Overlays"
        description="Modals and dialogs interrupt the flow for confirmation or short messages; use modals for primary flows (e.g. confirm discard) and dialogs for simple acknowledgments. Tooltips provide short contextual hints on hover or focus; keep content brief."
      >
        <div className="flex flex-wrap gap-4">
          <Tooltip content="Tooltip text" position="top"><Button variant="outline" size="small">Hover top</Button></Tooltip>
          <Tooltip content="Tooltip text" position="bottom"><Button variant="outline" size="small">Hover bottom</Button></Tooltip>
          <Tooltip content="Tooltip text" position="left"><Button variant="outline" size="small">Hover left</Button></Tooltip>
          <Tooltip content="Tooltip text" position="right"><Button variant="outline" size="small">Hover right</Button></Tooltip>
        </div>
        <ShowcaseClient />
      </Section>
    </div>
  );
}
