# Household Budget App Product Strategy

Last updated: 2026-05-11
Status: Supporting project hypothesis / Internal evidence summarized

## Project Scope

Project: household budget app.

Role in portfolio: supporting proof point for financial-product UX, household domain modeling, shared access, and test-backed execution.

## Target User

Initial target user: households that need shared budgeting, import review, forecasting, goals, and clearer ownership boundaries.

## Core Problem

Household budgeting requires shared context, ownership rules, imports, review queues, forecasts, and security boundaries that single-user budgeting tools can underrepresent.

## Existing Alternatives

| Alternative | Gap |
|---|---|
| Spreadsheets | Flexible but manual and hard to govern |
| Bank apps | Account-specific and weak at household planning |
| Personal budgeting apps | Often individual-first rather than household-first |
| Expense trackers | Focus on past spending rather than review, planning, and liquidity |

## Product Wedge

Start with household-aware data modeling plus import/review/forecast workflows.

## MVP Scope

- Household and member roles
- Accounts and shared ownership
- CSV/XLSX import and review
- Transactions, categories, tags, rules, and splits
- Recurring expenses and scheduled items
- Liquidity forecast
- Goals
- Household-scoped access and security boundaries

## Non-MVP Scope

- Bank-integrated production claims
- Public financial-advice positioning
- Measured savings claims
- Multi-country compliance claims

## Feature Prioritization

| Feature | User Value | Complexity | Priority |
|---|---|---|---|
| Household/member model | High | High | High |
| Import and review workflow | High | Medium | High |
| Transactions/categories/rules | High | Medium | High |
| Liquidity forecast | High | Medium | High |
| Goals | Medium | Medium | Medium |

## Risks

- Privacy and financial-data sensitivity
- Security/RLS correctness
- Import edge cases
- Household role/ownership complexity
- Consumer adoption risk

## Evidence

See [Household Budget App Case Study](../../../case-studies/HOUSEHOLD_BUDGET_CASE_STUDY.md).

## Strategy Decisions

Use the decision-trail format in [Decision Trail](../decisions/DECISION_TRAIL.md) and summarize public portfolio-level decisions in the [public decision log](../../../site/evidence/decision-log.json) when they materially affect recruiter-facing claims.
