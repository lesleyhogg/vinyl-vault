"use client";

import { useFooterText } from "@/contexts/FooterTextContext";
import useTypewriter from "@/hooks/useTypewriter";
import { useEffect } from "react";

export default function LayoutFooter() {
  const { footerText, setIsTyping, enableFooterInput } = useFooterText();
  const [typedText, isTyping] = useTypewriter(footerText, 30);

  useEffect(() => {
    setIsTyping(isTyping);
  }, [isTyping, setIsTyping]);

  return (
    <footer className="col-span-3 bg-green-200 w-full py-4">
      <div className="border-4 rounded-lg border-gray-700 w-full h-full">
        <div className="border rounded-lg border-gray-300 w-full h-full">
          <div className="rounded bg-gray-900 text-green-100 px-8 py-5 w-full h-[200px] flex flex-col justify-between">
            <p className="font-[family-name:var(--font-press-start)] text-xl/10">
              {typedText}
            </p>
            {/* {enableFooterInput && (
              <div className="flex flex-row gap-4 font-[family-name:var(--font-press-start)] text-md/10">
                <button className="px-5 py-4 border border-green-100 rounded-lg min-w-32">Yes</button>
                <button className="px-5 py-4 border border-green-100 rounded-lg min-w-32">No</button>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </footer>
  );
}
