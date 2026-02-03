// Trang vote cho khán giả, chọn 1 trong 7 đội - Kahoot style
'use client';
import { useState } from 'react';
import styles from './vote.module.css';

const teams = [
  { id: 1, name: 'Đội 1', color: '#E21B3C', image: '/team1.jpg' },
  { id: 2, name: 'Đội 2', color: '#1368CE', image: '/team2.jpg' },
  { id: 3, name: 'Đội 3', color: '#D89E00', image: '/team3.jpg' },
  { id: 4, name: 'Đội 4', color: '#26890C', image: '/team4.jpg' },
  { id: 5, name: 'Đội 5', color: '#9C27B0', image: '/team5.jpg' },
  { id: 6, name: 'Đội 6', color: '#FF6F00', image: '/team6.jpg' },
  { id: 7, name: 'Đội 7', color: '#00897B', image: '/team7.jpg' },
];

export default function VotePage() {
  const [selected, setSelected] = useState<number|null>(null);
  const [voted, setVoted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVote = async (teamId: number) => {
    if (voted || loading) return;
    setSelected(teamId);
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team: teamId }),
      });
      if (!res.ok) throw new Error('Vote thất bại');
      setVoted(true);
    } catch (e) {
      setError('Có lỗi xảy ra, thử lại!');
      setLoading(false);
      setSelected(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🏇 Bình chọn đội yêu thích</h1>
        {!voted && <p className={styles.subtitle}>Chọn một đội để bình chọn</p>}
      </div>
      
      <div className={styles.grid}>
        {teams.map(team => (
          <button
            key={team.id}
            className={`${styles.card} ${selected === team.id ? styles.selected : ''} ${voted && selected !== team.id ? styles.disabled : ''}`}
            style={{ 
              backgroundColor: team.color,
              opacity: voted && selected !== team.id ? 0.3 : 1
            }}
            onClick={() => handleVote(team.id)}
            disabled={voted || loading}
          >
            <img 
              src={team.image} 
              alt={team.name} 
              className={styles.cardImage}
            />
            <div className={styles.cardName}>{team.name}</div>
          </button>
        ))}
      </div>

      {voted && (
        <div className={styles.success}>
          <div className={styles.successIcon}>✓</div>
          <div className={styles.successText}>Đã bình chọn thành công!</div>
        </div>
      )}
      
      {error && (
        <div className={styles.error}>{error}</div>
      )}
    </div>
  );
}
