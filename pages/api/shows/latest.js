import { getShows } from '../../../lib/getShows';

export default async (req, res) => {
  const [show] = await getShows();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(show));
};
