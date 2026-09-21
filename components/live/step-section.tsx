import type { ReactNode } from "react";
import { RichText } from "@/components/live/rich-text";
import { Icon } from "@/components/live/icon-sprite";
import type { StepContent } from "@/components/live/content";

export function StepSection({
  step,
  tryHintIcon,
  children,
}: {
  step: StepContent;
  tryHintIcon?: string;
  children: ReactNode;
}) {
  return (
    <section className="step" id={`step-${step.id}`} data-alt={step.alt}>
      <div className="step-text">
        <span className="step-index">{step.index}</span>
        <h2>{step.title}</h2>
        <p className="step-summary">{step.summary}</p>
        <ol className="step-list">
          {step.items.map((item, i) => (
            <li key={i}>
              <p>
                <RichText text={item} />
              </p>
            </li>
          ))}
        </ol>
        {step.callout && (
          <div
            className={
              step.callout.tone === "danger" ? "callout callout--danger" : "callout"
            }
          >
            {step.callout.strong && <strong>{step.callout.strong} </strong>}
            {step.callout.text}
          </div>
        )}
        {step.tryHint && (
          <div className="try-hint">
            {tryHintIcon && <Icon name={tryHintIcon} />}
            Try it: {step.tryHint}
          </div>
        )}
      </div>
      <div className="step-visual">{children}</div>
    </section>
  );
}
