// Shared RDLegalPage şablonunu kullanan 4 legal route (tam eşleşme). SiteNavbar/SiteFooter bu
// route'larda gizlenir (sayfa kendi RDNavbar/RDFooter'ını render eder), AnalysisWidget floating
// tetikleyicisi gösterilmez (legal içerikte satış CTA'sı yok).
export const LEGAL_PATHS = ['/kvkk', '/gizlilik-politikasi', '/cerez-politikasi', '/kullanim-sartlari'];

export function isLegalPath(pathname: string | null | undefined) {
  return pathname != null && LEGAL_PATHS.includes(pathname);
}
