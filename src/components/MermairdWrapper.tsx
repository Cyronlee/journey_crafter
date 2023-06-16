import dynamic from "next/dynamic";
import React, { memo } from "react";

function MermaidWrapper({ graphDefinition }: { graphDefinition: string }) {
  const MermaidDynamic = dynamic(() => import("./Mermaid"), { ssr: false });
  return <MermaidDynamic graphDefinition={graphDefinition} />;
}
export default memo(MermaidWrapper);
