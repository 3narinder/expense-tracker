import User from "../models/UserSchema.js";
import { VALID_SUBSCRIPTION_PLANS } from "../utils/planConfig.js";

/**
 * PATCH /api/user/subscription-plan
 *
 * SECURITY NOTE:
 * This direct update flow exists only as a temporary placeholder while billing
 * is not integrated. In production, plan changes must be triggered only after
 * payment confirmation from the provider (e.g. Stripe webhook), not trusted
 * from a client request.
 *
 * TODO: integrate real payment provider (e.g. Stripe Checkout + webhook flow).
 */
export const updateSubscriptionPlan = async (req, res) => {
  const { subscriptionPlan } = req.body;

  if (!VALID_SUBSCRIPTION_PLANS.includes(subscriptionPlan)) {
    return res.status(400).json({
      message: `Invalid subscription plan. Must be one of: ${VALID_SUBSCRIPTION_PLANS.join(", ")}`,
    });
  }

  try {
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { subscriptionPlan },
      { runValidators: true, returnDocument: "after" },
    ).select("subscriptionPlan name email");

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: `Subscription updated to ${subscriptionPlan}`,
      subscriptionPlan: updated.subscriptionPlan,
    });
  } catch (error) {
    console.error("❌ Error updating subscription plan:", error.message);
    return res.status(500).json({
      error: "Failed to update subscription plan.",
      details: error.message,
    });
  }
};

