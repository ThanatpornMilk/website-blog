/**
 * Admin Header
 * Reusable header component for admin pages.
 */
interface AdminHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function AdminHeader({ title, description, action }: Readonly<AdminHeaderProps>) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
      <div>
        <h1 className="text-3xl font-black text-stone-800 tracking-tight">{title}</h1>
        {description && <p className="text-stone-500 mt-2">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
