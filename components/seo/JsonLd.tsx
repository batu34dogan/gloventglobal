// Basit, reusable JSON-LD script render'ı. Server component — herhangi bir görsel etkisi yok,
// sadece <head>/<body> içine yapısal veri (<script type="application/ld+json">) ekler.
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}