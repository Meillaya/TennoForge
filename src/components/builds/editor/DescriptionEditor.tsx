import { useState } from 'react';
import Markdown from 'react-markdown';

interface DescriptionEditorProps {
  value: string;
  onChange: (value: string) => void;
  preview: boolean;
}

export default function DescriptionEditor({
  value,
  onChange,
  preview
}: DescriptionEditorProps) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Build Description</h3>

      {preview ? (
        <div className="prose prose-invert max-w-none">
          <Markdown>{value || 'No description provided.'}</Markdown>
        </div>
      ) : (
        <div className="space-y-2">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Describe your build... 

You can use Markdown formatting:
- Use **bold** for emphasis
- Create lists with -
- Add headers with #
- Include `code` with backticks"
            className="input w-full h-64 font-mono"
          />
          <p className="text-sm text-gray-400">
            Supports Markdown formatting for rich text editing
          </p>
        </div>
      )}
    </div>
  );
}