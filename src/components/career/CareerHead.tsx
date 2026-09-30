export default function CareerHead({ lede = true }: { lede?: boolean }) {
  return (
    <div className="cr-head">
      <p className="label">
        <span>Chapter 04</span> Releases
      </p>
      <h2 className="cr-title">
        Every role, <em>a new release.</em>
      </h2>
      {lede && <p className="cr-lede">Six years of shipping, from my first full-time role to webook.</p>}
    </div>
  );
}
