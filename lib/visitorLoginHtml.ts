/** Shared login card styles (visitor gate, admin gate, /api/auth errors). */

export function loginCardBaseStyles(): string {
  return `:root{font-family:"Source Sans 3",system-ui,sans-serif;color:#0f172a;}
    body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,#115740 0%,#0c3024 100%);}
    .card{width:100%;max-width:420px;margin:24px;padding:32px 28px 28px;background:#fff;border-radius:16px;box-shadow:0 24px 60px rgba(0,0,0,.35);}
    h1{margin:0 0 6px;font-size:1.35rem;color:#115740;}
    p{margin:0 0 20px;color:#57534e;font-size:.95rem;line-height:1.5;}
    label{display:block;font-size:.78rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#115740;margin-bottom:6px;}
    input{width:100%;box-sizing:border-box;padding:12px 14px;border-radius:10px;border:1px solid #e7e5e4;font-size:1rem;}
    .field{margin-bottom:16px;}
    button{margin-top:8px;width:100%;padding:14px 16px;border:0;border-radius:999px;background:#115740;color:#fff;font-weight:700;font-size:1rem;cursor:pointer;}
    button:hover{filter:brightness(1.05);}
    .badge{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;background:#e3efe9;color:#115740;font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:14px;}
    .alert{margin:0 0 18px;padding:12px 14px;border-radius:10px;background:#fef2f2;border:1px solid #fecaca;color:#991b1b;font-size:.9rem;line-height:1.45;}`;
}

function escAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type VisitorLoginPageOptions = {
  /** Shown above the form (plain text, HTML-escaped). */
  errorText?: string;
  /** Prefill "Your name" after a failed attempt. */
  visitorName?: string;
};

export function visitorLoginPageHtml(origin: string, opts?: VisitorLoginPageOptions): string {
  const errorText = opts?.errorText?.trim();
  const alertBlock = errorText
    ? `<div class="alert" role="alert">${escHtml(errorText)}</div>`
    : "";
  const nameValue = escAttr(opts?.visitorName ?? "");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Sign in · Northern Trust account plan</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>${loginCardBaseStyles()}</style>
</head>
<body>
  <div class="card">
    <div class="badge">Confidential</div>
    <h1>Northern Trust account plan</h1>
    <p>Enter the visitor password to open this site. Your name labels session analytics for the admin dashboard.</p>
    ${alertBlock}
    <form method="POST" action="${escAttr(origin)}/api/auth" autocomplete="on">
      <div class="field">
        <label for="visitorName">Your name</label>
        <input id="visitorName" name="visitorName" type="text" required maxlength="120" placeholder="Jane Doe" value="${nameValue}" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" name="password" type="password" required autocomplete="current-password" />
      </div>
      <button type="submit">Continue</button>
    </form>
  </div>
</body>
</html>`;
}
