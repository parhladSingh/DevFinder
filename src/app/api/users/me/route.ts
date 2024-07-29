// Example: api/users/me.js (or api/users/me.ts if using TypeScript)
import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/client'; // Example using Next.js authentication

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'User session not found' });
  }

  // Assuming session.user contains user information
  return res.status(200).json({ user: session.user });
};
