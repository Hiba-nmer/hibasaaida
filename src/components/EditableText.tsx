import { useState, useRef, useEffect } from "react";

interface EditableTextProps {
  defaultValue: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
}

const EditableText = ({ defaultValue, tag = "p", className = "" }: EditableTextProps) => {
  const [value, setValue] = useState(defaultValue);
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isEditing && ref.current) {
      ref.current.focus();
      // Place cursor at end
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [isEditing]);

  const Tag = tag;

  return (
    <Tag
      ref={ref as any}
      className={`${className} cursor-text outline-none rounded transition-all duration-200 ${
        isEditing ? "ring-2 ring-primary/50 bg-secondary/30 px-2 -mx-2" : "hover:ring-1 hover:ring-primary/20"
      }`}
      contentEditable={isEditing}
      suppressContentEditableWarning
      onClick={() => setIsEditing(true)}
      onBlur={(e) => {
        setIsEditing(false);
        setValue(e.currentTarget.textContent || defaultValue);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && tag !== "p") {
          e.preventDefault();
          (e.target as HTMLElement).blur();
        }
      }}
    >
      {value}
    </Tag>
  );
};

export default EditableText;
