import React from "react";
import { Tabs as UITabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/button";

export default function Tabs() {
  return (
    <UITabs defaultValue="ip">
      <TabsList>
        <TabsTrigger value="ip">IP Reputation</TabsTrigger>
        <TabsTrigger value="hash">Hash Lookup</TabsTrigger>
        <TabsTrigger value="domain">Domain Check</TabsTrigger>
      </TabsList>
      <TabsContent value="ip">
        <Input placeholder="Enter IP address" className="mb-2" />
        <Button>Lookup</Button>
      </TabsContent>
      <TabsContent value="hash">
        <Input placeholder="Enter file hash" className="mb-2" />
        <Button>Lookup</Button>
      </TabsContent>
      <TabsContent value="domain">
        <Input placeholder="Enter domain or URL" className="mb-2" />
        <Button>Lookup</Button>
      </TabsContent>
    </UITabs>
  );
}
