import { Formidable } from "formidable";
import { promises as fs } from "fs";
import { resolve, join, parse } from "path";

export default defineEventHandler(async (event) => {
    const form = new Formidable({
        multiples: true, // 啟用多文件上傳
        keepExtensions: true, // 保留擴展名
        uploadDir: "public/pic", // 臨時文件目錄
        maxFileSize: 200 * 1024 * 1024, // 最大文件大小（200MB）
    });

    // 處理表單數據，提取文件
    const { files, fields } = await new Promise((resolve, reject) => {
        form.parse(event.node.req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });

    // 檢查是否有文件被上傳
    if (!files || Object.keys(files).length === 0) {
        return { error: "No files were uploaded." };
    }

    // 存儲文件到/public/uploads
    const uploadsDir = resolve("public/pic");
    try {
        await fs.mkdir(uploadsDir, { recursive: true });
        for (const file of Object.values(files)) {
            if (Array.isArray(file)) {
                for (const f of file) {
                    const oldPath = f.filepath;
                    const newFilename = f.newFilename || parse(f.filepath).base; // 使用默認文件名
                    const newPath = join(uploadsDir, newFilename);
                    await fs.rename(oldPath, newPath);
                }
            } else {
                const oldPath = file.filepath;
                const newFilename = file.newFilename || parse(file.filepath).base; // 使用默認文件名
                const newPath = join(uploadsDir, newFilename);
                await fs.rename(oldPath, newPath);
        }
    } }catch (error) {
        console.error(error);
        return { error: "Failed to save files." };
    }
    event.node.res.statusCode = 200;
    return "File uploaded successfully."
    
});
