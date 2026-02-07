Next Steps (from Static Demo → Prototype)

What we have now:
A working UI demo of AMAL (3D character + chat flow)
“Hidden Output” panel concept (state estimate, next best action, why, safety flags)
A quantum decision formulation (QUBO → QAOA/anneal/quantum-inspired solver) described in the deck

What we will complete next:
Connect UI → backend decision endpoint
Implement a /decide API (Python) that returns:
current_state_estimate (bars)
next_best_action
why_this_action_now (explainability)
safety_flags
The UI calls this endpoint after each message / interaction.
Implement “Quantum Engineering Simulator” backend

Build QUBO with:
Exactly-one action constraint per step
Safety penalties (ex: avoid reframing early when alert is high)
Objective = minimize spike risk + reduce volatility + improve stabilization

Solve using one of:
Quantum-inspired QUBO solver (fast baseline)
Optional QAOA simulation (toy, small size) for demo credibility
Provide a toggle: Classical baseline vs Quantum-sim
Add a small offline evaluation set
Create 10–20 scripted child scenarios (safe, non-graphic)
For each scenario, label the expected safe next action

Report metrics:
% safe action selection
spike-risk reduction (proxy)
stabilization steps (proxy)
rule violation rate (must be 0)
Guardrails + Safety policy
Keep AMAL as “supportive companion” 

Add escalation logic:
caregiver check recommended when high worry/alert persists
referral prompt when safety flags trigger
Ensure age-appropriate phrasing and content.
Make the demo crystal clear

Live demo flow:
Quick “check-in”
1–2 chat turns with AMAL
Show hidden panel updating (bars + action + why + flags)
Toggle Classical vs Quantum-sim to show different decision behavior
