import Link from "next/link";
import ClawdAvatar from "@/components/ui/ClawdAvatar";
import { NOT_FOUND } from "@/content/site";

/** 404 — 站点自己的声音（microcopy 与全站同口吻），不是框架默认页。 */
export default function NotFound() {
  return (
    <div className="nf gutter">
      <p className="nf__code mono" aria-hidden="true">{NOT_FOUND.prompt}<span className="caret caret--blink" /></p>
      <h1 className="vh">404：页面不存在</h1>
      {/* 沮丧的螃蟹 */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }} aria-hidden="true">
        <ClawdAvatar variant="sad" size="xl" />
      </div>
      <p className="nf__body measure-narrow">{NOT_FOUND.body}</p>
      <p className="nf__back">
        <Link href="/" className="act-start__more">{NOT_FOUND.back}</Link>
      </p>
    </div>
  );
}
