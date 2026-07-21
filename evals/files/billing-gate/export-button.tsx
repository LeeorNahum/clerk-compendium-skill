export function ExportButton({ hasFeature }: { hasFeature: boolean }) {
  return hasFeature ? <button>Export</button> : null;
}
