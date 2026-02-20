"use client";
import { useState, useEffect } from "react";
import type { Project, ProjectStatus, OKRLinkTarget } from "@/types";
import { useProjectStore } from "@/stores/useProjectStore";
import { useProductStore } from "@/stores/useProductStore";
import { useQuarterStore } from "@/stores/useQuarterStore";
import { useTagStore } from "@/stores/useTagStore";
import TagChip from "@/components/shared/TagChip";
import OKRLinkSelector from "./OKRLinkSelector";
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

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  existing?: Project;
  defaultProductId?: string;
}

export default function ProjectForm({
  open,
  onClose,
  existing,
  defaultProductId,
}: ProjectFormProps) {
  const addProject = useProjectStore((s) => s.addProject);
  const updateProject = useProjectStore((s) => s.updateProject);
  const products = useProductStore((s) => s.products);
  const activeQuarterId = useQuarterStore((s) => s.activeQuarterId);
  const tags = useTagStore((s) => s.tags);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("planned");
  const [productId, setProductId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [owner, setOwner] = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [okrLinks, setOkrLinks] = useState<OKRLinkTarget[]>([]);

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setDescription(existing.description);
      setStatus(existing.status);
      setProductId(existing.productId);
      setStartDate(existing.startDate || "");
      setEndDate(existing.endDate || "");
      setOwner(existing.owner);
      setSelectedTagIds(existing.tagIds);
      setOkrLinks(existing.okrLinks);
    } else {
      setTitle("");
      setDescription("");
      setStatus("planned");
      setProductId(defaultProductId || "");
      setStartDate("");
      setEndDate("");
      setOwner("");
      setSelectedTagIds([]);
      setOkrLinks([]);
    }
  }, [existing, open, defaultProductId]);

  function toggleTag(tagId: string) {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !productId) return;

    const data = {
      title,
      description,
      status,
      productId,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      owner,
      tagIds: selectedTagIds,
      okrLinks,
    };

    if (existing) {
      updateProject(existing.id, data);
    } else {
      addProject({
        id: `proj-${Date.now()}`,
        quarterId: activeQuarterId,
        ...data,
      });
    }
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {existing ? "Edit Project" : "New Project"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="proj-title">Title</Label>
              <Input
                id="proj-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proj-description">Description</Label>
              <Textarea
                id="proj-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Product</Label>
                <Select value={productId} onValueChange={setProductId} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
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
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as ProjectStatus)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="proj-start">Start Date</Label>
                <Input
                  id="proj-start"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="proj-end">End Date</Label>
                <Input
                  id="proj-end"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="proj-owner">Owner</Label>
              <Input
                id="proj-owner"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="e.g. James Wu"
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

            <div className="space-y-2">
              <Label>Linked Objectives</Label>
              <OKRLinkSelector value={okrLinks} onChange={setOkrLinks} />
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
