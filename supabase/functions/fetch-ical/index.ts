import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { url: rawUrl } = await req.json();
    if (!rawUrl || typeof rawUrl !== "string") {
      return new Response(JSON.stringify({ error: "Missing url" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Normalise protocol: webcal:// and http:// → https://
    const url = rawUrl
      .trim()
      .replace(/^webcal:\/\//i, "https://")
      .replace(/^http:\/\//i, "https://");

    // Abort the fetch after 12 seconds to avoid edge function timeouts.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);

    let response: Response;
    try {
      response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; Ascension20Calendar/1.0)",
          "Accept": "text/calendar, application/ics, text/plain, */*",
          "Cache-Control": "no-cache",
        },
        signal: controller.signal,
        redirect: "follow",
      });
    } finally {
      clearTimeout(timer);
    }

    if (!response.ok) {
      return new Response(JSON.stringify({ error: `HTTP ${response.status}` }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const text = await response.text();
    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
