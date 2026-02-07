# AMAL Backend (Placeholder)

This folder exists to make the repo (code quality + product viability).

## Run locally (Mac/Linux)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --reload --port 8000
```

Check:
- http://localhost:8000/health

API:
- `POST /decide` with JSON:
```json
{
  "state": {"calm":0.28,"worry":0.18,"alert":0.42,"angry":0.06,"tired":0.22},
  "mode": "quantum_sim"
}
```

## Next step (Quantum)
Replace `demo_policy()` with:
- QUBO/Ising construction (constraints + safety penalties + objective)
- Solver call (QAOA / annealing / quantum-inspired)
- Return `argmin` action
