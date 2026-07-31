import clsx from "clsx";

export default function ColorSwatch({
  swatches = [],
  title = "",
  size = "h-5 w-5",
  className = "",
}) {
  if (!swatches.length) return null;

  let background = swatches[0]?.value || "#000";

  if (swatches.length === 2) {
    background = `linear-gradient(
      135deg,
      ${swatches[0].value} 0%,
      ${swatches[0].value} 50%,
      ${swatches[1].value} 50%,
      ${swatches[1].value} 100%
    )`;
  }

  if (swatches.length > 2) {
    const gradient = swatches
      .map((color, index) => {
        const start = (index * 100) / swatches.length;
        const end = ((index + 1) * 100) / swatches.length;

        return `${color.value} ${start}% ${end}%`;
      })
      .join(",");

    background = `conic-gradient(${gradient})`;
  }

  return (
    <span
      title={title}
      className={clsx(
        "block rounded-full border border-slate-300 shadow-sm transition-all",
        size,
        className
      )}
      style={{
        background,
      }}
    />
  );
}