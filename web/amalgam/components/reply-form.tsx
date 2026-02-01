"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ReplyForm() {
    return (
        <Card className="w-full">
            <CardHeader className="pb-3 border-b">
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    Post a Reply
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="options">Options</Label>
                    <Input id="options" placeholder="Name, Options (e.g. sage), etc." />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="comment">Comment</Label>
                    <Textarea
                        id="comment"
                        placeholder="Write your thoughts..."
                        className="min-h-[120px] resize-y"
                    />
                </div>
                <div className="grid gap-2">
                    <Label>Image</Label>
                    <div className="border border-dashed rounded-md h-24 flex items-center justify-center text-xs text-muted-foreground bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer">
                        Click or Drag to Upload Image
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 bg-muted/20 border-t flex justify-end">
                <Button>
                    Post Reply
                </Button>
            </CardFooter>
        </Card>
    )
}
