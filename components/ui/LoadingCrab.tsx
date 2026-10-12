import ClawdAvatar from "./ClawdAvatar";

interface LoadingCrabProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * 加载状态螃蟹 - 举哑铃动作表示"正在努力工作中"
 * 用于表单提交、数据加载等需要等待的场景
 */
export default function LoadingCrab({ message = '加载中...', size = 'md' }: LoadingCrabProps) {
  return (
    <div className="loading-crab">
      <div className="loading-crab__avatar">
        <ClawdAvatar variant="dumbbell" size={size} />
      </div>
      {message && (
        <p className="loading-crab__message mono">{message}</p>
      )}
    </div>
  );
}
