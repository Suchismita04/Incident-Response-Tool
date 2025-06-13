import { useState } from "react";

// Optional: Replace with a styled Textarea component if using shadcn/ui or similar
const LogConsole = () => {
    const [logs, setLogs] = useState([
        "[12:34:56] Firewall: Blocked suspicious IP 192.168.1.23",
        "[12:35:10] IDS: Detected port scan on host 10.0.0.5",
        "[12:36:02] System Log: User admin failed login attempt",
    ]);

    return (
        <div className="rounded-lg shadow max-w-3xl mx-auto m-4 text-white">
            <h2 className="text-xl font-semibold mb-2 text-[#39FF14]">Log Analysis Console</h2>
            <div className="bg-black rounded-lg p-4 h-60 overflow-y-auto font-mono text-sm">
                {logs.map((log, index) => (
                    <div key={index} className="mb-2 text-gray-200">
                        {log}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogConsole;
