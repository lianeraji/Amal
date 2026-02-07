# AMAL — Next Steps (from Static Demo → Prototype)

This file explains what we will build next to move AMAL from a UI demo to a measurable prototype.

---

## 1) Immediate engineering tasks (high impact)

### A) Wire UI → Backend (/decide)
**Goal:** Every interaction can produce a real “decision card”.
- Input: feature/state vector `f(t)` (or the current state bars)
- Output:
  - `current_state_estimate` (bars)
  - `next_best_action`
  - `why_this_action_now` (3 bullets)
  - `safety_flags`

### B) Implement the Quantum Decision Engine (continuous use)
Replace the backend placeholder policy with a real optimization loop:

- Decision variables: `x[t,k] ∈ {0,1}` (choose action k at step t)
- Constraint: exactly one action per step  
  `λ * Σ_t (1 - Σ_k x[t,k])^2`
- Safety penalties (examples):
  - avoid reframing too early when alert/anxiety is high
  - enforce escalation when flags persist
- Objective (examples): minimize spike risk + volatility; maximize stabilization
- Solve `argmin J(x)` each interaction using:
  - QUBO/Ising formulation
  - QAOA / annealing / quantum‑inspired solver (as allowed by rubric)

---

## 2) Datasets (practical, safe, Gaza‑first)

### A) “Small but real” data to start
AMAL does not require massive child datasets to begin.
We can start with **small, safe intent + stress‑cue** datasets and expand responsibly.

**1) Text cues (NLP)**
- Intent labels: worried / scared / angry / tired / calm / help‑needed
- Signals: avoidance, uncertainty, reassurance response
- Approach: public emotion datasets as baseline + careful Arabic adaptation + human review

**2) Voice cues (optional)**
- Use existing Arabic ASR models (no training from scratch)
- Extract simple prosody features (speed/pauses) rather than identity

**3) Sign / gesture intent (optional)**
- Not full sign translation at hackathon time
- Target small K intents (yes/no/stop/help/scared)
- Collect small consented samples + augmentation

### B) Offline evaluation set 

Create 10–20 scripted, non‑graphic scenarios + expected safe next action:
- measure unsafe action rate (should be 0)
- measure stabilization speed (proxy)
- measure spike‑risk reduction (proxy)

---

## 3) Complexity & why QUBO/QAOA (vs AI‑only)

- Planning over horizon H with K actions grows as **O(K^H)** (e.g., K=8, H=4 → 4096 plans per turn).
- Adding safety constraints and pacing makes it a **constrained combinatorial optimization** problem (NP‑hard in general).
- AI helps estimate state `f(t)` from text/voice/sign, but the bottleneck is:
  **choosing the next safest multi‑step plan under constraints**.

QUBO lets us encode:
- “exactly one action”
- “no early reframing if alert high”
- “escalate when flags persist”
…inside a single objective, then solve with QAOA/anneal/quantum‑inspired repeatedly.


---

## 4) After hackathon (roadmap)
- Clinic/caregiver mode: export session summary (state trends + flags + recommendations)
- Personalization: adapt action selection to what helps a child most over time
- Arabic dialect improvement with safe, consented data collection
