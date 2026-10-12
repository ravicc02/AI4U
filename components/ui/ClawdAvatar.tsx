/**
 * ClawdAvatar — 小螃蟹像素风头像组件
 * 基于终端渲染输出的像素数据，用 CSS Grid 渲染成网页形象
 */

interface PixelData {
  grid: string[][]; // 颜色矩阵，每个格子是 hex 颜色或 'transparent'
  width: number;
  height: number;
}

interface ClawdAvatarProps {
  variant: 'hero' | 'wizard' | 'chef' | 'dumbbell' | 'crown' | 'sad' | 'sleep';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

// 预设角色的像素数据（从 ANSI 输出转换，空字符串表示透明）
const AVATARS: Record<string, PixelData> = {
  hero: {
    width: 14,
    height: 7,
    grid: [
      ['', '', '', '', '', '', '#FF88AA', '#FFDD33', '', '', '', '', '', ''],
      ['', '', '', '', '', '#FF88AA', '#FFDD33', '#FF88AA', '#FF88AA', '#FF88AA', '', '', '', ''],
      ['', '', '', '#CD6E58', '#FF88AA', '#FF88AA', '#FF88AA', '#FF88AA', '#FF88AA', '#FF88AA', '#FF88AA', '#FF88AA', '#CD6E58', ''],
      ['', '#CD6E58', '', '#CD6E58', '#CD6E58', '#000', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#000', '#CD6E58', '#CD6E58', ''],
      ['', '#CD6E58', '', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', ''],
      ['', '', '', '#CD6E58', '#CD6E58', '', '#CD6E58', '#CD6E58', '', '#CD6E58', '', '#CD6E58', '#CD6E58', ''],
      ['', '', '', '', '#CD6E58', '', '', '#CD6E58', '', '', '', '#CD6E58', '', ''],
    ],
  },

  wizard: {
    width: 16,
    height: 8,
    grid: [
      ['', '', '', '', '', '', '', '#443388', '', '', '', '', '', '', '#FFD700', ''],
      ['', '', '', '', '', '', '#443388', '#BBAAEE', '#443388', '', '', '', '', '', '', '#8B5522'],
      ['', '', '', '', '', '#443388', '#BBAAEE', '#443388', '#BBAAEE', '#443388', '#443388', '', '', '', '#8B5522', ''],
      ['', '', '', '#443388', '#443388', '#443388', '#443388', '#443388', '#443388', '#443388', '#443388', '#443388', '#CD6E58', '#CD6E58', '', ''],
      ['', '#CD6E58', '', '#CD6E58', '#CD6E58', '#000', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#000', '#CD6E58', '#CD6E58', '#CD6E58', '', ''],
      ['', '#CD6E58', '', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '', '', ''],
      ['', '', '', '#CD6E58', '#CD6E58', '', '#CD6E58', '#CD6E58', '', '#CD6E58', '', '#CD6E58', '#CD6E58', '', '', ''],
      ['', '', '', '', '#CD6E58', '', '', '#CD6E58', '', '', '', '#CD6E58', '', '', '', ''],
    ],
  },

  chef: {
    width: 13,
    height: 7,
    grid: [
      ['', '', '', '', '', '#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0', '', ''],
      ['', '', '', '', '#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0', ''],
      ['', '', '', '#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0', '#F0F0F0', ''],
      ['', '', '', '#CD6E58', '#CD6E58', '#000', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#000', '#CD6E58', '#CD6E58'],
      ['', '#CD6E58', '', '#CD6E58', '#CD6E58', '#000', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#000', '#CD6E58', '#CD6E58'],
      ['', '#CD6E58', '', '#CD6E58', '', '#CD6E58', '#3366CC', '#CD6E58', '#3366CC', '#FFF', '#CD6E58', '#3366CC', '#CD6E58'],
      ['', '', '', '', '#CD6E58', '#888', '#333', '#888', '#888', '#333', '#888', '#CD6E58', ''],
    ],
  },

  dumbbell: {
    width: 16,
    height: 6,
    grid: [
      ['#888', '#888', '', '', '', '', '', '', '', '', '', '', '', '', '#888', '#888'],
      ['', '', '#CD6E58', '#CD6E58', '#DC2828', '', '#DC2828', '', '#DC2828', '', '#DC2828', '', '#DC2828', '#CD6E58', '#CD6E58', ''],
      ['', '', '', '', '#CD6E58', '#CD6E58', '#000', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#000', '#CD6E58', '#CD6E58', '', ''],
      ['', '', '', '', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '', ''],
      ['', '', '', '', '', '#CD6E58', '#CD6E58', '', '#CD6E58', '#CD6E58', '', '#CD6E58', '#CD6E58', '', '', ''],
      ['', '', '', '', '', '#CD6E58', '', '', '', '#CD6E58', '', '', '', '#CD6E58', '', ''],
    ],
  },

  crown: {
    width: 14,
    height: 6,
    grid: [
      ['', '', '', '#FFDD33', '', '#DC2828', '#FFDD33', '#FFDD33', '', '#DC2828', '', '#FFDD33', '', ''],
      ['', '', '', '#CD6E58', '#FFDD33', '#FFDD33', '#FFDD33', '#FFDD33', '#FFDD33', '#FFDD33', '#FFDD33', '#FFDD33', '#CD6E58', ''],
      ['', '#CD6E58', '', '#CD6E58', '#CD6E58', '#000', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#000', '#CD6E58', '#CD6E58', ''],
      ['', '#CD6E58', '', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', ''],
      ['', '', '', '#CD6E58', '#CD6E58', '', '#CD6E58', '#CD6E58', '', '#CD6E58', '', '#CD6E58', '#CD6E58', ''],
      ['', '', '', '', '#CD6E58', '', '', '#CD6E58', '', '', '', '#CD6E58', '', ''],
    ],
  },

  sad: {
    width: 12,
    height: 4,
    grid: [
      ['', '', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58'],
      ['', '', '#CD6E58', '#CD6E58', '#000', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#000', '#CD6E58', '#CD6E58'],
      ['', '#CD6E58', '', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58', '#CD6E58'],
      ['', '#CD6E58', '', '', '#CD6E58', '', '', '#CD6E58', '', '', '', '#CD6E58'],
    ],
  },
};

export default function ClawdAvatar({
  variant,
  size = 'md',
  className = '',
}: ClawdAvatarProps) {
  const avatar = AVATARS[variant];
  if (!avatar) return null;

  const sizeMap = {
    sm: 3,
    md: 4,
    lg: 6,
    xl: 8,
  };

  const pixelSize = sizeMap[size];

  return (
    <div
      className={`clawd-avatar ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${avatar.width}, ${pixelSize}px)`,
        gridTemplateRows: `repeat(${avatar.height}, ${pixelSize}px)`,
        gap: 0,
        width: 'fit-content',
      }}
      role="img"
      aria-label={`Clawd ${variant} avatar`}
    >
      {avatar.grid.flat().map((color, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: color || 'transparent',
            width: pixelSize,
            height: pixelSize,
          }}
        />
      ))}
    </div>
  );
}
