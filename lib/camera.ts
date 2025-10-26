
export const openCamera = async (): Promise<string> => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        await video.play();

        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            const captureFrame = () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/png');
                resolve(dataUrl);
                stream.getTracks().forEach(track => track.stop());
            };

            video.addEventListener('canplay', captureFrame);
        });
    } catch (error) {
        console.error('Error accessing camera:', error);
        throw error;
    }
};
