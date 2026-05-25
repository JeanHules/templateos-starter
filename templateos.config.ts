const config = {
  id: "my-template",
  name: "My Template",
  description: "Describe your template's style, purpose, and target use case.",

  /**
   * Category — determines which required components are checked on submission.
   * Options: marketing | saas | dashboard | ecommerce | docs | portfolio | blog | agency
   */
  category: "saas" as const,

  /**
   * Semantic version. Bump this before pushing to release a new version.
   * Buyers stay pinned to the version they purchased until they choose to upgrade.
   * Format: MAJOR.MINOR.PATCH — e.g. "1.0.0" → "1.1.0" for new components, "2.0.0" for breaking changes.
   */
  version: "1.0.0",

  price: 49,
  tags: ["warm", "friendly", "tailwind"],
  figmaUrl: undefined as string | undefined,

  tokens: {
    colors: {
      "brand/primary":       { value: "#f97316", description: "Primary action color — buttons, links" },
      "brand/primary-dark":  { value: "#ea580c", description: "Hover state on primary elements" },
      "brand/accent":        { value: "#f59e0b", description: "Highlights and decorative accents" },
      "neutral/900":         { value: "#1c1917", description: "Headings and bold text" },
      "neutral/700":         { value: "#44403c", description: "Body text" },
      "neutral/500":         { value: "#78716c", description: "Secondary / muted text" },
      "neutral/200":         { value: "#e7e5e4", description: "Borders and dividers" },
      "neutral/100":         { value: "#f5f5f4", description: "Subtle backgrounds" },
      "neutral/50":          { value: "#fafaf9", description: "Page background" },
      "semantic/success":    { value: "#10b981", description: "Success states" },
      "semantic/warning":    { value: "#f59e0b", description: "Warning states" },
      "semantic/danger":     { value: "#ef4444", description: "Error states" },
    },
    typography: {
      "size/xs":        { value: "0.75rem",  description: "Labels and captions" },
      "size/sm":        { value: "0.875rem", description: "Body text, UI labels" },
      "size/base":      { value: "1rem",     description: "Default body" },
      "size/lg":        { value: "1.125rem", description: "Large body / lead text" },
      "size/xl":        { value: "1.25rem",  description: "Card titles" },
      "size/2xl":       { value: "1.5rem",   description: "Section sub-headings" },
      "size/3xl":       { value: "1.875rem", description: "Section headings" },
      "size/4xl":       { value: "2.25rem",  description: "Page headings" },
      "size/5xl":       { value: "3rem",     description: "Hero headings" },
      "weight/normal":  { value: "400",      description: "Body" },
      "weight/medium":  { value: "500",      description: "UI labels" },
      "weight/semibold":{ value: "600",      description: "Sub-headings" },
      "weight/bold":    { value: "700",      description: "Headings" },
    },
    spacing: {
      "1":  { value: "0.25rem" },
      "2":  { value: "0.5rem"  },
      "3":  { value: "0.75rem" },
      "4":  { value: "1rem"    },
      "5":  { value: "1.25rem" },
      "6":  { value: "1.5rem"  },
      "8":  { value: "2rem"    },
      "10": { value: "2.5rem"  },
      "12": { value: "3rem"    },
      "16": { value: "4rem"    },
      "20": { value: "5rem"    },
      "24": { value: "6rem"    },
    },
    radii: {
      "sm":   { value: "0.375rem", description: "Subtle rounding — inputs, small badges" },
      "md":   { value: "0.5rem",   description: "Buttons, cards" },
      "lg":   { value: "0.75rem",  description: "Larger cards, modals" },
      "xl":   { value: "1rem",     description: "Section containers" },
      "2xl":  { value: "1.5rem",   description: "Feature cards, pricing panels" },
      "full": { value: "9999px",   description: "Pills, tags, avatar rings" },
    },
  },
};

export default config;
export type TemplateConfig = typeof config;
