const {
  createClient,
  sessionState,
} = require("../helpers/index.js");

exports.createClient = async (req, res) => {
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

exports.sessionStatus = (req, res) => {
  res.json({ ok: true, ...sessionState });
};
