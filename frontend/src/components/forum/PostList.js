"use client";

import { useState, useMemo } from 'react';
import {
  SortByDateDescendingStrategy,
  SortByDateAscendingStrategy,
  SortByCreatorAscendingStrategy,
  SortByCreatorDescendingStrategy
} from '@/lib/sortingStrategies';

// Dicionário de Estratégias
const sortingOptions = {
  dateDesc: new SortByDateDescendingStrategy(),
  dateAsc: new SortByDateAscendingStrategy(),
  creatorAsc: new SortByCreatorAscendingStrategy(),
  creatorDesc: new SortByCreatorDescendingStrategy(),
};

export function PostList({ posts, onDeletePost }) {
  const [currentStrategyKey, setCurrentStrategyKey] = useState('dateDesc'); 

  const handleSortChange = (event) => {
    setCurrentStrategyKey(event.target.value);
  };

  const sortedPosts = useMemo(() => {
    if (!Array.isArray(posts) || posts.length === 0) return []; 

    const strategy = sortingOptions[currentStrategyKey];
    if (strategy) {
      return strategy.sort(posts); // Delegação do Strategy!
    }
    return posts;
  }, [posts, currentStrategyKey]); 

  if (sortedPosts.length === 0) {
    return <p style={{ color: '#9ca3af', textAlign: 'center', padding: '40px 0' }}>Nenhuma postagem para exibir.</p>;
  }

  return (
    <div style={{ padding: '20px', background: '#1e1e1e', borderRadius: '8px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label htmlFor="sort-posts" style={{ color: '#ccc', fontSize: '14px' }}>
            Ordenar por:
          </label>
          
          <select
            id="sort-posts"
            value={currentStrategyKey}
            onChange={handleSortChange}
            style={{ padding: '8px', borderRadius: '4px', background: '#333', color: '#fff', border: '1px solid #555' }}
          >
            <option value="dateDesc">Data (Mais recentes)</option>
            <option value="dateAsc">Data (Mais antigos)</option>
            <option value="creatorAsc">Criador (A-Z)</option>
            <option value="creatorDesc">Criador (Z-A)</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sortedPosts.map((post) => (
          <div key={post.id} style={{ padding: '15px', background: '#2d2d2d', border: '1px solid #444', borderRadius: '6px', color: 'white' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>{post.title || `Post #${post.id}`}</h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>
              Autor: {post.creatorName} | Data: {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}