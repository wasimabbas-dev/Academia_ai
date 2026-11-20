import { useState } from 'react';

export function useTaskForm() {
  const [open, setOpen] = useState(false);

  return {
    taskFormOpen: open,
    openTaskForm: () => setOpen(true),
    closeTaskForm: () => setOpen(false),
  };
}