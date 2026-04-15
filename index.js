const fetch = require("node-fetch");

const FIREBASE_URL = process.env.FIREBASE_URL;

async function runBot() {
  const res = await fetch(`${FIREBASE_URL}/complaints.json`);
  const data = await res.json();

  if (!data) return;

  for (const id in data) {
    const c = data[id];

    if (c.statusUpdated && !c.notified) {
      console.log("Processing:", c.phone, c.status);

      await fetch(`${FIREBASE_URL}/complaints/${id}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notified: true })
      });
    }
  }
}

runBot();
