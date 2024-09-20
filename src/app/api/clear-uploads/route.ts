import prisma from "@/lib/prisma";
import { UTApi } from "uploadthing/server";

export async function GET(req: Request) {
  try {
    //Getting the Cron Secret
    const authHeader = req.headers.get("Authorization");

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return Response.json(
        { error: "Invalid authorization header" },
        { status: 401 },
      );
    }

    // Fetch all unused media files
    const unusedMediaFiles = await prisma.media.findMany({
      where: {
        postId: null,
        ...(process.env.NODE_ENV === "production"
          ? {
              createdAt: {
                lte: new Date(Date.now() - 1000 * 60 * 60 * 24),
              },
            }
          : {}),
      },
      select: {
        id: true,
        url: true,
      },
    });

    // Delete those files
    // Split it to get the key part of the url
    new UTApi().deleteFiles(
      unusedMediaFiles.map(
        (file) =>
          file.url.split(
            `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
          )[1],
      ),
    );

    // Delete the corresponding media in the database
    await prisma.media.deleteMany({
      where: {
        id: {
          in: unusedMediaFiles.map((file) => file.id),
        },
      },
    });
    return Response.json({
      message: "Successfully performed the clear unused media files cron job",
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
