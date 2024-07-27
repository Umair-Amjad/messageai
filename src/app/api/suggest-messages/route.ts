// import { openai } from '@ai-sdk/openai';
// import { streamText } from 'ai';
// import OpenAI from 'openai';
// import { throwDeprecation } from 'process';

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {

//   const { messages } = await req.json();
// try{

//   const result = await streamText({
//     model: openai('gpt-4-turbo'),
//     messages,
//   });

//   return result.toAIStreamResponse();
// }catch(err){
//     if(err instanceof OpenAI.APIError)
//     console.error("An unexpected error accured",err)
//     throw err
// }

// }

// import OpenAI from "openai";
// import { OpenAIStream, StreamingTextResponse,  } from "ai";
// import { NextResponse } from "next/server";

// // Allow streaming responses up to 30 seconds
// const openai=new OpenAI({
//     apiKey:process.env.OPENAI_API_KEY
// })
// export const runtime ='edge';

// export async function POST() {
//   try {
//     const prompt="what is Your Name || Which one is faovurite Languge || what is computer"
//     // const { messages } = await req.json();
//     const response = await openai.chat.completions.create({
//         model: 'gpt-3.5-turbo',
//         stream: true,
//         prompt:prompt,
//       });
//     const stream=OpenAIStream(response)

//     return new StreamingTextResponse(stream);
//   } catch (err) {
//     if (err instanceof OpenAI.APIError) {
//       const { name, status, headers, message } = err;
//       return NextResponse.json({
//         name,
//         status,
//         headers,
//         message,
//       });
//     }
//     console.error("An unexpected error accured", err);
//     throw err;
//   }
// }
