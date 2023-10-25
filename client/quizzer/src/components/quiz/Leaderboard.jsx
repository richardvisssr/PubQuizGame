import React from 'react';

const Leaderboard = ({ teams }) => {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <div className="w-full mx-auto p-6 border rounded-lg shadow-lg" style={{ backgroundColor: 'gray' }}>
      <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left">Team Name</th>
            <th className="py-2 px-4 text-right">Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team, index) => (
            <tr key={team.name}>
              <td className="py-2 px-4 text-left">{team.name}</td>
              <td className="py-2 px-4 text-right">{team.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
