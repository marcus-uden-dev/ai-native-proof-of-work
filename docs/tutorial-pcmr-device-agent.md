# Tutorial: Connect an Android Phone for PCMR Device Agent

Last updated: 2026-09-01
Audience: A developer or AI assistant setting up the private source project for the first time

This tutorial shows the smallest useful setup for controlling an Android phone from a Windows computer over Wi-Fi. It uses Android Platform Tools, scrcpy, and Android Wireless debugging. Tailscale is optional.

The source project is private. The commands below use placeholders for the phone address and debug port. Do not publish a real address, pairing code, screenshot, UI dump, or message from your device.

## 1. Install the small required set

| Component | Required | What it does |
|---|---:|---|
| Android Platform Tools | Yes | Provides `adb`, the command-line bridge used for connection, inspection, and bounded input |
| scrcpy | Yes | Shows the phone screen and forwards mouse and keyboard input |
| Android Wireless debugging | Yes for Wi-Fi | Built-in Android developer feature used to pair and connect the phone |
| Tailscale | Optional | Provides a private network path when the devices are not on the same local network |
| Codex or Claude | Optional | Lets an AI assistant call the documented control commands; no local AI model is installed by this project |

RustDesk, Power Automate Desktop, Python, and a local model are not required for the first setup.

## 2. Enable Wireless debugging on Android

The exact labels can vary by Android version. On a current Android device, use:

1. Open **Inställningar** / **Settings**.
2. Open **Om telefonen** / **About phone**.
3. Tap **Build number** / **Buildnummer** repeatedly until Developer options are enabled.
4. Return to Settings and open **System** or **Additional settings**.
5. Open **Developer options** / **Utvecklaralternativ**.
6. Enable **Wireless debugging** / **Trådlös felsökning**.
7. Open **Pair device with pairing code** / **Parkoppla enhet med parkopplingskod**.

Keep the pairing code private and use it only for the current pairing step.

## 3. Pair and connect with ADB

From the source project directory, run:

```powershell
adb pair <phone-ip>:<pairing-port>
```

Enter the temporary pairing code shown on the phone. Then connect using the separate debug address shown by Wireless debugging:

```powershell
adb connect <phone-ip>:<debug-port>
adb devices -l
```

The expected result is exactly one device with status `device`. A status such as `unauthorized` means the phone still needs approval. More than one ready device is rejected by the control bridge to avoid acting on the wrong phone.

## 4. Check the bridge without changing the phone

Run the status action:

```powershell
pwsh -NoProfile -File .\scripts\phone-control.ps1 status
```

Start the visual session:

```powershell
pwsh -NoProfile -File .\scripts\phone-control.ps1 start
```

The command asks:

```text
Keep phone awake while scrcpy is running? [Y/n]
```

Use `Y` when the screen should stay awake during the session. For repeatable automation, make the choice explicit:

```powershell
pwsh -NoProfile -File .\scripts\phone-control.ps1 start -StayAwake
```

The scrcpy window is titled `PCMR Device Agent - Android`. Audio is disabled by default.

## 5. Run the non-mutating smoke test

The smoke test checks syntax, connection, screenshot output, and UI hierarchy. It does not tap, type, launch, or send anything:

```powershell
pwsh -NoProfile -File .\scripts\smoke-test.ps1
```

A successful run ends with:

```text
SMOKE TEST PASSED
```

The generated screenshot and UI hierarchy are temporary local artifacts. Do not commit them to the public proof-of-work repository.

## 6. Use a bounded action

Inspection first:

```powershell
pwsh -NoProfile -File .\scripts\phone-control.ps1 screenshot
pwsh -NoProfile -File .\scripts\phone-control.ps1 ui
```

For an action that changes the phone, inspect the target and then add `-Confirm`:

```powershell
pwsh -NoProfile -File .\scripts\phone-control.ps1 tap -X 500 -Y 900 -Confirm
```

The first version supports generic UI actions. It does not include a message-sending action. An AI assistant should describe the intended target and wait for approval before it calls a mutating command.

## 7. Add Tailscale only when needed

Install Tailscale on the computer and phone only if a private overlay network is needed. Confirm that both devices are visible in the same approved tailnet, then use the Android device's current Wireless debugging address for the ADB connection.

Tailscale does not replace Android pairing or Wireless debugging. It only provides the network path. The Android debug service still needs to be enabled and explicitly paired.

## Recovery

If the session must stop:

```powershell
adb disconnect <phone-ip>:<debug-port>
```

Then stop scrcpy and disable Wireless debugging on the phone if it is no longer needed. If there are multiple devices, disconnect all unintended devices and run `adb devices -l` again before using the bridge.

## Next step

Read the [CLI reference](reference-pcmr-device-agent.md) for the complete action surface and approval rules, then review the [case study](../case-studies/PCMR_DEVICE_AGENT_CASE_STUDY.md) for the product decisions and evidence boundary.
