-- CREATE TABLE ipl_players(
--     player_id SERIAL PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     team VARCHAR(50),
--     role VARCHAR(50),
--     run_scored INT CHECK (run_scored > 0),
--     wickets_taken INT CHECK (wickets_taken > 0),
--     auction_price_crores INT
-- );
-- ALTER TABLE ipl_players
-- ADD COLUMN nickname VARCHAR(50);

-- INSERT INTO ipl_players 
-- (name, team, role, run_scored, wickets_taken, auction_price_crores, nickname)
-- VALUES
-- ('Virat Kohli', 'RCB', 'Batsman', 12000, 1, 15, 'King Kohli'),
-- ('Jasprit Bumrah', 'MI', 'Bowler', 500, 150, 7, 'Boom Boom'),
-- ('MS Dhoni', 'CSK', 'Wicketkeeper Batsman', 10000, 1, 10, 'Captain Cool'),
-- ('Rohit Sharma', 'MI', 'Batsman', 9000, 1, 12, 'Hitman'),
-- ('Ravindra Jadeja', 'CSK', 'All-rounder', 3000, 200, 8, 'Sir Jadeja'),
-- ('AB de Villiers', 'RCB', 'Batsman', 11000, 1, 14, 'Mr 360'),
-- ('Hardik Pandya', 'GT', 'All-rounder', 2500, 50, 15, 'Kung Fu Pandya'),
-- ('KL Rahul', 'LSG', 'Batsman', 4000, 1, 17, 'KL'),
-- ('Shubman Gill', 'GT', 'Batsman', 3500, 1, 8, 'Prince'),
-- ('Yuzvendra Chahal', 'RR', 'Bowler', 200, 180, 6, 'Yuzi');

-- SELECT * FROM ipl_players
SELECT name, nickname, team FROM ipl_players
