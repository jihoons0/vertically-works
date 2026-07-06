01_BLUEPRINT.md

Vertically Works

Product Blueprint

Version 1.0

⸻

Document Purpose

This document is the single source of truth for Vertically Works.

It defines the product vision, content, UX, interaction model, information architecture, design system, component library, engineering intent, and future roadmap.

This document should be sufficient for an AI coding agent to build the complete project with minimal additional instruction.

If implementation differs from this document, this document is correct.

⸻

1. Vision

Mission

Vertically Works is an open reference and interactive design system for designing digital products around vertical writing systems.

Rather than treating vertical writing as an aesthetic choice, Vertically Works treats it as a first-class interaction model.

The project exists to answer questions traditional design systems cannot answer.

Examples include:

* How should a tooltip expand in a vertical interface?
* Which direction should drawers animate?
* How should users move between chapters?
* How should mixed CJK and Latin content behave?
* How should AI chat interfaces adapt?
* What interaction patterns naturally emerge from vertical reading?

Vertically Works should become the canonical reference for these questions.

⸻

Product Goals

Build the most comprehensive public resource for vertical interface design.

Teach interaction rather than aesthetics.

Provide reusable components.

Provide reusable interaction patterns.

Document reasoning behind every decision.

Create a playground for experimentation.

Eventually support AI-assisted generation of vertical-first interfaces.

⸻

Non Goals

Not a marketing site.

Not a portfolio.

Not a UI inspiration gallery.

Not a generic component library.

Not a typography showcase.

⸻

Audience

Primary

* Product Designers
* UX Designers
* Design Engineers
* Frontend Engineers
* Researchers
* Typography enthusiasts

Secondary

* AI coding agents
* LLMs
* Future Figma plugins
* Future Vertically AI

⸻

2. Design Philosophy

Everything should follow these principles.

Documentation should be conventional.

The documentation itself scrolls vertically.

Users should never have to learn a new navigation paradigm just to read documentation.

Interactive demonstrations are where vertical interaction happens.

⸻

Every component teaches something.

Components are not shown for completeness.

Each one exists because it answers a design question.

⸻

Motion has meaning.

Animations should reinforce reading direction.

Nothing animates purely because it looks nice.

⸻

Respect reading flow.

Reading direction influences:

Navigation

Motion

Hierarchy

Scanning

Interaction

Components should adapt accordingly.

⸻

Document uncertainty.

Not every problem has a correct answer.

Open questions should remain documented.

Research should continue.

⸻

3. Information Architecture

Home

Applications

Challenges

Principles

Components

Patterns

Playground

Resources

Contact

Github

⸻

Navigation

Desktop

Sticky top navigation.

Simple typography.

No mega menu.

No nested navigation.

⸻

Mobile

Hamburger menu.

Slide down navigation.

Minimal transitions.

⸻

Navigation Items

Home

Applications

Challenges

Principles

Components

Patterns

Playground

Resources

Github

⸻

4. Homepage

Purpose

Introduce Vertically Works.

Convince visitors this problem matters.

Invite exploration.

Do not overwhelm.

⸻

Page Structure

Hero

↓

Applications

↓

Challenges Preview

↓

Principles Preview

↓

Featured Components

↓

Playground Preview

↓

Resources

↓

Footer

⸻

Hero

Headline

Designing Interfaces for Vertical Writing Systems

Subheadline

A living design system exploring interaction patterns for vertical interfaces.

Primary CTA

Explore Components

Secondary CTA

Open Playground

Tertiary CTA

View Vertically Verse

Design

Large typography.

Minimal decoration.

Extensive whitespace.

No illustrations.

No gradients.

No marketing copy.

⸻

Animation

Fade Up

500ms

100ms stagger

Reduced motion respected.

⸻

Applications

Purpose

Demonstrate real implementations.

Current

Vertically Verse

Future placeholders

Music

Messaging

Maps

Reader

Browser

Notes

Calendar

Every future application should explain the design challenge rather than showing an empty card.

Example

Music

“How should playback controls behave in a vertical interface?”

⸻

Application Card

Contains

Screenshot

Status

Description

Platform

Learn More

Hover

Elevation

Screenshot zoom

150ms

⸻

Challenges

Purpose

Explain why vertical interfaces are difficult.

Every challenge includes

Question

Context

Interactive Demo

Discussion

Related Principles

Open Questions

⸻

Challenge Topics

Writing Direction

Reading Flow

Motion

Navigation

Selection

Keyboard

IME

Mixed Languages

Desktop

Mobile

Tablet

Watch

Vision Pro

AI Interfaces

Accessibility

⸻

Example

Challenge

Motion Direction

Question

Should a sheet animate from screen geometry or reading direction?

Interactive

Three variations

User compares

Discussion follows

⸻

Principles

Purpose

Translate observations into reusable guidance.

Each principle includes

Title

Description

Reasoning

Interactive Demo

Implementation Notes

Accessibility

Related Components

Future Questions

⸻

Principles

Respect Reading Flow

Motion Has Meaning

Interaction Before Typography

Mixed Language First

Accessibility First

Progressive Familiarity

Research Never Ends

⸻

Components

Purpose

Provide reusable interaction primitives.

Components are organized by function rather than platform.

⸻

Categories

Actions

Inputs

Navigation

Lists

Reading

Feedback

Overlays

Layout

Media

Data Display

Patterns

⸻

Each Component Page

Overview

Purpose

Problem

Interactive Demo

Variants

States

Motion

Accessibility

Implementation

Do

Don’t

Related Components

Research Notes

Open Questions

⸻

Components Inventory

Actions

Button

Icon Button

Toggle

Segmented Control

Split Button

Menu Button

⸻

Inputs

Text Field

Textarea

Search

Checkbox

Radio

Switch

Dropdown

Autocomplete

Slider

Date Picker

Time Picker

Color Picker

⸻

Navigation

Tabs

Sidebar

Pagination

Back Navigation

Toolbar

Command Palette

⸻

Lists

Cell

Grouped List

Accordion

Tree

Outline

Timeline

Virtualized List

Sortable List

⸻

Reading

Heading

Paragraph

Quote

Verse

Annotation

Highlight

Bookmark

Footnote

Chapter Navigation

Reading Progress

⸻

Feedback

Toast

Snackbar

Alert

Progress

Skeleton

Loading Spinner

Empty State

Error State

⸻

Overlays

Tooltip

Popover

Dialog

Sheet

Context Menu

Modal

Inspector

⸻

Layout

Grid

Split View

Resizable Panels

Stack

Section

Container

Divider

Responsive Layout

⸻

Component Specification Template

Every component must contain

Purpose

Intent

Problem

Usage

When to Use

When Not to Use

Anatomy

Properties

Variants

States

Interactions

Hover

Focus

Pressed

Disabled

Loading

Animation

Desktop

Mobile

Tablet

Accessibility

Keyboard

Screen Reader

Reduced Motion

Implementation Notes

Do

Don’t

Related Components

Future Questions

⸻

Patterns

Patterns combine multiple components.

Patterns represent real product flows.

⸻

Patterns

Reader

Music Player

Settings

Messaging

Maps

Documentation

Article

Search

Authentication

Checkout

Notifications

Gallery

Notes

Calendar

⸻

Each Pattern Contains

Purpose

Diagram

Flow

Screens

Transitions

Components Used

Accessibility

Research Notes

⸻

Playground

Purpose

Experiment.

Compare.

Prototype.

⸻

Controls

Language

Writing Direction

Reading Direction

Device

Theme

Animation Speed

Reduced Motion

Grid

Guides

⸻

Preview updates instantly.

Every control is stateful.

URL should persist configuration.

⸻

Resources

Research Papers

Original Vertically Works Article

Typography References

Unicode References

Browser Support

Writing Modes

GitHub

Figma

Future Libraries

⸻

Contact

Minimal.

Email

GitHub

Twitter

Medium

⸻

Future Roadmap

Phase 1

Documentation

Components

Playground

Vertically Verse

⸻

Phase 2

Pattern Library

Animation Library

Research

Community

⸻

Phase 3

React Components

SwiftUI Components

Compose Components

Figma Plugin

⸻

Phase 4

Vertically AI

AI design assistant

Prompt library

Machine-readable design rules

AI generated vertical interfaces

⸻

Definition of Done

A page is complete only if it contains

Purpose

Content

Interaction

Animation

Accessibility

Responsive behavior

Implementation Notes

Edge Cases

Future Work

Research References

⸻

A component is complete only if it contains

Interactive Demo

Keyboard Support

Touch Support

Reduced Motion

Accessibility Notes

Implementation Notes

Do

Don’t

Open Questions

⸻

Nothing ships without documentation.

Nothing is documented without interaction.

Nothing is interactive without reasoning.

⸻

Final Vision

Vertically Works is not a website.

It is the reference implementation of an interaction language for vertical interfaces.

The website is only the first manifestation of that knowledge.

Future outputs include applications, design systems, code libraries, AI tooling, and research.

Every decision made within this project should strengthen that long-term vision.