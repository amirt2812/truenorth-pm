import type { ReactNode, SelectHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const fieldBase =
  "w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-[15px] text-navy-900 placeholder:text-slate-400 focus:border-gold-400 focus:ring-2 focus:ring-gold-200 focus:outline-none";

export function Label({ htmlFor, children, required }: { htmlFor: string; children: ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-navy-800">
      {children}
      {required && <span className="ml-0.5 text-gold-600" aria-hidden="true">*</span>}
    </label>
  );
}

export function FieldWrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function Input({ id, label, required, className, ...props }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldWrap className={className}>
      <Label htmlFor={id!} required={required}>{label}</Label>
      <input id={id} name={id} required={required} className={fieldBase} {...props} />
    </FieldWrap>
  );
}

export function Select({
  id,
  label,
  required,
  options,
  className,
  ...props
}: { label: string; options: string[] } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldWrap className={className}>
      <Label htmlFor={id!} required={required}>{label}</Label>
      <select id={id} name={id} required={required} defaultValue="" className={fieldBase} {...props}>
        <option value="" disabled>Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </FieldWrap>
  );
}

export function Textarea({ id, label, required, className, ...props }: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldWrap className={className}>
      <Label htmlFor={id!} required={required}>{label}</Label>
      <textarea id={id} name={id} required={required} rows={4} className={fieldBase} {...props} />
    </FieldWrap>
  );
}

export function Checkbox({ id, children, required }: { id: string; children: ReactNode; required?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        name={id}
        type="checkbox"
        required={required}
        className="mt-1 h-4 w-4 rounded border-navy-300 text-navy-800 focus:ring-gold-300"
      />
      <label htmlFor={id} className="text-sm leading-relaxed text-slate-600">
        {children}
      </label>
    </div>
  );
}
