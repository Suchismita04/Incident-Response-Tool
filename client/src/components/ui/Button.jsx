export const Button = ({ className = "", children, ...props }) => (
    <button
        className={`px-4 py-2 rounded-xl font-semibold transition-colors ${className}`}
        {...props}
    >
        {children}
    </button>
);