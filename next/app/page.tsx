"use client";

import { useEffect } from "react";

export default function RootPage() {
  useEffect(() => {
    const lang = navigator.language || navigator.languages?.[0] || "pt-BR";
    const isPortuguese = lang.toLowerCase().startsWith("pt");
    window.location.replace(isPortuguese ? "/pt-br/" : "/en-us/");
  }, []);

  return null;
}
