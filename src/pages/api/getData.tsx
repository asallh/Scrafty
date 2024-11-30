import { JSDOM } from "jsdom";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import archiver from "archiver";
import sharp from "sharp"; // Import sharp for image processing

const getData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = JSON.parse(req.body);
    const { url } = body;

    // Fetch the HTML of the target webpage
    const response = await fetch(url);
    const html = await response.text();

    // Parse the HTML using JSDOM
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract all image URLs
    const imageUrls = Array.from(document.querySelectorAll("img"))
      .map((img) => img.src)
      .filter((src) => src.startsWith("http")); // Only include absolute URLs

    if (imageUrls.length === 0) {
      return res.status(404).json({ error: "No images found on the page." });
    }

    // Log the source of each image
    console.log(`Found ${imageUrls.length} images.`);
    imageUrls.forEach((src, index) => {
      console.log(`Image ${index + 1}: ${src}`);
    });

    // Create a temporary directory to store downloaded images
    const tempDir = path.join(process.cwd(), "temp");
    const imagesDir = path.join(tempDir, "images");

    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
    if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir);

    // Download and convert each image to PNG, then save it in the temporary directory
    for (const [index, imageUrl] of imageUrls.entries()) {
      const imageResponse = await fetch(imageUrl);
      const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

      // Convert image to PNG using sharp
      const imagePath = path.join(imagesDir, `image-${index + 1}.png`);
      await sharp(imageBuffer) // Convert the image buffer to PNG format
        .toFormat("png") // Ensure the image is saved as PNG
        .toFile(imagePath); // Save the image as PNG
    }

    // Create a ZIP file containing the downloaded images
    const zipPath = path.join(tempDir, "images.zip");
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      console.log(`ZIP file created: ${archive.pointer()} total bytes`);
    });

    archive.on("error", (err) => {
      console.error("Error creating ZIP archive:", err);
      throw err;
    });

    archive.pipe(output);
    archive.directory(imagesDir, false); // Add images folder contents to ZIP root
    await archive.finalize();

    // Stream the ZIP file to the client
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", 'attachment; filename="images.zip"');
    const fileStream = fs.createReadStream(zipPath);
    fileStream.pipe(res);

    // Cleanup temporary files
    fileStream.on("close", () => {
      fs.rmSync(tempDir, { recursive: true, force: true });
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
};

export default getData;