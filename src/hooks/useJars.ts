import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Jar {
  id: string;
  name: string;
  ingredient: string;
  additionalIngredients: string[];
  brineType: 'salt' | 'vinegar';
  spices: string[];
  dateStarted: string;
  status: 'draft' | 'fermenting' | 'ready' | 'eaten';
  grams: number;
  jarSize: string;
}

const STORAGE_KEY = 'brineandshine_jars';

function loadJars(): Jar[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const jars = raw ? (JSON.parse(raw) as Partial<Jar>[]) : [];
    return jars.map(j => ({ grams: 800, jarSize: 'medium', additionalIngredients: [], ...j } as Jar));
  } catch {
    return [];
  }
}

function persist(jars: Jar[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jars));
}

export function useJars() {
  const [jars, setJars] = useState<Jar[]>(loadJars);

  const addJar = useCallback((data: Omit<Jar, 'id'>): string => {
    const jar: Jar = { ...data, id: uuidv4() };
    setJars(prev => {
      const next = [...prev, jar];
      persist(next);
      return next;
    });
    return jar.id;
  }, []);

  const updateJar = useCallback((id: string, updates: Partial<Omit<Jar, 'id'>>) => {
    setJars(prev => {
      const next = prev.map(j => (j.id === id ? { ...j, ...updates } : j));
      persist(next);
      return next;
    });
  }, []);

  const deleteJar = useCallback((id: string) => {
    setJars(prev => {
      const next = prev.filter(j => j.id !== id);
      persist(next);
      return next;
    });
  }, []);

  return { jars, addJar, updateJar, deleteJar };
}
