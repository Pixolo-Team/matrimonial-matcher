// REACT //
import React from "react";

// COMPONENTS //

type LabelValueBlockProps = {
  label: string;
  value?: string; // value is optional now
  align?: 'left' | 'right';
  children?: React.ReactNode;
};

export default function LabelValueBlock({
  label,
  value,
  align = 'left',
  children,
}: LabelValueBlockProps) {
  const alignmentClass = align === 'right' ? 'items-end text-right' : 'items-start text-left';

  return (
    <div className={`flex flex-col justify-start ${alignmentClass}`}>
      <span className="text-sm font-medium text-n-500">{label}</span>
      {children ? (
        <div className="flex gap-2.5 justify-center items-center w-full">{children}</div>
      ) : (
        <span className="text-lg font-medium text-n-900">{value}</span>
      )}
    </div>
  );
}