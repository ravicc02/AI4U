import ClawdAvatar from "@/components/ui/ClawdAvatar";

export default function ClawdShowcase() {
  const avatars: Array<{ variant: 'hero' | 'wizard' | 'chef' | 'dumbbell' | 'crown' | 'sad'; label: string; description: string }> = [
    { variant: 'hero', label: 'Hero 欢迎', description: '首页 Hero 区 - 挥手欢迎' },
    { variant: 'wizard', label: 'Wizard 巫师', description: 'Hello Agent 教程 - 魔法与智慧' },
    { variant: 'chef', label: 'Chef 厨师', description: '建站教程 - 写代码做网站' },
    { variant: 'dumbbell', label: 'Dumbbell 举重', description: 'AI 提效办公 - 提升效率' },
    { variant: 'crown', label: 'Crown 皇冠', description: 'Codex 教程 - 高级工具' },
    { variant: 'sad', label: 'Sad 沮丧', description: '404 页面 - 找不到页面' },
  ];

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 900 }}>
        Clawd 小螃蟹角色展示
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.125rem' }}>
        AI4U 网站的像素风吉祥物 - 每个教程都有专属螃蟹陪伴
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        marginBottom: '4rem'
      }}>
        {avatars.map(({ variant, label, description }) => (
          <div
            key={variant}
            style={{
              border: '2px solid var(--border)',
              padding: '1.5rem',
              borderRadius: '0',
              background: 'var(--paper-0)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
            }}
          >
            <ClawdAvatar variant={variant} size="xl" />
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{label}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{description}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700 }}>尺寸对比</h2>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <ClawdAvatar variant="hero" size="sm" />
            <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>sm</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <ClawdAvatar variant="hero" size="md" />
            <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>md</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <ClawdAvatar variant="hero" size="lg" />
            <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>lg</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <ClawdAvatar variant="hero" size="xl" />
            <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>xl</p>
          </div>
        </div>
      </div>
    </div>
  );
}
