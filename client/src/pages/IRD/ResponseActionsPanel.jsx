import React from "react";
import { Button } from "../../components/ui/Button";
const ResponseActionsPanel = () => {

    const buttons = [
        "Block Ip",
        "Kill Process",
        "Isolate Host",
        "Disable User"
    ]


    return (
        <>
            <div className=" rounded-lg h-64 w-64 max-w-auto text-white bg-black ">
              
                    <p className="m-2 font-semibold text-lg">Response Action</p>
                    <div className="space-y-2 flex flex-col m-2">
                    {buttons.map((btn) => {
                        return (<Button className="text-white bg-blue-700">{btn}</Button>)
                    })}
             </div>
            </div>
        </>
    )
}

export default ResponseActionsPanel;
