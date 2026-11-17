/** Fictional text-only example. This module has no transport, account or API integration. */
export const autochatExample = {
  inquiry: "Is the standard Arc desk lamp available in blue?",
  product: "Arc desk lamp",
  variant: "Blue / Standard",
  availability: "Available — fictional record",
  draft: "Yes, the standard Arc desk lamp is available in blue. Would you like the product details?"
} as const;

export const workflowStages = [
  { id: 0, name: "Incoming inquiry", short: "Inquiry", description: "A customer asks a product question." },
  { id: 1, name: "Business context", short: "Context", description: "Inspect the relevant fictional catalog entry." },
  { id: 2, name: "Suggested response", short: "Draft", description: "A proposed reply is prepared for review." },
  { id: 3, name: "Human approval", short: "Review", description: "The operator approves or declines the proposal." },
  { id: 4, name: "Final response", short: "Outcome", description: "An approved reply is illustrated, or a declined action is held." }
] as const;

export type WorkflowStage = typeof workflowStages[number]["id"];
export type WorkflowState = { stage: WorkflowStage; decision: "pending" | "approved" | "declined" };
export type WorkflowEvent = { type: "inspect"; stage: WorkflowStage } | { type: "next" | "back" | "reset" } | { type: "decide"; decision: "approved" | "declined" };
export const initialWorkflow: WorkflowState = { stage: 0, decision: "pending" };

export function workflowReducer(state: WorkflowState, event: WorkflowEvent): WorkflowState {
  if (event.type === "reset") return { ...initialWorkflow };
  if (event.type === "inspect") return { ...state, stage: event.stage };
  if (event.type === "decide") return state.stage === 3 ? { stage: 4, decision: event.decision } : state;
  if (event.type === "back") return { ...state, stage: Math.max(0, state.stage - 1) as WorkflowStage };
  if (event.type === "next" && state.stage < 4 && !(state.stage === 3 && state.decision === "pending")) return { ...state, stage: (state.stage + 1) as WorkflowStage };
  return state;
}
