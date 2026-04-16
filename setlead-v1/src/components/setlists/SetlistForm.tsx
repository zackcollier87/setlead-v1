import { useState } from 'react';
import type { Setlist } from '../../types/setlist';
import { Button } from '../ui/Button';
import { Input, TextArea } from '../ui/Field';

interface SetlistFormProps {
  initial?: Partial<Setlist>;
  onSave: (input: Partial<Setlist> & { name: string }) => Promise<void>;
}

export function SetlistForm({ initial, onSave }: SetlistFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;
    await onSave({ ...initial, name, description, items: initial?.items ?? [] });
    setName('');
    setDescription('');
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-base font-semibold text-white">Create Setlist</h3>
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Sunday AM" />
      <TextArea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Service notes" rows={3} />
      <Button type="submit">Save Setlist</Button>
    </form>
  );
}
