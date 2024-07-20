import { Resend } from 'resend';

export const resend = new Resend(process.env.resend_API_KEY);



// await resend.emails.send({
//     from: 'you@example.com',
//     to: 'user@gmail.com',
//     subject: 'hello world',
//     react: <Email url="https://example.com" />,
//   });