"use client";

import { motion } from "motion/react";
import { useCallback, useState } from "react";
import {
  CreateFormInput,
  GeneratedUrlDisplay,
  QRCodeDisplay,
} from "@/components/create";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Gender } from "@/machines/types";

export default function CreatePage() {
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const handleGenerate = useCallback(() => {
    if (!recipientName.trim() || !selectedGender) return;

    const params = new URLSearchParams();
    params.set("name", recipientName.trim());
    params.set("gender", selectedGender);
    if (senderName.trim()) {
      params.set("from", senderName.trim());
    }

    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${baseUrl}/?${params.toString()}`;
    setGeneratedUrl(url);
  }, [recipientName, senderName, selectedGender]);

  const handleReset = useCallback(() => {
    setGeneratedUrl(null);
  }, []);

  const isFormValid = recipientName.trim() && selectedGender;

  return (
    <div className="min-h-dvh bg-linear-to-br from-violet-500 via-fuchsia-400 to-cyan-400 flex items-center justify-center p-4 sm:p-6 animate-gradient overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="text-center">
          <motion.div
            className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-linear-to-br from-pink-400 to-violet-500 rounded-2xl rotate-12 flex items-center justify-center shadow-lg"
            animate={{ rotate: [12, -12, 12] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="text-3xl -rotate-12">💘</span>
          </motion.div>

          <CardHeader className="pt-8">
            <CardTitle className="text-3xl sm:text-4xl bg-linear-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">
              Create a Valentine
            </CardTitle>
            <p className="text-white/80 text-base sm:text-lg font-light mt-2">
              make someone's day a little sweeter
            </p>
          </CardHeader>

          <CardContent className="flex flex-col gap-6 pt-6">
            {!generatedUrl ? (
              <>
                <CreateFormInput
                  label="Who's receiving this?"
                  placeholder="Enter their name"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  hint="required"
                />

                <CreateFormInput
                  label="Your name (optional)"
                  placeholder="Enter your name"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  hint="they'll know it's from you"
                />

                <fieldset className="flex flex-col gap-2">
                  <legend className="text-white/90 text-sm font-medium text-left">
                    Who are you?
                  </legend>
                  <div className="flex gap-3">
                    <Button
                      variant={selectedGender === "female" ? "pink" : "glass"}
                      size="lg"
                      onClick={() => setSelectedGender("female")}
                      className="flex-1"
                    >
                      I'm a Girl
                    </Button>
                    <Button
                      variant={selectedGender === "male" ? "blue" : "glass"}
                      size="lg"
                      onClick={() => setSelectedGender("male")}
                      className="flex-1"
                    >
                      I'm a Guy
                    </Button>
                  </div>
                </fieldset>

                <Button
                  variant="pink"
                  size="xl"
                  onClick={handleGenerate}
                  disabled={!isFormValid}
                  className="w-full mt-4"
                >
                  Generate Valentine Link
                </Button>
              </>
            ) : (
              <>
                <GeneratedUrlDisplay url={generatedUrl} />
                <QRCodeDisplay url={generatedUrl} />

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleReset}
                  className="w-full mt-4"
                >
                  Create Another
                </Button>
              </>
            )}

            <p className="text-white/40 text-xs sm:text-sm mt-2">
              {generatedUrl
                ? "share the link or scan the QR code"
                : "fill in the details above"}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
