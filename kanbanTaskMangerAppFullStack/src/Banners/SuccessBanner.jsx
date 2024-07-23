import { CheckCircle } from "lucide-react";

export function SuccessBanner({ successMessage = "" }) {
  return (
    <>
      <div className="absolute z-[1000] w-full rounded-md border-l-4 border-green-500 bg-green-100 p-4">
        <div className="flex items-center justify-center space-x-4">
          <div>
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-600">{successMessage}</p>
          </div>
        </div>
      </div>
    </>
  );
}
