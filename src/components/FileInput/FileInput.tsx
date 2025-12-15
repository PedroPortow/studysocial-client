import { Image } from "lucide-react";

function FileInput({ onChange }) {
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.files);
  }

  return (
    <label className="inline-flex items-center gap-2 px-4 py-2 text-blue-500 hover:bg-blue-50 rounded-full cursor-pointer transition-colors">
      <Image className="w-5 h-5" />
      <span className="text-sm font-medium">Adicionar foto</span>
      <input
        multiple
        accept="image/*"
        className="hidden"
        type="file"
        onChange={handleFileChange}
      />
    </label>
  );
}

export default FileInput;
