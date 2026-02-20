import type { Project } from "@/types";

export const mockProjects: Project[] = [
  // ── Dispatch Hub ────────────────────────────────────────────────────
  {
    id: "proj-1",
    title: "ML Scheduling Engine v1",
    description:
      "Build the core ML model for auto-assigning technicians to work orders based on skills, location, and availability",
    status: "in-progress",
    productId: "prod-dispatch",
    quarterId: "q1-2025",
    startDate: "2025-01-06",
    endDate: "2025-03-15",
    tagIds: ["tag-ai", "tag-efficiency"],
    okrLinks: [
      { objectiveId: "obj-10", keyResultId: "kr-10-1" },
      { objectiveId: "obj-3" },
    ],
    owner: "Sofia Andersen",
  },
  {
    id: "proj-2",
    title: "Route Optimisation Module",
    description:
      "Integrate Google OR-Tools for multi-stop route optimisation with traffic-aware ETAs",
    status: "in-progress",
    productId: "prod-dispatch",
    quarterId: "q1-2025",
    startDate: "2025-01-20",
    endDate: "2025-03-10",
    tagIds: ["tag-ai", "tag-efficiency"],
    okrLinks: [
      { objectiveId: "obj-10", keyResultId: "kr-10-2" },
      { objectiveId: "obj-3" },
    ],
    owner: "Sofia Andersen",
  },
  {
    id: "proj-3",
    title: "Live Dispatch Map & Queue",
    description:
      "Real-time map with technician pins, job clusters, and drag-and-drop queue management",
    status: "planned",
    productId: "prod-dispatch",
    quarterId: "q1-2025",
    startDate: "2025-02-10",
    endDate: "2025-03-31",
    tagIds: ["tag-ux"],
    okrLinks: [
      { objectiveId: "obj-11", keyResultId: "kr-11-1" },
      { objectiveId: "obj-4" },
    ],
    owner: "Sofia Andersen",
  },
  {
    id: "proj-4",
    title: "Drag-and-Drop Rescheduler",
    description:
      "Allow dispatchers to reassign and reorder jobs by dragging cards on the schedule board",
    status: "planned",
    productId: "prod-dispatch",
    quarterId: "q1-2025",
    startDate: "2025-02-15",
    endDate: "2025-03-31",
    tagIds: ["tag-ux", "tag-efficiency"],
    okrLinks: [{ objectiveId: "obj-11", keyResultId: "kr-11-2" }],
    owner: "Sofia Andersen",
  },

  // ── Field App ───────────────────────────────────────────────────────
  {
    id: "proj-5",
    title: "Field App iOS Build",
    description:
      "Core iOS app with Swift UI — authentication, work order list, job detail, and navigation",
    status: "in-progress",
    productId: "prod-mobile",
    quarterId: "q1-2025",
    startDate: "2025-01-06",
    endDate: "2025-02-28",
    tagIds: ["tag-mobile", "tag-ux"],
    okrLinks: [
      { objectiveId: "obj-20", keyResultId: "kr-20-1" },
      { objectiveId: "obj-4" },
    ],
    owner: "Carlos Rivera",
  },
  {
    id: "proj-6",
    title: "Field App Android Build",
    description:
      "Android app with Jetpack Compose sharing business logic with iOS via KMP",
    status: "in-progress",
    productId: "prod-mobile",
    quarterId: "q1-2025",
    startDate: "2025-01-13",
    endDate: "2025-03-10",
    tagIds: ["tag-mobile"],
    okrLinks: [
      { objectiveId: "obj-20", keyResultId: "kr-20-1" },
      { objectiveId: "obj-4" },
    ],
    owner: "Carlos Rivera",
  },
  {
    id: "proj-7",
    title: "Offline Sync Engine",
    description:
      "SQLite-based local cache with conflict resolution and background sync queue",
    status: "in-progress",
    productId: "prod-mobile",
    quarterId: "q1-2025",
    startDate: "2025-01-20",
    endDate: "2025-03-15",
    tagIds: ["tag-mobile", "tag-reliability"],
    okrLinks: [
      { objectiveId: "obj-21", keyResultId: "kr-21-1" },
      { objectiveId: "obj-2" },
    ],
    owner: "Carlos Rivera",
  },
  {
    id: "proj-8",
    title: "Photo Capture & Signature Pad",
    description:
      "On-device photo capture with annotation overlay and legally-compliant e-signature collection",
    status: "done",
    productId: "prod-mobile",
    quarterId: "q1-2025",
    startDate: "2025-01-06",
    endDate: "2025-01-31",
    tagIds: ["tag-mobile", "tag-compliance"],
    okrLinks: [
      { objectiveId: "obj-22", keyResultId: "kr-22-1" },
      { objectiveId: "obj-5" },
    ],
    owner: "Carlos Rivera",
  },

  // ── Asset Tracker ───────────────────────────────────────────────────
  {
    id: "proj-9",
    title: "Preventive Maintenance Scheduler",
    description:
      "Rule engine for auto-generating PM work orders based on runtime hours, mileage, or calendar triggers",
    status: "in-progress",
    productId: "prod-assets",
    quarterId: "q1-2025",
    startDate: "2025-01-08",
    endDate: "2025-03-15",
    tagIds: ["tag-efficiency", "tag-reliability"],
    okrLinks: [
      { objectiveId: "obj-30", keyResultId: "kr-30-1" },
      { objectiveId: "obj-3" },
    ],
    owner: "Anika Patel",
  },
  {
    id: "proj-10",
    title: "Asset Import & Migration Tool",
    description:
      "Bulk CSV/Excel importer with validation, de-duplication, and field mapping",
    status: "in-progress",
    productId: "prod-assets",
    quarterId: "q1-2025",
    startDate: "2025-01-06",
    endDate: "2025-02-15",
    tagIds: ["tag-compliance"],
    okrLinks: [{ objectiveId: "obj-31", keyResultId: "kr-31-1" }],
    owner: "Anika Patel",
  },
  {
    id: "proj-11",
    title: "Warranty & Contract Management",
    description:
      "Track warranty terms, expiry alerts, and vendor SLA compliance per asset",
    status: "planned",
    productId: "prod-assets",
    quarterId: "q1-2025",
    startDate: "2025-02-01",
    endDate: "2025-03-31",
    tagIds: ["tag-compliance", "tag-revenue"],
    okrLinks: [
      { objectiveId: "obj-31", keyResultId: "kr-31-2" },
      { objectiveId: "obj-5" },
    ],
    owner: "Anika Patel",
  },

  // ── Customer Portal ─────────────────────────────────────────────────
  {
    id: "proj-12",
    title: "Online Booking Widget",
    description:
      "Embeddable booking form with service-type selection, time-slot picker, and confirmation flow",
    status: "in-progress",
    productId: "prod-portal",
    quarterId: "q1-2025",
    startDate: "2025-01-10",
    endDate: "2025-02-28",
    tagIds: ["tag-ux", "tag-growth"],
    okrLinks: [
      { objectiveId: "obj-40", keyResultId: "kr-40-1" },
      { objectiveId: "obj-1" },
    ],
    owner: "Lisa Nguyen",
  },
  {
    id: "proj-13",
    title: "Live Technician ETA Tracker",
    description:
      "Customer-facing map showing real-time technician location and estimated arrival time",
    status: "blocked",
    productId: "prod-portal",
    quarterId: "q1-2025",
    startDate: "2025-02-01",
    endDate: "2025-03-15",
    tagIds: ["tag-ux", "tag-reliability"],
    okrLinks: [
      { objectiveId: "obj-41", keyResultId: "kr-41-1" },
      { objectiveId: "obj-4" },
    ],
    owner: "Lisa Nguyen",
  },
  {
    id: "proj-14",
    title: "Automated Job Status Notifications",
    description:
      "SMS and email notifications triggered at each job lifecycle stage (scheduled, en-route, completed)",
    status: "in-progress",
    productId: "prod-portal",
    quarterId: "q1-2025",
    startDate: "2025-01-15",
    endDate: "2025-03-01",
    tagIds: ["tag-ux"],
    okrLinks: [{ objectiveId: "obj-41", keyResultId: "kr-41-2" }],
    owner: "Lisa Nguyen",
  },

  // ── Insights & Reporting ────────────────────────────────────────────
  {
    id: "proj-15",
    title: "First-Time-Fix Prediction Model",
    description:
      "ML pipeline training on historical work-order outcomes to predict fix probability and recommend parts",
    status: "in-progress",
    productId: "prod-analytics",
    quarterId: "q1-2025",
    startDate: "2025-01-08",
    endDate: "2025-03-15",
    tagIds: ["tag-ai", "tag-efficiency"],
    okrLinks: [
      { objectiveId: "obj-50", keyResultId: "kr-50-1" },
      { objectiveId: "obj-3" },
    ],
    owner: "Marcus Chen",
  },
  {
    id: "proj-16",
    title: "Executive Dashboard Builder",
    description:
      "Drag-and-drop dashboard creation with pre-built KPI widgets for SLA, utilisation, and revenue",
    status: "in-progress",
    productId: "prod-analytics",
    quarterId: "q1-2025",
    startDate: "2025-01-15",
    endDate: "2025-03-20",
    tagIds: ["tag-revenue", "tag-ux"],
    okrLinks: [
      { objectiveId: "obj-51", keyResultId: "kr-51-1" },
      { objectiveId: "obj-1" },
    ],
    owner: "Marcus Chen",
  },
  {
    id: "proj-17",
    title: "SAP & Salesforce Connectors",
    description:
      "Data integration connectors for SAP ERP and Salesforce CRM with bi-directional sync",
    status: "in-progress",
    productId: "prod-analytics",
    quarterId: "q1-2025",
    startDate: "2025-01-20",
    endDate: "2025-02-28",
    tagIds: ["tag-ai", "tag-growth"],
    okrLinks: [{ objectiveId: "obj-52", keyResultId: "kr-52-1" }],
    owner: "Marcus Chen",
  },
  {
    id: "proj-18",
    title: "ServiceNow Integration",
    description:
      "Bi-directional sync with ServiceNow ITSM for enterprise ticket management",
    status: "planned",
    productId: "prod-analytics",
    quarterId: "q1-2025",
    startDate: "2025-03-01",
    endDate: "2025-03-31",
    tagIds: ["tag-growth"],
    okrLinks: [{ objectiveId: "obj-52", keyResultId: "kr-52-1" }],
    owner: "Marcus Chen",
  },
];
