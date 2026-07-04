import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { CATALOGO } from "@/components/Funnel/packages";

export default defineTool({
  name: "list_packages",
  title: "List Kria AI packages",
  description:
    "Returns the Kria AI service catalog (packages, prices, and descriptions in Portuguese).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const packages = Object.values(CATALOGO).map((p) => ({
      id: p.id,
      nome: p.nome,
      preco: p.preco,
      valorBase: p.valorBase,
      presencial: p.presencial ?? false,
      descricao: p.descricao,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(packages, null, 2) }],
      structuredContent: { packages },
    };
  },
});
