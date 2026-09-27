# Reference: PCMR Device Agent CLI

Last updated: 2026-09-01
Status: Source-verified reference for version 0.1.0

PCMR Device Agent exposes a small PowerShell command surface for one connected Android device. It uses ADB for device communication and scrcpy for visual control.

## Runtime requirements

- Windows PowerShell or PowerShell 7
- Android Platform Tools with `adb` available on `PATH`
- scrcpy available on `PATH` or installed through the supported Windows package location
- Android Wireless debugging enabled and explicitly paired
- exactly one ADB device with status `device`

Tailscale is optional. Codex and Claude can call the script, but neither is required to run it manually.

## Command shape

```powershell
pwsh -NoProfile -File .\scripts\phone-control.ps1 <action> [options]
```

The script rejects zero ready devices and more than one ready device. This is a safety boundary: the operator must identify the target before control begins.

## Actions

| Action | Purpose | Changes phone state? | Extra options |
|---|---|---:|---|
| `start` | Start the scrcpy visual session | No | `-StayAwake` |
| `status` | Show ADB device status and details | No | None |
| `screenshot` | Capture a PNG screenshot to a temporary file | No | None |
| `ui` | Dump the Android UI hierarchy to a temporary XML file | No | None |
| `tap` | Tap a screen coordinate | Yes | `-X`, `-Y`, `-Confirm` |
| `swipe` | Swipe between two coordinates | Yes | `-X`, `-Y`, `-X2`, `-Y2`, `-DurationMs`, `-Confirm` |
| `type` | Type basic text into the focused Android field | Yes | `-Text`, `-Confirm` |
| `key` | Send an allowlisted Android key event | Yes | `-Key`, `-Confirm` |
| `launch` | Launch an Android package | Yes | `-Package`, `-Confirm` |

There is no `send-message` action in version 0.1.0. This is intentional. A chat or message action would need a stronger target and approval design before it should be exposed.

## Parameters

| Parameter | Type / values | Notes |
|---|---|---|
| `-Action` | `start`, `status`, `screenshot`, `ui`, `tap`, `swipe`, `type`, `key`, `launch` | Required operation selector |
| `-Text` | String | Required for `type`; basic text only |
| `-X`, `-Y` | Integer | Tap or swipe start coordinate |
| `-X2`, `-Y2` | Integer | Swipe end coordinate |
| `-DurationMs` | Integer | Swipe duration; default is 300 ms |
| `-Key` | `HOME`, `BACK`, `APP_SWITCH`, `ENTER` | Allowlisted key events only |
| `-Package` | String | Required for `launch` |
| `-StayAwake` | Switch | Starts scrcpy with `--stay-awake` and avoids the prompt |
| `-Confirm` | Switch | Required for all state-changing actions |

## Stay awake behavior

When `start` runs without `-StayAwake`, it prompts the user. The accepted affirmative responses include `Y`, `J`, `yes`, and `ja`; a blank response or another response does not enable the option.

When `-StayAwake` is present, the bridge starts scrcpy with:

```text
--stay-awake
```

The session also uses:

```text
--no-audio
--window-title "PCMR Device Agent - Android"
```

## Approval boundary

The following actions require `-Confirm`:

```text
tap, swipe, type, key, launch
```

Without confirmation, the bridge stops before calling the mutating ADB operation and explains that the action changes the phone.

The approval is deliberately command-local. An AI assistant must not treat a previous approval as approval for a later action with a different target.

## Temporary outputs

The inspection actions write temporary artifacts with stable names so that a local assistant can read them during the current run:

| Output | Purpose |
|---|---|
| `phone-control-screenshot.png` | Screenshot captured with `screencap` |
| `phone-control-ui.xml` | UI hierarchy pulled from Android |
| `phone-control-screenshot.err` | Temporary stderr capture for screenshot diagnostics |

These artifacts are local runtime outputs. They must not be committed to a public repository because they can contain personal app names, messages, account details, or device state.

## Failure rules

- Missing `adb` stops the command with an installation error.
- No ready device stops the command with a connection error.
- Multiple ready devices stop the command rather than choosing one.
- Invalid action parameters stop before device execution.
- Missing `-Confirm` stops every mutating action.
- The smoke test treats invalid PNG output or a missing `<hierarchy` root as a failure.

## Example commands

```powershell
# Inspect the connected device
pwsh -NoProfile -File .\scripts\phone-control.ps1 status

# Start visual control and keep the phone awake
pwsh -NoProfile -File .\scripts\phone-control.ps1 start -StayAwake

# Inspect screen and UI state
pwsh -NoProfile -File .\scripts\phone-control.ps1 screenshot
pwsh -NoProfile -File .\scripts\phone-control.ps1 ui

# Approved interaction examples
pwsh -NoProfile -File .\scripts\phone-control.ps1 tap -X 500 -Y 900 -Confirm
pwsh -NoProfile -File .\scripts\phone-control.ps1 key -Key BACK -Confirm
```

## Scope boundary

This reference describes the private source project's version 0.1.0 command surface. It is not a claim that a signed graphical installer with the horse-race sequence, an unattended agent, an app-specific message sender, or a multi-device controller is already shipped.
