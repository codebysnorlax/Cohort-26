CREATE TABLE ipl_players(
    player_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    team VARCHAR(50),
    role VARCHAR(50),
    run_scored INT CHECK (run_scored > 0),
    wickets_taken INT CHECK (wickets_taken > 0),
    auction_price_crores INT
);

ALTER TABLE ipl_players
ADD COLUMN nickname VARCHAR(50);
INSERT INTO ipl_players 
(name, team, role, run_scored, wickets_taken, auction_price_crores, nickname)
VALUES
('Virat Kohli', 'RCB', 'Batsman', 12000, 1, 15, 'King Kohli'),
('Jasprit Bumrah', 'MI', 'Bowler', 500, 150, 7, 'Boom Boom'),
('MS Dhoni', 'CSK', 'Wicketkeeper Batsman', 10000, 1, 10, 'Captain Cool'),
('Rohit Sharma', 'MI', 'Batsman', 9000, 1, 12, 'Hitman'),
('Ravindra Jadeja', 'CSK', 'All-rounder', 3000, 200, 8, 'Sir Jadeja'),
('AB de Villiers', 'RCB', 'Batsman', 11000, 1, 14, 'Mr 360'),
('Hardik Pandya', 'GT', 'All-rounder', 2500, 50, 15, 'Kung Fu Pandya'),
('KL Rahul', 'LSG', 'Batsman', 4000, 1, 17, 'KL'),
('Shubman Gill', 'GT', 'Batsman', 3500, 1, 8, 'Prince'),
('Yuzvendra Chahal', 'RR', 'Bowler', 200, 180, 6, 'Yuzi');
SELECT * FROM ipl_players
SELECT name, nickname, team FROM ipl_players;

-- ! filtering


SELECT * FROM ipl_players WHERE role = 'Batsman';
SELECT * FROM ipl_players WHERE auction_price_crores > 10;
SELECT name, nickname FROM ipl_players WHERE auction_price_crores > 10;

-- ! Logical operators (AND, OR)


SELECT name, nickname FROM ipl_players WHERE auction_price_crores > 10 AND role = 'Batsman';
SELECT name, nickname, team FROM ipl_players WHERE team = 'CSK' OR team = 'RR';

-- ! Pattern matching


SELECT * FROM ipl_players WHERE name LIKE '__a%'; -- name has 'a' as the third character
SELECT * FROM ipl_players WHERE name LIKE '%a%'; -- name contains 'a' anywhere
SELECT * FROM ipl_players WHERE name LIKE '___a%'; -- name has 'a' as the fourth character
SELECT * FROM ipl_players WHERE name LIKE '%R%'
SELECT * FROM ipl_players WHERE team IN ('RCB', 'GT', 'RR', 'CSK')
SELECT name, nickname, auction_price_crores FROM ipl_players WHERE auction_price_crores BETWEEN 10 AND 15
SELECT name, nickname, team FROM ipl_players  WHERE team != 'RCB'
SELECT name, nickname, team FROM ipl_players  WHERE team <> 'RCB'
[!=] [<>] both works same in sql


-- ! Sorting

SELECT name,
    nickname,
    auction_price_crores
FROM ipl_players
ORDER BY auction_price_crores DESC;
SELECT name, nickname, auction_price_crores
FROM ipl_players
ORDER BY team ASC, auction_price_crores DESC;

-- ! pagination


-- ? This query will return the top 3 most expensive players based on their auction price in descending order.


SELECT nickname,
    name,
    team
FROM ipl_players
ORDER BY auction_price_crores DESC
LIMIT 3; 
-- ? This query will skip the top 3 most expensive players and return the next 3 players based on their auction price in descending order.


SELECT nickname,
    name,
    team
FROM ipl_players
ORDER BY auction_price_crores DESC
LIMIT 15 OFFSET (page - 1) * limit; -- how many rows to skip before starting to return rows

page 1: (1-1)* 15 = 0 -- offset 0 means start from the beginning
page 2: (2-1)* 15 = 15 -- offset 15 means skip the first 15 records and start from the 16th record
page 3: (3-1)* 15 = 30  -- offset 30 means skip the first 30 records and start from the 31st record


