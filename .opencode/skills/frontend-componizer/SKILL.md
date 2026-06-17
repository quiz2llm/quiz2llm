---

name: frontend-componizer
description: MUST be used after create-antd-design-component. Converts Ant Design component architecture into production-ready React and TypeScript components.
---------------------------------------------------------------------------------------------------------------------------------------------------------------

# Frontend Componentizer

## Purpose

Convert Ant Design component definitions into production-ready React TypeScript code.

This skill implements the architecture produced by create-antd-design-component.

---

# Core Rule

Above all else:

Use the minimum amount of custom CSS possible.

Priority order:

1. Ant Design components
2. Ant Design props
3. Ant Design variants
4. Ant Design Layout primitives
5. Ant Design Design Tokens
6. Small reusable CSS
7. Inline CSS only as a last resort

---

# Implementation Rules

## Use TypeScript

Always create typed interfaces.

Example:

interface UserCardProps {
name: string;
email: string;
role: string;
}

---

## Use Ant Design Directly

Prefer:

import { Button } from "antd";

instead of recreating components.

---

## Prefer Composition

Bad:

DashboardCard
MetricCard
SalesCard
RevenueCard

Good:

MetricCard

with props.

---

## Folder Structure

Prefer:

components/
├── common/
├── forms/
├── layout/
├── tables/
├── cards/
└── feedback/

---

# Styling Rules

Preferred order:

Ant Design props

Example:

<Button type="primary" />

Then:

ConfigProvider

Then:

Design Tokens

Then:

Small CSS files

Never start with custom CSS.

---

# Accessibility Rules

Always:

* Use semantic HTML.
* Use proper button elements.
* Use proper form labels.
* Preserve keyboard navigation.
* Preserve Ant Design accessibility defaults.

---

# Output Format

For every component generate:

## Purpose

Explain responsibility.

## Props

Generate TypeScript interface.

## Dependencies

List Ant Design components used.

## React Implementation

Generate complete React TypeScript component.

---

# Quality Checklist

Before finishing verify:

* Is there an Ant Design component already solving this?
* Can two components be merged into one reusable component?
* Is custom CSS really necessary?
* Can this be achieved through Ant Design props?
* Are props strongly typed?
* Is the component reusable?

If the answer indicates duplication, refactor before generating code.

The final result should feel like a native Ant Design application rather than a custom UI with Ant Design added on top.
