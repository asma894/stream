import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// ✅ Fixed Zod Schema (Ensures "views" is a number)
const videoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().min(1, "URL is required"),
  thumbnail: z.string().min(1, "Thumbnail is required"),
  duration: z.string().min(1, "Duration is required"),
  views: z.preprocess(
    (val) => Number(val), // Convert string to number
    z.number().min(0, "Views must be a positive number") // Ensure it's valid
  ),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(1, "Description is required"),
});

// Utility functions for handling errors
function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function internalServerError(error: unknown) {
  console.error('Internal Server Error:', error);
  return NextResponse.json(
    { error: error instanceof Error ? error.message : 'Internal Server Error' },
    { status: 500 }
  );
}

// ✅ Fixed POST handler (Creates a new video)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Request body:', body);

    if (!body) {
      return badRequest('Request body is missing');
    }

    // Validate request data
    const validatedData = videoSchema.safeParse(body);
    if (!validatedData.success) {
      console.log('Validation errors:', validatedData.error.errors);
      return badRequest(validatedData.error.errors.map(e => e.message).join(', '));
    }

    // ✅ Ensure views is a number before inserting into Prisma
    const newVideo = await prisma.video.create({
      data: {
        ...validatedData.data,
        views: Number(validatedData.data.views), // Double-check conversion
        date: new Date(validatedData.data.date), // Convert string to Date
      },
    });

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/video:', error);
    return internalServerError(error);
  }
}

// ✅ Fixed GET handler (Fetches paginated videos)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    console.log('Query parameters:', { page, limit });

    // Convert and validate page/limit
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
      return badRequest('Parameters "page" and "limit" must be positive numbers');
    }

    // Fetch paginated videos from the database
    const skip = (pageNumber - 1) * limitNumber;
    const videos = await prisma.video.findMany({ skip, take: limitNumber });

    // Count total videos
    const total = await prisma.video.count();

    return NextResponse.json({
      data: videos,
      pagination: { page: pageNumber, limit: limitNumber, total },
    });
  } catch (error) {
    console.error('Error in GET /api/video:', error);
    return internalServerError(error);
  }
}
