---
created: 2026-10-04
author: Marcus Udén + Codex
source_tool: Codex Desktop
source: current private project manifests and recruiter-safe case-study summaries
type: report
status: active
review_status: reviewed
tags: [technical-capabilities, recruiter-evidence, languages, integrations]
---

# Technical Capability Matrix

## Purpose

This matrix makes the technical range of the project evidence easy to assess. It describes a verified source footprint, not a claim that every file was authored individually by Marcus or that every system has production-scale outcomes.

| Language / area | Demonstrated project surface | Evidence status | Recruiter relevance |
|---|---|---|---|
| TypeScript and TSX | Web frontends for Job-agent, PKM, and Household Budget; a Windows CLI for Phone Layout Agent | Internal / Verified from current source manifests | Shows typed application, UI, and command-line work |
| Python | Backend services, API-oriented application code, background-work and test dependencies in Job-agent and PKM | Internal / Verified from current source manifests | Shows service-layer and AI-enabled backend work |
| SQL | Versioned database migrations and data-access controls for Household Budget | Internal / Verified from current source manifests | Shows data modeling and database-change discipline |
| PowerShell | PCMR local bridge and installer automation; Personal AI Harness checks and operational scripts | Internal / Verified from current source manifests and case studies | Shows Windows automation, local tooling, and operational reliability work |
| React and Next.js | Frontend application surfaces for Job-agent, PKM, and Household Budget | Internal / Verified from current source manifests | Shows modern web delivery across several product domains |
| FastAPI, SQLAlchemy, Celery, and Pydantic | Backend dependency and architecture footprint in Job-agent and PKM | Internal / Verified from current source manifests | Shows API, data-access, background-processing, and typed-service patterns |
| Supabase and SQL migrations | Household Budget data model, access controls, and reconciliation work | Internal / Verified from current source manifests and case study | Shows managed-database integration and data safety concerns |
| MCP and bounded local bridges | PKM MCP direction; PCMR local MCP-to-PowerShell boundary; Phone Layout ADB bridge | Internal / Verified summary | Shows explicit tool-integration boundaries rather than unrestricted agent execution |
| Evaluation, tests, and verification | Test scripts, verification workflows, approval gates, and controlled benchmark design across the projects | Verified workflow; full model-evaluation harness Planned | Shows quality discipline without claiming an unbuilt evaluation platform |

## Reading rule

Use this matrix with the case studies and the [Evidence Matrix](../../EVIDENCE_MATRIX.md). A technology label is only a navigation aid. The linked case evidence and stated status define the strength of each claim.
