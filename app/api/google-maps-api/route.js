import { NextResponse } from "next/server";

/*  Need to pass the Google Maps API Key from server side
to client side from .env.process. 
*/

export async function GET() {
  try {
    const googleMapApiKey = process.env.GOOGLE_MAP_API_KEY || "";
    return NextResponse.json(googleMapApiKey, { status: 200 });
  } catch (error) {
    console.log(`Error getting Google Map API Key: ${error}`);
    return NextResponse.json({ message: `${error.message}` }, { status: 500 });
  }
}
