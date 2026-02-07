# AMAL - Kid-Friendly Companion for Post‑War Mental Support (Quantum + AI)

AMAL is a kid‑friendly 3D companion designed for **low‑resource, high‑stress settings (Gaza first)**.
Children can interact via **text, voice, or sign**, while caregivers/judges can view a **hidden panel**
showing:

- **Current state estimate** (visual bars)
- **Next best action** (grounding / breathing / story / reframing / caregiver check / referral)
- **Why this action now** (explainability)
- **Safety flags / triggers**

> AMAL is a supportive companion and pacing/triage aid.

---

## Live links
- **Frontend demo (online):** https://project-amal-logo-998.magicpatterns.app
- **Quantum notebook (online):** https://colab.research.google.com/drive/1o5c7_UI3RlxK1s7DvvPBPYSrr6xYQRok?usp=sharing
- **Pitch deck (PPTX):** https://www.canva.com/design/DAHAjsmiZ00/bKANiroTUovMUSGl9u50Sg/view

---

## Repo structure
- `Frontend/` — React UI (AMAL chat + hidden output panel)
- `backend/` — **Backend placeholder** (FastAPI `/decide`) for judge‑ready code quality
- `QuantumCircuit/` — quantum circuit experiments / notebook assets
- `NEXT_STEPS.md` — datasets, roadmap, and evaluation plan

---

## Run locally on macOS

### 1) Frontend
```bash
cd Frontend
npm install
npm run dev
```
Open: http://localhost:5173

### 2) Backend (placeholder)
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --reload --port 8000
```
Check: http://localhost:8000/health

> If your UI is already wired to a backend: update the API base URL to `http://localhost:8000`.

---

## Demo script (60–90 seconds)
1) Open AMAL UI and do a quick check‑in.
2) Send 1–2 messages to AMAL (kid‑friendly).
3) Open the **hidden panel** and point to:
   - state bars updating
   - selected next action
   - “why now”
   - safety flags
4) (Optional) Show **Classical vs Quantum‑sim** mode in backend response for A/B credibility.

---

## Safety & ethics (short)
- Child‑friendly language, no graphic content.
- Escalation logic: caregiver check / referral suggestion when risk flags trigger.
- Minimal data approach: start with small intent + stress‑cue features, expand responsibly.

---

## License / credits
Team: AMAL Hackathon Team (NYUAD International Hackathon for Social Good).
