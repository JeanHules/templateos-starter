import { useState, useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  footer?: React.ReactNode;
}

function Modal({ open, onClose, title, size = "md", children, footer }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const widths = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" />
      {/* Panel */}
      <div
        className={`relative w-full ${widths[size]} bg-white rounded-2xl shadow-xl shadow-stone-900/10 flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-stone-100">
            <h2 className="text-base font-semibold text-stone-900">{title}</h2>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}
        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-stone-100 flex items-center justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

function Btn({ children, onClick, variant = "primary" }: { children: React.ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "danger" }) {
  const cls = {
    primary: "bg-amber-500 text-white hover:bg-amber-600",
    secondary: "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50",
    danger: "bg-red-500 text-white hover:bg-red-600",
  }[variant];
  return (
    <button onClick={onClick} className={`h-9 px-4 text-sm font-medium rounded-lg transition-colors ${cls}`}>
      {children}
    </button>
  );
}

export default function ModalDemo() {
  const [which, setWhich] = useState<null | "basic" | "confirm" | "form">(null);
  const [name, setName] = useState("");

  return (
    <div className="p-10 bg-white min-h-[400px]">
      <div className="flex flex-wrap gap-3">
        <Btn onClick={() => setWhich("basic")}>Basic modal</Btn>
        <Btn onClick={() => setWhich("confirm")} variant="danger">Delete confirm</Btn>
        <Btn onClick={() => setWhich("form")} variant="secondary">Form modal</Btn>
      </div>

      {/* Basic */}
      <Modal open={which === "basic"} onClose={() => setWhich(null)} title="What's new in v2.0" size="md"
        footer={<Btn onClick={() => setWhich(null)}>Got it</Btn>}>
        <div className="space-y-3 text-sm text-stone-600 leading-relaxed">
          <p>We've completely redesigned the dashboard to make it faster and easier to navigate.</p>
          <ul className="space-y-1.5 pl-4">
            {["New sidebar with collapsible sections","Real-time collaboration","Improved analytics charts","Dark mode support"].map(i=>(
              <li key={i} className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span>{i}</li>
            ))}
          </ul>
        </div>
      </Modal>

      {/* Confirm delete */}
      <Modal open={which === "confirm"} onClose={() => setWhich(null)} title="Delete project?" size="sm"
        footer={<><Btn variant="secondary" onClick={() => setWhich(null)}>Cancel</Btn><Btn variant="danger" onClick={() => setWhich(null)}>Delete</Btn></>}>
        <div className="flex gap-4">
          <div className="w-10 h-10 flex-shrink-0 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">This will permanently delete the project and all its data. This action cannot be undone.</p>
        </div>
      </Modal>

      {/* Form */}
      <Modal open={which === "form"} onClose={() => setWhich(null)} title="Invite team member" size="md"
        footer={<><Btn variant="secondary" onClick={() => setWhich(null)}>Cancel</Btn><Btn onClick={() => setWhich(null)}>Send invite</Btn></>}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Sarah Chen"
              className="w-full h-10 px-3 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
            <input type="email" placeholder="sarah@company.com"
              className="w-full h-10 px-3 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Role</label>
            <select className="w-full h-10 px-3 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400">
              <option>Member</option><option>Admin</option><option>Viewer</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
