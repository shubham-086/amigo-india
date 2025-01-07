"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ErrorProps {
  message: string;
  urlPath: string;
}

const Error = ({ message, urlPath }: ErrorProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        {message}
      </h1>
      <Button
        className="mt-5"
        onClick={() => router.push(urlPath)}
        variant="default"
      >
        Go back
      </Button>
    </div>
  );
};

export default Error;
