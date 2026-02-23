import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
  const { user } = useAuth();
  const [savedArticlesByUser, setSavedArticlesByUser] = useState({});

  const getUserSavedArticles = () => {
    if (!user) return [];
    return savedArticlesByUser[user.username] || [];
  };

  const saveArticle = (article) => {
    if (!user) return;

    setSavedArticlesByUser(prev => {
      const userArticles = prev[user.username] || [];
      if (userArticles.find(a => a.url === article.url)) {
        return prev;
      }
      return {
        ...prev,
        [user.username]: [...userArticles, article]
      };
    });
  };

  const removeArticle = (url) => {
    if (!user) return;

    setSavedArticlesByUser(prev => {
      const userArticles = prev[user.username] || [];
      return {
        ...prev,
        [user.username]: userArticles.filter(a => a.url !== url)
      };
    });
  };

  const isArticleSaved = (url) => {
    return getUserSavedArticles().some(a => a.url === url);
  };

  const getAllUserArticles = () => {
    return savedArticlesByUser;
  };

  return (
    <ArticlesContext.Provider value={{
      saveArticle,
      removeArticle,
      isArticleSaved,
      getUserSavedArticles,
      getAllUserArticles
    }}>
      {children}
    </ArticlesContext.Provider>
  );
}

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within ArticlesProvider');
  }
  return context;
};
