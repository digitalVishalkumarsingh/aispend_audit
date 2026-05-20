/**
 * HTML + plain-text body for the post-audit confirmation email.
 * Inline CSS only — most email clients strip <style> tags.
 */

export type AuditConfirmationProps = {
  reportUrl: string;
  monthlySavings?: number;
  annualSavings?: number;
};

const fmt = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export function renderAuditConfirmationEmail(
  props: AuditConfirmationProps
): { subject: string; html: string; text: string } {
  const { reportUrl, monthlySavings, annualSavings } = props;

  const savingsLine =
    monthlySavings && monthlySavings > 0
      ? `Your audit identified ${fmt(monthlySavings)}/month in recoverable spend — about ${fmt(annualSavings ?? monthlySavings * 12)} annualized.`
      : `Your full audit report is ready to view.`;

  const subject =
    monthlySavings && monthlySavings > 0
      ? `Your StackSave audit: ${fmt(monthlySavings)}/mo in potential savings`
      : `Your StackSave audit report is ready`;

  const text = [
    `StackSave — your audit is ready`,
    ``,
    savingsLine,
    ``,
    `View your full report:`,
    reportUrl,
    ``,
    `What to do next:`,
    `  1. Skim the recommendations — they're ranked by dollar impact.`,
    `  2. Forward this email to whoever owns SaaS budget.`,
    `  3. Re-run StackSave next quarter (AI stacks drift fast).`,
    ``,
    `— The StackSave team`,
    `https://stacksave.app`,
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#050506;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#ededef;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#050506;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#0a0a0c;border:1px solid rgba(255,255,255,0.06);border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:32px 32px 0 32px;">
              <div style="display:inline-block;padding:6px 12px;border:1px solid rgba(255,255,255,0.1);border-radius:999px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8a8f98;">
                StackSave
              </div>
              <h1 style="margin:24px 0 12px 0;font-size:28px;font-weight:500;line-height:1.1;letter-spacing:-0.02em;color:#ffffff;">
                Your audit is ready.
              </h1>
              <p style="margin:0;font-size:15px;line-height:1.6;color:#8a8f98;">
                ${savingsLine}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <a href="${reportUrl}" style="display:inline-block;padding:12px 20px;background:#ffffff;color:#050506;text-decoration:none;font-weight:500;font-size:14px;border-radius:8px;">
                View full report →
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px 32px;border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;">
              <p style="margin:0 0 8px 0;font-size:13px;color:#8a8f98;">What to do next:</p>
              <ol style="margin:0;padding-left:20px;font-size:13px;line-height:1.7;color:#ededef;">
                <li>Skim the recommendations — they're ranked by dollar impact.</li>
                <li>Forward this email to whoever owns SaaS budget.</li>
                <li>Re-run StackSave next quarter (AI stacks drift fast).</li>
              </ol>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px;background:#020203;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;font-size:11px;color:rgba(138,143,152,0.7);">
                You're receiving this because you submitted your email on stacksave.app.
                <br />
                <a href="https://stacksave.app" style="color:#8a8f98;text-decoration:underline;">stacksave.app</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}
