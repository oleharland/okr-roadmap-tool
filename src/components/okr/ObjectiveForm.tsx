"use client";
import { useState, useEffect } from "react";
import type { Objective, ObjectiveLevel } from "@/types";
import { useOKRStore } from "@/stores/useOKRStore";
import { useProductStore } from "@/stores/useProductStore";
import { useQuarterStore } from "@/stores/useQuarterStore";
import { useTagStore } from "@/stores/useTagStore";
import TagChip from "@/components/shared/TagChip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ObjectiveFormProps {
  open: boolean;
  onClose: () => void;
  existing?: Objective;
  defaultProductId?: string;
}

export default function ObjectiveForm({
  open,
  onClose,
  existing,
  defaultProductId,
}: ObjectiveFormProps) {
  const addObjective = useOKRStore((s) => s.addObjective);
  const updateObjective = useOKRStore((s) => s.updateObjective);
  const products = useProductStore((s) => s.products);
  const activeQuarterId = useQuarterStore((s) => s.activeQuarterId);
  const tags = useTagStore((s) => s.tags);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState<ObjectiveLevel>("company");
  const [productId, setProductId] = useState("");
  const [owner, setOwner] = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setDescription(existing.description);
      setLevel(existing.level);
      setProductId(existing.productId || "");
      setOwner(existing.owner);
      setSelectedTagIds(existing.tagIds);
    } else {
      setTitle("");
      setDescription("");
      setLevel(defaultProductId ? "product" : "company");
      setProductId(defaultProductId || "");
      setOwner("");
      setSelectedTagIds([]);
    }
  }, [existing, open, defaultProductId]);

  function toggleTag(tagId: string) {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    if (existing) {
      updateObjective(existing.id, {
        title,
        description,
        level,
        productId: level === "product" ? productId : undefined,
        owner,
        tagIds: selectedTagIds,
      });
    } else {
      addObjective({
        id: `obj-${Date.now()}`,
        title,
        description,
        level,
        productId: level === "product" ? productId : undefined,
        quarterId: activeQuarterId,
        tagIds: selectedTagIds,
        keyResults: [],
        owner,
      });
    }
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {existing ? "Edit Objective" : "New Objective"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="obj-title">Title</Label>
              <Input
                id="obj-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="obj-description">Description</Label>
              <Textarea
                id="obj-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Level</Label>
              <Select value={level} onValueChange={(v) => setLevel(v as ObjectiveLevel)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="company">Company</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {level === "product" && (
              <div className="space-y-2">
                <Label>Product</Label>
                <Select value={productId} onValueChange={setProductId} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="obj-owner">Owner</Label>
              <Input
                id="obj-owner"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="e.g. Sarah Chen"
              />
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={
                      selectedTagIds.includes(tag.id) ? "" : "opacity-40"
                    }
                  >
                    <TagChip label={tag.label} color={tag.color} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {existing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
