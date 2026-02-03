// API nhận vote, lưu tạm vào bộ nhớ (demo, production nên dùng DB)
if (!global.votes || global.votes.length !== 7) {
  global.votes = [0, 0, 0, 0, 0, 0, 0];
  console.log('Reset votes to 7 teams:', global.votes);
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { team } = req.body;
    if (typeof team === 'number' && team >= 1 && team <= 7) {
      global.votes[team - 1]++;
      console.log('Vote received for team', team, '- New votes:', global.votes);
      return res.status(200).json({ ok: true, votes: global.votes });
    }
    return res.status(400).json({ error: 'Invalid team' });
  }
  
  if (req.method === 'GET') {
    console.log('GET votes:', global.votes);
    return res.status(200).json({ votes: global.votes });
  }
  
  res.status(405).end();
}
