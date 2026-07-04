import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "contact_info",
  title: "Kria AI contact info",
  description: "Returns the primary WhatsApp contact and diagnostic link for Kria AI.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      whatsapp: "+55 91 98509-1584",
      whatsappUrl: "https://wa.me/5591985091584",
      diagnostico: "https://kriaai.lovable.app/#diagnostico-kria",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
