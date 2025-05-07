// // pages/api/directors.js
// import fs from 'fs';
// import path from 'path';

// export default function handler(req, res) {
//   try {
//     const filePath = path.join(process.cwd(), 'public/data/data.json');
//     const jsonData = fs.readFileSync(filePath, 'utf-8');
//     const data = JSON.parse(jsonData);

//     const directorsWithMovies = data.directors.map((director) => {
//       const moviesDirected = data.movies?.filter(
//         (movie) => movie.directorId === director.id
//       ) || [];

//       return {
//         ...director,
//         movies: moviesDirected,
//       };
//     });

//     res.status(200).json(directorsWithMovies);
//   } catch (error) {
//     console.error('Error loading director data:', error);
//     res.status(500).json({ error: 'Failed to load data' });
//   }
// }
