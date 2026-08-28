# Phone-layout-agent Decision Trail

Last updated: 2026-08-28
Status: Active / Supporting project

## Purpose

This file captures the main product and architecture decision behind
phone-layout-agent: how to automate a physical Android launcher without
turning uncertain visual interaction into unrestricted device control.

## Decision Format

Use this visible reasoning format:

```text
Context → Options Considered → Tradeoffs → Decision → Evidence → Open Questions → Next Action
```

## Decisions

### 2026-08-28 — Use deterministic, approval-gated execution for Samsung launcher changes

#### Context

Phone organization spans multiple launcher pages, native folders, app-drawer
states, and uncertain labels. Repeating screenshots and individual drag
decisions created unnecessary interaction cost and made completion difficult to
prove. At the same time, a physical device requires a narrow permission and
recovery boundary.

#### Options Considered

| Option | Pros | Cons |
|---|---|---|
| Keep model-directed screenshot and drag loops | Flexible and easy to extend to unfamiliar states | Slow, coordinate-sensitive, and difficult to verify or resume |
| Use direct coordinate automation | Small initial implementation | Fragile under page/layout changes and weak against partial completion |
| Use deterministic native picker batches with approval, checkpoints, and re-open verification | Fewer actions, clearer safety boundary, resumability, and stronger evidence | Requires a Samsung-specific adapter and conservative handling of ambiguity |

#### Tradeoffs

The selected path invests in a device-specific adapter and explicit state
management. In return, it reduces blind interaction, makes partial completion
recoverable, and gives the workflow a meaningful definition of success. It
leaves uncertain apps, home-only shortcuts, and unsupported launcher states for
review or a separately gated slow path.

#### Decision

Use AI for discovery, classification, question formation, and strategy review.
Use deterministic code for allowlisted ADB operations, launcher navigation,
native folder-picker batches, checkpoints, recovery, and verification. Keep
dry-run as the default and require explicit approval before physical changes.

#### Evidence

- The private source repo contains the CLI, Samsung One UI adapter, bounded ADB
  client, batch reconciler, checkpoint store, recovery ladder, snapshot service,
  and verification tests.
- The inspected source boundary is commit `a7bea45`.
- Source validation passed with 45 test files / 110 tests using one Vitest
  worker; lint, typecheck, and build also passed.
- Internal run evidence supports selected native-batch and re-open verification
  exercises. The diagnostic baseline does not support a controlled throughput
  claim.

#### Open Questions

- What is the measured reliability and median move time on a fixed workload?
- What evidence threshold should allow cross-page gestures or additional
  launcher implementations?
- Can accessibility-assisted shortcut handling remain separately permissioned
  and independently verified?

#### Next Action

Run a controlled baseline-versus-deterministic benchmark and publish only the
verified aggregate results and failure modes.
