/* MatchBadge component displays a diamond-shaped badge with a score in the center */
const MatchBadge: React.FC<{ score: number }> = ({ score }) => (
  <div
    className="w-24 h-24 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                flex flex-col items-center justify-center gap-0 p-5
                before:content-[''] before:w-full before:h-full before:bg-yellow-500
                before:rounded-3xl before:rotate-45 before:absolute before:inset-0 z-10"
  >
    {/* Label text */}
    <p className="z-20 font-bold text-sm text-slate-900">Match</p>
    {/* Dynamic score */}
    <p className="z-20 font-bold text-4xl text-slate-900">{score}</p>
  </div>
);

export default MatchBadge;
