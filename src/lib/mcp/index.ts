import { defineMcp } from "@lovable.dev/mcp-js";
import listPackagesTool from "./tools/list-packages";
import contactInfoTool from "./tools/contact-info";

export default defineMcp({
  name: "kria-ai-mcp",
  title: "Kria AI",
  version: "0.1.0",
  instructions:
    "Tools for Kria AI — a creative AI platform. Use `list_packages` to browse service packages and prices, and `contact_info` for WhatsApp and diagnostic links.",
  tools: [listPackagesTool, contactInfoTool],
});
