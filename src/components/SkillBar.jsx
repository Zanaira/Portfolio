export default function SkillBar({ pct, animate }) {
  return (
    <div className="sk-bar">
      <div
        className="sk-fill"
        style={{ width: animate ? pct + "%" : "0%" }}
      />
    </div>
  );
}