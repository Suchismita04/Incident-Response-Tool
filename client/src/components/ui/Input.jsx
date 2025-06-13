export const Input = ({ className = "",placeholder="",...props }) => (
    <input
    placeholder={`${placeholder}`}
        className={`px-3 py-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-[#39FF14] ${className}`}
        {...props}
    />
);