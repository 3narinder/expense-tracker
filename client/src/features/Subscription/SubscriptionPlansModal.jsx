import { useState } from "react";
import { Check, Crown, Sparkles, Zap } from "lucide-react";
import Modal from "../../components/ui/Modal.jsx";
import Button from "../../components/ui/Button.jsx";
import Spinner from "../../components/Spinner.jsx";
import { SUBSCRIPTION_PLANS } from "./planConfig.js";
import { useUpgradePlan } from "../AiInsights/useInsights.js";

const PLAN_ICONS = {
  basic: Sparkles,
  pro: Zap,
  premium: Crown,
};

const PLAN_COLORS = {
  basic: {
    badge:
      "bg-[var(--color-bg-muted)] border-[var(--color-border-main)] text-[var(--color-text-main)]",
    icon: "text-[var(--color-text-muted)]",
    ring: "",
    banner: "",
  },
  pro: {
    badge: "bg-blue-50 border-blue-200 text-blue-800",
    icon: "text-blue-500",
    ring: "ring-2 ring-blue-400/50",
    banner: "bg-blue-500 text-white",
  },
  premium: {
    badge: "bg-amber-50 border-amber-200 text-amber-800",
    icon: "text-amber-500",
    ring: "ring-2 ring-amber-400/50",
    banner: "bg-linear-to-r from-amber-400 to-amber-600 text-white",
  },
};

export default function SubscriptionPlansModal({
  open,
  onClose,
  currentPlan = "basic",
}) {
  const { upgradePlan, isUpgrading } = useUpgradePlan();
  const [pendingPlan, setPendingPlan] = useState(null);

  const handleSelect = async (planId) => {
    if (planId === currentPlan || isUpgrading) return;

    // TODO: integrate real payment provider (e.g. Stripe Checkout) here.
    // This temporary confirm flow changes plan without charging the user.
    const confirmed = window.confirm(
      `Payment is not integrated yet.\n\nThis will switch your plan to "${planId}" in demo mode (no charge).\n\nContinue?`,
    );
    if (!confirmed) return;

    setPendingPlan(planId);
    try {
      await upgradePlan(planId);
      onClose();
    } finally {
      setPendingPlan(null);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Choose your subscription" size="lg">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isCurrentPlan = plan.id === currentPlan;
          const isLoading = pendingPlan === plan.id && isUpgrading;
          const colors = PLAN_COLORS[plan.id];
          const Icon = PLAN_ICONS[plan.id];

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border bg-[var(--color-bg-surface)] p-5 transition-all ${
                isCurrentPlan
                  ? `border-[var(--color-border-focus)] ${colors.ring}`
                  : "border-[var(--color-border-main)] hover:border-[var(--color-border-focus)]"
              } ${plan.highlight && !isCurrentPlan ? colors.ring : ""}`}
            >
              {plan.highlight && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-semibold ${colors.banner}`}
                >
                  Recommended
                </div>
              )}

              <div className="flex items-center gap-2 mb-3">
                <span className={`p-1.5 rounded-lg border ${colors.badge}`}>
                  <Icon size={15} className={colors.icon} />
                </span>
                <span className="font-semibold text-[var(--color-text-main)]">
                  {plan.name}
                </span>
                {isCurrentPlan && (
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-[var(--color-bg-muted)] border border-[var(--color-border-main)] text-[var(--color-text-muted)]">
                    Active
                  </span>
                )}
              </div>

              <div className="mb-2">
                <span className="text-2xl font-bold text-[var(--color-text-main)]">
                  {plan.price}
                </span>
                <span className="ml-1 text-xs text-[var(--color-text-muted)]">
                  {plan.priceSubtext}
                </span>
              </div>

              <div className="mb-4 space-y-1 text-xs text-[var(--color-text-muted)]">
                <div>
                  AI insights:{" "}
                  <span className="font-semibold text-[var(--color-text-main)]">
                    {plan.aiLimit}/{plan.aiPeriod}
                  </span>
                </div>
                <div>
                  Accounts:{" "}
                  <span className="font-semibold text-[var(--color-text-main)]">
                    {plan.accountAllowance}
                  </span>
                </div>
              </div>

              <ul className="flex-1 space-y-2 mb-5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]"
                  >
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0 text-[var(--color-success)]"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={isCurrentPlan ? "outline" : "primary"}
                size="sm"
                disabled={isCurrentPlan || isUpgrading}
                onClick={() => handleSelect(plan.id)}
                className="w-full"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Spinner size="sm" />
                    Updating...
                  </span>
                ) : isCurrentPlan ? (
                  "Current plan"
                ) : (
                  plan.cta
                )}
              </Button>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-center text-xs text-[var(--color-text-muted)]">
        Billing integration coming soon. Plan changes are demo-only right now.
      </p>
    </Modal>
  );
}

