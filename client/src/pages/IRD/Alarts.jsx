import React from "react";
import { Card, CardContent } from "../../components/ui/Card";

const Alart = () => {
    const alarts =[
        {
          "id": "alert-1001",
          "timestamp": "2025-04-25T09:12:30Z",
          "severity": "critical",
          "category": "Malware Detected",
          "source": {
            "ip": "10.0.0.15",
            "hostname": "desktop-22",
            "user": "alice.kim"
          },
          "description": "Ransomware signature detected in running process.",
          "recommendation": "Kill process and isolate host.",
          "status": "open",
          "response_actions": ["Kill Process", "Isolate Host"],
          "related_processes": [
            {
              "pid": 2045,
              "name": "encryptor.exe",
              "command_line": "C:\\Users\\alice.kim\\AppData\\encryptor.exe"
            }
          ],
          "detected_by": "EDR-Agent"
        },
        {
          "id": "alert-1002",
          "timestamp": "2025-04-25T11:45:10Z",
          "severity": "high",
          "category": "Brute Force Login",
          "source": {
            "ip": "172.16.8.23",
            "hostname": "web-server-1",
            "user": "unknown"
          },
          "description": "Multiple failed login attempts detected via SSH.",
          "recommendation": "Block IP address.",
          "status": "in_progress",
          "response_actions": ["Block IP"],
          "detected_by": "Firewall-LogMonitor"
        },
       
        
        
      ]
      



    return (

        <>
            <div className="max-w-3xl mx-auto  top-17 relative p-2 rounded-lg bg-black text-white   m-4 ">
                <h2 className="font-semibold text-white m-2">Alarts</h2>
                {alarts.map((item,index)=>{
                    return (
                    <Card key={index}>
                        <CardContent>
                            <p className="text-[#39FF14]">{item.timestamp}</p>
                            <p>{item.category}</p>
                            <p>{item.description}</p>
                            <p className="text-red-500">{item.detected_by}</p>
                            <div className="text-[#39FF14]">
                            <p>Host Name: {item.source.hostname}</p>
                            <p>IP: {item.source.ip}</p>
                            <p>User: {item.source.user}</p>
                            </div>
                           
                        </CardContent>
                        </Card>
                )
                })}


            </div>
        </>
    )
}

export default Alart;