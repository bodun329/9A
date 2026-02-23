import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useArticles } from '../context/ArticlesContext';

function AdminPage() {
  const { isAdmin } = useAuth();
  const { getAllUserArticles } = useArticles();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const allUserArticles = getAllUserArticles();

  return (
    <div>
      <h2 className="page-heading">Admin Dashboard</h2>

      {Object.keys(allUserArticles).length === 0 ? (
        <div className="message">
          No users have saved any articles yet.
        </div>
      ) : (
        <div>
          {Object.entries(allUserArticles).map(([username, articles]) => (
            <div key={username}>
              <h3>{username}'s Saved Articles ({articles.length})</h3>

              {articles.map((article, index) => (
                <div key={index}>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
