import { useState, useCallback, useEffect } from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastItem {
  id: number;
  type: ToastType;
  title: string;
  message?: string;
}

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>,
  error:   <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" /></svg>,
  warning: <svg className="w-5 h-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>,
  info:    <svg className="w-5 h-5 text-sky-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" /></svg>,
};

const BG: Record<ToastType, string> = {
  success: "border-emerald-100 bg-white",
  error:   "border-red-100 bg-white",
  warning: "border-amber-100 bg-white",
  info:    "border-sky-100 bg-white",
};

function ToastItem({ item, onDismiss }: { item: ToastItem; onDismiss: (id: number) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(item.id), 4000);
    return () => clearTimeout(t);
  }, [item.id, onDismiss]);

  return (
    <div className={`flex items-start gap-3 w-80 p-4 rounded-xl border shadow-lg shadow-stone-900/5 ${BG[item.type]}`}>
      <div className="flex-shrink-0 mt-0.5">{ICONS[item.type]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-stone-900">{item.title}</p>
        {item.message && <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{item.message}</p>}
      </div>
      <button onClick={() => onDismiss(item.id)} className="flex-shrink-0 text-stone-400 hover:text-stone-600 transition-colors">
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

function useToasts() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useState(0);
  const add = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, message }]);
  }, []);
  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  return { toasts, add, dismiss };
}

function Btn({ children, onClick, color }: { children: React.ReactNode; onClick: () => void; color: string }) {
  return (
    <button onClick={onClick} className={`h-9 px-4 text-sm font-medium rounded-lg transition-colors ${color}`}>
      {children}
    </button>
  );
}

export default function ToastDemo() {
  const { toasts, add, dismiss } = useToasts();

  return (
    <div className="p-10 bg-white min-h-[300px] relative">
      <div className="flex flex-wrap gap-3">
        <Btn color="bg-emerald-500 text-white hover:bg-emerald-600" onClick={() => add("success", "Changes saved", "Your settings have been updated successfully.")}>Success</Btn>
        <Btn color="bg-red-500 text-white hover:bg-red-600" onClick={() => add("error", "Something went wrong", "Failed to save changes. Please try again.")}>Error</Btn>
        <Btn color="bg-amber-500 text-white hover:bg-amber-600" onClick={() => add("warning", "Approaching limit", "You've used 80% of your monthly API quota.")}>Warning</Btn>
        <Btn color="bg-sky-500 text-white hover:bg-sky-600" onClick={() => add("info", "New feature available", "Check out the redesigned analytics dashboard.")}>Info</Btn>
      </div>
      <p className="mt-4 text-xs text-stone-400">Toasts auto-dismiss after 4 seconds.</p>

      {/* Toast stack */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((t) => <ToastItem key={t.id} item={t} onDismiss={dismiss} />)}
      </div>
    </div>
  );
}
