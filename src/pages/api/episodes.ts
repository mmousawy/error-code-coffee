import type { NextApiRequest, NextApiResponse } from 'next';
import getEpisodes from '@/shared/episodeData';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(await getEpisodes());
}
