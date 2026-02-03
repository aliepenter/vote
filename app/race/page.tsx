'use client';
import { useEffect, useState } from 'react';
import styles from './race.module.css';

const teams = [
  { id: 1, name: 'Đội 1', color: '#FF6B6B' },
  { id: 2, name: 'Đội 2', color: '#4ECDC4' },
  { id: 3, name: 'Đội 3', color: '#45B7D1' },
  { id: 4, name: 'Đội 4', color: '#FFA07A' },
  { id: 5, name: 'Đội 5', color: '#98D8C8' },
  { id: 6, name: 'Đội 6', color: '#F7DC6F' },
  { id: 7, name: 'Đội 7', color: '#BB8FCE' },
];

export default function RacePage() {
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [positions, setPositions] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Polling thay vì SSE để đơn giản và tránh lỗi
    const fetchVotes = async () => {
      try {
        const res = await fetch('/api/vote');
        const data = await res.json();
        if (data.votes) {
          console.log('Fetched votes:', data.votes);
          setVotes(data.votes);
        }
      } catch (err) {
        console.error('Error fetching votes:', err);
      }
    };
    
    // Fetch ngay lập tức
    fetchVotes();
    
    // Polling mỗi 1 giây
    const interval = setInterval(fetchVotes, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [mounted]);

  useEffect(() => {
    // Tính toán vị trí dựa trên votes
    const maxVotes = Math.max(...votes, 1);
    const newPositions = votes.map(v => (v / maxVotes) * 80); // 80% chiều rộng màn hình
    setPositions(newPositions);
  }, [votes]);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.raceContainer}>
      <div className={styles.raceTrack}>
        {teams.map((team, index) => (
          <div key={team.id} className={styles.lane}>
            <div className={styles.laneInfo}>
              <span className={styles.teamName} style={{ color: team.color }}>
                {team.name}
              </span>
              <span className={styles.voteCount}>{votes[index]} votes</span>
            </div>
            
            <div className={styles.track}>
              <div 
                className={styles.horse}
                style={{ 
                  left: `${positions[index]}%`,
                  transition: 'left 0.5s ease-out'
                }}
              >
                <div className={styles.horseAnimation}>
                  <img src="/horse1.png" alt="horse" className={styles.horseFrame1} />
                  <img src="/horse2.png" alt="horse" className={styles.horseFrame2} />
                </div>
              </div>
              
              {/* Vạch đích */}
              <div className={styles.finishLine}>🏁</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
