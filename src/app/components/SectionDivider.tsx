// Props
type SectionDividerProps = {
  direction?: "horizontal" | "vertical";
  className?: string;
};

/** Section Divider Component */
export function SectionDivider({
  direction = "horizontal",
  className = "",
}: SectionDividerProps) {
  // Render Vertical or Horizontal divider
  return direction === "vertical" ? (
    <span className={`w-px self-stretch bg-n-300 ${className}`} />
  ) : (
    <div className={`flex justify-between gap-3.5 ${className}`}>
      <div className="w-1/2 h-px px-12">
        <div className="h-px bg-n-300" />
      </div>
      <div className="w-1/2 h-px px-12">
        <div className="h-px bg-n-300" />
      </div>
    </div>
  );
}
