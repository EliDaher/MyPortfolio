'use client'
import { Button } from "./ui/button";
import { DownloadIcon } from "lucide-react";

const DownloadCV = () => {
  const handleDownload = () => {
    // Google Analytics Event
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "cv_download", {
        event_category: "engagement",
        event_label: "Eli Daher CV",
        value: 1,
      });
    }

    // Download CV
    const link = document.createElement("a");
    link.href = "/Eli_Daher_CV.pdf";
    link.download = "Eli_Daher_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      size="icon"
      className="fixed top-4 left-16 w-fit px-3"
      onClick={handleDownload}
    >
      <DownloadIcon />
      <span className="sr-only">Download CV</span>
    </Button>
  );
};

export default DownloadCV;
