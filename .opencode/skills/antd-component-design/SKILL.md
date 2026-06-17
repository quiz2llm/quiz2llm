---
name: antd-component-design
description: MUST be used before implementing any frontend from Penpot (.pen), Figma, mockups or UI designs. Converts visual designs into an Ant Design component architecture and prepares the structure for implementation.
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Create Ant Design Component

## Purpose

Transform visual designs into an Ant Design based component architecture.

This skill DOES NOT generate production React code.

Its responsibility is to:

* Analyze the design.
* Identify reusable UI patterns.
* Map visual elements to Ant Design components.
* Reduce custom implementations.
* Prepare a component structure for implementation.

---

# Core Rule

Above all else:

Use the minimum amount of custom CSS possible.

Always prefer:

1. Existing Ant Design components.
2. Ant Design Layout system.
3. Ant Design Design Tokens.
4. Ant Design variants and props.
5. Ant Design composition.

Only use custom CSS when no Ant Design solution exists.

---

# Design Analysis Process

## Step 1

Analyze the entire screen before generating anything.

Identify:

* Layout
* Navigation
* Forms
* Tables
* Cards
* Lists
* Actions
* Modals
* Drawers
* Notifications

---

## Step 2

Identify reusable patterns.

Example:

Do NOT create:

* UserCard
* AdminCard
* ManagerCard

If all share the same structure.

Instead create:

* EntityCard

with configurable props.

---

## Step 3

Map elements to Ant Design components.

Examples:

Button → Antd Button

Input → Antd Input

Select → Antd Select

Tabs → Antd Tabs

Table → Antd Table

Card → Antd Card

Modal → Antd Modal

Drawer → Antd Drawer

Form → Antd Form

Menu → Antd Menu

Layout → Antd Layout

Space → Antd Space

Flex layouts → Antd Flex

Typography → Antd Typography

Descriptions → Antd Descriptions

Statistic → Antd Statistic

---

# Output Format

Generate:

## Component Tree

Example:

DashboardPage
├── DashboardLayout
├── DashboardHeader
├── MetricsSection
│   ├── MetricCard
│   ├── MetricCard
│   └── MetricCard
└── RecentOrdersTable

---

## Ant Design Mapping

MetricCard
→ Card
→ Statistic

DashboardHeader
→ Layout.Header
→ Typography.Title
→ Space

RecentOrdersTable
→ Table

---

## Reusability Notes

Explain:

* Which components should be shared.
* Which components should receive props.
* Which components should remain generic.

---

# Forbidden Behaviors

Do not generate inline styles.

Do not generate CSS modules.

Do not generate Tailwind classes.

Do not generate React implementation.

Do not create custom components when an Ant Design component already solves the problem.

The objective is architecture and Ant Design mapping only.
