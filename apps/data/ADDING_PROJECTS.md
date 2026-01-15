# Adding Projects to data.demoredesign.com

This guide walks you through adding new portfolio projects to your data analytics site.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Project Types](#project-types)
3. [Step-by-Step Instructions](#step-by-step-instructions)
4. [Field Reference](#field-reference)
5. [Getting Embed URLs](#getting-embed-urls)
6. [Adding Thumbnails](#adding-thumbnails)
7. [Available Tags](#available-tags)
8. [Examples](#examples)
9. [Troubleshooting](#troubleshooting)

---

## Quick Start

1. Open `apps/data/app/data/projects.ts`
2. Add a new project object to the `projects` array
3. (Optional) Add a thumbnail image to `apps/data/public/projects/`
4. Save the file — the site updates automatically in dev mode

---

## Project Types

| Type | Use For | Badge Color | Embed Support |
|------|---------|-------------|---------------|
| `github` | Code repositories | Gray | No |
| `tableau` | Tableau dashboards | Blue | Yes (iframe) |
| `powerbi` | Power BI reports | Amber | Yes (iframe) |
| `jupyter` | Jupyter/Colab notebooks | Orange | No |
| `other` | Everything else | Purple | Optional |

---

## Step-by-Step Instructions

### Step 1: Open the Projects File

Navigate to:
```
apps/data/app/data/projects.ts
```

### Step 2: Choose Your Project Type

Determine which type best fits your project:
- **GitHub repo** → `type: 'github'`
- **Tableau dashboard** → `type: 'tableau'`
- **Power BI report** → `type: 'powerbi'`
- **Jupyter notebook** → `type: 'jupyter'`
- **Other** → `type: 'other'`

### Step 3: Create the Project Object

Add a new object inside the `projects` array. Place it at the position you want it to appear (featured projects should go first).

```typescript
export const projects: Project[] = [
  // Existing projects...
  
  // ADD YOUR NEW PROJECT HERE:
  {
    slug: 'your-project-slug',
    title: 'Your Project Title',
    tagline: 'Brief one-line description',
    type: 'tableau',
    status: 'published',
    domainTags: ['Analytics', 'Reporting'],
    toolTags: ['Tableau', 'SQL'],
    // ... more fields
  },
];
```

### Step 4: Add Required Fields

Every project needs these fields:

| Field | Description | Example |
|-------|-------------|---------|
| `slug` | URL-safe identifier (lowercase, hyphens) | `'sales-dashboard-2024'` |
| `title` | Display name | `'Sales Analytics Dashboard'` |
| `tagline` | One-line description for cards | `'Interactive revenue trends'` |
| `type` | Project category | `'tableau'` |
| `status` | Visibility/importance | `'published'` or `'featured'` |
| `domainTags` | Business domain tags (array) | `['Reporting', 'Analytics']` |
| `toolTags` | Technologies used (array) | `['Tableau', 'SQL']` |

### Step 5: Add Type-Specific URLs

Based on your project type, add the relevant URLs:

**For GitHub projects:**
```typescript
repoUrl: 'https://github.com/username/repo',  // README auto-fetched!
```

> **Note:** For GitHub projects, the README.md is **automatically fetched and rendered** on the detail page! The system tries both `main` and `master` branches. Images, badges, code blocks, and tables are all rendered properly.

**For Tableau dashboards:**
```typescript
embedUrl: 'https://public.tableau.com/views/DashboardName/Sheet1?:embed=y',
liveUrl: 'https://public.tableau.com/app/profile/you/viz/DashboardName',
```

**For Power BI reports:**
```typescript
embedUrl: 'https://app.powerbi.com/view?r=YOUR_EMBED_TOKEN',
liveUrl: 'https://app.powerbi.com/view?r=YOUR_EMBED_TOKEN',
```

**For Jupyter notebooks:**
```typescript
notebookUrl: 'https://github.com/username/repo/blob/main/notebook.ipynb',
repoUrl: 'https://github.com/username/repo',  // Optional
```

### Step 6: Add Detail Page Content (Recommended)

These fields appear on the project detail page:

```typescript
problemStatement: 'What business problem did this solve?',
approach: 'How did you approach the solution? What methodology?',
outcome: 'What were the results? Include metrics if possible.',
dateCompleted: '2024-06-15',  // ISO format: YYYY-MM-DD
```

### Step 7: Add a Thumbnail (Optional but Recommended)

1. Take a screenshot of your project (dashboard, code, notebook output)
2. Save it to: `apps/data/public/projects/your-image.png`
3. Reference it in the project:

```typescript
thumbnail: '/projects/your-image.png',
```

**Recommended image specs:**
- Format: PNG or JPG
- Aspect ratio: 16:9 works best
- Size: 800x450px or larger

### Step 8: Save and Preview

1. Save `projects.ts`
2. The dev server auto-reloads
3. Visit http://localhost:3000 to see your new project
4. Click on it to verify the detail page looks correct

---

## Field Reference

### All Available Fields

```typescript
interface Project {
  // REQUIRED
  slug: string;           // URL identifier (e.g., 'my-dashboard')
  title: string;          // Display title
  tagline: string;        // Card description (1-2 sentences)
  type: ProjectType;      // 'github' | 'tableau' | 'powerbi' | 'jupyter' | 'other'
  status: ProjectStatus;  // 'published' | 'featured' | 'wip'
  domainTags: DomainTag[];
  toolTags: ToolTag[];
  
  // OPTIONAL - URLs
  thumbnail?: string;     // Path to image in /public
  repoUrl?: string;       // GitHub repository URL
  embedUrl?: string;      // Tableau/Power BI embed URL
  liveUrl?: string;       // Direct link to live dashboard
  notebookUrl?: string;   // Jupyter/Colab notebook URL
  
  // OPTIONAL - Detail page content
  problemStatement?: string;
  approach?: string;
  outcome?: string;
  dateCompleted?: string; // ISO date format
}
```

### Status Values

| Status | Effect |
|--------|--------|
| `'featured'` | Shows "Featured" badge on card, appears first |
| `'published'` | Normal display, no special badge |
| `'wip'` | Shows "In Progress" badge |

---

## Getting Embed URLs

### Tableau Public

1. Go to your dashboard on Tableau Public
2. Click **Share** button (bottom of viz)
3. Select **Embed Code** tab
4. Copy the URL from inside the `<iframe src="...">` tag
5. Use this as your `embedUrl`

**Example:**
```
https://public.tableau.com/views/SalesDashboard/Overview?:embed=y&:display_count=yes
```

### Power BI

1. Open your report in Power BI Service
2. Click **File** → **Embed report** → **Website or portal**
3. Copy the embed URL provided
4. Use this as your `embedUrl`

**Example:**
```
https://app.powerbi.com/view?r=eyJrIjoiZTQ1NjM0YjYtNGY5...
```

**Note:** The report must be published and set to allow embedding.

### Tableau Server (Private)

For private Tableau Server dashboards that require authentication:
- Don't use `embedUrl` (it won't work for public visitors)
- Use `liveUrl` to link directly to the dashboard
- Add a `thumbnail` screenshot so visitors can see what it looks like

---

## Adding Thumbnails

### Where to Save

```
apps/data/public/projects/
```

Create this folder if it doesn't exist.

### File Naming

Use descriptive, URL-safe names:
- ✅ `sales-dashboard.png`
- ✅ `etl-pipeline-analysis.jpg`
- ❌ `Screenshot 2024-01-15.png` (spaces are problematic)

### Referencing in Project

```typescript
thumbnail: '/projects/sales-dashboard.png',
```

Note: Start with `/projects/` — don't include `public/` in the path.

### No Thumbnail?

If you don't provide a thumbnail, the card will display a placeholder icon based on the project type. This works fine but thumbnails make your portfolio more visually appealing.

---

## Available Tags

### Domain Tags

```typescript
type DomainTag = 
  | 'Healthcare'
  | 'Operations'
  | 'AI/ML'
  | 'Data Engineering'
  | 'Reporting'
  | 'Automation'
  | 'Analytics'
  | 'OCR/Document Processing'
  | 'Backend Development'
  | 'Visualization';
```

### Tool Tags

```typescript
type ToolTag =
  | 'Python'
  | 'SQL'
  | 'Django'
  | 'Tableau'
  | 'Power BI'
  | 'Pandas'
  | 'OCR'
  | 'LLM'
  | 'PostgreSQL'
  | 'Celery'
  | 'React'
  | 'Next.js'
  | 'Excel'
  | 'R';
```

### Adding New Tags

To add new tags, edit `apps/data/app/types/project.ts` and add to the appropriate type:

```typescript
export type DomainTag = 
  | 'Healthcare'
  // ... existing tags
  | 'Finance'        // Add new domain
  | 'Marketing';     // Add another

export type ToolTag =
  | 'Python'
  // ... existing tags
  | 'Snowflake'      // Add new tool
  | 'dbt';           // Add another
```

---

## Examples

### GitHub Repository

```typescript
{
  slug: 'medical-data-platform',
  title: 'Medical Data Platform',
  tagline: 'Django backend with OCR pipelines and secure PHI storage',
  type: 'github',
  status: 'featured',
  domainTags: ['Healthcare', 'AI/ML', 'Backend Development'],
  toolTags: ['Django', 'Python', 'PostgreSQL', 'OCR', 'LLM'],
  thumbnail: '/projects/medical-platform.png',
  repoUrl: 'https://github.com/demoredesign/medical-platform',
  problemStatement: 'Healthcare organizations needed a secure, compliant way to extract and process medical document data at scale.',
  approach: 'Built a complete Django platform with OCR pipelines for document ingestion, LLM-based extraction for structured data, and HIPAA-compliant PHI storage.',
  outcome: 'Reduced manual data entry time by 80% while maintaining compliance standards.',
  dateCompleted: '2024-12-01',
},
```

### Tableau Dashboard

```typescript
{
  slug: 'operations-dashboard',
  title: 'Operations Analytics Dashboard',
  tagline: 'Real-time KPI tracking for venue operations',
  type: 'tableau',
  status: 'featured',
  domainTags: ['Operations', 'Reporting', 'Analytics'],
  toolTags: ['Tableau', 'SQL', 'Python'],
  thumbnail: '/projects/ops-dashboard.png',
  embedUrl: 'https://public.tableau.com/views/OperationsDashboard/Overview?:embed=y',
  liveUrl: 'https://public.tableau.com/app/profile/pdemore/viz/OperationsDashboard',
  problemStatement: 'Operations team lacked visibility into real-time performance.',
  approach: 'Designed interactive Tableau dashboard with drill-down by department.',
  outcome: 'Enabled data-driven decisions with 15-minute refresh cycles.',
  dateCompleted: '2024-06-01',
},
```

### Power BI Report

```typescript
{
  slug: 'revenue-forecasting',
  title: 'Revenue Forecasting Report',
  tagline: 'Executive dashboard for revenue trends and projections',
  type: 'powerbi',
  status: 'published',
  domainTags: ['Reporting', 'Analytics'],
  toolTags: ['Power BI', 'SQL', 'Excel'],
  thumbnail: '/projects/revenue-forecast.png',
  embedUrl: 'https://app.powerbi.com/view?r=eyJrIjoiZTQ1NjM0...',
  liveUrl: 'https://app.powerbi.com/view?r=eyJrIjoiZTQ1NjM0...',
  problemStatement: 'Leadership needed consolidated revenue view with forecasting.',
  approach: 'Built Power BI report with DAX measures for YoY and rolling averages.',
  outcome: 'Replaced manual weekly reporting, saving 10+ hours monthly.',
  dateCompleted: '2024-03-01',
},
```

### Jupyter Notebook

```typescript
{
  slug: 'customer-churn-analysis',
  title: 'Customer Churn Analysis',
  tagline: 'Predictive modeling for customer retention',
  type: 'jupyter',
  status: 'published',
  domainTags: ['Analytics', 'AI/ML'],
  toolTags: ['Python', 'Pandas', 'SQL'],
  thumbnail: '/projects/churn-analysis.png',
  notebookUrl: 'https://github.com/demoredesign/churn-analysis/blob/main/analysis.ipynb',
  repoUrl: 'https://github.com/demoredesign/churn-analysis',
  problemStatement: 'High customer churn rate with no predictive capabilities.',
  approach: 'Built classification model using historical customer data.',
  outcome: 'Identified top 5 churn factors, enabling targeted retention campaigns.',
  dateCompleted: '2024-02-15',
},
```

---

## Troubleshooting

### Project Not Appearing

1. Check for syntax errors in `projects.ts` (missing commas, brackets)
2. Ensure slug is unique
3. Check the browser console for errors

### Thumbnail Not Loading

1. Verify file exists in `apps/data/public/projects/`
2. Check the path starts with `/projects/` (not `/public/projects/`)
3. Ensure filename matches exactly (case-sensitive)

### Embed Not Working

1. Verify the embed URL is correct
2. For Tableau: Must be on Tableau Public (not Private Server)
3. For Power BI: Report must be published and embedding enabled
4. Some embeds block iframe display — use `liveUrl` instead

### TypeScript Errors

If you see type errors:
1. Check domain/tool tags match allowed values
2. Check status is one of: `'published'`, `'featured'`, `'wip'`
3. Check type is one of: `'github'`, `'tableau'`, `'powerbi'`, `'jupyter'`, `'other'`

---

## Need to Add New Tag Categories?

Edit `apps/data/app/types/project.ts` to add new domain or tool tags. The TypeScript compiler will then validate that you only use allowed values.

---

## Questions?

The portfolio framework is designed to be simple and extensible. If you need to add new project types or functionality, the relevant files are:

- `app/types/project.ts` — Type definitions
- `app/data/projects.ts` — Project data
- `app/components/ProjectCard.tsx` — Card rendering
- `app/projects/[slug]/page.tsx` — Detail page
- `app/components/ProjectEmbed.tsx` — Embed handling

