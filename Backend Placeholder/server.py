"""AMAL Backend Placeholder (Hackathon)

Purpose:
- Provide a real backend entrypoint in the repo for judges.
- Expose a /decide endpoint that the React UI can call.
- Keep the implementation intentionally lightweight and safe.

What this is (now):
- A working FastAPI skeleton with a minimal demo decision rule.
- Clear TODOs for the Quantum Decision Engine (QUBO/QAOA/Anneal).

What this is NOT:
- A medical/therapy replacement. AMAL is a supportive companion + triage-style pacing tool.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Literal

app = FastAPI(title="AMAL Backend (Placeholder)")

# Allow local dev frontends (Vite default 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Actions (example set used by the UI hidden panel) ---
ACTIONS = [
    "grounding_54321",
    "breathing_box",
    "calm_story",
    "gentle_checkin",
    "caregiver_check",
    "referral_prompt",
    "reframe_thought",
    "movement_stretch",
]


class DecideRequest(BaseModel):
    # Example: {"calm":0.28,"worry":0.18,"alert":0.42,"angry":0.06,"tired":0.22}
    state: Dict[str, float]
    mode: Literal["classic", "quantum_sim"] = "quantum_sim"


class DecideResponse(BaseModel):
    state: Dict[str, float]
    action: str
    why: List[str]
    flags: List[str]
    solver: str


@app.get("/health")
def health():
    return {"ok": True}


def safety_flags(state: Dict[str, float]) -> List[str]:
    flags: List[str] = []
    if state.get("alert", 0.0) >= 0.45:
        flags.append("hypervigilance_trigger")
    if state.get("tired", 0.0) >= 0.45:
        flags.append("sleep_disturbance_suspected")
    if state.get("worry", 0.0) >= 0.40:
        flags.append("caregiver_check_recommended")
    return flags


def demo_policy(state: Dict[str, float]) -> str:
    """A tiny safe baseline (placeholder).

    TODO (Quantum): replace with:
    - build QUBO/Ising from constraints + objective
    - solve using QAOA/anneal/quantum-inspired
    - return argmin action
    """
    alert = state.get("alert", 0.0)
    tired = state.get("tired", 0.0)
    worry = state.get("worry", 0.0)

    if alert >= 0.40:
        return "grounding_54321"
    if tired >= 0.35:
        return "calm_story"
    if worry >= 0.40:
        return "gentle_checkin"
    return "breathing_box"


@app.post("/decide", response_model=DecideResponse)
def decide(req: DecideRequest):
    # Placeholder solver label (matches deck language)
    solver = "quantum_sim(placeholder)" if req.mode == "quantum_sim" else "classic(placeholder)"

    action = demo_policy(req.state)

    # Explainability (short, judge-readable)
    why = []
    if req.state.get("alert", 0.0) >= 0.35:
        why.append("Alert is elevated → choose stabilization first (low spike-risk).")
    if action == "calm_story":
        why.append("Tiredness detected → calming story supports engagement with low effort.")
    if action != "reframe_thought":
        why.append("Safety pacing rule: delay reframing until arousal is lower.")
    if not why:
        why.append("Selected the safest low-arousal action based on current state.")

    return DecideResponse(
        state=req.state,
        action=action,
        why=why[:3],
        flags=safety_flags(req.state),
        solver=solver,
    )
