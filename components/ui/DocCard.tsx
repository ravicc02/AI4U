import Link from "next/link";
import ClawdAvatar from "./ClawdAvatar";

interface DocCardProps {
  slug: string;
  title: string;
  summary: string;
  minutes: number;
  categoryLabel: string;
}

// 根据文档标题或 slug 映射到对应的螃蟹角色
function getAvatarVariant(slug: string, title: string): 'wizard' | 'chef' | 'dumbbell' | 'crown' | 'hero' {
  if (slug.includes('agent') || title.includes('Agent')) return 'wizard';
  if (slug.includes('website') || title.includes('网站')) return 'chef';
  if (slug.includes('productivity') || title.includes('提效') || title.includes('办公')) return 'dumbbell';
  if (slug.includes('codex') || title.includes('Codex')) return 'crown';
  if (slug.includes('ppt') || title.includes('PPT')) return 'hero';
  return 'hero'; // 默认
}

export default function DocCard({
  slug,
  title,
  summary,
  minutes,
  categoryLabel,
}: DocCardProps) {
  const avatarVariant = getAvatarVariant(slug, title);

  return (
    <Link href={`/docs/${slug}`} className="doc-card">
      <div className="doc-card__header">
        <div className="doc-card__avatar" aria-hidden="true">
          <ClawdAvatar variant={avatarVariant} size="md" />
        </div>
        <div className="doc-card__meta">
          <span className="doc-card__category mono">{categoryLabel}</span>
          <span className="doc-card__time mono">{minutes} 分钟</span>
        </div>
      </div>
      <h3 className="doc-card__title">{title}</h3>
      <p className="doc-card__summary">{summary}</p>
    </Link>
  );
}
