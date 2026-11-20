export function EmptyState({ title, subtitle, action }) {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="text-gray-500 mt-2">{subtitle}</p>
      {action && <button className="btn-primary mt-4">{action.label}</button>}
    </div>
  );
}