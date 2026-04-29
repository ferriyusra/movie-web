import type { NextApiRequest, NextApiResponse } from "next";
import { environment } from "@/config/environment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { path, ...queryParams } = req.query;
  const backendPath = Array.isArray(path) ? path.join("/") : path;

  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(queryParams)) {
    if (value) query.set(key, Array.isArray(value) ? value[0] : value);
  }
  const qs = query.toString();
  const url = `${environment.API_URL}/${backendPath}${qs ? `?${qs}` : ""}`;

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (req.headers.authorization) {
      headers["Authorization"] = req.headers.authorization as string;
    }

    const hasBody =
      req.method === "POST" ||
      req.method === "PUT" ||
      req.method === "PATCH";

    const fetchOptions: RequestInit = {
      method: req.method,
      headers,
      ...(hasBody && req.body
        ? { body: JSON.stringify(req.body) }
        : {}),
    };

    const response = await fetch(url, fetchOptions);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch {
    res.status(500).json({ success: false, message: "Proxy error" });
  }
}
