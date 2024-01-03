import { authOptions } from '@/lib/auth.config';
import NextAuth from 'next-auth';

 
export default NextAuth(authOptions).auth;
 
export const config = { matcher: ["/dashboard/*"] };