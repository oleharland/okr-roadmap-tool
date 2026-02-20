"use client";
import { useState, useEffect } from "react";
import type { KeyResult } from "@/types";
import { useOKRStore } from "@/stores/useOKRStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface KeyResultFormProps {
  open: boolean;
  onClose: () => void;
  objectiveId: string;
  existing?: KeyResult;
}

export default function KeyResultForm({
  open,
  onClose,
  objectiveId,
  existing,
}: KeyResultFormProps) {
  const addKeyResult = useOKRStore((s) => s.addKeyResult);
  const updateKeyResult = useOKRStore((s) => s.updateKeyResult);

  const [title, setTitle] = useState("");
  const [target, setTarget] = useState(100);
  const [current, setCurrent] = useState(0);
  const [unit, setUnit] = useState("%");

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setTarget(existing.target);
      setCurrent(existing.current);
      setUnit(existing.unit);
    } else {
      setTitle("");
      setTarget(100);
      setCurrent(0);
      setUnit("%");
    }
  }, [existing, open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    if (existing) {
      updateKeyResult(objectiveId, existing.id, {
        title,
        target,
        current,
        unit,
      });
    } else {
      addKeyResult(objectiveId, {
        id: `kr-${Date.now()}`,
        objectiveId,
        title,
        target,
        current,
        unit,
      });
    }
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {existing ? "Edit Key Result" : "New Key Result"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="kr-title">Title</Label>
              <Input
                id="kr-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label htmlFor="kr-current">Current</Label>
                <Input
                  id="kr-current"
                  type="number"
                  value={current}
                  onChange={(e) => setCurrent(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kr-target">Target</Label>
                <Input
                  id="kr-target"
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kr-unit">Unit</Label>
                <Input
                  id="kr-unit"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="%"
                />
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
