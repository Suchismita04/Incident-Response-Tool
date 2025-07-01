import React from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";


const ThreatInteligence = () => {
    return (
        <>
            <div className="bg-black rounded-lg h-64 text-white flex flex-col">

                <h2 className="font-semibold m-4">Threat Inteligence</h2>
                <Input placeholder="Enter Ip addressess,Hash..." className="bg-gray-500 text-white m-4" />
                <Button className="text-white bg-blue-700 m-4">Add To Blocklist</Button>
            </div>
        </>
    )
}
export default ThreatInteligence;

