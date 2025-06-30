import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader2 className="animate-spin w-10 h-10 text-primary" />
    </div>
  );
};

export default Loader;
