import { useAuth } from '../context/AuthContext';
import { useArticles } from '../context/ArticlesContext';
import { Navigate } from 'react-router-dom';

function AdminPage() {
  const { isAdmin } = useAuth();
  const { getAllUserArticles } = useArticles();

  // Check if a user is an admin and return all users' saved articles if they are. Redirect them to home if not.
  if (!isAdmin()) {
    return <Navigate to="/" />;
  }

  const allUserArticles = getAllUserArticles();

  return (
    <div>
      <h2 className="page-heading">Admin Dashboard</h2>
      
      <div style={{ 
        background: '#fff3cd', 
        border: '1px solid #ffc107', 
        borderRadius: '6px', 
        padding: '16px', 
        marginBottom: '24px' 
      }}>
        <p style={{ margin: 0, color: '#856404' }}>
          Admin View: You can see all users' saved articles
        </p>
      </div>

      {Object.keys(allUserArticles).length === 0 ? (
        <div className="message">
          No users have saved any articles yet.
        </div>
      ) : (
        <div>
          {Object.entries(allUserArticles).map(([username, articles]) => (
            <div key={username} style={{ marginBottom: '32px' }}>
              <h3>{username}'s Saved Articles ({articles.length})</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
