import { readdir, readFile } from "fs/promises";
import { resolve } from "path";

export default defineEventHandler(async (event) => {
    const folderPath = resolve("public/pic");
    try {
        const files = await readdir(folderPath);
        const imageFiles = files.filter((file) =>
            /\.(jpg|jpeg|png|gif)$/i.test(file)
        );

        const images = [];
        for (const file of imageFiles) {
            const filePath = resolve(folderPath, file);
            const imageData = await readFile(filePath, { encoding: "base64" });
            const base64Image = `data:image/${file
                .split(".")
                .pop()};base64,${imageData}`;
            images.push({
                url: base64Image,
            });
        }

        return images;
    } catch (error) {
        console.error("Error reading directory:", error);
        return [];
    }
});
