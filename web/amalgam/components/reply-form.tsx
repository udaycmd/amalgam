"use client";

import { ReplyFormProps } from "@/types/interfaces";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ReplyForm({ channel, threadId }: ReplyFormProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!content.trim()) return;

    setLoading(true);

    await fetch(`/api/boards/${channel}/threads/${threadId}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    setContent("");
    setLoading(false);
  }

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your reply..."
        className="w-full min-h-120px rounded-md border p-3 text-sm bg-background"
      />

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full md:w-auto"
      >
        {loading ? "Posting..." : "Post Reply"}
      </Button>
    </div>
  );
}
