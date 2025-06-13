export const Badge = ({ className = "", children }) => (
    <span className={`inline-block text-xs font-medium rounded-full px-2 py-1 ${className}`}>
        {children}
    </span>
);