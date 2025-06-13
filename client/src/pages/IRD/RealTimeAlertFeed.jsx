import React from "react";
import { Button } from "../../components/ui/Button";


const RealTimeAlertFeed = () => {
    return (
        <div className="flex items-center justify-center mt-4 ">
            <div className="shadow max-w-3xl w-full mx-2 bg-white rounded-lg">
                <div className="bg-gray-100 text-center flex justify-between items-center px-4 py-2">
                    <p className="text-black font-bold">Ransomware Infection On HR's Server</p>
                    <Button className="bg-red-500 text-white">Priority: High</Button>
                </div>

                <div className="p-4">
                    <p className="text-black font-bold mb-2">Actions</p>
                    <ol className="list-decimal ml-6 text-black">
                        <li>Isolate HR's server from the network</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default RealTimeAlertFeed;
