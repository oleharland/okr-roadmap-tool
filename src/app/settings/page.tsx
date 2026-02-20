"use client";
import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import TagChip from "@/components/shared/TagChip";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { useProductStore } from "@/stores/useProductStore";
import { useTagStore } from "@/stores/useTagStore";
import type { Product, Tag } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COLORS = ["blue", "green", "purple", "orange", "yellow", "red", "gray"];

export default function SettingsPage() {
  const { products, addProduct, updateProduct, deleteProduct } =
    useProductStore();
  const { tags, addTag, updateTag, deleteTag } = useTagStore();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProductName, setNewProductName] = useState("");
  const [newProductDesc, setNewProductDesc] = useState("");
  const [newProductColor, setNewProductColor] = useState("blue");

  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [newTagLabel, setNewTagLabel] = useState("");
  const [newTagColor, setNewTagColor] = useState("blue");

  const [confirmDelete, setConfirmDelete] = useState<{
    type: "product" | "tag";
    id: string;
    label: string;
  } | null>(null);

  function handleAddProduct() {
    if (!newProductName.trim()) return;
    addProduct({
      id: `prod-${Date.now()}`,
      name: newProductName,
      description: newProductDesc,
      color: newProductColor,
    });
    setNewProductName("");
    setNewProductDesc("");
    setNewProductColor("blue");
  }

  function handleSaveProduct() {
    if (!editingProduct) return;
    updateProduct(editingProduct.id, editingProduct);
    setEditingProduct(null);
  }

  function handleAddTag() {
    if (!newTagLabel.trim()) return;
    addTag({
      id: `tag-${Date.now()}`,
      label: newTagLabel,
      color: newTagColor,
    });
    setNewTagLabel("");
    setNewTagColor("blue");
  }

  function handleSaveTag() {
    if (!editingTag) return;
    updateTag(editingTag.id, editingTag);
    setEditingTag(null);
  }

  return (
    <>
      <TopBar title="Settings" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl space-y-10">
          {/* Products */}
          <section>
            <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-4">
              Products
            </h3>
            <div className="space-y-2 mb-4">
              {products.map((product) =>
                editingProduct?.id === product.id ? (
                  <div
                    key={product.id}
                    className="bg-background border border-primary/30 rounded-lg p-3 space-y-2"
                  >
                    <Input
                      value={editingProduct.name}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          name: e.target.value,
                        })
                      }
                    />
                    <Input
                      value={editingProduct.description}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          description: e.target.value,
                        })
                      }
                    />
                    <div className="flex gap-2">
                      <Select
                        value={editingProduct.color}
                        onValueChange={(v) =>
                          setEditingProduct({
                            ...editingProduct,
                            color: v,
                          })
                        }
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {COLORS.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button size="sm" onClick={handleSaveProduct}>
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingProduct(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    key={product.id}
                    className="flex items-center justify-between bg-background border border-border rounded-lg p-3"
                  >
                    <div>
                      <span className="text-sm font-medium">
                        {product.name}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {product.description}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingProduct(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() =>
                          setConfirmDelete({
                            type: "product",
                            id: product.id,
                            label: product.name,
                          })
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Add product form */}
            <div className="bg-muted rounded-lg p-3 space-y-2">
              <div className="flex gap-2">
                <Input
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="Product name"
                  className="flex-1"
                />
                <Select value={newProductColor} onValueChange={setNewProductColor}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COLORS.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input
                value={newProductDesc}
                onChange={(e) => setNewProductDesc(e.target.value)}
                placeholder="Description"
              />
              <Button size="sm" onClick={handleAddProduct}>
                Add Product
              </Button>
            </div>
          </section>

          {/* Tags */}
          <section>
            <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-4">
              Tags
            </h3>
            <div className="space-y-2 mb-4">
              {tags.map((tag) =>
                editingTag?.id === tag.id ? (
                  <div
                    key={tag.id}
                    className="bg-background border border-primary/30 rounded-lg p-3 flex gap-2 items-center"
                  >
                    <Input
                      value={editingTag.label}
                      onChange={(e) =>
                        setEditingTag({ ...editingTag, label: e.target.value })
                      }
                      className="flex-1"
                    />
                    <Select
                      value={editingTag.color}
                      onValueChange={(v) =>
                        setEditingTag({ ...editingTag, color: v })
                      }
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {COLORS.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button size="sm" onClick={handleSaveTag}>
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingTag(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div
                    key={tag.id}
                    className="flex items-center justify-between bg-background border border-border rounded-lg p-3"
                  >
                    <TagChip label={tag.label} color={tag.color} />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingTag(tag)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() =>
                          setConfirmDelete({
                            type: "tag",
                            id: tag.id,
                            label: tag.label,
                          })
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Add tag form */}
            <div className="bg-muted rounded-lg p-3 flex gap-2 items-center">
              <Input
                value={newTagLabel}
                onChange={(e) => setNewTagLabel(e.target.value)}
                placeholder="Tag label"
                className="flex-1"
              />
              <Select value={newTagColor} onValueChange={setNewTagColor}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COLORS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button size="sm" onClick={handleAddTag}>
                Add Tag
              </Button>
            </div>
          </section>
        </div>

        <ConfirmDialog
          open={confirmDelete !== null}
          title={`Delete ${confirmDelete?.type}`}
          message={`Are you sure you want to delete "${confirmDelete?.label}"? This action cannot be undone.`}
          confirmLabel="Delete"
          variant="danger"
          onConfirm={() => {
            if (confirmDelete) {
              if (confirmDelete.type === "product") {
                deleteProduct(confirmDelete.id);
              } else {
                deleteTag(confirmDelete.id);
              }
              setConfirmDelete(null);
            }
          }}
          onCancel={() => setConfirmDelete(null)}
        />
      </div>
    </>
  );
}
