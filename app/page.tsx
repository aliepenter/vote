export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        color: 'white',
        maxWidth: '600px'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '30px' }}>
          🏇 Hệ thống đua ngựa bình chọn 🏇
        </h1>
        
        <div style={{ 
          background: 'rgba(255,255,255,0.2)', 
          padding: '30px', 
          borderRadius: '15px',
          backdropFilter: 'blur(10px)',
          marginBottom: '20px'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
            Dành cho khán giả
          </h2>
          <a 
            href="/vote"
            style={{
              display: 'inline-block',
              background: '#FFD700',
              color: '#000',
              padding: '15px 40px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              transition: 'transform 0.2s'
            }}
          >
            🗳️ Bình chọn ngay
          </a>
        </div>

        <div style={{ 
          background: 'rgba(255,255,255,0.2)', 
          padding: '30px', 
          borderRadius: '15px',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
            Dành cho ban tổ chức
          </h2>
          <a 
            href="/race"
            style={{
              display: 'inline-block',
              background: '#FF6B6B',
              color: '#fff',
              padding: '15px 40px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              transition: 'transform 0.2s'
            }}
          >
            🏁 Xem đua ngựa
          </a>
        </div>
      </div>
    </div>
  );
}
