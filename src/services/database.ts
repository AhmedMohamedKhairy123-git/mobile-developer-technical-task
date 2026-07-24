import * as SQLite from 'expo-sqlite';

// Open (or create) the database
const db = SQLite.openDatabaseSync('game.db');

export const initDatabase = () => {
    // Create a table with one field for the best score (lowest guesses)
    db.execSync(`
    CREATE TABLE IF NOT EXISTS scores (
      id INTEGER PRIMARY KEY NOT NULL,
      best_score INTEGER
    );
  `);
};

export const getBestScore = () => {
    const result = db.getFirstSync<{ best_score: number }>('SELECT best_score FROM scores WHERE id = 1');
    return result ? result.best_score : null;
};

export const updateBestScore = (newScore: number) => {
    const currentBest = getBestScore();
    if (currentBest === null || newScore < currentBest) {
        db.runSync('INSERT OR REPLACE INTO scores (id, best_score) VALUES (1, ?)', [newScore]);
        return true; // New record set!
    }
    return false;
};