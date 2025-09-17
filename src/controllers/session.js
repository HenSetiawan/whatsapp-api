import {
  createClient,
  sessionState} from "../helpers/index.js";

async function createClientWeb(req, res) {
  try {
    const client = createClient();
    const st = sessionState.status;

    if (st === "ready" || st === "authenticated") {
      return res.json({ ok: true, status: st });
    }

    if (st === "initializing" || st === "disconnected" || st === "failed") {
      client.initialize().catch((err) => {
        sessionState.status = "failed";
        sessionState.error = String(err);
      });
    }

    const payload = { ok: true, status: sessionState.status };
    if (sessionState.qr) payload.qr = sessionState.qr;
    res.json(payload);
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
};

function sessionStatus(req, res) {
  res.json({ ok: true, ...sessionState });
};

async function deleteClient(req, res) {
  const client = getClient();
  try {
    if (client) {
      try {
        await client.logout();
      } catch {}
      try {
        await client.destroy();
      } catch {}
      client = null;
    }
    if (fs.existsSync(SESSION_DIR)) {
      fs.rmSync(SESSION_DIR, { recursive: true, force: true });
    }
    sessionState = { status: "idle" };
    res.json({ ok: true, deleted: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
};

export{ createClientWeb, sessionStatus, deleteClient };
