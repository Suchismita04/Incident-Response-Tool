export const Card = ({ className = "", children }) => (
    <div className={`rounded-2xl shadow-md ${className}`}>{children}</div>
);
export const CardContent = ({ className = "", children }) => (
    <div className={`p-4 ${className}`}>{children}</div>
);