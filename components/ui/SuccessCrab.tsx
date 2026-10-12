import ClawdAvatar from "./ClawdAvatar";

interface SuccessCrabProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClose?: () => void;
}

/**
 * 成功提示螃蟹 - 欢呼姿态表示操作成功
 * 用于表单提交成功、操作完成等场景
 */
export default function SuccessCrab({
  message = '操作成功！',
  size = 'lg',
  onClose
}: SuccessCrabProps) {
  return (
    <div className="success-crab">
      <div className="success-crab__avatar">
        <ClawdAvatar variant="hero" size={size} />
      </div>
      {message && (
        <p className="success-crab__message">{message}</p>
      )}
      {onClose && (
        <button
          className="success-crab__close"
          onClick={onClose}
          aria-label="关闭"
        >
          ✕
        </button>
      )}
    </div>
  );
}
