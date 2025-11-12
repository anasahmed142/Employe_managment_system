export const openCamera = async (): Promise<string> => {
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  
      return await new Promise((resolve, reject) => {
        const video = document.createElement("video");
        video.style.display = "none"; // hide element
        document.body.appendChild(video);
  
        video.srcObject = stream;
        video.play().catch((err) => {
          reject(new Error("Unable to start camera playback."));
        });
  
        video.onloadedmetadata = () => {
          // Wait a small delay to allow exposure & focus to stabilize
          setTimeout(() => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
  
            const context = canvas.getContext("2d");
            context?.drawImage(video, 0, 0, canvas.width, canvas.height);
  
            const imageData = canvas.toDataURL("image/png");
  
            // Cleanup
            stream.getTracks().forEach((track) => track.stop());
            document.body.removeChild(video);
  
            resolve(imageData);
          }, 500); // short delay for better focus
        };
      });
    } catch (error: any) {
      console.error("Camera access error:", error);
  
      // Friendly error handling
      if (error.name === "NotAllowedError") {
        throw new Error("Camera permission denied. Please allow access to use this feature.");
      } else if (error.name === "NotFoundError") {
        throw new Error("No camera found on this device.");
      } else if (error.name === "NotReadableError") {
        throw new Error("Camera is already in use by another application.");
      } else {
        throw new Error("Unexpected error accessing camera: " + error.message);
      }
    }
  };
  