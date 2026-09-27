const MAX_INPUT_LENGTH = 12000;
const MAX_NAME_LENGTH = 100;
const MAX_ORGANISATION_LENGTH = 120;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEnquiryRequest(payload) {
  if (!payload || typeof payload !== 'object') return invalid(400, 'A JSON request body is required.');
  if (!['question', 'role'].includes(payload.mode)) return invalid(400, 'Mode must be question or role.');
  if (typeof payload.input !== 'string' || !payload.input.trim()) return invalid(400, 'Input is required.');
  if (payload.input.length > MAX_INPUT_LENGTH) return invalid(413, 'Input is too long.');
  if (typeof payload.email !== 'string' || !EMAIL_PATTERN.test(payload.email.trim()) || payload.email.length > 254) return invalid(400, 'A valid email address is required.');
  if (typeof payload.name !== 'string' || payload.name.trim().length > MAX_NAME_LENGTH) return invalid(400, 'Name is too long.');
  if (typeof payload.organisation !== 'string' || payload.organisation.trim().length > MAX_ORGANISATION_LENGTH) return invalid(400, 'Organisation is too long.');
  if (payload.consent !== true) return invalid(400, 'Consent is required before submitting follow-up details.');
  if (typeof payload.submissionId !== 'string' || !/^[a-f0-9-]{36}$/i.test(payload.submissionId)) return invalid(400, 'Submission ID is invalid.');
  return {
    ok: true,
    value: {
      id: payload.submissionId,
      mode: payload.mode,
      input: payload.input.trim(),
      email: payload.email.trim().toLowerCase(),
      name: payload.name.trim(),
      organisation: payload.organisation.trim()
    }
  };
}

export async function saveEnquiry(db, enquiry) {
  const result = await db.prepare(`
    INSERT OR IGNORE INTO recruiter_enquiries
      (id, submission_kind, input, contact_email, contact_name, organisation, consent_version, consented_at, notification_status)
    VALUES (?, ?, ?, ?, ?, ?, 'v1', datetime('now'), 'pending')
  `).bind(enquiry.id, enquiry.mode, enquiry.input, enquiry.email, enquiry.name, enquiry.organisation).run();
  return Number(result?.meta?.changes ?? 0) > 0;
}

export async function updateNotificationStatus(db, id, status) {
  await db.prepare('UPDATE recruiter_enquiries SET notification_status = ?, notification_attempted_at = datetime(\'now\') WHERE id = ?')
    .bind(status, id)
    .run();
}

export async function purgeExpiredEnquiries(db) {
  if (!db) return;
  await db.prepare("DELETE FROM recruiter_enquiries WHERE created_at < datetime('now', '-90 days')").run();
}

export async function notifyMarcus(emailBinding, from, enquiry) {
  if (!emailBinding || !from) return 'not_configured';
  await emailBinding.send({
    from,
    to: 'marcus.uden.dev@gmail.com',
    subject: `Recruiter follow-up: ${enquiry.mode === 'role' ? 'role description' : 'question'}`,
    text: [
      'A recruiter has opted in to a follow-up from the public proof-of-work site.',
      '',
      `Name: ${enquiry.name || 'Not provided'}`,
      `Email: ${enquiry.email}`,
      `Organisation: ${enquiry.organisation || 'Not provided'}`,
      `Submission type: ${enquiry.mode}`,
      '',
      'Submitted text:',
      enquiry.input
    ].join('\n')
  });
  return 'sent';
}

function invalid(status, message) {
  return { ok: false, status, message };
}
