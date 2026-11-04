import {
  formatData,
  formatDays,
  formatUsd,
  pricePerGb,
} from "@/lib/esim/catalogue";
import type { SnapshotPlan } from "@/lib/esim/types";

/** Plans as a server-rendered table, so crawlers read the prices without running JavaScript. */
export function PlanTable({
  plans,
  caption,
}: {
  plans: SnapshotPlan[];
  caption: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[28rem] text-left text-base">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-esim-black-100 text-esim-black-700">
            <th scope="col" className="py-3 pr-4 font-medium">
              Data
            </th>
            <th scope="col" className="py-3 pr-4 font-medium">
              Valid for
            </th>
            <th scope="col" className="py-3 pr-4 font-medium">
              Price
            </th>
            <th scope="col" className="py-3 pr-4 font-medium">
              Per GB
            </th>
            <th scope="col" className="py-3 font-medium">
              5G
            </th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan, index) => {
            const perGb = pricePerGb(plan);
            return (
              <tr
                key={index}
                className="border-b border-esim-black-100 text-esim-black-900"
              >
                <td className="py-3 pr-4">
                  {formatData(plan)}
                  {plan.callsAndSms ? (
                    <span className="ml-2 text-sm text-esim-black-700">
                      + calls and SMS
                    </span>
                  ) : null}
                </td>
                <td className="py-3 pr-4">{formatDays(plan.validityDays)}</td>
                <td className="py-3 pr-4 font-medium">
                  {formatUsd(plan.priceUsd)}
                </td>
                <td className="py-3 pr-4">
                  {perGb === null ? "–" : formatUsd(perGb)}
                </td>
                <td className="py-3">{plan.has5g ? "Yes" : "No"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
