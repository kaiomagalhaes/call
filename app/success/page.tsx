export const metadata = {
  title: "Batman Called",
};

export default function SuccessPage() {
  return (
    <main>
      <h1>The Bat is en route.</h1>
      <p className="tagline">
        Stay where you are. Try not to die. He prefers a clean scene.
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="success-image"
        src="https://i.ytimg.com/vi/i00wXlIktog/sddefault.jpg"
        alt="Batman, brooding, on his way"
      />
      <p className="fineprint">
        ETA: dramatically. Estimated property damage: moderate.
      </p>
    </main>
  );
}
