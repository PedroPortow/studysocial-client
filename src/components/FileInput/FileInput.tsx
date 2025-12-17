import { Image, X } from "lucide-react";

type FileInputProps = {
  onChange: (file: File | null) => void;
  value?: File | null;
};

function FileInput({ onChange, value }: FileInputProps) {
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;

    onChange(file);
  }

  function handleRemove() {
    onChange(null);
  }

  if (value) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
        <Image className="w-4 h-4 text-blue-500" />
        <span className="text-sm text-blue-600 max-w-32 truncate">
          {value.name}
        </span>
        <button
          className="p-0.5 hover:bg-blue-100 rounded-full transition-colors"
          type="button"
          onClick={handleRemove}
        >
          <X className="w-4 h-4 text-blue-500" />
        </button>
      </div>
    );
  }

  return (
    <label className="inline-flex items-center gap-2 px-4 py-2 text-blue-500 hover:bg-blue-50 rounded-full cursor-pointer transition-colors">
      <Image className="w-5 h-5" />
      <span className="text-sm font-medium">Adicionar foto</span>
      <input
        accept="image/*,video/*"
        className="hidden"
        type="file"
        onChange={handleFileChange}
      />
    </label>
  );
}

export default FileInput;
