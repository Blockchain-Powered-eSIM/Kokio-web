"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Plan } from "@/components/live/mock-data";

type FlowContextValue = {
  shopScreen: "home" | "shop";
  setShopScreen: (screen: "home" | "shop") => void;
  selectedPlan: Plan | null;
  choosePlan: (plan: Plan) => void;
  completedOrderId: string | null;
  completedPlan: Plan | null;
  completeOrder: (plan: Plan) => void;
  goTo: (stepId: string) => void;
};

const FlowContext = createContext<FlowContextValue | null>(null);

export function FlowProvider({ children }: { children: ReactNode }) {
  const [shopScreen, setShopScreen] = useState<"home" | "shop">("home");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [completedOrderId, setCompletedOrderId] = useState<string | null>(null);
  const [completedPlan, setCompletedPlan] = useState<Plan | null>(null);

  function goTo(stepId: string) {
    document.getElementById(`step-${stepId}`)?.scrollIntoView({ behavior: "smooth" });
  }

  function choosePlan(plan: Plan) {
    setSelectedPlan(plan);
    goTo("checkout");
  }

  function completeOrder(plan: Plan) {
    // Reuse the mock "global" order slot (the one that's already eSIM
    // Ready / expandable / installable) to represent "the order you just
    // placed" — display fields below are swapped to match the plan that
    // was actually bought.
    setCompletedPlan(plan);
    setCompletedOrderId("global");
    goTo("orders");
  }

  return (
    <FlowContext.Provider
      value={{
        shopScreen,
        setShopScreen,
        selectedPlan,
        choosePlan,
        completedOrderId,
        completedPlan,
        completeOrder,
        goTo,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
}

export function useFlow() {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error("useFlow must be used within FlowProvider");
  return ctx;
}
