import React from 'react';
import { Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Toast({ message, type = 'info' }) {
  if (!message) return null;

  return (
    <div className="toast-banner">
      {type === 'star' && <Sparkles size={18} color="#0EA5E9" />}
      {type === 'error' && <AlertCircle size={18} color="#EF4444" />}
      {type === 'success' && <CheckCircle2 size={18} color="#10B981" />}
      <span>{message}</span>
    </div>
  );
}
