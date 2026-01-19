// app/api/revalidate/route.ts
import { RevalidationData } from '@/types/types';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  secret: string;
  data: RevalidationData;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    
    if (body.secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      );
    }

    const { data } = body;

    for (const tag of data.tags) {
      revalidateTag(tag);
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      tags: data.tags,
      timestamp: new Date().toISOString()
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}