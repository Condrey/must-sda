import { validateRequest } from "@/auth";
import streamServerClient from "@/lib/stream";

export async function GET() {
  try {
    const { user: loggedInUser } = await validateRequest();
    console.log(
      "Calling get-Token for user: ",
      loggedInUser?.displayName,
      loggedInUser?.id,
    );


      if (!loggedInUser) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }
    

    //Make token valid for an hour, then it refreshes again.
    // Stream takes care of refreshing, just  give expiration time
    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;

    //When the token was issued
    // There could be diff in time btn server and client, so subtract 1
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    // Create the token itself
    // we need a streamClient instance, (@/lib/stream file)
    const token = streamServerClient.createToken(
        loggedInUser.id,
        expirationTime,
        issuedAt
    )

    return Response.json({token})

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
