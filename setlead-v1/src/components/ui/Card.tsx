import type { PropsWithChildren } from 'react';

export function Card({ children }: PropsWithChildren) {
  return <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-lg shadow-slate-950/40">{children}</div>;
}
