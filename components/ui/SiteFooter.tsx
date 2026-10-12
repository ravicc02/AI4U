import Link from "next/link";
import ClawdAvatar from "./ClawdAvatar";
import { FOOTER, SITE } from "@/content/site";

/** 2 栏 creative footer（components.md §14）：年份数字动态生成。 */
export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer__grid gutter">
        <div className="site-footer__brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <p className="site-footer__logo mono">AI4U<span className="caret" aria-hidden="true" /></p>
            <div aria-hidden="true">
              <ClawdAvatar variant="sad" size="sm" />
            </div>
          </div>
          {FOOTER.blurb && <p className="site-footer__blurb measure-narrow">{FOOTER.blurb}</p>}
        </div>
        <nav aria-label="页脚导航" className="site-footer__nav">
          <ul>
            {FOOTER.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="site-footer__link">{item.label}</Link>
              </li>
            ))}
            <li className="site-footer__contact mono">{FOOTER.contact}</li>
          </ul>
        </nav>
      </div>
      <div className="site-footer__meta gutter mono">
        <span>© {year} AI4U · {SITE.nameLong}</span>
        <span>{FOOTER.maintainer}</span>
      </div>
    </footer>
  );
}
