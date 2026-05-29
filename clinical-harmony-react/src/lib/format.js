/** Human-friendly relative time, e.g. "Just now", "3h ago", "Yesterday, 2:15 PM". */
export function relativeTime(t) {
  if (!t) return '';
  const now = Date.now();
  const diff = now - t;
  const min = 60 * 1000;
  const hour = 60 * min;
  const day = 24 * hour;
  const time = new Date(t).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  if (diff < min) return 'Just now';
  if (diff < hour) return `${Math.round(diff / min)}m ago`;
  if (diff < day) return `${Math.round(diff / hour)}h ago`;
  if (diff < 2 * day) return `Yesterday, ${time}`;
  if (diff < 7 * day) return `${Math.round(diff / day)}d ago`;
  return new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + `, ${time}`;
}
